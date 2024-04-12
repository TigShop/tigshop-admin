import request from '@/utils/request';
import type { ExampleFilterResult, ExampleFormResult } from '@/types/product/example.d';
// 获取示例模板列表
export const getExampleList = (params: object) => {
    return request<ExampleFilterResult>({
        url: 'example/example/index/',
        method: 'get',
        params,
    });
}
// 示例模板列表页面批量操作
export const batchSubmit = (type: string, data: object) => {
    return request({
        url: 'example/example/batch/?type=' + type,
        method: 'post',
        data,
    });
}
// 示例模板列表页面删除项
export const delExample = (data: object) => {
    return request({
        url: 'example/example/del/',
        method: 'post',
        data,
    });
}
// 示例模板列表页面更新项
export const updateExampleFiled = (data: object) => {
    return request({
        url: 'example/example/update_field/',
        method: 'post',
        data,
    });
}
// 获取示例模板详情
export const getExample = (action: string, params: object) => {
    return request<ExampleFormResult>({
        url: 'example/example/' + action + '/',
        method: 'get',
        params
    });
}
// 更新示例模板
export const updateExample = (operation: string, data: object) => {
    return request({
        url: 'example/example/' + operation + '/',
        method: 'post',
        data
    });
}
