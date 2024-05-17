import request from "@/utils/request";
import type {CouponFilterResult, CouponFormResult} from "@/types/promotion/coupon";

// 获取优惠券列表
export const getCouponList = (params: object) => {
    return request<CouponFilterResult>({
        url: "promotion/coupon/list",
        method: "get",
        params,
    });
}
// 示例模板列表页面批量操作
export const batchSubmit = (type: string, data: object) => {
    return request({
        url: "promotion/coupon/batch?type=" + type,
        method: "post",
        data,
    });
}
// 优惠券列表页面删除项
export const delCoupon = (data: object) => {
    return request({
        url: "promotion/coupon/del",
        method: "post",
        data,
    });
}
// 优惠券列表页面更新项
export const updateCouponFiled = (data: object) => {
    return request({
        url: "promotion/coupon/update_field",
        method: "post",
        data,
    });
}
// 获取优惠券详情
export const getCoupon = (action: string, params: object) => {
    return request<CouponFormResult>({
        url: "promotion/coupon/" + action,
        method: "get",
        params
    });
}
// 更新优惠券
export const updateCoupon = (operation: string, data: object) => {
    return request({
        url: "promotion/coupon/" + operation,
        method: "post",
        data
    });
}
