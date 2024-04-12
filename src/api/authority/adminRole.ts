import type {AdminRoleFilterParams, AdminRoleFilterResult, AdminRoleFormResult} from "@/types/authority/adminRole.d";
import request from "@/utils/request";

export const getAdminRoleList = (params: AdminRoleFilterParams) => {
    return request<AdminRoleFilterResult>({
        url: 'authority/admin_role/index/',
        method: 'get',
        params,
    });
}

// 商品分类页面批量操作
export const batchSubmit = (type: string, data: object) => {
    return request({
        url: 'authority/admin_role/batch/?type=' + type,
        method: 'post',
        data,
    });
}

export const delAdminRole = (data: object) => {
    return request({
        url: 'authority/admin_role/del/',
        method: 'post',
        data,
    });
}

export  const getAdminRole = (action: string, params: object) => {
    return request<AdminRoleFormResult>({
        url: 'authority/admin_role/' + action + '/',
        method: 'get',
        params
    });
}

export const updateAdminRole = (operation: string, data: object) => {
    return request({
        url: 'authority/admin_role/' + operation + '/',
        method: 'post',
        data
    });
}

export const updateAdminRoleField = (data:object) => {
    return request({
        url: 'authority/admin_role/update_field/',
        method: 'post',
        data
    });
}
