import request from "@/utils/request";
import type { statisticsAccessFilterParams, statisticsAccessFilterState } from "@/types/panel/statisticsAccess.d.ts";
// import requestExport from "@/utils/export";

// 访问统计
export const getStatisticsAccess = (params: statisticsAccessFilterParams) => {
    return request<statisticsAccessFilterState>({
      url: 'panel/statistics_access/access_statistics',
      method: 'get',
      params
    })
}