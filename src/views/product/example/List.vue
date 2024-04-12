<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-table-list-warp">
                <div class="list-table-tool lyecs-search-warp">
                    <el-form :model="filterParams">
                        <div class="list-table-tool-row">
                            <div class="list-table-tool-col">
                                <el-space>
                                    <DialogForm isDrawer @okCallback="loadFilter" title="添加示例模板" width="600px" path="product/example/Info" :params="{ act: 'add' }">
                                        <el-button type="primary">添加示例模板</el-button>
                                    </DialogForm>
                                    <el-input name="keyword" v-model="filterParams.keyword" placeholder="输入示例模板名称">
                                        <template #append>
                                            <el-button @click="onSearchSubmit"><span class="iconfont icon-chakan1"></span></el-button>
                                        </template>
                                    </el-input>
                                    <a :class="'advanced-search-btn ml18 ' + (advancedSearch ? 'active' : '')" @click="advancedSearch = !advancedSearch">高级搜索<i
                                            class="iconfont icon-xia"></i></a>
                                </el-space>
                            </div>
                            <div class="list-table-tool-col">
                            </div>
                        </div>
                        <div class="advanced-search-warp list-table-tool-row" v-if="advancedSearch">
                            <div class="simple-form-warp">
                                <div class="simple-form-field">
                                    <div class="form-group">
                                        <label class="control-label"><span>是否显示：</span></label>
                                        <div class="control-container">
                                            <el-select v-model="filterParams.is_show">
                                                <el-option :value="-1" label="请选择..." />
                                                <el-option :value="0" label="不显示" />
                                                <el-option :value="1" label="显示" />
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
                        <el-table :data="filterState" row-key="example_id" @selection-change="onSelectChange" :total="total" @sort-change="onSortChange" :loading="loading">
                            <el-table-column type="selection" width="32" />
                            <el-table-column label="示例模板名称" prop="example_id" sortable="custom" :width="200">
                                <template #default="{ row }">
                                    <div style="position: relative;">
                                        <PopForm label="示例模板名称" type="textarea" :requestApi="updateExampleFiled" v-model:org-value="row.example_name"
                                            :params="{ id: row.example_id, field: 'example_name' }" :max="50">
                                            <div>{{ row.example_name }}</div>
                                        </PopForm>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="示例模板缩略图">
                                <template #default="{ row }">
                                    <Image style="height: 25px;width: 60px;" :src="row.example_logo" fit="contain" />
                                </template>
                            </el-table-column>
                            <el-table-column label="是否显示" prop="is_show" sortable="custom">
                                <template #default="{ row }">
                                    <Switch v-model:checked="row.is_show" :requestApi="updateExampleFiled" :params="{ id: row.example_id, field: 'is_show' }" />
                                </template>
                            </el-table-column>
                            <el-table-column label="排序" prop="sort_order" sortable="custom">
                                <template #default="{ row }">
                                    <PopForm label="排序" type="input" :requestApi="updateExampleFiled" v-model:org-value="row.sort_order"
                                        :params="{ id: row.example_id, field: 'sort_order' }" extra="默认值为50，数值越小，排序越靠前">
                                        <div>{{ row.sort_order }}</div>
                                    </PopForm>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" fixed="right" :width="150">
                                <template #default="{ row }">
                                    <DialogForm isDrawer @okCallback="loadFilter" title="编辑示例模板" width="600px" path="product/example/Info"
                                        :params="{ act: 'edit', id: row.example_id }">
                                        <a class="btn-link">编辑</a>
                                    </DialogForm>
                                    <el-divider direction="vertical" />
                                    <DeleteRecord @afterDelete="loadFilter" :requestApi="delExample" :params="{ id: row.example_id }">删除</DeleteRecord>
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
import { Image } from '@/components/image';
import { message } from 'ant-design-vue'
import { useConfigStore } from "@/store/config";
import { ExampleFilterState, ExampleFilterParams } from '@/types/product/example.d';
import { getExampleList, batchSubmit, updateExampleFiled, delExample } from "@/api/product/example";
const config = useConfigStore();
// 基本参数定义
const filterState = ref<ExampleFilterState[]>();
const loading = ref<boolean>(true);
const total = ref<number>(0);
const selectedIds = ref<number[]>([]);
const advancedSearch = ref<boolean>(false);
const filterParams = reactive<ExampleFilterParams>({
    page: 1,
    size: config.get('page_size'),
    sort_field: '',
    sort_order: '',
    keyword: '',
    is_show: -1
});
// 获取列表的查询结果
const loadFilter = async () => {
    loading.value = true;
    try {
        const result = await getExampleList({ ...filterParams });
        filterState.value = result.filter_result;
        total.value = result.total;
    } catch (error) {
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
    } catch (error) {
        message.error(error.message);
    }
};
// 多选操作
const onSelectChange = (e) => {
    selectedIds.value = e.map((item) => item.example_id);
};
</script>