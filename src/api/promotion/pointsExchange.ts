import request from "@/utils/request";
import { PointsExchangeFilterResult, PointsExchangeFormResult } from "@/types/promotion/pointsExchange.d";
// 获取示例模板列表
export const getPointsExchangeList = (params: object) => {
    return request<PointsExchangeFilterResult>({
        url: "promotion/points_exchange/list",
        method: "get",
        params,
    });
}
// 示例模板列表页面批量操作
export const batchSubmit = (type: string, data: object) => {
    return request({
        url: "promotion/points_exchange/batch?type=" + type,
        method: "post",
        data,
    });
}
// 示例模板列表页面删除项
export const delPointsExchange = (data: object) => {
    return request({
        url: "promotion/points_exchange/del",
        method: "post",
        data,
    });
}
// 示例模板列表页面更新项
export const updatePointsExchangeFiled = (data: object) => {
    return request({
        url: "promotion/points_exchange/update_field",
        method: "post",
        data,
    });
}
// 获取示例模板详情
export const getPointsExchange = (action: string, params: object) => {
    return request<PointsExchangeFormResult>({
        url: "promotion/points_exchange/" + action,
        method: "get",
        params
    });
}
// 更新示例模板
export const updatePointsExchange = (operation: string, data: object) => {
    return request({
        url: "promotion/points_exchange/" + operation,
        method: "post",
        data
    });
}
