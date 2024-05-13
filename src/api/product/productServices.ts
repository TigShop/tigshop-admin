import request from "@/utils/request";
import type { ProductServicesFilterParams, ProductServicesFilterResult, ProductServicesFormResult} from "@/types/product/productServices";
// 获取示例模板列表
export const getProductServicesList = (params: ProductServicesFilterParams) => {
    return request<ProductServicesFilterResult>({
        url: "product/product_services/list",
        method: "get",
        params,
    });
}
// 示例模板列表页面批量操作
export const batchSubmit = (type: string, data: object) => {
    return request({
        url: "product/product_services/batch?type=" + type,
        method: "post",
        data,
    });
}
// 示例模板列表页面删除项
export const delProductServices = (data: object) => {
    return request({
        url: "product/product_services/del",
        method: "post",
        data,
    });
}
// 示例模板列表页面更新项
export const updateProductServicesFiled = (data: object) => {
    return request({
        url: "product/product_services/update_field",
        method: "post",
        data,
    });
}
// 获取示例模板详情
export const getProductServices = (action: string, params: object) => {
    return request<ProductServicesFormResult>({
        url: "product/product_services/" + action,
        method: "get",
        params
    });
}
// 更新示例模板
export const updateProductServices = (operation: string, data: object) => {
    return request({
        url: "product/product_services/" + operation,
        method: "post",
        data
    });
}
