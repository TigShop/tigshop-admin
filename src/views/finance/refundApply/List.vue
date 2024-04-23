<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-table-list-warp">
                <div class="list-table-tool lyecs-search-warp">
                    <el-form :model="filterParams">
                        <div class="list-table-tool-row">
                            <div class="list-table-tool-col">
                                <el-space>
                                    <el-select placeholder="请选择状态" clearable v-model="filterParams.refund_status">
                                        <el-option :value="0" label="待处理"/>
                                        <el-option :value="1" label="已处理"/>
                                        <el-option :value="2" label="取消"/>
                                    </el-select>
                                    <el-input v-model="filterParams.keyword" name="keyword" placeholder="输入订单号/商品名称">
                                        <template #append>
                                            <el-button @click="onSearchSubmit"><span class="iconfont icon-chakan1"></span>
                                            </el-button>
                                        </template>
                                    </el-input>
                                </el-space>
                            </div>
                        </div>
                    </el-form>
                </div>
                <div class="table-container">
                    <a-spin :spinning="loading">
                        <el-table :data="filterState" :loading="loading" :total="total" row-key="refund_id" @sort-change="onSortChange">
                            <!-- <el-table-column type="selection" width="32"/> -->
                            <el-table-column label="退款类型" :width="120" prop="refund_type_name"></el-table-column>
                            <el-table-column label="退款信息">
                                <template #default="{ row }">
                                    <div  style="display: flex;justify-content: space-between;align-items: center">
                                        <DialogForm :params="{ act: 'edit', id: row.aftersale_id, type: 2 }" isDrawer
                                                    path="order/aftersales/Info"
                                                    :title="'售后详情 ' + row.aftersales_sn" width="800px"
                                                    @okCallback="loadFilter" :showClose="false" :showOnOk="false">
                                                    售后编号：<a>{{row.aftersales_sn}}</a>
                                        </DialogForm>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="退款状态" :width="120" prop="refund_status_name"></el-table-column>
                            <el-table-column label="申请时间" :width="160" prop="add_time"></el-table-column>
                            <el-table-column :width="120" fixed="right" label="操作">
                                <template #default="{ row }">
                                    <DialogForm :params="{ act: 'edit', id: row.refund_id }" isDrawer
                                           title="编辑退款申请" width="800px"
                                                     path="finance/refundApply/Info"
                                                @okCallback="loadFilter" :showClose="false" :showOnOk="false">
                                        <a class="btn-link">{{row.refund_status == 0 ? '处理申请' : '查看详情'}}</a>
                                    </DialogForm>
                                    <!-- <el-divider direction="vertical"/> -->
                                    <!-- <DeleteRecord :params="{ id: row.refund_id }" :requestApi="delRefundApply"
                                                  @afterDelete="loadFilter">删除
                                    </DeleteRecord> -->
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
                <!-- <div v-if="selectedIds.length > 0" class="selected-action-warp">
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
                </div> -->
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import '@/style/css/list.less'
import {DialogForm} from '@/components/dialog'
import {onMounted, reactive, ref} from 'vue';
import {DeleteRecord, Pagination} from '@/components/list';
import {message} from 'ant-design-vue'
import {useConfigStore} from "@/store/config";
import {RefundApplyFilterParams, RefundApplyFilterState} from '@/types/finance/refundApply';
import {batchSubmit, delRefundApply, getRefundApplyList} from "@/api/finance/refundApply";


const config:any = useConfigStore();
// 基本参数定义
const filterState = ref(<RefundApplyFilterState[]>[]);
const loading = ref<boolean>(true);
const total = ref<number>(0);
const selectedIds = ref<number[]>([]);
const advancedSearch = ref<boolean>(false);
const filterParams = reactive<RefundApplyFilterParams>({   //初使化用于查询的参数
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
        const result = await getRefundApplyList({...filterParams});
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
const onSelectChange = (e: RefundApplyFilterState[]) => {
    selectedIds.value = e.map((item) => item.refund_id);
};



</script>
