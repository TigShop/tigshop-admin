import request from '@/utils/request';
import {AftersalesFilterParams, AftersalesFilterResult, AftersalesFormResult} from '@/types/order/aftersales'
// 获取售后申请列表
export const getAftersalesList = (params: AftersalesFilterParams) => {
    return request<AftersalesFilterResult>({
        url: 'order/aftersales/list/',
        method: 'get',
        params,
    });
}
// 删除
// export const delAftersales= (data: object) => {
//     return request({
//         url: 'order/aftersales/del/',
//         method: 'post',
//         data,
//     });
// }
//获取售后详情
export const getAftersales  = (action: string, params: object) => {
    return request<AftersalesFormResult>({
        url: 'order/aftersales/' + action + '/',
        method: 'get',
        params
    });
}
// 更新售后操作
export const updateAftersales = ( data: object) => {
    return request({
        url: 'order/aftersales/update/',
        method: 'post',
        data
    });
}
// 批量操作
export const batchSubmit = (type: string, params: object) => {
    return request({
        url: 'order/aftersales/batch/?type=' + type,
        method: 'post',
        params,
    });
}
// 列表更新项
export const updateAftersalesField = (data:object) => {
    return request({
        url: 'order/aftersales/update_field/',
        method: 'post',
        data
    });
}

//发布留言
export const addMessage = (data:object) => {
    return request({
        url: 'order/aftersales/record/',
        method: 'post',
        data
    });
}

//确认收货
export const updataConfirmReceipt = (data:object) => {
    return request({
        url: '/order/aftersales/receive',
        method: 'post',
        data
    });
}