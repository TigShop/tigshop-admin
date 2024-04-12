import request from '@/utils/request';
import type {UserRechargeOrderFilterParams, UserRechargeOrderFilterResult, UserRechargeOrderFormResult} from '@/types/finance/userRechargeOrder.d'
// 获取商品分类列表
export const getUserRechargeOrderList = (params: UserRechargeOrderFilterParams) => {
    return request<UserRechargeOrderFilterResult>({
        url: 'finance/user_recharge_order/index/',
        method: 'get',
        params,
    });
}

// 删除
export const delUserRechargeOrder= (data: object) => {
    return request({
        url: 'finance/user_recharge_order/del/',
        method: 'post',
        data,
    });
}

export const recallUserRechargeOrder= (data: object) => {
    return request({
        url: 'finance/user_recharge_order/recall/',
        method: 'post',
        data,
    });
}
//获取分类详情
export const getUserRechargeOrder  = (action: string, params: object) => {
    return request<UserRechargeOrderFormResult>({
        url: 'finance/user_recharge_order/' + action + '/',
        method: 'get',
        params
    });
}

// 更新分类
export const updateUserRechargeOrder = (operation: string, data: object) => {
    return request({
        url: 'finance/user_recharge_order/' + operation + '/',
        method: 'post',
        data
    });
}

// 批量操作
export const batchSubmit = (type: string, params: object) => {
    return request({
        url: 'finance/user_recharge_order/batch/?type=' + type,
        method: 'post',
        params,
    });
}
