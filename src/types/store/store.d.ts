// 列表查询时筛选参数类型
export interface StoreFilterParams {
    page: number;
    size: number;
    sort_field?: string,
    sort_order?: string,
    keyword?: string;
    is_self?: number;
    store_rank_id?: number;
    store_status?: number;
    store_id?: number;
    store_title?: string;
}

// 获取列表返回参数类型
export interface StoreFilterResult {
    filter_result: StoreFilterState[];
    filter: {
        page: number;
    };
    total: number;
}
export interface StoreFilterState {
    store_id: number;
    store_title?: string;
    store_logo?: string;
    user_name?: string;
    is_self?: number;
    store_rank_id?: number;
    store_rank_name?: string;
    store_status?: number;
}


// 获取详情返回参数类型
export interface StoreFormResult {
    item: StoreFormState[];
}
export interface StoreFormState {
    store_id?: number;
    store_title?: string;
    store_logo?: string;
    user_name?: string;
    is_self?: number;
    store_rank_id?: number;
    store_rank_name?: string;
    store_status?: number;
}
