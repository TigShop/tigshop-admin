import request from "@/utils/request";
import {UserFilterParams, UserFilterResult, UserFormResult, UserFundFilterResult} from "@/types/user/user.d"
// 获取会员列表
export const getUserList = (params: UserFilterParams) => {
    return request<UserFilterResult>({
        url: "user/user/list",
        method: "get",
        params,
    });
}

// 删除
export const delUser= (data: object) => {
    return request({
        url: "user/user/del",
        method: "post",
        data,
    });
}

export const recallUser= (data: object) => {
    return request({
        url: "user/user/recall",
        method: "post",
        data,
    });
}
//获取会员详情
export const getUser  = (action: string, params: object) => {
    return request<UserFormResult>({
        url: "user/user/" + action,
        method: "get",
        params
    });
}

// 更新用户信息
export const updateUser = (operation: string, data: object) => {
    return request({
        url: "user/user/" + operation,
        method: "post",
        data
    });
}

// 批量操作
export const batchSubmit = (type: string, params: object) => {
    return request({
        url: "user/user/batch?type=" + type,
        method: "post",
        params,
    });
}
export const updateUserField = (data:object) => {
    return request({
        url: "user/user/update_field",
        method: "post",
        data
    });
}

// 资金管理
export const updateUserFundManagement = (data: object) => {
    return request({
        url: "user/user/fund_management",
        method: "post",
        data
    });
}

export const getUserFundList = (params: UserFilterParams) => {
    return request<UserFundFilterResult>({
        url: "user/user/user_fund_detail",
        method: "get",
        params,
    });
}