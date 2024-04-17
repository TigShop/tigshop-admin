<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-table-list-warp">
                <div class="list-table-tool lyecs-search-warp">
                    <el-form :model="filterParams">
                        <div class="list-table-tool-row">
                            <div class="list-table-tool-col">
                                <el-space>
                                    <DialogForm
                                        isDrawer
                                        @okCallback="loadFilter"
                                        title="添加页面"
                                        width="600px"
                                        path="decorate/decorateHome/Info"
                                        :params="{ act: 'add' }">
                                        <el-button type="primary">添加页面</el-button>
                                    </DialogForm>
                                    <el-input name="keyword" v-model="filterParams.keyword" placeholder="输入页面名称">
                                        <template #append>
                                            <el-button @click="onSearchSubmit"><span class="iconfont icon-chakan1"></span></el-button>
                                        </template>
                                    </el-input>
                                </el-space>
                            </div>
                            <div class="list-table-tool-col"></div>
                        </div>
                    </el-form>
                </div>
                <div class="table-container">
                    <a-spin :spinning="loading">
                        <el-table
                            :data="filterState"
                            row-key="decorate_id"
                            @selection-change="onSelectChange"
                            :total="total"
                            @sort-change="onSortChange"
                            :loading="loading">
                            <el-table-column type="selection" width="32" />
                            <el-table-column label="页面名称" prop="decorate_id" sortable="custom">
                                <template #default="{ row }">
                                    <div style="position: relative">
                                        <el-space>
                                            <el-tag v-if="row.status == 1" type="success" :hit="false" effect="light" size="small" disable-transitions
                                                >发布</el-tag
                                            >
                                            <PopForm
                                                label="页面名称"
                                                type="textarea"
                                                :requestApi="updatePcDecorateFiled"
                                                v-model:org-value="row.decorate_title"
                                                :params="{ id: row.decorate_id, field: 'decorate_title' }"
                                                :max="50">
                                                <div>{{ row.decorate_title }}</div>
                                            </PopForm>
                                        </el-space>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="添加时间" prop="sort_order" sortable="custom" :width="300">
                                <template #default="{ row }">
                                    {{ row.add_time }}
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" fixed="right" :width="150">
                                <template #default="{ row }">
                                    <router-link :to="{ path: '/decorate/pc', query: { id: row.decorate_id } }" target="_blank" class="btn-link"
                                        >编辑</router-link
                                    >
                                    <el-divider direction="vertical" />
                                    <a class="btn-link">复制</a>
                                    <el-divider direction="vertical" />
                                    <DeleteRecord @afterDelete="loadFilter" :requestApi="delPcDecorate" :params="{ id: row.decorate_id }">删除</DeleteRecord>
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
                            <span
                                >已选择：<b>{{ selectedIds.length }}</b> 项</span
                            >
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
import "@/style/css/list.less";
import request from "@/utils/request";
import { DialogForm } from "@/components/dialog";
import { PopForm } from "@/components/pop-form";
import { ref, reactive, onMounted } from "vue";
import { DeleteRecord, Switch, Pagination } from "@/components/list";
import { Image } from "@/components/image";
import { message } from "ant-design-vue";
import { useConfigStore } from "@/store/config";
import { FilterState, FilterParams } from "@/types/decorate/pcDecorate.d";
import { getPcDecorateList, batchSubmit, updatePcDecorateFiled, delPcDecorate } from "@/api/decorate/pcDecorate";
const config: any = useConfigStore();
// 基本参数定义
const filterState = ref<FilterState[]>();
const loading = ref<boolean>(true);
const total = ref<number>(0);
const selectedIds = ref<number[]>([]);
const advancedSearch = ref<boolean>(false);
const filterParams = reactive<FilterParams>({
    page: 1,
    size: config.get("page_size"),
    sort_field: "",
    sort_order: "",
    keyword: "",
    decorate_type: 3,
});
// 获取列表的查询结果
const loadFilter = async () => {
    loading.value = true;
    try {
        const result = await getPcDecorateList({ ...filterParams });
        filterState.value = result.filter_result;
        total.value = result.total;
    } catch (error: any) {
        message.error(error.message);
    } finally {
        loading.value = false;
    }
};
onMounted(() => {
    loadFilter();
});

// 参数查询
const onSearchSubmit = () => {
    loadFilter();
};
// 修改排序
const onSortChange = ({ prop, order }: { prop: string; order?: string }) => {
    filterParams.sort_field = prop;
    filterParams.sort_order = order == "ascending" ? "asc" : order == "descending" ? "desc" : "";
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
const onSelectChange = (e: FilterState[]) => {
    selectedIds.value = e.map((item) => item.decorate_id);
};
</script>
