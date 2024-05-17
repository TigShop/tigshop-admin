<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="notice-warp">提示：查询的时间间隔上限默认为一月，如果数据量过大导至查询时间过久或者超时报错，请尝试缩小查询的时间间隔！</div>
            <el-form :model="filterParams">
                <div class="filtrate-menu">
                    <el-form-item class="mr-10">
                        <SelectTimeInterval
                            type="date"
                            v-model:start-date="filterParams.start_time"
                            v-model:end-date="filterParams.end_time"
                        ></SelectTimeInterval>
                    </el-form-item>
                    <el-form-item class="mr-10">
                        <el-input v-model="filterParams.keyword" placeholder="输入会员名称或者手机号"> </el-input>
                    </el-form-item>
                    <el-form-item class="mr-10">
                        <el-button plain @click="handleSearch">搜索</el-button>
                    </el-form-item>
                    <el-form-item class="mr-10">
                        <el-button plain @click="handleExport" :loading="Exportloading">导出EXCEL</el-button>
                    </el-form-item>
                </div>
            </el-form>

            <div class="table-container">
                <a-spin :spinning="loading">
                    <el-table :data="filterState" :total="total" row-key="product_id" @sort-change="onSortChange">
                        <el-table-column label="商品名称" prop="product_name">
                            <template #default="{ row }">
                                <div class="flex">
                                    <div v-if="row.pic_thumb" class="span-pic">
                                        <a :href="urlFormat({ path: 'product', id: row.product_id })" target="_blank"
                                            ><img :src="imageFormat(row.pic_thumb)" height="50" width="50"
                                        /></a>
                                    </div>
                                    <div class="span-product-con">
                                        <div class="span-product-name">{{ row.product_name }}</div>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="商品编号" prop="product_sn"> </el-table-column>
                        <el-table-column label="总销量" prop="total_sales_num" sortable="custom"> </el-table-column>
                        <el-table-column label="总销售额" prop="total_sales_amount" sortable="custom">
                            <template #default="{ row }">
                                {{ priceFormat(row.total_sales_amount) }}
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
                    <Pagination v-model:page="filterParams.page" v-model:size="filterParams.size" :total="total" @callback="loadFilter" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { useConfigStore } from "@/store/config";
import { SelectTimeInterval } from "@/components/select";
import { Pagination } from "@/components/list";
import { getDays } from "@/utils/util";
import { formattedDate } from "@/utils/time";
import { getGoodsTopSales, exportGoodsTopSales } from "@/api/panel/statisticsGoods";
import type { statisticsGoodsFilterParams, FilterResult } from "@/types/panel/statisticsGoods.d.ts";
import { imageFormat, urlFormat, priceFormat } from "@/utils/format";
import { message } from "ant-design-vue";
import requestExport from "@/utils/export";
const config = useConfigStore();

const loading = ref<boolean>(false);
const filterState = ref<FilterResult[]>();
const total = ref<number>(0);
const filterParams = reactive<statisticsGoodsFilterParams>({
    page: 1,
    size: config.pageSize,
    keyword: "",
    start_time: formattedDate(getDays(30, "sub"), "YYYY-MM-DD"),
    end_time: formattedDate(new Date(), "YYYY-MM-DD")
});

const getData = async () => {
    loading.value = true;
    try {
        const result = await getGoodsTopSales(filterParams);
        if (result.errcode === 0) {
            filterState.value = result.filter_result;
            total.value = result.total;
        }
    } catch (error: any) {
        message.error(error.message);
        console.error(error);
    }
    loading.value = false;
};

const handleSearch = () => {
    getData();
};


const Exportloading = ref<boolean>(false)
const handleExport = async () => {
  Exportloading.value = true;
  try {
    const result = await exportGoodsTopSales({ ...filterParams, is_export: "1" });
    Exportloading.value = false;
    requestExport(result,'销售排行导出')
  } catch (error:any) {
    message.error(error.message)
  }
};


// 修改排序
const onSortChange = ({ prop, order }: { prop: string; order?: string }) => {
    console.log(prop, order);
    filterParams.sort_field = prop;
    filterParams.sort_order = order == "ascending" ? "asc" : order == "descending" ? "desc" : "";
    getData();
};

const loadFilter = () => {
    getData();
};

onMounted(() => {
    getData();
});
</script>

<style lang="less" scoped>
.filtrate-menu {
    display: flex;
    // margin-bottom: 20px;

    .mr-10 {
        margin-right: 5px;
    }
}

.span-product-name {
    margin-left: 5px;
}
</style>
