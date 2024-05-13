import request from "@/utils/request";
import {AdminUserFilterResult, AdminUserFormResult, AdminUserFilterParams} from "@/types/authority/adminUser"
// 获取商品分类列表
export const getAdminUserList = (params: AdminUserFilterParams) => {
    return request<AdminUserFilterResult>({
        url: "authority/admin_user/list",
        method: "get",
        params,
    });
}

// 删除
export const delAdminUser= (data: object) => {
    return request({
        url: "authority/admin_user/del",
        method: "post",
        data,
    });
}
//获取分类详情
export const getAdminUser  = (action: string, params: object) => {
    return request<AdminUserFormResult>({
        url: "authority/admin_user/" + action,
        method: "get",
        params
    });
}

// 更新分类
export const updateAdminUser = (operation: string, data: object) => {
    return request({
        url: "authority/admin_user/" + operation,
        method: "post",
        data
    });
}

// 批量操作
export const batchSubmit = (type: string, params: object) => {
    return request({
        url: "authority/admin_user/batch/?type=" + type,
        method: "post",
        params,
    });
}
// 列表更新项
export const updateAdminUserField = (data:object) => {
    return request({
        url: "authority/admin_user/update_field",
        method: "post",
        data
    });
}
