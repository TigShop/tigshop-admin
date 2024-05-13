import request from "@/utils/request";
import type {OrderInvoiceFilterParams, OrderInvoiceFilterResult, OrderInvoiceFormResult} from "@/types/finance/orderInvoice.d"
// 获取商品分类列表
export const getOrderInvoiceList = (params: OrderInvoiceFilterParams) => {
    return request<OrderInvoiceFilterResult>({
        url: "finance/order_invoice/list",
        method: "get",
        params,
    });
}

// 删除
export const delOrderInvoice= (data: object) => {
    return request({
        url: "finance/order_invoice/del",
        method: "post",
        data,
    });
}

export const recallOrderInvoice= (data: object) => {
    return request({
        url: "finance/order_invoice/recall",
        method: "post",
        data,
    });
}
//获取分类详情
export const getOrderInvoice  = (action: string, params: object) => {
    return request<OrderInvoiceFormResult>({
        url: "finance/order_invoice/" + action,
        method: "get",
        params
    });
}

// 更新分类
export const updateOrderInvoice = (operation: string, data: object) => {
    return request({
        url: "finance/order_invoice/" + operation,
        method: "post",
        data
    });
}

// 批量操作
export const batchSubmit = (type: string, params: object) => {
    return request({
        url: "finance/order_invoice/batch?type=" + type,
        method: "post",
        params,
    });
}
