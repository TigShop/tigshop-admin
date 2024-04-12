// 列表筛选
export interface FilterParams {
    page: number;
    size: number;
    sort_field: string,
    sort_order: string,
    keyword: string;
    is_show: number;
    brand_is_hot: number;
    first_word: string;
}

export interface FilterState {
    brand_id: number;
    brand_name: string;
    brand_logo: string;
    first_word: string;
    brand_is_hot: boolean;
    is_show: boolean;
    sort_order: number;
}
export interface FilterResult {
    filter_result: FilterState[];
    filter: {
        page: number;
    };
    total: number;
}

// 编辑表单
export interface FormState {
    brand_name: string;
    brand_logo: string;
    brand_desc: string;
    sort_order: string;
    first_word: string;
    is_show: number;
    brand_is_hot: number;
}
export interface FormResult {
    item: FormState;
}
