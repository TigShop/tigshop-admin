<template>
    <div class="container" style="position: relative; height: 100%">
        <div class="content_wrapper">
            <div class="" style="display: flex; flex-direction: column; width: 100%; height: 100%; position: absolute">
                <div class="list-table-tool lyecs-search-warp" style="flex: 0">
                    <el-form :model="filterParams" name="form" @finish="searchSubmit">
                        <div class="list-table-tool-row" style="margin-bottom: 5px">
                            <div class="list-table-tool-col">
                                <el-space>
                                    <SelectCategory v-model:category_id="filterParams.category_id"></SelectCategory>
                                    <SelectBrand v-model:brand_id="filterParams.brand_id" style="width: 150px"></SelectBrand>
                                    <el-input v-model="filterParams.keyword" placeholder="商品名称/货号" />
                                    <el-button @click="searchSubmit">搜索</el-button>
                                </el-space>
                            </div>
                            <div class="list-table-tool-col"></div>
                        </div>
                    </el-form>
                </div>
                <perfect-scrollbar class="table-container" style="flex: 1">
                    <a-spin :spinning="loading">
                        <div style="padding-right: 15px; box-sizing: border-box">
                            <el-table
                                ref="tableRef"
                                :class="isMultiple ? '' : 'hide-checkbox'"
                                :data="filterState"
                                :loading="loading"
                                :total="total"
                                class="result-table"
                                row-key="product_id"
                                @select="selectRow"
                                @selection-change="onSelectChange"
                            >
                                <el-table-column :selectable="isSelectable" type="selection" width="32" />
                                <el-table-column label="商品信息" prop="product_id">
                                    <template #default="{ row }">
                                        <div class="flex">
                                            <div v-if="row.pic_thumb" class="span-pic">
                                                <a :href="row.url" target="_blank"><img :src="imageFormat(row.pic_thumb)" height="40" width="40" /></a>
                                            </div>
                                            <div>
                                                <p>{{ row.product_name }}</p>
                                                <p class="gray">货号：{{ row.product_sn }}</p>
                                            </div>
                                        </div>
                                    </template>
                                </el-table-column>
                                <template #empty>
                                    <div class="empty-warp">
                                        <div v-if="!loading" class="empty-bg">暂无数据</div>
                                    </div>
                                </template>
                            </el-table>
                        </div>
                    </a-spin>
                </perfect-scrollbar>
                <div v-if="total > 0" class="pagination-con" style="flex-shrink: 0">
                    <Pagination
                        v-model:page="filterParams.page"
                        v-model:size="filterParams.size"
                        :total="total"
                        @callback="loadFilter"
                        layout="slot ,prev, pager, next"
                        :background="false"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import "@/style/css/list.less";
import { SelectBrand, SelectCategory } from "@/components/select";
import { onMounted, reactive, ref } from "vue";
import { message } from "ant-design-vue";
import { imageFormat } from "@/utils/format";
import { Pagination } from "@/components/list";
import { ProductFilterParams, ProductFilterState } from "@/types/product/product";
import { useConfigStore } from "@/store/config";
import { getProductList } from "@/api/product/product";

const props = defineProps({
    // 已选择的项，用于排除重复，禁止选择
    selected_ids: { type: Array, default: [] },
    modelValue: {
        type: Object,
        default: {}
    },
    isMultiple: {
        type: Boolean,
        default: true
    }
});
const linkSelectData = defineModel("linkSelectData");
const emit = defineEmits(["submitCallback", "okType", "update:modelValue"]);
emit("okType", false);
const selectedIds = ref<number[]>([]);
const loading = ref(true); //列表加载中
const total = ref<number>(0);
const config = useConfigStore();
const filterState = ref<ProductFilterState[]>([]);
const filterParams = reactive<ProductFilterParams>({
    page: 1,
    size: (config as any).get("page_size"),
    sort_field: "",
    sort_order: "",
    keyword: ""
});

// 获取列表的查询结果
const loadFilter = async () => {
    loading.value = true;
    try {
        const result = await getProductList({ ...filterParams });
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
const searchSubmit = () => {
    loadFilter();
};

const tableRef: any = ref();

const onSelectChange = (e: any) => {
    if (props.isMultiple) {
        e.forEach((item: any) => {
            // 创建一个 Set 包含当前 selectedIds.value 的所有项
            const idsSet = new Set(selectedIds.value);
            // 尝试向 Set 中添加新的 product_id
            idsSet.add(item.product_id);
            // 使用 Set 的唯一性质，将其转换回数组赋给 selectedIds.value
            selectedIds.value = Array.from(idsSet);
        });
        console.log(selectedIds.value);
        emit("okType", selectedIds.value.length > 0);
    }
};

const selectRow = (selection: any, val: any) => {
    //手动触发该事件
    if (!props.isMultiple) {
        // 单选
        tableRef.value.clearSelection();
        if (selection.length == 0) {
            selectedIds.value = []; // 清空data中绑定的selectedRow
            return;
        }
        tableRef.value.toggleRowSelection(val, true);
        selectedIds.value.length = 0;
        selectedIds.value.push(val.product_id);
        emit("okType", selectedIds.value.length > 0);
    }
    linkSelectData.value = {
        path: "product",
        label: "商品",
        id: val.product_id,
        sn: val.product_sn,
        name: val.product_name
    };
    emit("update:modelValue", val);
};
const isSelectable = (row: any, index: number) => {
    // console.log(row);
    // 排除重复项
    return !props.selected_ids?.includes(row.product_id); // Column configuration not to be checked
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

:deep .hide-checkbox .el-table__header-wrapper .el-table__header .el-checkbox {
    display: none;
}
</style>
