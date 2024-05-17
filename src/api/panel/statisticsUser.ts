import request from "@/utils/request";
import { statisticsUserFilterParams, statisticsUserFilterState } from "@/types/panel/statisticsUser.d";

// 用户统计
export const getUserStatisticsPanel = (params: statisticsUserFilterParams) => {
    return request<statisticsUserFilterState>({
        url: "panel/statistics_user/user_statistics_panel",
        method: "get",
        params
    });
};

export const exportUserStatisticsPanel = (params: statisticsUserFilterParams) => {
    return request({
        url: "panel/statistics_user/user_statistics_panel",
        method: "get",
        responseType: 'arraybuffer',
        params
    });
};
