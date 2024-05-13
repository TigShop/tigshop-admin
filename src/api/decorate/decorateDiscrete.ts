// 零散的装修页面模块
import request from '@/utils/request';
import { FormResult } from '@/types/decorate/decorateDiscrete';
// 获取装修详情
export const getDecorateDiscrete = (params: object) => {
    return request<FormResult>({
        url: 'decorate/decorate_discrete/edit',
        method: 'get',
        params
    });
}
// 更新装修
export const updateDecorateDiscrete = (data: object) => {
    return request({
        url: 'decorate/decorate_discrete/update',
        method: 'post',
        data
    });
}
