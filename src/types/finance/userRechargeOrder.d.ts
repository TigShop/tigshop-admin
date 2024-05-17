
export interface UserRechargeOrderFilterParams {
    page: number,
    size: number,
    sort_field: string,
    sort_order: string,
    keyword?: string;
    account_type?: number;
    status?: number;
}

// 获取列表返回参数类型
export interface UserRechargeOrderFilterState {
    order_id: number;
    user_id: number;
    amount: string;
    add_time: string;
    finished_time: string;
    postscript: string;
    status: number;
}
export interface UserRechargeOrderFilterResult {
    filter_result: UserRechargeOrderFilterState[];
    filter: UserRechargeOrderFilterParams;
    total: number;
}

export interface UserRechargeOrderFormResult {
    item: UserRechargeOrderFormState;
}

// 获取详情返回参数类型
export interface UserRechargeOrderFormState {
    id?: number;
    user_id?: number;
    amount: number;
    discount_money?: number;
    username?: string;
    add_time?: string;
    finished_time?: string;
    postscript?: string;
    status?: number;
    status_type?: string;
}





