import request from '@/utils/request';
import { RechargeSettingFilterResult, RechargeSettingFormResult } from '@/types/promotion/rechargeSetting.d';
// 获取余额充值列表
export const getRechargeSettingList = (params: object) => {
    return request<RechargeSettingFilterResult>({
        url: 'promotion/recharge_setting/index/',
        method: 'get',
        params,
    });
}
// 余额充值列表页面批量操作
export const batchSubmit = (type: string, data: object) => {
    return request({
        url: 'promotion/recharge_setting/batch/?type=' + type,
        method: 'post',
        data,
    });
}
// 余额充值列表页面删除项
export const delRechargeSetting = (data: object) => {
    return request({
        url: 'promotion/recharge_setting/del/',
        method: 'post',
        data,
    });
}
// 余额充值列表页面更新项
export const updateRechargeSettingFiled = (data: object) => {
    return request({
        url: 'promotion/recharge_setting/update_field/',
        method: 'post',
        data,
    });
}
// 获取余额充值详情
export const getRechargeSetting = (action: string, params: object) => {
    return request<RechargeSettingFormResult>({
        url: 'promotion/recharge_setting/' + action + '/',
        method: 'get',
        params
    });
}
// 更新余额充值
export const updateRechargeSetting = (operation: string, data: object) => {
    return request({
        url: 'promotion/recharge_setting/' + operation + '/',
        method: 'post',
        data
    });
}
