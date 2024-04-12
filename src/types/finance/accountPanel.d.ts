
export interface AccountPanelFilterParams {
    page: number,
    size: number,
    sort_field: string,
    sort_order: string,
    search_date?: string[];
    search_start_date?: string;
    search_end_date?: string;
}

// 获取列表返回参数类型
export interface AccountPanelFilterState {
    voucher_amount: number;
    to_cash_amount: number;
    balance: number;
    frozen_money: number;
    surplus: number;
    use_points: number;
}
export interface AccountPanelFilterResult {
    filter_result: AccountPanelFilterState;
    filter: AccountPanelFilterParams;
    total: number;
}





