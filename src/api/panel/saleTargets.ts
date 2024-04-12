import request from "@/utils/request";
import { saleTargetsFilterState } from "@/types/panel/saleTargets.d";

// 销售指标
export const getQuotaSales = () => {
    return request<saleTargetsFilterState>({
        url: "panel/sales_statistics/sales_indicators",
        method: "get"
    });
};
