import type {ShippingTplFilterParams, ShippingTplFilterResult, ShippingTplFormResult} from "@/types/setting/shippingTpl.d";
import request from "@/utils/request";

export const getShippingTplList = (params: ShippingTplFilterParams) => {
    return request<ShippingTplFilterResult>({
        url: "setting/shipping_tpl/list",
        method: "get",
        params,
    });
}
export const getShippingTplAll = () => {
    return request<ShippingTplFilterResult>({
        url: "setting/shipping_tpl/get_all",
        method: "get"
    });
}

// 商品分类页面批量操作
export const batchSubmit = (type: string, data: object) => {
    return request({
        url: "setting/shipping_tpl/batch?type=" + type,
        method: "post",
        data,
    });
}


export const delShippingTpl = (data: object) => {
    return request({
        url: "setting/shipping_tpl/del",
        method: "post",
        data,
    });
}

export const getShippingTpl = (action: string, params: object) => {
    return request<ShippingTplFormResult>({
        url: "setting/shipping_tpl/" + action,
        method: "get",
        params
    });
}

export const updateShippingTpl = (operation: string, data: object) => {
    return request({
        url: "setting/shipping_tpl/" + operation,
        method: "post",
        data
    });
}
export const updateShippingTplField = (data: object) => {
    return request({
        url: "setting/shipping_tpl/update_field",
        method: "post",
        data
    });
}
