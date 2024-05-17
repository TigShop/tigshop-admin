import request from "@/utils/request";
import type {CategoryFilterParams, CategoryFilterResult, CategoryFormResult} from "@/types/product/category";
// 获取商品分类列表
export const getCategoryList = (params: CategoryFilterParams) => {
    return request<CategoryFilterResult>({
        url: "product/category/list",
        method: "get",
        params,
    });
}

export const getAllCategoryList = () => {
    return request<CategoryFilterResult>({
        url: "product/category/get_all_category",
        method: "get"
    });
}

// 商品分类页面批量操作
export const batchSubmit = (type: string, data: object) => {
    return request({
        url: "product/category/batch?type=" + type,
        method: "post",
        data,
    });
}

// 商品分类页面更新项
export const updateCategoryFiled = (data: object) => {
    return request({
        url: "product/category/update_field",
        method: "post",
        data,
    });
}

export const delCategory = (data: object) => {
    return request({
        url: "product/category/del",
        method: "post",
        data,
    });
}

export  const getCategory = (action: string, params: object) => {
    return request<CategoryFormResult>({
        url: "product/category/" + action,
        method: "get",
        params
    });
}

export const updateCategory = (operation: string, data: object) => {
    return request({
        url: "product/category/" + operation,
        method: "post",
        data
    });
}

export const moveCategory = ( data: object) => {
    return request({
        url: "product/category/move_cat",
        method: "post",
        data
    });
}
