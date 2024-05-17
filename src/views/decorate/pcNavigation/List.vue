<template>
    <div class="container">
        <div class="content_wrapper">
            <el-tabs v-model="activeKey" class="lyecs-tabs" tab-position="top" @tab-change="onTabChange">
                <el-tab-pane :name="1" label="主导航"></el-tab-pane>
                <el-tab-pane :name="2" label="顶部小导航"></el-tab-pane>
                <el-tab-pane :name="3" label="底部导航"></el-tab-pane>
                <el-tab-pane :name="4" label="侧边导航"></el-tab-pane>
            </el-tabs>
            <div v-if="activeKey != null" class="container">
                <div class="lyecs-table-list-warp">
                    <div class="list-table-tool lyecs-search-warp">
                        <el-form :model="filterParams">
                            <div class="list-table-tool-row">
                                <div class="list-table-tool-col">
                                    <el-space>
                                        <DialogForm :params="{ act: 'add', type: activeKey, type_name }" :title="'添加' + type_name" isDrawer path="decorate/pcNavigation/Info" width="600px"
                                            @okCallback="loadFilter">
                                            <el-button type="primary">{{ '添加' + type_name }}</el-button>
                                        </DialogForm>
                                        <el-input v-model="filterParams.keyword" name="keyword" placeholder="输入导航栏名称">
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
                            <el-table :data="filterState" :loading="loading" :total="total" row-key="id" @selection-change="onSelectChange" @sort-change="onSortChange">
                                <el-table-column type="selection" width="32" />
                                <el-table-column :width="200" label="名称" prop="title"></el-table-column>
                                <el-table-column :width="100" label="位置" prop="type_name"></el-table-column>
                                <el-table-column label="是否显示" prop="is_show">
                                    <template #default="{ row }">
                                        <Switch v-model:checked="row.is_show" :params="{ id: row.id, field: 'is_show' }" :requestApi="updatePcNavigationField" />
                                    </template>
                                </el-table-column>
                                <el-table-column label="是否新窗口">
                                    <template #default="{ row }">
                                        <Switch v-model:checked="row.is_blank" :params="{ id: row.id, field: 'is_blank' }" :requestApi="updatePcNavigationField" />
                                    </template>
                                </el-table-column>
                                <el-table-column label="排序" prop="sort_order" sortable="custom">
                                    <template #default="{ row }">
                                        <PopForm v-model:org-value="row.sort_order" :params="{ id: row.id, field: 'sort_order' }" :requestApi="updatePcNavigationField"
                                            extra="默认值为50，数值越小，排序越靠前" label="排序" type="input">
                                            <div>{{ row.sort_order }}</div>
                                        </PopForm>
                                    </template>
                                </el-table-column>
                                <el-table-column :width="150" fixed="right" label="操作">
                                    <template #default="{ row }">
                                        <DialogForm :params="{ act: 'detail', type: activeKey, id: row.id }" :title="'编辑商城' + type_name + '导航栏'" isDrawer path="decorate/pcNavigation/Info" width="600px"
                                            @okCallback="loadFilter">
                                            <a class="btn-link">编辑</a>
                                        </DialogForm>
                                        <el-divider direction="vertical" />
                                        <DeleteRecord :params="{ id: row.id }" :requestApi="delPcNavigation" @afterDelete="loadFilter">删除
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
                            <Pagination v-model:page="filterParams.page" v-model:size="filterParams.size" :total="total" @callback="loadFilter" />
                        </div>
                    </div>
                    <div v-if="selectedIds.length > 0" class="selected-action-warp">
                        <div class="selected-action">
                            <el-space>
                                <span>已选择：<b>{{ selectedIds.length }}</b> 项</span>
                                <el-popconfirm title="您确认要批量删除所选数据吗？" @confirm="onBatchSubmit('del')">
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
    </div>
</template>

<script lang="ts" setup>
import '@/style/css/list.less'
import { DialogForm } from '@/components/dialog'
import { PopForm } from '@/components/pop-form'
import { computed, onMounted, reactive, ref } from 'vue';
import { DeleteRecord, Pagination, Switch } from '@/components/list';
import { message } from 'ant-design-vue'
import { useConfigStore } from "@/store/config";
import { PcNavigationFilterParams, PcNavigationFilterState } from '@/types/decorate/pcNavigation.d';
import { batchSubmit, delPcNavigation, getPcNavigationList, updatePcNavigationField } from "@/api/decorate/pcNavigation";

const config:any = useConfigStore();
// 基本参数定义
const filterState = ref(<PcNavigationFilterState[]>[]);
const loading = ref<boolean>(true);
const total = ref<number>(0);
const selectedIds = ref<number[]>([]);
const filterParams = reactive<PcNavigationFilterParams>({   //初使化用于查询的参数
    page: 1,
    size: config.get('page_size'),
    sort_field: '',
    sort_order: '',
    keyword: '',
    type: 1,
});
const activeKey = ref<number>(1)
const type_name = computed(() => {
    return activeKey.value === 1 ? '主导航' : (activeKey.value === 2 ? '顶部小导航' : (activeKey.value === 3 ? '底部导航' : '侧边导航'))
})
const onTabChange = (val: number) => {
    filterParams.type = val
    loadFilter()
}

// 获取列表的查询结果
const loadFilter = async () => {
    loading.value = true;
    try {
        const result = await getPcNavigationList({ ...filterParams });
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
const onSelectChange = (e: PcNavigationFilterState[]) => {
    selectedIds.value = e.map((item) => item.id);
};
</script>
