<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-table-list-warp">
                <div class="list-table-tool lyecs-search-warp">
                    <el-form :model="filterParams">
                        <div class="list-table-tool-row">
                            <div class="list-table-tool-col">
                                <el-space>
                                    <DialogForm :params="{ act: 'add' }" isDrawer path="authority/adminRole/Info"
                                                title="添加管理员权限组" width="800px"
                                                @okCallback="loadFilter">
                                        <el-button type="primary">添加管理员权限组</el-button>
                                    </DialogForm>
                                    <el-input v-model="filterParams.keyword" class="width240" name="keyword" placeholder="输入权限组名称">
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
                        <el-table :data="filterState" :loading="loading" :total="total" row-key="role_id"
                                  @selection-change="onSelectChange" @sort-change="onSortChange">
                            <el-table-column type="selection" width="32"/>
                            <el-table-column label="权限组名称" width="200">
                                <template #default="{ row }">
                                    <PopForm v-model:org-value="row.role_name"
                                             :max="10"
                                             :params="{ id: row.role_id, field: 'role_name' }"
                                             :requestApi="updateAdminRoleField"
                                             label="权限组名称" type="input">
                                        <div>{{ row.role_name }}</div>
                                    </PopForm>
                                </template>
                            </el-table-column>
                            <el-table-column label="描述" prop="role_desc"></el-table-column>
                            <el-table-column :width="120" fixed="right" label="操作">
                                <template #default="{ row }">
                                    <DialogForm v-if="row.role_id>1" :params="{ act: 'detail', id: row.role_id }" isDrawer
                                                path="authority/adminRole/Info"
                                                title="编辑管理员权限组" width="800px"
                                                @okCallback="loadFilter">
                                        <a class="btn-link">编辑</a>
                                    </DialogForm>
                                    <el-divider v-if="row.role_id>2" direction="vertical"/>
                                    <DeleteRecord v-if="row.role_id>2" :params="{ id: row.role_id }"
                                                  :requestApi="delAdminRole"
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
import {DeleteRecord, Pagination, Switch} from '@/components/list';
import {message} from 'ant-design-vue'
import {useConfigStore} from "@/store/config";
import type {AdminRoleFilterParams, AdminRoleFilterState} from '@/types/authority/adminRole';
import {batchSubmit, delAdminRole, getAdminRoleList, updateAdminRoleField} from "@/api/authority/adminRole";

const config:any = useConfigStore();
// 基本参数定义
const filterState = ref(<AdminRoleFilterState[]>[]);
const loading = ref<boolean>(true);
const total = ref<number>(0);
const selectedIds = ref<number[]>([]);
const filterParams = reactive<AdminRoleFilterParams>({   //初始化用于查询的参数
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
        const result = await getAdminRoleList({...filterParams});
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
    } catch (error: any) {
        message.error(error.message);
    }
};
// 多选操作
const onSelectChange = (e: AdminRoleFilterState[]) => {
    selectedIds.value = e.map((item) => item.role_id);
};


</script>
