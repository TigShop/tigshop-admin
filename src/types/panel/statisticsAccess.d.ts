export interface statisticsAccessFilterParams {
    start_time: string;
    end_time: string;
    is_hits: number;
}

export interface statisticsAccessFilterState {
    filter_result: FilterResult;
    errcode:       number;
    message:       string;
}

export interface FilterResult {
    horizontal_axis:   string[];
    longitudinal_axis: number[];
}
