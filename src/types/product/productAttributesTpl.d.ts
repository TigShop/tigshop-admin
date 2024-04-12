// 列表查询时筛选参数类型
export interface ProductAttributesTplFilterParams {
    page: number;
    size: number;
    sort_field: string,
    sort_order: string,
    keyword?: string;
}

// 获取列表返回参数类型
export interface ProductAttributesTplFilterResult {
    filter_result: ProductAttributesTplFilterState[];
    filter: {
        page: number;
    };
    total: number;
}

export interface ProductAttributesTplFilterState {
    tpl_id?: number;
    tpl_name?: string;
    tpl_data?: tplData;
}


// 获取详情返回参数类型
export interface ProductAttributesTplFormResult {
    item: ProductAttributesTplFormState;
}

export interface ProductAttributesTplFormState {
    tpl_id?: number;
    tpl_name?: string;
    tpl_data?: tplData;
}

export interface tplData {
    normal?: tplDataField[];
    spe?: tplDataField[];
    extra?: tplDataField[];
}

export interface tplDataField {
    attr_name?: string;
    attr_value?: string;
}
