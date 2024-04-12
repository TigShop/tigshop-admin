import request from "@/utils/request";
import requestExport from "@/utils/export";
import type { statisticsOrdeFilterParams, statisticsOrdeFilterState } from "@/types/panel/statisticsOrde";

// 销售统计
export const getSalesstatisticsIndexs = (data: statisticsOrdeFilterParams) => {
    return request<statisticsOrdeFilterState>({
        url: "panel/sales_statistics/index",
        method: "get",
        params: data
    });
};

// 导出销售统计
export const getStatisticsOrdexport = (data: statisticsOrdeFilterParams) => {
    return requestExport({
        url: "panel/sales_statistics/index",
        params: data
    });
};
