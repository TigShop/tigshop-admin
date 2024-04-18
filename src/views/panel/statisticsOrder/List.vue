<template>
    <div class="container">
        <div class="content_wrapper">
            <div>
                <el-tabs v-model="filterParams.statistic_type" @tab-change="handleClick">
                    <el-tab-pane label="订单金额统计" name="1"></el-tab-pane>
                    <el-tab-pane label="订单数统计" name="0"></el-tab-pane>
                </el-tabs>

                <el-form :model="filterParams">
                    <div class="filtrate-menu">
                        <el-form-item class="mr-10">
                            <el-select v-model="filterParams.date_type" placeholder="Select" style="width: 94.5px">
                                <el-option v-for="(item, index) in timeSorterList" :key="index" :label="item.label" :value="item.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item class="mr-10">
                            <el-date-picker
                                v-if="filterParams.date_type === '2'"
                                style="width: 200px"
                                :shortcuts="shortcuts"
                                v-model="selectDate['2']"
                                value-format="YYYY-MM"
                                type="month"
                                :editable="false" />
                            <el-date-picker
                                v-if="filterParams.date_type === '1'"
                                v-model="selectDate['1']"
                                type="year"
                                value-format="YYYY"
                                style="width: 200px"
                                :editable="false"
                                :shortcuts="yearShortcuts" />
                        </el-form-item>
                        <el-form-item class="mr-10">
                            <el-button plain @click="handleSearch">搜索</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button plain @click="handleExport">导出EXCEL</el-button>
                        </el-form-item>
                    </div>
                </el-form>

                <div class="main-panel">
                    <ul>
                        <li class="main-panel-item">
                            <div class="main-panel-item-title">商品支付金额</div>
                            <div class="main-panel-item-value">{{ filterState?.sales_data?.product_payment ?? 0 }}</div>
                            <div class="main-panel-item-increase">
                                环比：
                                <span>{{ filterState?.sales_data?.product_payment_growth_rate }}%</span>
                                <i
                                    v-if="
                                        filterState?.sales_data?.product_payment_growth_rate.toString() !== '--' &&
                                        Number(filterState?.sales_data?.product_payment_growth_rate) > 0
                                    "
                                    class="admin-iconfont red f12 up"
                                    >&#xe61a;</i
                                >
                                <i v-else class="admin-iconfont green f12">&#xe61a;</i>
                            </div>
                        </li>
                        <li class="main-panel-item">
                            <div class="main-panel-item-title">商品退款金额</div>
                            <div class="main-panel-item-value">{{ filterState?.sales_data?.product_refund ?? 0 }}</div>
                            <div class="main-panel-item-increase">
                                环比：
                                <span>{{ filterState?.sales_data?.product_refund_growth_rate }}%</span>
                                <i
                                    v-if="
                                        filterState?.sales_data?.product_refund_growth_rate.toString() !== '--' &&
                                        Number(filterState?.sales_data?.product_refund_growth_rate) > 0
                                    "
                                    class="admin-iconfont red f12 up"
                                    >&#xe61a;</i
                                >
                                <i v-else class="admin-iconfont green f12">&#xe61a;</i>
                            </div>
                        </li>
                        <li class="main-panel-item">
                            <div class="main-panel-item-title">营业额</div>
                            <div class="main-panel-item-value">{{ filterState?.sales_data?.turnover ?? 0 }}</div>
                            <div class="main-panel-item-increase">
                                环比：
                                <span>{{ filterState?.sales_data?.turnover_growth_rate }}%</span>
                                <i
                                    v-if="
                                        filterState?.sales_data?.turnover_growth_rate.toString() !== '--' &&
                                        Number(filterState?.sales_data?.turnover_growth_rate) > 0
                                    "
                                    class="admin-iconfont red f12 up"
                                    >&#xe61a;</i
                                >
                                <i v-else class="admin-iconfont green f12">&#xe61a;</i>
                            </div>
                        </li>

                        <li class="main-panel-item">
                            <div class="main-panel-item-title">充值金额</div>
                            <div class="main-panel-item-value">{{ filterState?.sales_data?.recharge_amount ?? 0 }}</div>
                            <div class="main-panel-item-increase">
                                环比：
                                <span>{{ filterState?.sales_data?.recharge_amount_growth_rate }}%</span>
                                <i
                                    v-if="
                                        filterState?.sales_data?.recharge_amount_growth_rate.toString() !== '--' &&
                                        Number(filterState?.sales_data?.recharge_amount_growth_rate) > 0
                                    "
                                    class="admin-iconfont red f12 up"
                                    >&#xe61a;</i
                                >
                                <i v-else class="admin-iconfont green f12">&#xe61a;</i>
                            </div>
                        </li>
                        <li class="main-panel-item">
                            <div class="main-panel-item-title">余额支付金额</div>
                            <div class="main-panel-item-value">{{ filterState?.sales_data?.balance_payment ?? 0 }}</div>
                            <div class="main-panel-item-increase">
                                环比：
                                <span>{{ filterState?.sales_data?.balance_payment_growth_rate }}%</span>
                                <i
                                    v-if="
                                        filterState?.sales_data?.balance_payment_growth_rate.toString() !== '--' &&
                                        Number(filterState?.sales_data?.balance_payment_growth_rate) > 0
                                    "
                                    class="admin-iconfont red f12 up"
                                    >&#xe61a;</i
                                >
                                <i v-else class="admin-iconfont green f12">&#xe61a;</i>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="chart">
                <OrderamountStatistics v-if="filterParams.statistic_type === '1'"></OrderamountStatistics>
                <OrderNumberStatistics v-if="filterParams.statistic_type === '0'"></OrderNumberStatistics>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, provide } from "vue";
import type { TabsPaneContext } from "element-plus";
import { formatDate } from "@/utils/util";
import OrderamountStatistics from "./src/OrderamountStatistics.vue";
import OrderNumberStatistics from "./src/OrderNumberStatistics.vue";
import type { statisticsOrdeFilterState, statisticsOrdeFilterParams } from "@/types/panel/statisticsOrde";
import { getSalesstatisticsIndexs, getStatisticsOrdexport } from "@/api/panel/statisticsOrde";
import { message } from "ant-design-vue";
const handleClick = (tab: TabsPaneContext, event: Event) => {
    getData();
};

const filterParams = reactive<statisticsOrdeFilterParams>({
    statistic_type: "1",
    start_end_time: "",
    date_type: "1",
});

const selectDate = reactive<any>({
    "1": "",
    "2": "",
});

const timeSorterList = [
    {
        label: "按年筛选",
        value: "1",
    },
    {
        label: "按月筛选",
        value: "2",
    },
];

const shortcuts = [
    {
        text: "本月",
        value: new Date(),
    },
    {
        text: "上月",
        value: () => {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
            return date;
        },
    },
    {
        text: "本年一月",
        value: () => {
            const date = new Date();
            const firstMonthOfYear = new Date(date.getFullYear(), 0, 1);
            return firstMonthOfYear;
        },
    },
];

const yearShortcuts = [
    {
        text: "本年",
        value: () => {
            return getDateYearsAgo(0);
        },
    },
    {
        text: "去年",
        value: () => {
            return getDateYearsAgo(1);
        },
    },
    {
        text: "三年前",
        value: () => {
            return getDateYearsAgo(3);
        },
    },
    {
        text: "五年前",
        value: () => {
            return getDateYearsAgo(5);
        },
    },
];

const getDateYearsAgo = (years: number) => {
    const date = new Date();
    const dateYearsAgo = new Date(date.getFullYear() - years, date.getMonth(), date.getDate());
    return dateYearsAgo;
};

const filterState = ref<statisticsOrdeFilterState>();
provide("filterState", filterState);
const getData = async () => {
    try {
        filterParams.start_end_time = selectDate[filterParams.date_type];
        const result = await getSalesstatisticsIndexs(filterParams);
        if (result.errcode === 0) {
            filterState.value = result;
            const { sales_statistics_data } = result;
            const formatUnit = filterParams.date_type === "1" ? "月" : "日";
            filterState.value.sales_statistics_data.horizontal_axis = sales_statistics_data.horizontal_axis.map((item) => item + formatUnit);
        }
    } catch (error: any) {
        message.error(error.message);
        console.error(error);
    }
};

const handleSearch = () => {
    getData();
};
const handleExport = () => {
    console.log({ ...filterParams, is_export: "1" });
    getStatisticsOrdexport({ ...filterParams, is_export: "1" });
};

onMounted(() => {
    const nowDate = formatDate(new Date());
    if (nowDate) {
        const dates = nowDate.split("-");
        for (const key in selectDate) {
            if (key === "1") selectDate[key] = dates[0];
            if (key === "2") selectDate[key] = dates[0] + "-" + dates[1];
        }
    }
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

.main-panel {
    ul {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 17px 28px;
    }

    .main-panel-item {
        padding: 15px;
        border-radius: 10px;
        background-color: #f7f8fa;

        .main-panel-item-title {
            font-size: 14px;
            color: #777;
        }

        .main-panel-item-value {
            font-size: 24px;
            color: #333;
            display: block;
            font-weight: bold;
            padding: 10px 0;
        }

        .main-panel-item-increase {
            font-size: 14px;
            color: #777;

            i {
                font-size: 16px;
            }

            .up {
                display: inline-block;
                transform: rotate(180deg);
            }
        }
    }
}

.chart {
    margin-top: 25px;
    height: 400px;
    width: 100%;
}
</style>
