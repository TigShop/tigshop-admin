import request from "@/utils/request";
import type {UserBalanceLogFilterParams, UserBalanceLogFilterResult} from "@/types/finance/userBalanceLog.d"
// 获取商品分类列表
export const getUserBalanceLogList = (params: UserBalanceLogFilterParams) => {
    return request<UserBalanceLogFilterResult>({
        url: "finance/user_balance_log/list",
        method: "get",
        params,
    });
}
