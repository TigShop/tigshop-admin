import request from '@/utils/request';
import type {RegionFilterParams, RegionFilterResult, RegionFormResult} from '@/types/setting/region'
// 获取商品分类列表
export const getRegionList = (params: Object) => {
    return request<RegionFilterResult>({
        url: 'setting/region/index/',
        method: 'get',
        params,
    });
}
export const getChildRegionList = (params: RegionFilterParams) => {
    return request<RegionFilterResult>({
        url: 'setting/region/get_child_region/',
        method: 'get',
        params,
    });
}

export const getRegionTreeList = (params: RegionFilterParams) => {
    return request<RegionFilterResult>({
        url: 'setting/region/get_all_region_tree/',
        method: 'get',
        params,
    });
}

// 删除
export const delRegion= (data: object) => {
    return request({
        url: 'setting/region/del/',
        method: 'post',
        data,
    });
}
//获取分类详情
export const getRegion  = (action: string, params: object) => {
    return request<RegionFormResult>({
        url: 'setting/region/' + action + '/',
        method: 'get',
        params
    });
}

// 更新分类
export const updateRegion = (operation: string, data: object) => {
    return request({
        url: 'setting/region/' + operation + '/',
        method: 'post',
        data
    });
}

// 批量操作
export const batchSubmit = (type: string, params: object) => {
    return request({
        url: 'setting/region/batch/?type=' + type,
        method: 'post',
        params,
    });
}
// 列表更新项
export const updateRegionField = (data:object) => {
    return request({
        url: 'setting/region/update_field/',
        method: 'post',
        data
    });
}
