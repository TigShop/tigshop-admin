import request from "@/utils/request";
import { ProductActivityFilterResult, ProductActivityFormResult } from "@/types/promotion/productActivity.d";
// 获取优惠活动列表
export const getProductActivityList = (params: object) => {
    return request<ProductActivityFilterResult>({
        url: "promotion/product_promotion/list",
        method: "get",
        params,
    });
}
// 优惠活动列表页面批量操作
export const batchSubmit = (type: string, data: object) => {
    return request({
        url: "promotion/product_promotion/batch?type=" + type,
        method: "post",
        data,
    });
}
// 优惠活动列表页面删除项
export const delProductActivity = (data: object) => {
    return request({
        url: "promotion/product_promotion/del",
        method: "post",
        data,
    });
}
// 优惠活动列表页面更新项
export const updateProductActivityFiled = (data: object) => {
    return request({
        url: "promotion/product_promotion/update_field",
        method: "post",
        data,
    });
}
// 获取优惠活动详情
export const getProductActivity = (action: string, params: object) => {
    return request<ProductActivityFormResult>({
        url: "promotion/product_promotion/" + action,
        method: "get",
        params
    });
}
// 更新优惠活动
export const updateProductActivity = (operation: string, data: object) => {
    return request({
        url: "promotion/product_promotion/" + operation,
        method: "post",
        data
    });
}
