// 查询参数类型
export interface consumerRankingFilterParams {
    start_time: string;
    end_time: string;
    is_export?: string;
    keyword: string;
    page: number;
    size?: number;
    sort_field?: string;
    sort_order?: string;
}

export interface consumerRankingFilterState {
    filter_result: FilterResult[];
    errcode: number;
    message: string;
    total: number;
}

export interface FilterResult {
    username: string;
    mobile: string;
    order_num: number;
    order_amount: string;
}
