import type {ShippingTypeFilterParams, ShippingTypeFilterResult, ShippingTypeFormResult} from "@/types/setting/shippingType.d";
import request from "@/utils/request";

export const getShippingTypeList = (params: ShippingTypeFilterParams) => {
    return request<ShippingTypeFilterResult>({
        url: "setting/shipping_type/list",
        method: "get",
        params,
    });
}
export const getShippingTypeAll = (params: object) => {
    return request<ShippingTypeFilterResult>({
        url: "setting/shipping_type/list",
        method: "get"
    });
}
// 商品分类页面批量操作
export const batchSubmit = (type: string, data: object) => {
    return request({
        url: "setting/shipping_type/batch?type=" + type,
        method: "post",
        data,
    });
}


export const delShippingType = (data: object) => {
    return request({
        url: "setting/shipping_type/del",
        method: "post",
        data,
    });
}

export const getShippingType = (action: string, params: object) => {
    return request<ShippingTypeFormResult>({
        url: "setting/shipping_type/" + action,
        method: "get",
        params
    });
}

export const updateShippingType = (operation: string, data: object) => {
    return request({
        url: "setting/shipping_type/" + operation,
        method: "post",
        data
    });
}
export const updateShippingTypeField = (data: object) => {
    return request({
        url: "setting/shipping_type/update_field",
        method: "post",
        data
    });
}
