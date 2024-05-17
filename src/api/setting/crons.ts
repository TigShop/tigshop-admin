import request from "@/utils/request";
import type {CronsFilterParams, CronsFilterResult, CronsFormResult} from "@/types/setting/crons";

// 获取示例模板列表
export const getCronsList = (params: CronsFilterParams) => {
    return request<CronsFilterResult>({
        url: "setting/crons/list",
        method: "get",
        params,
    });
}
// 示例模板列表页面批量操作
export const batchSubmit = (type: string, data: object) => {
    return request({
        url: "setting/crons/batch?type=" + type,
        method: "post",
        data,
    });
}
// 示例模板列表页面删除项
export const delCrons = (data: object) => {
    return request({
        url: "setting/crons/del",
        method: "post",
        data,
    });
}
// 示例模板列表页面更新项
export const updateCronsFiled = (data: object) => {
    return request({
        url: "setting/crons/update_field",
        method: "post",
        data,
    });
}
// 获取示例模板详情
export const getCrons = (action: string, params: object) => {
    return request<CronsFormResult>({
        url: "setting/crons/" + action,
        method: "get",
        params
    });
}
// 更新示例模板
export const updateCrons = (operation: string, data: object) => {
    return request({
        url: "setting/crons/" + operation,
        method: "post",
        data
    });
}
