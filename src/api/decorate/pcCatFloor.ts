import request from "@/utils/request";
import type {PcCatFloorFilterParams, PcCatFloorFilterResult, PcCatFloorFormResult} from "@/types/decorate/pcCatFloor.d";
// 获取商品分类列表
export const getPcCatFloorList = (params: PcCatFloorFilterParams) => {
    return request<PcCatFloorFilterResult>({
        url: "decorate/pc_cat_floor/list",
        method: "get",
        params,
    });
}

// 商品分类页面批量操作
export const batchSubmit = (type: string, data: object) => {
    return request({
        url: "decorate/pc_cat_floor/batch?type=" + type,
        method: "post",
        data,
    });
}

// 商品分类页面更新项
export const updatePcCatFloorFiled = (data: object) => {
    return request({
        url: "decorate/pc_cat_floor/update_field",
        method: "post",
        data,
    });
}

export const delPcCatFloor = (data: object) => {
    return request({
        url: "decorate/pc_cat_floor/del",
        method: "post",
        data,
    });
}

export  const getPcCatFloor = (action: string, params: object) => {
    return request<PcCatFloorFormResult>({
        url: "decorate/pc_cat_floor/" + action,
        method: "get",
        params
    });
}

export const updatePcCatFloor = (operation: string, data: object) => {
    return request({
        url: "decorate/pc_cat_floor/" + operation,
        method: "post",
        data
    });
}

export const updatePcCatFloorField = (data:object) => {
    return request({
        url: "decorate/pc_cat_floor/update_field",
        method: "post",
        data
    });
}
export const clearPcCatFloorCache = () => {
    return request({
        url: "decorate/pc_cat_floor/clear_cache",
        method: "post"
    });
}

