import request from "@/utils/request";
import requestExport from "@/utils/export";
import type { consumerRankingFilterParams, consumerRankingFilterState } from "@/types/panel/consumerRanking.d.ts";

// 会员消费排行
export const getUserConsumptionRanking = (params: consumerRankingFilterParams) => {
    return request<consumerRankingFilterState>({
        url: "panel/statistics_user/user_consumption_ranking",
        method: "get",
        params
    });
};

export const exportUserConsumptionRanking = (params: consumerRankingFilterParams) => {
    return requestExport({
        url: "panel/statistics_user/user_consumption_ranking",
        params
    });
};
