import request from '@/utils/request';
import { SignInSettingFilterResult, SignInSettingFormResult } from '@/types/promotion/signInSetting.d';
// 获取签到设置列表
export const getSignInSettingList = (params: object) => {
    return request<SignInSettingFilterResult>({
        url: 'promotion/sign_in_setting/index/',
        method: 'get',
        params,
    });
}
// 获取签到设置详情
export const getSignInSetting = (action: string, params: object) => {
    return request<SignInSettingFormResult>({
        url: 'promotion/sign_in_setting/' + action + '/',
        method: 'get',
        params
    });
}
// 更新签到设置
export const updateSignInSetting = (operation: string, data: object) => {
    return request({
        url: 'promotion/sign_in_setting/' + operation + '/',
        method: 'post',
        data
    });
}
