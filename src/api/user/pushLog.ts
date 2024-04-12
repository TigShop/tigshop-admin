import request from '@/utils/request';
import {PushLogFilterParams, PushLogFilterResult, PushLogFormResult} from '@/types/user/pushLog.d'
// 获取商品分类列表
export const getPushLogList = (params: PushLogFilterParams) => {
    return request<PushLogFilterResult>({
        url: 'user/push_log/index/',
        method: 'get',
        params,
    });
}

// 删除
export const delPushLog= (data: object) => {
    return request({
        url: 'user/push_log/del/',
        method: 'post',
        data,
    });
}

export const recallPushLog= (data: object) => {
    return request({
        url: 'user/push_log/recall/',
        method: 'post',
        data,
    });
}
//获取分类详情
export const getPushLog  = (action: string, params: object) => {
    return request<PushLogFormResult>({
        url: 'user/push_log/' + action + '/',
        method: 'get',
        params
    });
}

// 更新分类
export const updatePushLog = (operation: string, data: object) => {
    return request({
        url: 'user/push_log/' + operation + '/',
        method: 'post',
        data
    });
}

// 批量操作
export const batchSubmit = (type: string, params: object) => {
    return request({
        url: 'user/push_log/batch/?type=' + type,
        method: 'post',
        params,
    });
}
