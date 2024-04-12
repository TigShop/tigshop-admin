import request from '@/utils/request';
import {SuppliersFilterResult, SuppliersFormResult, SuppliersFilterParams} from '@/types/authority/suppliers'
// 获取商品分类列表
export const getSuppliersList = (params: SuppliersFilterParams) => {
    return request<SuppliersFilterResult>({
        url: 'authority/suppliers/index/',
        method: 'get',
        params,
    });
}

// 删除
export const delSuppliers= (data: object) => {
    return request({
        url: 'authority/suppliers/del/',
        method: 'post',
        data,
    });
}
//获取分类详情
export const getSuppliers  = (action: string, params: object) => {
    return request<SuppliersFormResult>({
        url: 'authority/suppliers/' + action + '/',
        method: 'get',
        params
    });
}

// 更新分类
export const updateSuppliers = (operation: string, data: object) => {
    return request({
        url: 'authority/suppliers/' + operation + '/',
        method: 'post',
        data
    });
}

// 批量操作
export const batchSubmit = (type: string, params: object) => {
    return request({
        url: 'authority/suppliers/batch/?type=' + type,
        method: 'post',
        params,
    });
}
// 列表更新项
export const updateSuppliersField = (data:object) => {
    return request({
        url: 'authority/suppliers/update_field/',
        method: 'post',
        data
    });
}
