<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-table-list-warp">
                <div class="list-table-tool lyecs-search-warp">
                    <div class="notice-warp">
                        <p>- 添加供应商后，您可以在商品编辑中，设置商品所属供应商</p>
                        <p>- 供应商可通过其管理员账号，登录管理员后台，权限默认为处理订单和退货</p>
                        <p>- 供应商只能看到有自己所属商品的订单，且只能对其所属商品进行发货操作</p>
                    </div>
                    <el-form :model="filterParams">
                        <div class="list-table-tool-row">
                            <div class="list-table-tool-col">
                                <el-space>
                                    <DialogForm :params="{ act: 'add' }" isDrawer path="authority/suppliers/Info"
                                                title="添加供应商" width="600px"
                                                @okCallback="loadFilter">
                                        <el-button type="primary">添加供应商</el-button>
                                    </DialogForm>
                                    <el-input v-model="filterParams.keyword" class="width240" name="keyword" placeholder="输入关键词">
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
                        <el-table :data="filterState" :loading="loading" :total="total" row-key="suppliers_id"
                                  @selection-change="onSelectChange" @sort-change="onSortChange">
                            <el-table-column type="selection" width="32"/>
                            <el-table-column label="供应商名称" width="200">
                                <template #default="{ row }">
                                    <PopForm v-model:org-value="row.suppliers_name"
                                             :max="10"
                                             :params="{ id: row.suppliers_id, field: 'suppliers_name' }"
                                             :requestApi="updateSuppliersField"
                                             label="权限组名称" type="input">
                                        <div>{{ row.suppliers_name }}</div>
                                    </PopForm>
                                </template>
                            </el-table-column>
                            <el-table-column label="负责人姓名" prop="contact_name"></el-table-column>
                            <el-table-column label="负责人联系方式" prop="contact_phone"></el-table-column>
                            <el-table-column label="供应商状态">
                                <template #default="{ row }">
                                    <Switch v-model:checked="row.is_check" :params="{ id: row.suppliers_id, field: 'is_check' }" :requestApi="updateSuppliersField"/>
                                </template>
                            </el-table-column>
                            <el-table-column :width="180" fixed="right" label="操作">
                                <template #default="{ row }">
                                    <DialogForm :params="{ act: 'detail', id: row.suppliers_id }" isDrawer
                                                path="authority/suppliers/Info"
                                                title="编辑供应商" width="600px"
                                                @okCallback="loadFilter">
                                        <a class="btn-link">编辑</a>
                                    </DialogForm>
                                    <el-divider direction="vertical"/>
                                    <DialogForm :params="{ act: 'suppliers', id: row.suppliers_id }" :showOnOk="false"
                                                isDrawer
                                                path="authority/adminUser/List" :title="row.suppliers_name+' - 账号管理'" width="1000px">
                                        <a class="btn-link">账号管理</a>
                                    </DialogForm>
                                    <el-divider direction="vertical"/>
                                    <DeleteRecord :params="{ id: row.suppliers_id }"
                                                  :requestApi="delSuppliers"
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
import type {SuppliersFilterParams, SuppliersFilterState} from '@/types/authority/suppliers';
import {batchSubmit, delSuppliers, getSuppliersList, updateSuppliersField} from "@/api/authority/suppliers";

const config:any = useConfigStore();
// 基本参数定义
const filterState = ref(<SuppliersFilterState[]>[]);
const loading = ref<boolean>(true);
const total = ref<number>(0);
const selectedIds = ref<number[]>([]);
const filterParams = reactive<SuppliersFilterParams>({
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
        const result = await getSuppliersList({...filterParams});
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
const onSelectChange = (e: SuppliersFilterState[]) => {
    selectedIds.value = e.map((item) => item.suppliers_id);
};


</script>
