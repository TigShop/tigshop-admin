<template>
    <div class="container" style="position: relative; height: 100%">
        <div class="content_wrapper">
            <div class="" style="position: absolute; top: 0; bottom: 0; overflow-y: auto; width: 100%">
                <div class="list-table-tool lyecs-search-warp" style="position: absolute; top: 0">
                    <el-form :model="filterParams" name="form" @finish="searchSubmit">
                        <div class="list-table-tool-row" style="margin-bottom: 5px">
                            <div class="list-table-tool-col">
                                <el-space>
                                    <el-input v-model="filterParams.keyword" placeholder="请输入搜索关键字" />
                                    <el-button @click="searchSubmit">搜索</el-button>
                                </el-space>
                            </div>
                            <div class="list-table-tool-col"></div>
                        </div>
                    </el-form>
                </div>
                <perfect-scrollbar class="table-container" style="position: absolute; top: 50px; bottom: 50px; overflow-y: auto; width: 100%">
                    <a-spin :spinning="loading">
                        <div style="padding-right: 15px; box-sizing: border-box">
                            <el-table
                                :class="isMultiple ? '' : 'hide-checkbox'"
                                ref="tableRef"
                                class="result-table"
                                :data="filterState"
                                row-key="store_id"
                                @select="selectRow"
                                @selection-change="onSelectChange"
                                :total="total"
                                :loading="loading"
                            >
                                <el-table-column :selectable="isSelectable" type="selection" width="32" />
                                <el-table-column label="店铺名称" prop="store_title"></el-table-column>
                                <template #empty>
                                    <div class="empty-warp">
                                        <div v-if="!loading" class="empty-bg">暂无数据</div>
                                    </div>
                                </template>
                            </el-table>
                        </div>
                    </a-spin>
                </perfect-scrollbar>
                <div class="pagination-con" v-if="total > 0" style="position: absolute; bottom: 0; justify-content: right; display: flex; width: 100%; margin: 0">
                    <Pagination v-model:page="filterParams.page" v-model:size="filterParams.size" :total="total" @callback="loadFilter" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import "@/style/css/list.less";
import request from "@/utils/request";
import { SelectCategory, SelectStore } from "@/components/select";
import { onMounted, reactive, ref } from "vue";
import { Modal, message, type TableColumnsType } from "ant-design-vue";
import { imageFormat } from "@/utils/format";
import { Pagination } from "@/components/list";
import { StoreFilterParams, StoreFilterState } from "@/types/store/store.d";
import { useConfigStore } from "@/store/config";
import { getStoreList } from "@/api/store/store";
const props = defineProps({
    // 已选择的项，用于排除重复，禁止选择
    selected_ids: { type: Array, default: [] },
    isMultiple: {
        type: Boolean,
        default: true
    }
});
const linkSelectData = defineModel("linkSelectData");
const emit = defineEmits(["submitCallback", "okType"]);
emit("okType", false);
// 基本参数定义
const columns: TableColumnsType = [{ title: "商品信息", key: "store_id", sorter: true }];
const activeKey = ref(1);
const loading = ref(true); //列表加载中

const selectedIds = ref<number[]>([]); //钩选项
const total = ref<number>(0);
const config:any = useConfigStore();
const filterState = ref<StoreFilterState[]>([]);
const filterParams = reactive<StoreFilterParams>({
    page: 1,
    size: config.get("page_size"),
    sort_field: "",
    sort_order: "",
    keyword: ""
});

// 获取列表的查询结果
const loadFilter = async () => {
    loading.value = true;
    try {
        const result = await getStoreList({ ...filterParams });
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
const searchSubmit = (values: any) => {
    loadFilter();
};

const onSelectChange = (e: StoreFilterState[]) => {
    if (props.isMultiple) {
        selectedIds.value = e.map((item) => item.store_id);
        emit("okType", selectedIds.value.length > 0);
    }
};
const tableRef: any = ref();
const selectRow = (selection: any, val: any) => {
    if (!props.isMultiple) {
        tableRef.value.clearSelection();
        if (selection.length == 0) {
            selectedIds.value = []; // 清空data中绑定的selectedRow
            return;
        }
        tableRef.value.toggleRowSelection(val, true);
        selectedIds.value.length = 0;
        selectedIds.value.push(val.store_id);
        emit("okType", selectedIds.value.length > 0);
        linkSelectData.value = {
            path: "store",
            label: "店铺",
            id: val.store_id,
            name: val.store_title
        };
    }
};
const isSelectable = (row: StoreFilterState) => {
    // 排除重复项
    return !props.selected_ids.includes(row.store_id); // Column configuration not to be checked
};
// 弹窗回调
const onFormSubmit = () => {
    // 弹窗确认按钮提交
    console.log(selectedIds.value);
    emit("submitCallback", selectedIds.value);
};

// 修改排序

defineExpose({
    onFormSubmit
});
</script>
<style lang="less" scoped>
.pagination-con {
    background: #fff;
}
// :deep .hide-checkbox .el-table__header-wrapper .el-table__header .el-checkbox {
//     display: none;
// }
</style>
