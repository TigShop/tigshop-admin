<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-table-list-warp">
                <div class="list-table-tool lyecs-search-warp">
                    <el-form :model="filterParams">
                        <div class="list-table-tool-row">
                            <div class="list-table-tool-col">
                                <el-space>
                                    申请类型：
                                    <el-select v-model="filterParams.aftersale_type">
                                        <el-option :value="0" label="请选择..."/>
                                        <el-option :value="1" label="退货"/>
                                        <el-option :value="2" label="换货"/>
                                        <el-option :value="3" label="维修"/>
                                    </el-select>
                                    退换货状态：
                                    <el-select v-model="filterParams.status">
                                        <el-option :value="0" label="请选择..."/>
                                        <el-option :value="1" label="审核处理中"/>
                                        <el-option :value="2" label="审核通过"/>
                                        <el-option :value="3" label="审核未通过"/>
                                        <el-option :value="4" label="售后收货中"/>
                                        <el-option :value="5" label="售后已处理"/>
                                        <el-option :value="6" label="已完成"/>
                                    </el-select>
                                    <el-input v-model="filterParams.keyword" class="width240" name="keyword" placeholder="订单号/姓名">
                                        <template #append>
                                            <el-button @click="onSearchSubmit"><span class="iconfont icon-chakan1"></span></el-button>
                                        </template>
                                    </el-input>
                                </el-space>
                            </div>
                        </div>
                    </el-form>
                </div>
                <div class="table-container">
                    <a-spin :spinning="loading">
                        <el-table :data="filterState" :loading="loading" :total="total" row-key="order_id"
                                  @selection-change="onSelectChange" @sort-change="onSortChange">
                            <el-table-column type="selection" width="32"/>
                            <el-table-column :width="200" label="退换货商品" prop="order_id" sortable="custom">
                                <template #default="{ row }">
                                    <ProductCard :pic_thumb="row.pic_thumb"
                                                 :product_id="row.product_id"
                                                 :product_name="row.product_name"
                                                 :product_type="row.product_type"
                                                 :url="row.url"></ProductCard>
                                </template>
                            </el-table-column>
                            <el-table-column label="申请时间">
                                <template #default="{ row }">
                                    {{ row.add_time }}
                                </template>
                            </el-table-column>
                            <el-table-column label="申请人">
                                <template #default="{ row }">
                                    {{ row.user_name }}
                                </template>
                            </el-table-column>
                            <el-table-column label="发货时间">
                                <template #default="{ row }">
                                    {{ row.shipping_time }}
                                </template>
                            </el-table-column>
                            <el-table-column label="服务类型">
                                <template #default="{ row }">
                                    {{ row.aftersales_type_name }}
                                </template>
                            </el-table-column>
                            <el-table-column label="快递名称">
                                <template #default="{ row }">
                                    {{ row.logistics_name }}
                                </template>
                            </el-table-column>
                            <el-table-column label="快递单号">
                                <template #default="{ row }">
                                    {{ row.tracking_no }}
                                </template>
                            </el-table-column>
                            <el-table-column label="状态">
                                <template #default="{ row }">
                                    {{ row.status_name }}
                                </template>
                            </el-table-column>
                            <el-table-column :width="150" fixed="right" label="操作">
                                <template #default="{ row }">
                                    <DialogForm :params="{ act: 'edit', id: row.aftersale_id }" isDrawer
                                                path="order/aftersales/Info"
                                                title="处理售后申请" width="700px"
                                                @okCallback="loadFilter">
                                        <a class="btn-link">编辑</a>
                                    </DialogForm>
                                    <el-divider direction="vertical"/>
                                    <DeleteRecord :params="{ id: row.aftersale_id }"
                                                  :requestApi="delAftersales"
                                                  @afterDelete="loadFilter">删除
                                    </DeleteRecord>
                                </template>
                            </el-table-column>
                            <template #empty>
                                <div class="empty-warp">
                                    <div v-if="!loading" class="empty-bg">暂无数据</div>
                                </div>
                            </template>
                        </el-table>
                    </a-spin>
                    <div v-if="total > 0" class="pagination-con">
                        <Pagination v-model:page="filterParams.page" v-model:size="filterParams.size" :total="total"
                                    @callback="loadFilter"/>
                    </div>
                </div>
                <div v-if="selectedIds.length > 0" class="selected-action-warp">
                    <div class="selected-action">
                        <el-space>
                            <span>已选择：<b>{{ selectedIds.length }}</b> 项</span>
                            <el-popconfirm title="您确认要批量删除所选数据吗？"
                                           @confirm="onBatchSubmit('del')">
                                <template #reference>
                                    <el-button>批量删除</el-button>
                                </template>
                            </el-popconfirm>
                        </el-space>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import '@/style/css/list.less'
import {DialogForm} from '@/components/dialog'
import {PopForm} from '@/components/pop-form'
import {onMounted, reactive, ref} from 'vue';
import {DeleteRecord, Pagination, ProductCard, Switch} from '@/components/list';
import {Image} from '@/components/image';
import {message} from 'ant-design-vue'
import {useConfigStore} from "@/store/config";
import {AftersalesFilterParams, AftersalesFilterState} from '@/types/order/aftersales';
import {batchSubmit, delAftersales, getAftersalesList, updateAftersalesField} from "@/api/order/aftersales";

const config:any = useConfigStore();
// 基本参数定义
const filterState = ref(<AftersalesFilterState[]>[]);
const loading = ref<boolean>(true);
const total = ref<number>(0);
const selectedIds = ref<number[]>([]);
const filterParams = reactive<AftersalesFilterParams>({   //初始化用于查询的参数
    page: 1,
    size: config.get('page_size'),
    sort_field: '',
    sort_order: '',
    keyword: '',
    aftersale_type: 0,
    status: 0,
});
// 获取列表的查询结果
const loadFilter = async () => {
    loading.value = true;
    try {
        const result = await getAftersalesList({...filterParams});
        filterState.value = result.filter_result;
        total.value = result.total;
    } catch (error:any) {
        message.error(error.message);
    } finally {
        loading.value = false;
    }

}
onMounted(() => {
    loadFilter();
});

// 参数查询
const onSearchSubmit = () => {
    loadFilter()
};
// 修改排序
const onSortChange = ({prop, order}: { prop: string; order?: string }) => {
    filterParams.sort_field = prop;
    filterParams.sort_order = order == 'ascending' ? 'asc' : order == 'descending' ? 'desc' : '';
    loadFilter();
};

// 批量操作
const onBatchSubmit = async (action: string) => {
    try {
        const result = await batchSubmit(action, {ids: selectedIds.value});
        message.success(result.message);
        loadFilter();
    } catch (error:any) {
        message.error(error.message);
    }
};
// 多选操作
const onSelectChange = (e: AftersalesFilterState[]) => {
    selectedIds.value = e.map((item:any) => item.aftersale_id);
};


</script>
