// 列表查询时筛选参数类型
export interface BrandFilterParams {
    page: number;
    size: number;
    sort_field: string,
    sort_order: string,
    keyword?: string;
    is_show?: number;
    brand_is_hot?: number;
    first_word?: string;
}

// 获取列表返回参数类型
export interface BrandFilterState {
    brand_id: number;
    brand_name: string;
    brand_logo?: string;
    first_word?: string;
    brand_is_hot?: boolean;
    is_show?: boolean;
    sort_order?: number;
}
export interface BrandSearchFilterResult {
    brand_list: BrandFilterState[];
    firstword_list: string[];
    message: string;
    errcode: number;
}

export interface BrandFilterResult {
    filter_result: BrandFilterState[];
    filter: BrandFilterParams;
    total: number;
}


// 获取详情返回参数类型
export interface BrandFormState {
    brand_name?: string;
    brand_logo?: string;
    brand_desc?: string;
    sort_order?: string;
    first_word?: string;
    is_show?: number;
    brand_is_hot?: number;
}

export interface BrandFormResult {
    item: BrandFormState;
}

// 编辑表单


