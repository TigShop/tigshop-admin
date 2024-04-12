import request from '@/utils/request';
import type {RefundApplyFilterParams, RefundApplyFilterResult, RefundApplyFormResult} from '@/types/finance/refundApply.d'
// 获取商品分类列表
export const getRefundApplyList = (params: RefundApplyFilterParams) => {
    return request<RefundApplyFilterResult>({
        url: 'finance/refund_apply/index/',
        method: 'get',
        params,
    });
}

// 删除
export const delRefundApply= (data: object) => {
    return request({
        url: 'finance/refund_apply/del/',
        method: 'post',
        data,
    });
}


//获取分类详情
export const getRefundApply  = (action: string, params: object) => {
    return request<RefundApplyFormResult>({
        url: 'finance/refund_apply/' + action + '/',
        method: 'get',
        params
    });
}

// 更新分类
export const updateRefundApply = (operation: string, data: object) => {
    return request({
        url: 'finance/refund_apply/' + operation + '/',
        method: 'post',
        data
    });
}

// 批量操作
export const batchSubmit = (type: string, params: object) => {
    return request({
        url: 'finance/refund_apply/batch/?type=' + type,
        method: 'post',
        params,
    });
}
