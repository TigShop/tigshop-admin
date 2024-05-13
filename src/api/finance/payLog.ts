import request from "@/utils/request";
import type {PayLogFilterParams, PayLogFilterResult, PayLogFormResult} from "@/types/finance/payLog.d"
// 获取商品分类列表
export const getPayLogList = (params: PayLogFilterParams) => {
    return request<PayLogFilterResult>({
        url: "finance/pay_log/list",
        method: "get",
        params,
    });
}

// 删除
export const delPayLog= (data: object) => {
    return request({
        url: "finance/pay_log/del",
        method: "post",
        data,
    });
}

export const recallPayLog= (data: object) => {
    return request({
        url: "finance/pay_log/recall",
        method: "post",
        data,
    });
}
//获取分类详情
export const getPayLog  = (action: string, params: object) => {
    return request<PayLogFormResult>({
        url: "finance/pay_log/" + action,
        method: "get",
        params
    });
}

// 更新分类
export const updatePayLog = (operation: string, data: object) => {
    return request({
        url: "finance/pay_log/" + operation,
        method: "post",
        data
    });
}

// 批量操作
export const batchSubmit = (type: string, params: object) => {
    return request({
        url: "finance/pay_log/batch?type=" + type,
        method: "post",
        params,
    });
}
