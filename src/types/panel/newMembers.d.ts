// 查询参数类型
export interface newMemberFilterParams {
    start_end_time: string;
    is_export?: string;
    date_type: string;
}

// 结果返回类型
export interface newMemberFilterState {
    filter_result: FilterResult;
    errcode: number;
    message: string;
}
export interface FilterResult {
    horizontal_axis: string[];
    longitudinal_axis: number[];
}
