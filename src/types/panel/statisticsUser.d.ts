export interface statisticsUserFilterParams {
    start_time: string;
    is_export?: string;
    end_time: string;
}

export interface statisticsUserFilterState {
    filter_result: FilterResult;
    errcode: number;
    message: string;
}

export interface FilterResult {
    visit_num: number | string;
    visit_growth_rate: number;
    view_num: number;
    view_growth_rate: number;
    add_user_num: number;
    add_user_growth_rate: number;
    deal_user_num: number;
    deal_user_growth_rate: unknown;
    visit_to_user: number;
    visit_to_user_rate: number;
    recharge_user_num: number;
    recharge_user_growth_rate: unknown;
}
