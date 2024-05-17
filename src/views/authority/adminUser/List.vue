<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-table-list-warp">
                <div class="list-table-tool lyecs-search-warp">
                    <el-form :model="filterParams">
                        <div class="list-table-tool-row">
                            <div class="list-table-tool-col">
                                <el-space>
                                    <DialogForm :params="{ act: 'add',type:action?action:'',suppliers_id:id?id:0 }" isDrawer path="authority/adminUser/Info"
                                                title="添加管理员" width="800px"
                                                @okCallback="loadFilter">
                                        <el-button type="primary">添加管理员</el-button>
                                    </DialogForm>
                                    <el-input v-model="filterParams.keyword" name="keyword" placeholder="输入管理员名称">
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
                        <el-table :data="filterState" :loading="loading" :total="total" row-key="admin_id"
                                  @selection-change="onSelectChange" @sort-change="onSortChange">
                            <el-table-column type="selection" width="32"/>
                            <el-table-column label="管理员名称" prop="username"></el-table-column>
                            <el-table-column label="权限组" prop="role_name">
                                <template #default="{ row }">
                                    <span :class="row.role_name ? 'green' : 'gray'">{{ row.role_name || '-' }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column :width="100" label="头像">
                                <template #default="{ row }">
                                    <template v-if="extractContent(String(row.avatar))">
                                        <Image :src="getAssetsFile(extractContent(String(row.avatar)))" fit="contain" style="height: 25px;width: 60px;"/>
                                    </template>
                                    <template v-else>
                                        <Image :src="row.avatar" fit="contain" style="height: 25px;width: 60px;"/>
                                    </template>

                                </template>
                            </el-table-column>
                            <el-table-column :width="200" label="邮箱" prop="email"></el-table-column>
                            <el-table-column :width="200" label="电话" prop="mobile"></el-table-column>
                            <el-table-column :width="150" fixed="right" label="操作">
                                <template #default="{ row }">
                                    <DialogForm :params="{ act: 'detail', id: row.admin_id }" isDrawer
                                                path="authority/adminUser/Info"
                                                title="编辑管理员" width="800px"
                                                @okCallback="loadFilter">
                                        <a class="btn-link">编辑</a>
                                    </DialogForm>
                                    <el-divider direction="vertical"/>
                                    <a class="btn-link" @click="toPage(row.admin_id)">日志</a>
                                    <el-divider direction="vertical"/>
                                    <DeleteRecord :params="{ id: row.admin_id }" :requestApi="delAdminUser"
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
import {onMounted, reactive, ref} from 'vue';
import {DeleteRecord, Pagination} from '@/components/list';
import {Image} from '@/components/image';
import {message} from 'ant-design-vue'
import {useConfigStore} from "@/store/config";
import type {AdminUserFilterParams, AdminUserFilterState} from '@/types/authority/adminUser';
import {batchSubmit, delAdminUser, getAdminUserList} from "@/api/authority/adminUser";

import {useRouter} from 'vue-router'
import {extractContent, getAssetsFile} from "@/utils/util";

const router = useRouter()
const config:any = useConfigStore();
// 基本参数定义
const filterState = ref(<AdminUserFilterState[]>[]);
const loading = ref<boolean>(true);
const total = ref<number>(0);
const selectedIds = ref<number[]>([]);
const filterParams = reactive<AdminUserFilterParams>({   //初使化用于查询的参数
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
        const result = await getAdminUserList({...filterParams});
        filterState.value = result.filter_result;
        total.value = result.total;
    } catch (error: any) {
        message.error(error.message);
    } finally {
        loading.value = false;
    }
}
const toPage = (id: string | number) => {
    router.push('/authority/admin_log/list?user_id=' + id)
}
const props = defineProps({
    id: {
        type: Number,
        default: 0
    },
    act: {
        type: String,
        default: ''
    },
    isDialog: Boolean
});
const query = useRouter().currentRoute.value.query;
const action = ref<string>(props.isDialog ? props.act : String(query.act));
const id = ref<number>(props.isDialog ? props.id : Number(query.id));
onMounted(() => {
    if (action.value) {
        filterParams.suppliers_id = id.value
    }
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
const onSelectChange = (e: AdminUserFilterState[]) => {
    selectedIds.value = e.map((item) => item.admin_id);
};


</script>
