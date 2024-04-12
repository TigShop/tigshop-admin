// 列表查询时筛选参数类型

export interface ProductInventoryLogFilterParams {
    page: number;
    size: number;
    sort_field: string,
    sort_order: string,
    keyword?: string;
}

// 获取列表返回参数类型
export interface ProductInventoryLogFilterResult {
    filter_result: ProductInventoryLogFilterState[];
    filter: {
        page: number;
    };
    total: number;
}

export interface ProductInventoryLogFilterState {
    log_id?: number;
    product_name?: string;
    desc?: string;
    old_number?: number;
    number?: number;
    change_number?: number;
    add_time?: string;
}

