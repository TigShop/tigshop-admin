// 列表查询时筛选参数类型
export interface CouponFilterParams {
    page: number;
    size: number;
    sort_field: string;
    sort_order: string;
    keyword?: string;
    is_show?: number;
    store_id?: number;
}

// 获取列表返回参数类型
export interface CouponFilterResult {
    filter_result: CouponFilterState[];
    filter: {
        page: number;
    };
    total: number;
}
export interface CouponFilterState {
    coupon_id?: number;
    coupon_name?: string;
    coupon_type?: number;
    is_new_user?: number;
    limit_user_rank?: number;
    coupon_money?: string;
    min_order_amount?: string;
    is_show?: boolean;
    sort_order?: number;
}

// 获取详情返回参数类型
export interface CouponRankList {
    rank_id?: number;
    rank_name?: string;
}
export interface CouponFormResult {
    item: CouponFormState;
    rank_list: CouponRankList[];
}
export interface CouponFormState {
    coupon_id?: number;
    coupon_type?: number;
    coupon_name?: string;
    coupon_desc?: string;
    coupon_money?: number;
    coupon_discount?: number;
    min_order_amount?: number;
    is_new_user?: number;
    send_start_date?: string;
    send_end_date?: string;
    use_end_date?: string;
    use_start_date?: string;
    send_date?: string[];
    use_date?: string[];
    send_range?: number;
    send_range_data?: [];
    enabled_overlay?: number;
    is_global?: number;
    is_show?: number;
    limit_num?: number;
    limit_user_rank?: number[];
}
