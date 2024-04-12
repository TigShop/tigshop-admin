import request from '@/utils/request';
import type {BrandFilterParams, BrandFilterResult, BrandFormResult, BrandSearchFilterResult} from "@/types/product/brand.d";

// 获取商品分类列表
export const getBrandList = (params: BrandFilterParams) => {
    return request<BrandFilterResult>({
        url: 'product/brand/index/',
        method: 'get',
        params,
    });
}

export const getBrandSearch = () => {
    return request<BrandSearchFilterResult>({
        url: 'product/brand/search/',
        method: 'get',
    });
}

// 删除
export const delBrand= (data: object) => {
    return request({
        url: 'product/brand/del/',
        method: 'post',
        data,
    });
}
//获取分类详情
export const getBrand  = (action: string, params: object) => {
    return request<BrandFormResult>({
        url: 'product/brand/' + action + '/',
        method: 'get',
        params
    });
}

// 更新分类
export const updateBrand = (operation: string, data: object) => {
    return request({
        url: 'product/brand/' + operation + '/',
        method: 'post',
        data
    });
}

// 批量操作
export const batchSubmit = (type: string, params: object) => {
    return request({
        url: 'product/brand/batch/?type=' + type,
        method: 'post',
        params,
    });
}
//更新首字母
export const updateFirstWorld = () => {
    return request({
        url: 'product/brand/update_fisrt_word/',
        method: 'post',
    });
}
// 列表更新项
export const updateBrandField = (data:object) => {
    return request({
        url: 'product/brand/update_field/',
        method: 'post',
        data
    });
}
