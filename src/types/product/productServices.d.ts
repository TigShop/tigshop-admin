// 列表查询时筛选参数类型
export interface ProductServicesFilterParams {
    page: number;
    size: number;
    sort_field: string,
    sort_order: string,
    keyword?: string;
}

// 获取列表返回参数类型
export interface ProductServicesFilterResult {
    filter_result: ProductServicesFilterState[];
    filter: {
        page: number;
    };
    total: number;
}
export interface ProductServicesFilterState {
    product_service_id?: number;
    product_service_name?: string;
    product_service_desc?: string;
    ico_img?: string;
    sort_order?: number;
    default_on?: number;
}


// 获取详情返回参数类型
export interface ProductServicesFormResult {
    item: ProductServicesFormState;
}
export interface ProductServicesFormState {
    product_service_id?: number;
    product_service_name?: string;
    product_service_desc?: string;
    ico_img?: string;
    sort_order?: number;
    default_on?: number;
}
