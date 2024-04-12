// 列表查询时筛选参数类型
export interface SignInSettingFilterParams {
    page: number;
    size: number;
    sort_field: string,
    sort_order: string,
    keyword?: string;
}

// 获取列表返回参数类型
export interface SignInSettingFilterResult {
    filter_result: SignInSettingFilterState[];
    filter: {
        page: number;
    };
    total: number;
}
export interface SignInSettingFilterState {
    id?: number;
    name?: string;
    points?: number;
    day_num?: number;
}


// 获取详情返回参数类型
export interface SignInSettingFormResult {
    item: SignInSettingFormState;
}
export interface SignInSettingFormState {
    id?: number;
    name?: string;
    points?: number;
    day_num?: number;
}
