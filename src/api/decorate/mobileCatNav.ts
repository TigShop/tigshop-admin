import request from "@/utils/request";
import type {MobileCatNavFilterParams, MobileCatNavFilterResult,MobileCatNavFormResult} from "@/types/decorate/mobileCatNav.d";
// 获取移动端首页分类栏
export const getMobileCatNavList = (params: MobileCatNavFilterParams) => {
    return request<MobileCatNavFilterResult>({
        url: "decorate/decorate/mobile_cat_nav/list",
        method: "get",
        params,
    });
}

// PC导航栏页面批量操作
export const batchSubmit = (type: string, data: object) => {
    return request({
        url: "decorate/decorate/mobile_cat_nav/batch?type=" + type,
        method: "post",
        data,
    });
}

// PC导航栏页面更新项
export const updateMobileCatNavFiled = (data: object) => {
    return request({
        url: "decorate/decorate/mobile_cat_nav/update_field",
        method: "post",
        data,
    });
}

export const delMobileCatNav = (data: object) => {
    return request({
        url: "decorate/decorate/mobile_cat_nav/del",
        method: "post",
        data,
    });
}

export  const getMobileCatNavInfo = (action: string, params: object) => {
    return request<MobileCatNavFormResult>({
        url: "decorate/decorate/mobile_cat_nav/" + action,
        method: "get",
        params
    });
}


export const updateMobileCatNav = (operation: string, data: object) => {
    return request({
        url: "decorate/decorate/mobile_cat_nav/" + operation,
        method: "post",
        data
    });
}
