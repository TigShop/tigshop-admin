import request from "@/utils/request";
import type {
    ProductFilterParams,
    ProductFilterResult,
    ProductFormResult,
    ProductParticipleFormResult
} from "@/types/product/product.d";

// 获取商品列表
export const getProductList = (params: ProductFilterParams) => {
    return request<ProductFilterResult>({
        url: "product/product/list",
        method: "get",
        params,
    });
};
// 商品列表页面批量操作
export const batchSubmit = (type: string, data: object) => {
    return request({
        url: "product/product/batch?type=" + type,
        method: "post",
        data,
    });
};
// 商品列表移至回收站
export const recycleProduct = (data: object) => {
    return request({
        url: "product/product/recycle",
        method: "post",
        data,
    });
};
// 商品列表页面删除项
export const delProduct = (data: object) => {
    return request({
        url: "product/product/del",
        method: "post",
        data,
    });
};
// 商品列表页面更新项
export const updateProductFiled = (data: object) => {
    return request({
        url: "product/product/update_field",
        method: "post",
        data,
    });
};
// 获取商品详情
export const getProduct = (action: string, params: object) => {
    return request<ProductFormResult>({
        url: "product/product/" + action,
        method: "get",
        params,
    });
};
// 获取商品搜索关键词
export const getParticiple = (params: object) => {
    return request<ProductParticipleFormResult>({
        url: "product/get_participle",
        method: "get",
        params,
    });
};
// 更新商品
export const updateProduct = (operation: string, data: object) => {
    return request({
        url: "product/product/" + operation,
        method: "post",
        data,
    });
};

// 获取运费模板
export const getShippingTplList = () => {
    return request<any>({
        url: "product/product/shipping_tpl_list",
        method: "get"
    });
};

// 批量修改商品
export const BatchProduct = (data: object) => {
    return request({
        url: "product/product_batch/product_batch_edit",
        method: "post",
        data,
    });
};
