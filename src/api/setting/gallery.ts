import type {GalleryFilterParams, GalleryFormResult} from "@/types/setting/gallery.d";
import request from "@/utils/request";
import { AnyAaaaRecord } from "dns";

// export const getAdminInfo = (params:Object) => {
//     return request<CommonFilterParams>({
//         url: "authority/admin_user/detail",
//         method: "get",
//         params,
//     });
// }
// export const adminInfoSubmit = (data: object) => {
//     return request({
//         url: "authority/admin_user/modify_manage_accounts",
//         method: "post",
//         data,
//     });
// }

// export const getAdminCode = (params: object) => {
//     return request({
//         url: "authority/admin_user/get_code",
//         method: "get",
//         params,
//     });
// }

// export const getShippingTpl = (action: string, params: object) => {
//     return request<ShippingTplFormResult>({
//         url: "setting/shipping_tpl/" + action,
//         method: "get",
//         params
//     });
// }

// export const updateShippingTpl = (operation: string, data: object) => {
//     return request({
//         url: "setting/shipping_tpl/" + operation,
//         method: "post",
//         data
//     });
// }

export const getGalleryList = (params:Object) => {
    return request<GalleryFormResult>({
        url: "setting/gallery/list",
        method: "get",
        params,
    });
}

export const getGalleryPicList = (params:Object) => {
    return request<any>({
        url: "setting/gallery_pic/list",
        method: "get",
        params,
    });
}

export const getGalleryInfo = (action: string, params:Object) => {
    return request<GalleryFilterParams>({
        url: "setting/gallery/" + action,
        method: "get",
        params,
    });
}

export const updateGalleryInfo = (operation: string, data: object) => {
    return request({
        url: "setting/gallery/" + operation,
        method: "post",
        data
    });
}
export const updateGalleryField = (data: object) => {
    return request({
        url: "setting/gallery/update_field",
        method: "post",
        data
    });
}
export const updateGalleryPicField = (data: object) => {
    return request({
        url: "setting/gallery_pic/update_field",
        method: "post",
        data
    });
}
export const delGalleryPicField = (data: object) => {
    return request({
        url: "setting/gallery_pic/del",
        method: "post",
        data
    });
}
export const delGalleryField = (data: object) => {
    return request({
        url: "setting/gallery/del",
        method: "post",
        data
    });
}