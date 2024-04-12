// 列表查询时筛选参数类型
export interface IntegralLogFilterParams {
    page: number,
    size: number,
    sort_field: string,
    sort_order: string,
    keyword?: string;
}

// 获取列表返回参数类型
export interface IntegralLogFilterState {
    log_id: number;
    user_id: number;
    username: string;
    points: number;
    change_time: string;
    change_desc: string;
    change_type: number;
}
export interface IntegralLogFilterResult {
    filter_result: IntegralLogFilterState[];
    filter: IntegralLogFilterParams;
    total: number;
}



