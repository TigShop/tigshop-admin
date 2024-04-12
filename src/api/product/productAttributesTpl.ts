import request from '@/utils/request';
import type {ProductAttributesTplFilterParams, ProductAttributesTplFilterResult, ProductAttributesTplFormResult} from '@/types/product/productAttributesTpl';
// 获取示例模板列表
export const getProductAttributesTplList = (params: ProductAttributesTplFilterParams) => {
    return request<ProductAttributesTplFilterResult>({
        url: 'product/product_attributes_tpl/list/',
        method: 'get',
        params,
    });
}

export const batchSubmit = (type: string, data: object) => {
    return request({
        url: 'product/product_attributes_tpl/batch/?type=' + type,
        method: 'post',
        data,
    });
}

export const delProductAttributesTpl = (data: object) => {
    return request({
        url: 'product/product_attributes_tpl/del/',
        method: 'post',
        data,
    });
}

export const updateProductAttributesTplFiled = (data: object) => {
    return request({
        url: 'product/product_attributes_tpl/edit_tpl_name/',
        method: 'post',
        data,
    });
}

export const getProductAttributesTpl= (action: string, params: object) => {
    return request<ProductAttributesTplFormResult>({
        url: 'product/product_attributes_tpl/' + action + '/',
        method: 'get',
        params
    });
}

export const updateProductAttributesTpl = (operation: string, data: object) => {
    return request({
        url: 'product/product_attributes_tpl/' + operation + '/',
        method: 'post',
        data
    });
}

