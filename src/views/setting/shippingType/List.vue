<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-table-list-warp">
                <div class="list-table-tool lyecs-search-warp">
                    <el-form :model="filterParams">
                        <div class="list-table-tool-row">
                            <div class="list-table-tool-col">
                                <el-space>
                                    <DialogForm :params="{ act: 'add' }" isDrawer path="setting/shippingType/Info"
                                                title="添加配送类型" width="600px"
                                                @okCallback="loadFilter">
                                        <el-button type="primary">添加配送方式</el-button>
                                    </DialogForm>
                                    <el-input v-model="filterParams.keyword" class="width240" name="keyword" placeholder="输入配送类型">
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
                        <el-table :data="filterState" :loading="loading" :total="total" row-key="shipping_type_id"
                                  @selection-change="onSelectChange" @sort-change="onSortChange">
                            <el-table-column type="selection" width="32"/>
                            <el-table-column label="分类名称">
                                <template #default="{ row }">
                                    <PopForm v-model:org-value="row.shipping_type_name"
                                             :max="10"
                                             :params="{ id: row.shipping_type_id, field: 'shipping_type_name' }"
                                             :requestApi="updateShippingTypeField"
                                             label="分类名称" type="input">
                                        <div>{{ row.shipping_type_name }}</div>
                                    </PopForm>
                                </template>
                            </el-table-column>
                            <el-table-column label="分类描述" prop="shipping_type_desc">
                                <template #default="{ row }">
                                    <PopForm v-model:org-value="row.shipping_type_desc"
                                             :max="10"
                                             :params="{ id: row.shipping_type_id, field: 'shipping_type_desc' }"
                                             :requestApi="updateShippingTypeField"
                                             label="分类描述" type="input">
                                        <div>{{ row.shipping_type_desc }}</div>
                                    </PopForm>
                                </template>
                            </el-table-column>
                            <el-table-column label="默认物流" prop="logistics_name"></el-table-column>
                            <el-table-column label="货到付款" prop="is_support_cod" sortable="custom">
                                <template #default="{ row }">
                                    <Switch v-model:checked="row.is_support_cod"
                                            :params="{ id: row.shipping_type_id, field: 'is_support_cod' }"
                                            :requestApi="updateShippingTypeField"/>
                                </template>
                            </el-table-column>
                            <el-table-column label="排序" prop="sort_order" sortable="custom">
                                <template #default="{ row }">
                                    <PopForm v-model:org-value="row.sort_order"
                                             :params="{ id: row.shipping_type_id, field: 'sort_order' }"
                                             :requestApi="updateShippingTypeField"
                                             extra="默认值为50，数值越小，排序越靠前"
                                             label="排序" type="input">
                                        <div>{{ row.sort_order }}</div>
                                    </PopForm>
                                </template>
                            </el-table-column>
                            <el-table-column :width="150" fixed="right" label="操作">
                                <template #default="{ row }">
                                    <DialogForm :params="{ act: 'detail', id: row.shipping_type_id }" isDrawer
                                                path="setting/shippingType/Info"
                                                title="编辑配送类型" width="600px"
                                                @okCallback="loadFilter">
                                        <a class="btn-link">编辑</a>
                                    </DialogForm>
                                    <el-divider direction="vertical"/>
                                    <DeleteRecord :params="{ id: row.shipping_type_id }"
                                                  :requestApi="delShippingType"
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
import type {ShippingTypeFilterParams, ShippingTypeFilterState} from '@/types/setting/shippingType';
import {batchSubmit, delShippingType, getShippingTypeList, updateShippingTypeField} from "@/api/setting/shippingType";

const config:any = useConfigStore();
// 基本参数定义
const filterState = ref(<ShippingTypeFilterState[]>[]);
const loading = ref<boolean>(true);
const total = ref<number>(0);
const selectedIds = ref<number[]>([]);
const filterParams = reactive<ShippingTypeFilterParams>({   //初始化用于查询的参数
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
        const result = await getShippingTypeList({...filterParams});
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
const onSelectChange = (e: ShippingTypeFilterState[]) => {
    selectedIds.value = e.map((item:any) => item.shipping_type_id);
};


</script>
