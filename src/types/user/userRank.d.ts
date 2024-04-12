// 列表查询时筛选参数类型
export interface UserRankFilterParams {
    page: number,
    size: number,
    sort_field: string,
    sort_order: string,
    keyword?: string;
    is_page?: number,
}

// 获取列表返回参数类型
export interface UserRankFilterState {
    rank_id?: number;
    rank_name?: string;
    rank_type?: number;
    rank_type_name?: string;
    show_price?: number;
    rank_ico?: string;
    rank_bg?: string;
    min_growth_points?: number;
    max_growth_points?: number;
    discount?: number;
}
export interface UserRankFilterResult {
    filter_result: UserRankFilterState[];
    filter: UserRankFilterParams;
    total: number;
}

export interface UserRankFormResult {
    item: UserRankFormState;
}

// 获取详情返回参数类型
export interface UserRankFormState {
    rank_id?: number;
    rank_name?: string;
    rank_type?: number;
    show_price?: number;
    rank_ico?: string;
    rank_bg?: string;
    min_growth_points?: number;
    max_growth_points?: number;
    discount?: number;
}



// 编辑表单


