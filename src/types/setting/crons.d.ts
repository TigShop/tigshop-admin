// 列表查询时筛选参数类型
export interface CronsFilterParams {
    page: number;
    size: number;
    sort_field: string,
    sort_order: string,
}

// 获取列表返回参数类型
export interface CronsFilterResult {
    filter_result: CronsFilterState[];
    filter: {
        page: number;
    };
    total: number;
}
export interface CronsFilterState {
    cron_id: number;
    cron_name?: string;
    cron_sn?: string;
    cron_desc?: string;
}


// 获取详情返回参数类型
export interface CronsFormResult {
    item: CronsFormState;
}
export interface CronsFormState {
    cron_id?: number;
    cron_type?: number;
    cron_name?: string;
    cron_sn?: string;
    cron_desc?: string;
    is_enabled?: number;
    just_once?: number;
}
