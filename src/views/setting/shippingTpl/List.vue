<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-table-list-warp">
                <div class="list-table-tool lyecs-search-warp">
                    <el-form :model="filterParams">
                        <div class="list-table-tool-row">
                            <div class="list-table-tool-col">
                                <el-space>
                                    <DialogForm :params="{ act: 'add' }" isDrawer path="setting/shippingTpl/Info"
                                                title="添加运费模板" width="900px"
                                                @okCallback="loadFilter">
                                        <el-button type="primary">添加运费模板</el-button>
                                    </DialogForm>
                                    <el-input v-model="filterParams.keyword" class="width240" name="keyword" placeholder="输入模板名称">
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
                        <el-table :data="filterState" :loading="loading" :total="total" row-key="shipping_tpl_id"
                                  @selection-change="onSelectChange" @sort-change="onSortChange">
                            <el-table-column type="selection" width="32"/>
                            <el-table-column label="模板名称">
                                <template #default="{ row }">
                                    <PopForm v-model:org-value="row.shipping_tpl_name"
                                             :max="10"
                                             :params="{ id: row.shipping_tpl_id, field: 'shipping_tpl_name' }"
                                             :requestApi="updateShippingTplField"
                                             label="模板名称" type="input">
                                        <div>{{ row.shipping_tpl_name }}</div>
                                    </PopForm>
                                </template>
                            </el-table-column>
                            <el-table-column label="是否包邮" prop="is_free">
                                <template #default="{ row }">
                                    {{ row.is_free === 0 ? '自定义运费' : '卖家承担运费' }}
                                </template>
                            </el-table-column>
                            <el-table-column label="计价方式" prop="is_support_cod">
                                <template #default="{ row }">
                                    {{ row.pricing_type === 1 ? '按件数' : '按重量' }}
                                </template>
                            </el-table-column>
                            <el-table-column label="发货时间" prop="shipping_time" sortable="custom"></el-table-column>
                            <el-table-column label="是否默认" prop="is_support_cod">
                                <template #default="{ row }">
                                    {{ row.is_default === 1 ? '是' : '--'}}
                                </template>
                            </el-table-column>
                            <el-table-column :width="150" fixed="right" label="操作">
                                <template #default="{ row }">
                                    <DialogForm :params="{ act: 'detail', id: row.shipping_tpl_id }" isDrawer
                                                path="setting/shippingTpl/Info"
                                                title="编辑配送类型" width="900px"
                                                @okCallback="loadFilter">
                                        <a class="btn-link">编辑</a>
                                    </DialogForm>
                                    <el-divider direction="vertical"/>
                                    <DeleteRecord :params="{ id: row.shipping_tpl_id }"
                                                  :requestApi="delShippingTpl"
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
import {DeleteRecord, Pagination} from '@/components/list';
import {message} from 'ant-design-vue'
import {useConfigStore} from "@/store/config";
import  type {ShippingTplFilterParams, ShippingTplFilterState} from '@/types/setting/shippingTpl';
import {batchSubmit, delShippingTpl, getShippingTplList, updateShippingTplField} from "@/api/setting/shippingTpl";

const config:any = useConfigStore();
// 基本参数定义
const filterState = ref(<ShippingTplFilterState[]>[]);
const loading = ref<boolean>(true);
const total = ref<number>(0);
const selectedIds = ref<number[]>([]);
const filterParams = reactive<ShippingTplFilterParams>({   //初始化用于查询的参数
    page: 1,
    size: config.get('page_size'),
    sort_field: '',
    sort_order: '',
    keyword: '',
});
// 获取列表的查询结果
const loadFilter = async () => {
    loading.value = true;
    try {
        const result = await getShippingTplList({...filterParams});
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
const onSelectChange = (e: ShippingTplFilterState[]) => {
    selectedIds.value = e.map((item) => item.shipping_tpl_id);
};


</script>
