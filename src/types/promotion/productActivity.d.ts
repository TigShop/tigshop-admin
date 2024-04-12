// 列表查询时筛选参数类型
export interface ProductActivityFilterParams {
    page: number;
    size: number;
    sort_field: string,
    sort_order: string,
    keyword?: string;
    is_going?: number;
}

// 获取列表返回参数类型
export interface ProductActivityFilterResult {
    filter_result: ProductActivityFilterState[];
    filter: {
        page: number;
    };
    total: number;
}
export interface ProductActivityFilterState {
    promotion_id: number;
    promotion_name?: string;
    limit_user_rank?: number[];
    range?: number;
    range_data?: string;
    min_order_amount?: number;
    max_order_amount?: number;
    promotion_type?: number;
    promotion_type_data?: string;
    is_available?: number;
    product_time?: string[];
    product_status?: string;
}


// 获取详情返回参数类型
export interface RankList {
    rank_id?: number;
    rank_name?: string;
}
export interface ProductActivityFormResult {
    item: ProductActivityFormState;
    rank_list: RankList[];
}
export interface ProductActivityFormState {
    promotion_id?: number;
    promotion_name?: string;
    limit_user_rank?: number[];
    range?: number;
    range_data?: number[] | number;
    min_order_amount?: number;
    max_order_amount?: number;
    promotion_type: number;
    promotion_type_data?: any;
    is_available?: number;
    product_time?: string[];
    product_end_date?:string;
    product_start_date?:string;
}
