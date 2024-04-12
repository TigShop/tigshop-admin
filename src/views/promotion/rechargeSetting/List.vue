<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-table-list-warp">
                <div class="list-table-tool lyecs-search-warp">
                    <el-form :model="filterParams">
                        <div class="list-table-tool-row">
                            <div class="list-table-tool-col">
                                <el-space>
                                    <DialogForm isDrawer @okCallback="loadFilter" title="添加充值余额" width="600px" path="promotion/rechargeSetting/Info" :params="{ act: 'add' }">
                                        <el-button type="primary">添加充值余额</el-button>
                                    </DialogForm>
                                </el-space>
                            </div>
                            <div class="list-table-tool-col">
                            </div>
                        </div>
                    </el-form>
                </div>
                <div class="table-container">
                    <a-spin :spinning="loading">
                        <el-table :data="filterState" row-key="recharge_id" @selection-change="onSelectChange" :total="total" @sort-change="onSortChange" :loading="loading">
                            <el-table-column type="selection" width="32" />
                            <el-table-column label="充值金额" prop="money">
                                <template #default="{ row }">
                                    <div style="position: relative;">
                                        <PopForm label="充值金额" type="textarea" :requestApi="updateRechargeSettingFiled" v-model:org-value="row.money"
                                            :params="{ id: row.recharge_id, field: 'money' }" :max="50">
                                            <div>{{ row.money }}</div>
                                        </PopForm>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="赠送金额" prop="discount_money">
                                <template #default="{ row }">
                                    <div style="position: relative;">
                                        <PopForm label="赠送金额" type="textarea" :requestApi="updateRechargeSettingFiled" v-model:org-value="row.discount_money"
                                            :params="{ id: row.recharge_id, field: 'discount_money' }" :max="50">
                                            <div>{{ row.discount_money }}</div>
                                        </PopForm>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="是否显示" prop="is_show" sortable="custom">
                                <template #default="{ row }">
                                    <Switch v-model:checked="row.is_show" :requestApi="updateRechargeSettingFiled" :params="{ id: row.recharge_id, field: 'is_show' }" />
                                </template>
                            </el-table-column>
                            <el-table-column label="排序" prop="sort_order" sortable="custom">
                                <template #default="{ row }">
                                    <PopForm label="排序" type="input" :requestApi="updateRechargeSettingFiled" v-model:org-value="row.sort_order"
                                        :params="{ id: row.recharge_id, field: 'sort_order' }" extra="默认值为50，数值越小，排序越靠前">
                                        <div>{{ row.sort_order }}</div>
                                    </PopForm>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" fixed="right" :width="150">
                                <template #default="{ row }">
                                    <DialogForm isDrawer @okCallback="loadFilter" title="编辑示例模板" width="600px" path="promotion/rechargeSetting/Info"
                                        :params="{ act: 'edit', id: row.recharge_id }">
                                        <a class="btn-link">编辑</a>
                                    </DialogForm>
                                    <el-divider direction="vertical" />
                                    <DeleteRecord @afterDelete="loadFilter" :requestApi="delRechargeSetting" :params="{ id: row.recharge_id }">删除</DeleteRecord>
                                </template>
                            </el-table-column>
                            <template #empty>
                                <div class="empty-warp">
                                    <div v-if="!loading" class="empty-bg">暂无数据</div>
                                </div>
                            </template>
                        </el-table>
                    </a-spin>
                    <div class="pagination-con" v-if="total > 0">
                        <Pagination v-model:page="filterParams.page" v-model:size="filterParams.size" :total="total" @callback="loadFilter" />
                    </div>
                </div>
                <div class="selected-action-warp" v-if="selectedIds.length > 0">
                    <div class="selected-action">
                        <el-space>
                            <span>已选择：<b>{{ selectedIds.length }}</b> 项</span>
                            <el-popconfirm title="您确认要批量删除所选数据吗？" @confirm="onBatchSubmit('del')">
                                <template #reference><el-button>批量删除</el-button></template>
                            </el-popconfirm>
                        </el-space>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import '@/style/css/list.less'
import { DialogForm } from '@/components/dialog'
import { PopForm } from '@/components/pop-form'
import { ref, reactive, onMounted } from 'vue';
import { DeleteRecord, Switch, Pagination } from '@/components/list';
import { message } from 'ant-design-vue'
import { useConfigStore } from "@/store/config";
import { RechargeSettingFilterState, RechargeSettingFilterParams } from '@/types/promotion/rechargeSetting.d';
import { getRechargeSettingList, batchSubmit, updateRechargeSettingFiled, delRechargeSetting } from "@/api/promotion/rechargeSetting";
const config:any = useConfigStore();
// 基本参数定义
const filterState = ref<RechargeSettingFilterState[]>();
const loading = ref<boolean>(true);
const total = ref<number>(0);
const selectedIds = ref<number[]>([]);
const filterParams = reactive<RechargeSettingFilterParams>({
    page: 1,
    size: config.get('page_size'),
    sort_field: '',
    sort_order: '',
});
// 获取列表的查询结果
const loadFilter = async () => {
    loading.value = true;
    try {
        const result = await getRechargeSettingList({ ...filterParams });
        filterState.value = result.filter_result;
        total.value = result.total;
    } catch (error: any) {
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
const onSortChange = ({ prop, order }: { prop: string; order?: string }) => {
    filterParams.sort_field = prop;
    filterParams.sort_order = order == 'ascending' ? 'asc' : order == 'descending' ? 'desc' : '';
    loadFilter();
};

// 批量操作
const onBatchSubmit = async (action: string) => {
    try {
        const result = await batchSubmit(action, { ids: selectedIds.value });
        message.success(result.message);
        loadFilter();
    } catch (error: any) {
        message.error(error.message);
    }
};
// 多选操作
const onSelectChange = (e: RechargeSettingFilterState[]) => {
    selectedIds.value = e.map((item) => item.recharge_id);
};
</script>