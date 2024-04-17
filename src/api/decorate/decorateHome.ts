import request from "@/utils/request";
// 获取装修页面列表
export const getDecorateList = (params: object) => {
    return request({
        url: "decorate/decorate_home/index/",
        method: "get",
        params,
    });
};
// 装修页面列表页面批量操作
export const batchSubmit = (type: string, data: object) => {
    return request({
        url: "decorate/decorate_home/batch/?type=" + type,
        method: "post",
        data,
    });
};
// 装修页面列表页面删除项
export const delDecorate = (data: object) => {
    return request({
        url: "decorate/decorate_home/del/",
        method: "post",
        data,
    });
};
// 装修页面列表页面更新项
export const updateDecorateFiled = (data: object) => {
    return request({
        url: "decorate/decorate_home/update_field/",
        method: "post",
        data,
    });
};
// 获取装修页面详情
export const getDecorate = (action: string, params: object) => {
    return request({
        url: "decorate/decorate_home/" + action + "/",
        method: "get",
        params,
    });
};
// 更新装修页面
export const updateDecorate = (operation: string, data: object) => {
    return request({
        url: "decorate/decorate_home/" + operation + "/",
        method: "post",
        data,
    });
};
