
export interface PayLogFilterParams {
    page: number,
    size: number,
    pay_status: number,
    sort_field: string,
    sort_order: string,
    keyword?: string;
}

// 获取列表返回参数类型
export interface PayLogFilterState {
    brand_id: number;
    brand_name: string;
    brand_logo: string;
    first_word: string;
    brand_is_hot: boolean;
    is_show: boolean;
    sort_order: number;
}
export interface PayLogFilterResult {
    filter_result: PayLogFilterState[];
    filter: PayLogFilterParams;
    total: number;
}

export interface PayLogFormResult {
    item: PayLogFormState;
}

// 获取详情返回参数类型
export interface PayLogFormState {
    brand_name?: string;
    brand_logo?: string;
    brand_desc?: string;
    sort_order?: string;
    first_word?: string;
    is_show?: number;
    brand_is_hot?: number;
}





