import request from "@/utils/request";
import type {AccountPanelFilterParams, AccountPanelFilterResult} from "@/types/finance/accountPanel.d"
// 获取商品分类列表
export const getAccountPanelList = (params: AccountPanelFilterParams) => {
    return request<AccountPanelFilterResult>({
        url: "finance/account_panel/list",
        method: "get",
        params,
    });
}

