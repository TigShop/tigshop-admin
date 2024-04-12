import request from '@/utils/request';
import {UserRankFilterParams, UserRankFilterResult, UserRankFormResult} from '@/types/user/userRank.d'
// 获取商品分类列表
export const getUserRankList = (params: UserRankFilterParams) => {
    return request<UserRankFilterResult>({
        url: 'user/user_rank/index/',
        method: 'get',
        params,
    });
}

// 删除
export const delUserRank= (data: object) => {
    return request({
        url: 'user/user_rank/del/',
        method: 'post',
        data,
    });
}

export const recallUserRank= (data: object) => {
    return request({
        url: 'user/user_rank/recall/',
        method: 'post',
        data,
    });
}
//获取分类详情
export const getUserRank  = (action: string, params: object) => {
    return request<UserRankFormResult>({
        url: 'user/user_rank/' + action + '/',
        method: 'get',
        params
    });
}

// 更新分类
export const updateUserRank = (operation: string, data: object) => {
    return request({
        url: 'user/user_rank/' + operation + '/',
        method: 'post',
        data
    });
}

// 批量操作
export const batchSubmit = (type: string, params: object) => {
    return request({
        url: 'user/user_rank/batch/?type=' + type,
        method: 'post',
        params,
    });
}
export const updateUserRankField = (data:object) => {
    return request({
        url: 'user/user_rank/update_field/',
        method: 'post',
        data
    });
}
