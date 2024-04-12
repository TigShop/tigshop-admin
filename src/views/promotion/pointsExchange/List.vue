<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="notice-warp">
                <p>
                    积分兑换列表前台地址为：{{ domain }}/exchange/list.html（支持手机版自动跳转）
                </p>
            </div>
            <div class="lyecs-table-list-warp">
                <div class="list-table-tool lyecs-search-warp">
                    <el-form :model="filterParams">
                        <div class="list-table-tool-row">
                            <div class="list-table-tool-col">
                                <el-space>
                                    <DialogForm isDrawer @okCallback="loadFilter" title="添加积分商品" width="600px"
                                        path="promotion/pointsExchange/Info" :params="{ act: 'add' }">
                                        <el-button type="primary">添加积分商品</el-button>
                                    </DialogForm>
                                    <el-input name="keyword" v-model="filterParams.keyword" placeholder="输入积分兑换商品名称">
                                        <template #append>
                                            <el-button @click="onSearchSubmit"><span
                                                    class="iconfont icon-chakan1"></span></el-button>
                                        </template>
                                    </el-input>
                                    <a :class="'advanced-search-btn ml18 ' + (advancedSearch ? 'active' : '')" @click="advancedSearch = !advancedSearch">高级搜索<i
                                            class="iconfont icon-xia"></i></a>
                                </el-space>
                            </div>
                        </div>
                        <div class="advanced-search-warp list-table-tool-row" v-if="advancedSearch">
                            <div class="simple-form-warp">
                                <div class="simple-form-field">
                                    <div class="form-group">
                                        <label class="control-label"><span>是否可兑换：</span></label>
                                        <div class="control-container">
                                            <el-select v-model="filterParams.is_enabled" clearable>
                                                <el-option :value="0" label="不可兑换" />
                                                <el-option :value="1" label="可兑换" />
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                                <div class="simple-form-field">
                                    <div class="form-group">
                                        <label class="control-label"><span>是否热销：</span></label>
                                        <div class="control-container">
                                            <el-select v-model="filterParams.is_hot" clearable>
                                                <el-option :value="0" label="不热销" />
                                                <el-option :value="1" label="热销" />
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                                <div class="simple-form-field">
                                    <el-button type="primary" @click="onSearchSubmit">搜索</el-button>
                                </div>
                            </div>
                        </div>
                    </el-form>
                </div>
                <div class="table-container">
                    <a-spin :spinning="loading">
                        <el-table :data="filterState" row-key="id" @selection-change="onSelectChange" :total="total"
                            @sort-change="onSortChange" :loading="loading">
                            <el-table-column type="selection" width="32" />
                            <el-table-column label="积分商品名称" prop="product_name" sortable="custom" :width="350"></el-table-column>
                            <el-table-column label="使用积分值" prop="exchange_integral" sortable="custom">
                                <template #default="{ row }">
                                    {{row.exchange_integral}}
                                </template>
                            </el-table-column>
                            <el-table-column label="减免金额" prop="points_deducted_amount" sortable="custom">
                                <template #default="{ row }">
                                    {{row.points_deducted_amount}}
                                </template>
                            </el-table-column>
                            <el-table-column label="是否可兑换" sortable="custom">
                                <template #default="{ row }">
                                    <Switch v-model:checked="row.is_enabled" :requestApi="updatePointsExchangeFiled" :params="{ id: row.id, field: 'is_enabled' }" />
                                </template>
                            </el-table-column>
                            <el-table-column label="是否热销" sortable="custom">
                                <template #default="{ row }">
                                    <Switch v-model:checked="row.is_hot" :requestApi="updatePointsExchangeFiled" :params="{ id: row.id, field: 'is_hot' }" />
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" fixed="right" :width="150">
                                <template #default="{ row }">
                                    <DialogForm isDrawer @okCallback="loadFilter" title="编辑积分商品" width="600px"
                                        path="promotion/pointsExchange/Info" :params="{ act: 'edit', id: row.id }">
                                        <a class="btn-link">编辑</a>
                                    </DialogForm>
                                    <el-divider direction="vertical" />
                                    <a>查看</a>
                                    <el-divider direction="vertical" />
                                    <DeleteRecord @afterDelete="loadFilter" :requestApi="delPointsExchange"
                                        :params="{ id: row.id }">删除</DeleteRecord>
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
                        <Pagination v-model:page="filterParams.page" v-model:size="filterParams.size" :total="total"
                            @callback="loadFilter" />
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
import { ref, reactive, onMounted } from 'vue';
import { DeleteRecord, Switch, Pagination } from '@/components/list';
import { message } from 'ant-design-vue'
import { PointsExchangeFilterState, PointsExchangeFilterParams } from '@/types/promotion/pointsExchange.d';
import { getPointsExchangeList, batchSubmit, updatePointsExchangeFiled, delPointsExchange } from "@/api/promotion/pointsExchange";
import { useConfigStore } from "@/store/config"
const config:any = useConfigStore();
// 基本参数定义
const domain = ref(useConfigStore().domain)
const filterState = ref<PointsExchangeFilterState[]>();
const loading = ref<boolean>(true);
const total = ref<number>(0);
const selectedIds = ref<number[]>([]);
const advancedSearch = ref<boolean>(false);
const filterParams = reactive<PointsExchangeFilterParams>({
    page: 1,
    size: config.get('page_size'),
    sort_field: '',
    sort_order: '',
    keyword: ''
});
// 获取列表的查询结果
const loadFilter = async () => {
    loading.value = true;
    try {
        const result = await getPointsExchangeList({ ...filterParams });
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
const onSelectChange = (e: PointsExchangeFilterState[]) => {
    selectedIds.value = e.map((item) => item.id);
};
</script>