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
                            <el-table-column label="页面名称" prop="decorate_id" sortable="custom" :width="300">
                                <template #default="{ row }">
                                    <div style="position: relative">
                                        <el-space>
                                            <PopForm
                                                label="页面名称"
                                                type="textarea"
                                                :requestApi="updateDecorateFiled"
                                                v-model:org-value="row.decorate_title"
                                                :params="{ id: row.decorate_id, field: 'decorate_title' }"
                                                :max="50">
                                                <div>{{ row.decorate_title }}</div>
                                            </PopForm>
                                        </el-space>
                                    </div>
                                    <el-tag v-if="row.is_home === 1" type="success" :hit="false" effect="light" size="small" disable-transitions>首页</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column label="发布状态" prop="sort_order" sortable="custom" :width="150">
                                <template #default="{ row }">
                                    {{ row.status == 1 ? "已发布" : "未发布" }}
                                </template>
                            </el-table-column>
                            <el-table-column label="更新时间" prop="sort_order" sortable="custom">
                                <template #default="{ row }">
                                    {{ row.update_time }}
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" fixed="right" :width="220">
                                <template #default="{ row }">
                                    <router-link
                                        v-if="props.decorateType === 1"
                                        :to="{ path: '/decorate/index', query: { id: row.decorate_id } }"
                                        target="_blank"
                                        class="btn-link"
                                        >编辑</router-link
                                    >
                                    <router-link
                                        v-if="props.decorateType === 2"
                                        :to="{ path: '/decorate/pc', query: { id: row.decorate_id } }"
                                        target="_blank"
                                        class="btn-link"
                                        >编辑</router-link
                                    >
                                    <el-divider direction="vertical" />
                                    <template v-if="row.is_home == 0 && row.status == 1">
                                        <a class="btn-link" @click="setHome(row)">设为首页</a>
                                        <el-divider direction="vertical" />
                                    </template>
                                    <a class="btn-link" @click="onCopy(row)">复制</a>
                                    <template v-if="row.is_home == 0">
                                        <el-divider direction="vertical" />
                                        <DeleteRecord @afterDelete="loadFilter" :requestApi="delDecorate" :params="{ id: row.decorate_id }">删除</DeleteRecord>
                                    </template>
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
import { FilterState, FilterParams } from "@/types/decorate/decorateHome.d";
import { getDecorateList, batchSubmit, updateDecorateFiled, delDecorate, updateDecorate } from "@/api/decorate/decorateHome";
import { Tag } from "@/components/form";
const props = defineProps({
    decorateType: {
        type: Number,
        default: 1,
    },
});
const config: any = useConfigStore();
// 基本参数定义
const filterState = ref<FilterState[]>();
const loading = ref<boolean>(true);
const total = ref<number>(0);
const selectedIds = ref<number[]>([]);
const advancedSearch = ref<boolean>(false);
const filterParams = reactive<FilterParams>({
    page: 1,
    decorate_type: props.decorateType,
    size: config.get("page_size"),
    sort_field: "",
    sort_order: "",
    keyword: "",
});
// 获取列表的查询结果
const loadFilter = async () => {
    loading.value = true;
    try {
        const result = await getDecorateList({ ...filterParams });
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
    } finally {
    }
};
// 多选操作
const onSelectChange = (e: FilterState[]) => {
    selectedIds.value = e.map((item) => item.decorate_id);
};
// 设置为首页
const setHome = async (row: FilterState) => {
    try {
        const result = await updateDecorate("set_home", { id: row.decorate_id });
        message.success(result.message);
        loadFilter();
    } catch (error: any) {
        message.error(error.message);
    } finally {
    }
};
// 复制
const onCopy = async (row: FilterState) => {
    try {
        const result = await updateDecorate("copy", { id: row.decorate_id });
        message.success(result.message);
        loadFilter();
    } catch (error: any) {
        message.error(error.message);
    } finally {
    }
};
</script>
