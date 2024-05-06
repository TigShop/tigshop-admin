<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="notice-warp">提示：查询的时间间隔上限默认为一年，如果数据量过大导至查询时间过久或者超时报错，请尝试缩小查询的时间间隔！</div>
            <el-form :model="filterParams">
                <div class="filtrate-menu">
                    <el-form-item class="mr-10">
                        <SelectTimeInterval
                            type="date"
                            v-model:start-date="filterParams.start_time"
                            v-model:end-date="filterParams.end_time"></SelectTimeInterval>
                    </el-form-item>
                    <el-form-item class="mr-10">
                        <el-button plain @click="handleSearch">搜索</el-button>
                    </el-form-item>
                    <el-form-item class="mr-10">
                        <el-button plain @click="handleExport" :loading="Exportloading">导出EXCEL</el-button>
                    </el-form-item>
                </div>
            </el-form>

            <div class="main-panel">
                <ul>
                    <li class="main-panel-item">
                        <div class="main-panel-item-title">{{ "访客数" }}</div>
                        <div class="main-panel-item-value">{{ filterState?.visit_num }}</div>
                        <div class="main-panel-item-increase">
                            环比：
                            <span>{{ filterState?.visit_growth_rate }}% </span>

                            <i v-if="filterState.visit_growth_rate.toString() !== '--' && filterState.visit_growth_rate > 0" class="admin-iconfont red f12 up"
                                >&#xe61a;</i
                            >

                            <i v-else class="admin-iconfont green f12">&#xe61a;</i>
                        </div>
                    </li>
                    <li class="main-panel-item">
                        <div class="main-panel-item-title">{{ "浏览量" }}</div>
                        <div class="main-panel-item-value">{{ filterState?.view_num }}</div>
                        <div class="main-panel-item-increase">
                            环比：
                            <span>{{ filterState?.view_growth_rate }}%</span>
                            <i v-if="filterState.view_growth_rate.toString() !== '--' && filterState.view_growth_rate > 0" class="admin-iconfont red f12 up"
                                >&#xe61a;</i
                            >
                            <i v-else class="admin-iconfont green f12">&#xe61a;</i>
                        </div>
                    </li>
                    <li class="main-panel-item">
                        <div class="main-panel-item-title">{{ "新增用户数" }}</div>
                        <div class="main-panel-item-value">{{ filterState?.add_user_num }}</div>
                        <div class="main-panel-item-increase">
                            环比：
                            <span>{{ filterState?.add_user_growth_rate }}% </span>
                            <i
                                v-if="filterState.add_user_growth_rate.toString() !== '--' && filterState.add_user_growth_rate > 0"
                                class="admin-iconfont red f12 up"
                                >&#xe61a;</i
                            >
                            <i v-else class="admin-iconfont green f12">&#xe61a;</i>
                        </div>
                    </li>
                    <li class="main-panel-item">
                        <div class="main-panel-item-title">{{ "成交用户数" }}</div>
                        <div class="main-panel-item-value">{{ filterState?.deal_user_num }}</div>
                        <div class="main-panel-item-increase">
                            环比：
                            <span>{{ filterState?.deal_user_growth_rate }}% </span>
                            <i
                                v-if="(filterState.deal_user_growth_rate as string).toString() !== '--' && (filterState.deal_user_growth_rate as number) > 0"
                                class="admin-iconfont red f12 up"
                                >&#xe61a;</i
                            >
                            <i v-else class="admin-iconfont green f12">&#xe61a;</i>
                        </div>
                    </li>
                    <li class="main-panel-item">
                        <div class="main-panel-item-title">{{ "访客-支付转化率" }}</div>
                        <div class="main-panel-item-value">{{ filterState?.visit_to_user }}</div>
                        <div class="main-panel-item-increase">
                            环比：
                            <span>{{ filterState?.visit_to_user_rate }}%</span>
                            <i v-if="filterState.visit_to_user_rate.toString() !== '--' && filterState.visit_to_user_rate > 0" class="admin-iconfont red f12 up"
                                >&#xe61a;</i
                            >
                            <i v-else class="admin-iconfont green f12">&#xe61a;</i>
                        </div>
                    </li>
                    <li class="main-panel-item">
                        <div class="main-panel-item-title">{{ "充值用户数" }}</div>
                        <div class="main-panel-item-value">{{ filterState?.recharge_user_num }}</div>
                        <div class="main-panel-item-increase">
                            环比：
                            <span>{{ filterState?.recharge_user_growth_rate }}% </span>
                            <i
                                v-if="
                                    (filterState.recharge_user_growth_rate as string).toString() !== '--' &&
                                    (filterState.recharge_user_growth_rate as number) > 0
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
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { SelectTimeInterval } from "@/components/select";
import { getDays } from "@/utils/util";
import { formattedDate } from "@/utils/time";
import { getUserStatisticsPanel, exportUserStatisticsPanel } from "@/api/panel/statisticsUser";
import { statisticsUserFilterParams, FilterResult } from "@/types/panel/statisticsUser.d";
import { message } from "ant-design-vue";
import requestExport from "@/utils/export";

const loading = ref(false);
const filterParams = reactive<statisticsUserFilterParams>({
    start_time: formattedDate(getDays(30, "sub"), "YYYY-MM-DD"),
    end_time: formattedDate(new Date(), "YYYY-MM-DD"),
});

const filterState = ref<FilterResult>({
    visit_num: 0,
    visit_growth_rate: 0,
    view_num: 0,
    view_growth_rate: 0,
    add_user_num: 0,
    add_user_growth_rate: 0,
    deal_user_num: 0,
    deal_user_growth_rate: "0",
    visit_to_user: 0,
    visit_to_user_rate: 0,
    recharge_user_num: 0,
    recharge_user_growth_rate: "0",
});

const getData = async () => {
    try {
        const result = await getUserStatisticsPanel(filterParams);
        if (result.errcode === 0) {
            filterState.value = result.filter_result;
        }
    } catch (error: any) {
        message.error(error.message);
        console.error(error);
    }
};

const handleSearch = () => {
    getData();
};

const Exportloading = ref<boolean>(false)
const handleExport = async () => {
  Exportloading.value = true;
  try {
    const result = await exportUserStatisticsPanel({ ...filterParams, is_export: "1" });
    Exportloading.value = false;
    requestExport(result,'用户统计导出')
  } catch (error:any) {
    message.error(error.message)
  }
};

onMounted(() => {
    getData();
});
</script>

<style lang="less" scoped>
.filtrate-menu {
    display: flex;
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
</style>
