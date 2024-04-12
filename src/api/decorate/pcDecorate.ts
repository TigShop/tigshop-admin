import request from '@/utils/request';
import { FilterResult, FormResult } from '@/types/decorate/pcDecorate';
// 获取示例模板列表
export const getPcDecorateList = (params: object) => {
    return request<FilterResult>({
        url: 'decorate/decorate_home/index/',
        method: 'get',
        params,
    });
}
// 示例模板列表页面批量操作
export const batchSubmit = (type: string, data: object) => {
    return request({
        url: 'decorate/decorate_home/batch/?type=' + type,
        method: 'post',
        data,
    });
}
// 示例模板列表页面删除项
export const delPcDecorate = (data: object) => {
    return request({
        url: 'decorate/decorate_home/del/',
        method: 'post',
        data,
    });
}
// 示例模板列表页面更新项
export const updatePcDecorateFiled = (data: object) => {
    return request({
        url: 'decorate/decorate_home/update_field/',
        method: 'post',
        data,
    });
}
// 获取示例模板详情
export const getPcDecorate = (action: string, params: object) => {
    return request<FormResult>({
        url: 'decorate/decorate_home/' + action + '/',
        method: 'get',
        params
    });
}
// 更新示例模板
export const updatePcDecorate = (operation: string, data: object) => {
    return request({
        url: 'decorate/decorate_home/' + operation + '/',
        method: 'post',
        data
    });
}
