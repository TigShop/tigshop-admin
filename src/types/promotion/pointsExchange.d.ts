// 列表查询时筛选参数类型
export interface PointsExchangeFilterParams {
    page: number;
    size: number;
    sort_field: string,
    sort_order: string,
    keyword?: string;
    is_hot?: number;
    is_enabled?: number;
}

// 获取列表返回参数类型
export interface PointsExchangeFilterResult {
    filter_result: PointsExchangeFilterState[];
    filter: {
        page: number;
    };
    total: number;
}
export interface PointsExchangeFilterState {
    id: number;
    product_id?: any;
    exchange_integral?: number;
    points_deducted_amount?: number;
    is_hot?: number;
    is_enabled?: number;
}


// 获取详情返回参数类型
export interface PointsExchangeFormResult {
    item: PointsExchangeFormState;
}
export interface PointsExchangeFormState {
    id?: number;
    product_id?: any;
    exchange_integral?: number;
    points_deducted_amount?: number;
    is_hot?: number;
    is_enabled?: number;
}
