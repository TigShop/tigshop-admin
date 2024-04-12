
export interface UserWithdrawApplyFilterParams {
    page: number,
    size: number,
    sort_field: string,
    sort_order: string,
    keyword?: string;
    status?: number;
    account_type?: number;
}

// 获取列表返回参数类型
export interface UserWithdrawApplyFilterState {
    id: number;
    user_id: number;
    amount: string;
    add_time: string;
    finished_time: string;
    postscript: string;
    status: number;
    account_data?: AccountDataItem;
}
export interface UserWithdrawApplyFilterResult {
    filter_result: UserWithdrawApplyFilterState[];
    filter: UserWithdrawApplyFilterParams;
    total: number;
}

export interface UserWithdrawApplyFormResult {
    item: UserWithdrawApplyFormState;
}

// 获取详情返回参数类型
export interface UserWithdrawApplyFormState {
    id?: number;
    user_id?: number;
    amount: number;
    add_time?: string;
    finished_time?: string;
    postscript?: string;
    status?: number;
    status_type?: string;
    account_data: AccountDataItem;
}
export interface AccountDataItem{
    account_type?:number;
    account_name?:string;
    account_no?:string;
    identity?:string;
    bank_name?:string;
}





