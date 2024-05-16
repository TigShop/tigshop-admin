<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-table-list-warp">
                <div class="list-table-tool lyecs-search-warp">
                    <el-form :model="filterParams">
                        <div class="list-table-tool-row">
                            <div class="list-table-tool-col">
                                <el-space>
                                    <DialogForm :params="{ act: 'add' }" isDrawer path="product/productAttributesTpl/Info" title="添加属性模板" width="600px" @okCallback="loadFilter">
                                        <el-button type="primary">添加属性模板</el-button>
                                    </DialogForm>
                                    <el-input v-model="filterParams.keyword" name="keyword" placeholder="输入属性模板名称">
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
                        <el-table :data="filterState" :loading="loading" :total="total" row-key="tpl_id" @selection-change="onSelectChange" @sort-change="onSortChange">
                            <el-table-column type="selection" width="32"/>
                            <el-table-column label="属性模板名称" sortable="custom" width="200">
                                <template #default="{ row }">
                                    <div style="position: relative;">
                                        <PopForm v-model:org-value="row.tpl_name" :max="50" :params="{ id: row.tpl_id, field: 'tpl_name' }" :requestApi="updateProductAttributesTplFiled"
                                                 label="属性模板名称" type="textarea">
                                            <div>{{ row.tpl_name }}</div>
                                        </PopForm>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="属性名称列表">
                                <template #default="{ row }">
                                    <div class="tpl-data-con">
                                        <template v-for="item in row.tpl_data">
                                            <span v-for="attr in item">{{ attr['attr_name'] }}<em>，</em></span>
                                        </template>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column :width="150" fixed="right" label="操作">
                                <template #default="{ row }">
                                    <DialogForm :params="{ act: 'detail', id: row.tpl_id }" isDrawer path="product/productAttributesTpl/Info" title="编辑属性模板" width="600px"
                                                @okCallback="loadFilter">
                                        <a class="btn-link">编辑</a>
                                    </DialogForm>

                                    <el-divider direction="vertical"/>
                                    <DeleteRecord :params="{ id: row.tpl_id }" :requestApi="delProductAttributesTpl" @afterDelete="loadFilter">删除</DeleteRecord>
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
                        <Pagination v-model:page="filterParams.page" v-model:size="filterParams.size" :total="total" @callback="loadFilter"/>
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
</template>

<script lang="ts" setup>
import '@/style/css/list.less'
import {DialogForm} from '@/components/dialog'
import {PopForm} from '@/components/pop-form'
import {onMounted, reactive, ref} from 'vue';
import {DeleteRecord, Pagination} from '@/components/list';
import {message} from 'ant-design-vue'
import {useConfigStore} from "@/store/config";
import {ProductAttributesTplFilterParams, ProductAttributesTplFilterState} from "@/types/product/productAttributesTpl";
import {batchSubmit, delProductAttributesTpl, getProductAttributesTplList, updateProductAttributesTplFiled} from "@/api/product/productAttributesTpl";

const config:any = useConfigStore();
// 基本参数定义
const filterState = ref<ProductAttributesTplFilterState[]>();
const loading = ref<boolean>(true);
const total = ref<number>(0);
const selectedIds = ref<number[]>([]);
const filterParams = reactive<ProductAttributesTplFilterParams>({
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
        const result = await getProductAttributesTplList({...filterParams});
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
const onSelectChange = (e:Object[]) => {
    selectedIds.value = e.map((item:any) => item.tpl_id);
};
</script>
<style lang="less" scoped>
.tpl-data-con span:last-child em {
    display: none;
}
</style>
