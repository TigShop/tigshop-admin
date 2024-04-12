import request from '@/utils/request';
import type {StoreFilterResult, StoreFormResult} from '@/types/store/store.d';
// 获取示例模板列表
export const getStoreList = (params: object) => {
    return request<StoreFilterResult>({
        url: 'store/store/index/',
        method: 'get',
        params,
    });
}
// 示例模板列表页面批量操作
export const batchSubmit = (type: string, data: object) => {
    return request({
        url: 'store/store/batch/?type=' + type,
        method: 'post',
        data,
    });
}
// 示例模板列表页面删除项
export const delStore = (data: object) => {
    return request({
        url: 'store/store/del/',
        method: 'post',
        data,
    });
}
// 示例模板列表页面更新项
export const updateStoreFiled = (data: object) => {
    return request({
        url: 'store/store/update_field/',
        method: 'post',
        data,
    });
}
// 获取示例模板详情
export const getStore = (action: string, params: object) => {
    return request<StoreFormResult>({
        url: 'store/store/' + action + '/',
        method: 'get',
        params
    });
}
// 更新示例模板
export const updateStore = (operation: string, data: object) => {
    return request({
        url: 'store/store/' + operation + '/',
        method: 'post',
        data
    });
}
