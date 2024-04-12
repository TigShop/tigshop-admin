<template>
    <div class="container">
        <div class="content_wrapper">
            <div>
                <el-tabs v-model="filterParams.is_hits" @tab-change="handleClick">
                    <el-tab-pane label="点击量统计" :name="0"></el-tab-pane>
                    <el-tab-pane label="访客数统计" :name="1"></el-tab-pane>
                </el-tabs>
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
                            <el-button @click="handleSearch">搜索</el-button>
                        </el-form-item>
                    </div>
                </el-form>
                <template v-if="filterParams.is_hits === 0">
                    <div class="chart">
                        <ClickThroughStatistics></ClickThroughStatistics>
                    </div>
                </template>
                <template v-else-if="filterParams.is_hits === 1">
                    <div class="chart">
                        <VisitorStatistics></VisitorStatistics>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, provide } from "vue";
import type { TabsPaneContext, TabPaneName } from "element-plus";
import { SelectTimeInterval } from "@/components/select";
import { getDays } from "@/utils/util";
import { formattedDate } from "@/utils/time";
import ClickThroughStatistics from "./src/ClickThroughStatistics.vue";
import VisitorStatistics from "./src/VisitorStatistics.vue";
import type { statisticsAccessFilterParams, FilterResult } from "@/types/panel/statisticsAccess.d.ts";
import { getStatisticsAccess } from "@/api/panel/statisticsAccess";
import { message } from "ant-design-vue";

const filterParams = reactive<statisticsAccessFilterParams>({
    start_time: formattedDate(getDays(30, "sub"), "YYYY-MM-DD"),
    end_time: formattedDate(new Date(), "YYYY-MM-DD"),
    is_hits: 0
});
const handleClick = (name: TabPaneName) => {
    getData();
};

const filterState = ref<FilterResult>();
provide("filterState", filterState)
const getData = async () => {
    try {
        const result = await getStatisticsAccess(filterParams);
        if (result.errcode === 0) {
            filterState.value = result.filter_result;
        }
    } catch (error: any) {
        message.error(error.message);
        console.log(error);
    }
};

const handleSearch = () => {
    getData();
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

.chart {
    width: 100%;
    height: 400px;
}
</style>
