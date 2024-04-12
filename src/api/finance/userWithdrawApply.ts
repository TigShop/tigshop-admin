import request from '@/utils/request';
import type {UserWithdrawApplyFilterParams, UserWithdrawApplyFilterResult, UserWithdrawApplyFormResult} from '@/types/finance/userWithdrawApply.d'
// 获取商品分类列表
export const getUserWithdrawApplyList = (params: UserWithdrawApplyFilterParams) => {
    return request<UserWithdrawApplyFilterResult>({
        url: 'finance/user_withdraw_apply/index/',
        method: 'get',
        params,
    });
}

// 删除
export const delUserWithdrawApply= (data: object) => {
    return request({
        url: 'finance/user_withdraw_apply/del/',
        method: 'post',
        data,
    });
}

export const recallUserWithdrawApply= (data: object) => {
    return request({
        url: 'finance/user_withdraw_apply/recall/',
        method: 'post',
        data,
    });
}
//获取分类详情
export const getUserWithdrawApply  = (action: string, params: object) => {
    return request<UserWithdrawApplyFormResult>({
        url: 'finance/user_withdraw_apply/' + action + '/',
        method: 'get',
        params
    });
}

// 更新分类
export const updateUserWithdrawApply = (operation: string, data: object) => {
    return request({
        url: 'finance/user_withdraw_apply/' + operation + '/',
        method: 'post',
        data
    });
}

// 批量操作
export const batchSubmit = (type: string, params: object) => {
    return request({
        url: 'finance/user_withdraw_apply/batch/?type=' + type,
        method: 'post',
        params,
    });
}
