import request from "@/utils/request";
import type {LogisticsCompanyFilterParams, LogisticsCompanyFilterResult, LogisticsCompanyFormResult} from "@/types/setting/logisticsCompany";


export const getLogisticsCompanyList = (params: LogisticsCompanyFilterParams) => {
    return request<LogisticsCompanyFilterResult>({
        url: "setting/logistics_company/list",
        method: "get",
        params,
    });
}
export const getLogisticsCompanyAll = (params: object) => {
    return request<LogisticsCompanyFilterResult>({
        url: "setting/logistics_company/list",
        method: "get",
        params,
    });
}

// 商品分类页面批量操作
export const batchSubmit = (type: string, data: object) => {
    return request({
        url: "setting/logistics_company/batch?type=" + type,
        method: "post",
        data,
    });
}

// 商品分类页面更新项
export const updateLogisticsCompanyFiled = (data: object) => {
    return request({
        url: "setting/logistics_company/update_field",
        method: "post",
        data,
    });
}

export const delLogisticsCompany = (data: object) => {
    return request({
        url: "setting/logistics_company/del",
        method: "post",
        data,
    });
}

export const getLogisticsCompany = (action: string, params: object) => {
    return request<LogisticsCompanyFormResult>({
        url: "setting/logistics_company/" + action,
        method: "get",
        params
    });
}

export const updateLogisticsCompany = (operation: string, data: object) => {
    return request({
        url: "setting/logistics_company/" + operation,
        method: "post",
        data
    });
}
export const updateLogisticsCompanyField = (data: object) => {
    return request({
        url: "setting/logistics_company/update_field",
        method: "post",
        data
    });
}
