// 列表查询时筛选参数类型
export interface RechargeSettingFilterParams {
    page: number;
    size: number;
    sort_field: string,
    sort_order: string,
}

// 获取列表返回参数类型
export interface RechargeSettingFilterResult {
    filter_result: RechargeSettingFilterState[];
    filter: {
        page: number;
    };
    total: number;
}
export interface RechargeSettingFilterState {
    recharge_id: number;
    money?: number;
    discount_money?: number;
    is_show?: number;
    sort_order?: number;
}


// 获取详情返回参数类型
export interface RechargeSettingFormResult {
    item: RechargeSettingFormState;
}
export interface RechargeSettingFormState {
    recharge_id?: number;
    money?: number;
    discount_money?: number;
    is_show?: number;
    sort_order?: number;
}
