import request from "@/utils/request";
import type {UserInvoiceFilterParams, UserInvoiceFilterResult, UserInvoiceFormResult} from "@/types/finance/userInvoice.d"
// 获取商品分类列表
export const getUserInvoiceList = (params: UserInvoiceFilterParams) => {
    return request<UserInvoiceFilterResult>({
        url: "finance/user_invoice/list",
        method: "get",
        params,
    });
}

// 删除
export const delUserInvoice= (data: object) => {
    return request({
        url: "finance/user_invoice/del",
        method: "post",
        data,
    });
}

export const recallUserInvoice= (data: object) => {
    return request({
        url: "finance/user_invoice/recall",
        method: "post",
        data,
    });
}
//获取分类详情
export const getUserInvoice  = (action: string, params: object) => {
    return request<UserInvoiceFormResult>({
        url: "finance/user_invoice/" + action,
        method: "get",
        params
    });
}

// 更新分类
export const updateUserInvoice = (operation: string, data: object) => {
    return request({
        url: "finance/user_invoice/" + operation,
        method: "post",
        data
    });
}

// 批量操作
export const batchSubmit = (type: string, params: object) => {
    return request({
        url: "finance/user_invoice/batch?type=" + type,
        method: "post",
        params,
    });
}
