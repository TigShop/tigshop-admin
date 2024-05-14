import request from "@/utils/request";
import type {PcNavigationFilterParams, PcNavigationFilterResult, PcNavigationFormResult, PcNavigationLinkResult} from "@/types/decorate/pcNavigation";
// 获取PC导航栏列表
export const getPcNavigationList = (params: PcNavigationFilterParams) => {
    return request<PcNavigationFilterResult>({
        url: "decorate/decorate/pc_navigation/list",
        method: "get",
        params,
    });
}

// PC导航栏页面批量操作
export const batchSubmit = (type: string, data: object) => {
    return request({
        url: "decorate/decorate/pc_navigation/batch?type=" + type,
        method: "post",
        data,
    });
}

// PC导航栏页面更新项
export const updatePcNavigationFiled = (data: object) => {
    return request({
        url: "decorate/decorate/pc_navigation/update_field",
        method: "post",
        data,
    });
}

export const delPcNavigation = (data: object) => {
    return request({
        url: "decorate/decorate/pc_navigation/del",
        method: "post",
        data,
    });
}

export  const getPcNavigation = (action: string, params: object) => {
    return request<PcNavigationFormResult>({
        url: "decorate/decorate/pc_navigation/" + action,
        method: "get",
        params
    });
}

export  const getParentNav = (params: object) => {
    return request<PcNavigationFilterResult>({
        url: "decorate/decorate/pc_navigation/get_parent_nav",
        method: "get",
        params
    });
}

export const updatePcNavigation = (operation: string, data: object) => {
    return request({
        url: "decorate/decorate/pc_navigation/" + operation,
        method: "post",
        data
    });
}

export const updatePcNavigationField = (data:object) => {
    return request({
        url: "decorate/decorate/pc_navigation/update_field",
        method: "post",
        data
    });
}

export const getSelectLinkList = () => {
    return request<PcNavigationLinkResult>({
        url: "decorate/decorate/pc_navigation/select_link",
        method: "get"
    });
}
