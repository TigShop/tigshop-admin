import request from "@/utils/request";
import type {AuthorityFilterResult, AuthorityFormResult,AuthorityFilterParams} from "@/types/authority/authority";

// 获取商品分类列表
export const getAuthorityList = (params: AuthorityFilterParams) => {
    return request<AuthorityFilterResult>({
        url: 'authority/list',
        method: 'get',
        params,
    });
}

export const getAllAuthority = (params?: object) => {
    return request<AuthorityFormResult>({
        url: 'authority/get_all_authority',
        method: 'get',
        params,
    });
}

// 商品分类页面批量操作
export const batchSubmit = (type: string, data: object) => {
    return request({
        url: 'authority/batch/?type=' + type,
        method: 'post',
        data,
    });
}

// 商品分类页面更新项
export const updateAuthorityFiled = (data: object) => {
    return request({
        url: 'authority/update_field',
        method: 'post',
        data,
    });
}

export const delAuthority = (data: object) => {
    return request({
        url: 'authority/del',
        method: 'post',
        data,
    });
}

export  const getAuthority = (action: string, params: object) => {
    return request<AuthorityFormResult>({
        url: 'authority/' + action,
        method: 'get',
        params
    });
}

export const updateAuthority = (operation: string, data: object) => {
    return request({
        url: 'authority/' + operation,
        method: 'post',
        data
    });
}



