import request from "@/utils/request";
import { OrderFilterResult, OrderFormResult, AddProductInfoByIdsResult, OrderPrintResult } from "@/types/order/order.d";
// 获取订单列表
export const getOrderList = (params: object) => {
    return request<OrderFilterResult>({
        url: "order/index/",
        method: "get",
        params,
    });
};
// 订单列表页面批量操作
export const batchSubmit = (type: string, data: object) => {
    return request({
        url: "order/batch/?type=" + type,
        method: "post",
        data,
    });
};
// 订单列表页面删除项
export const delOrder = (data: object) => {
    return request({
        url: "order/del/",
        method: "post",
        data,
    });
};
// 订单列表页面更新项
export const updateOrderFiled = (data: object) => {
    return request({
        url: "order/update_field/",
        method: "post",
        data,
    });
};
// 获取订单详情
export const getOrder = (action: string, params: object) => {
    return request<OrderFormResult>({
        url: "order/" + action + "/",
        method: "get",
        params,
    });
};

// 获取订单详情
export const operationOrder = (action: string, data: object) => {
    return request<OrderFormResult>({
        url: "order/" + action + "/",
        method: "post",
        data,
    });
};
export const getShipping = (action: string, params: object) => {
    return request<OrderFormResult>({
        url: "order/" + action + "/",
        method: "get",
        params,
    });
};
// 更新订单
export const updateOrder = (operation: string, data: object) => {
    return request({
        url: "order/" + operation + "/",
        method: "post",
        data,
    });
};
// 修改订单金额
export const modifyOrderMoney = (data: object) => {
    return request({
        url: "order/modify_money/",
        method: "post",
        data,
    });
};

// 修改收货人信息
export const modifyOrderConsignee = (data: object) => {
    return request({
        url: "order/modify_consignee/",
        method: "post",
        data,
    });
};
// 修改配送信息
export const modifyOrderShipping = (data: object) => {
    return request({
        url: "order/modify_shipping/",
        method: "post",
        data,
    });
};
// 添加商品时获取商品信息
export const getAddProductInfoByIds = (data: object) => {
    return request<AddProductInfoByIdsResult>({
        url: "order/get_add_product_info/",
        method: "post",
        data,
    });
};

// 修改订单商品
export const modifyOrderProduct = (data: object) => {
    return request({
        url: "order/modify_product/",
        method: "post",
        data,
    });
};

// 获取订单操作日志
export const getOrderLogList = (params: object) => {
    return request<OrderFilterResult>({
        url: "order/order_log/index/",
        method: "get",
        params,
    });
};

// 添加订单操作日志
export const updateOrderLog = (data: object) => {
    return request({
        url: "order/order_log/insert",
        method: "post",
        data,
    });
};

// 添加商家备注
export const setAdminNote = (data: object) => {
    return request({
        url: "order/set_admin_note",
        method: "post",
        data,
    });
};

// 确认订单
export const setConfirmOrder = (data: object) => {
    return request({
        url: "order/set_confirm/",
        method: "post",
        data,
    });
};
// 拆分不同店铺订单
export const splitStoreOrder = (data: object) => {
    return request({
        url: "order/split_store_order/",
        method: "post",
        data,
    });
};

// 订单已支付
export const setPaidOrder = (data: object) => {
    return request({
        url: "order/set_paid/",
        method: "post",
        data,
    });
};

// 获取打印订单数据
export const getOrderPrint = (params: object) => {
    return request<OrderPrintResult>({
        url: "order/order_print/",
        method: "get",
        params,
    });
};

// 订单已支付
export const orderDeliver = (data: object) => {
    return request({
        url: "order/deliver/",
        method: "post",
        data,
    });
};