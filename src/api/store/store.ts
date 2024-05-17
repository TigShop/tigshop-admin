import request from "@/utils/request";
import type {StoreFilterResult, StoreFormResult} from "@/types/store/store.d";
// 获取商家列表
export const getStoreList = (params: object) => {
    return request<StoreFilterResult>({
        url: "store/store/list",
        method: "get",
        params,
    });
}
// 商家列表页面批量操作
export const batchSubmit = (type: string, data: object) => {
    return request({
        url: "store/store/batch?type=" + type,
        method: "post",
        data,
    });
}
// 商家列表页面删除项
export const delStore = (data: object) => {
    return request({
        url: "store/store/del",
        method: "post",
        data,
    });
}
// 商家列表页面更新项
export const updateStoreFiled = (data: object) => {
    return request({
        url: "store/store/update_field",
        method: "post",
        data,
    });
}
// 获取商家详情
export const getStore = (action: string, params: object) => {
    return request<StoreFormResult>({
        url: "store/store/" + action,
        method: "get",
        params
    });
}
// 更新商家
export const updateStore = (operation: string, data: object) => {
    return request({
        url: "store/store/" + operation,
        method: "post",
        data
    });
}
