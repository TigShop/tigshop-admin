
export interface UserBalanceLogFilterParams {
    page: number,
    size: number,
    sort_field: string,
    sort_order: string,
    keyword?: string;
}

// 获取列表返回参数类型
export interface UserBalanceLogFilterState {
    log_id?: number;
    change_time?: string;
    username?: string;
    change_desc?: string;
    balance?: string;
    frozen_balance?: string;
}
export interface UserBalanceLogFilterResult {
    filter_result: UserBalanceLogFilterState[];
    filter: UserBalanceLogFilterParams;
    total: number;
}





