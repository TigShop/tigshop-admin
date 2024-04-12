// 列表查询时筛选参数类型
export interface ExampleFilterParams {
    page: number;
    size: number;
    sort_field: string;
    sort_order: string;
    keyword?: string;
    is_show?: number;
}

// 获取列表返回参数类型
export interface ExampleFilterResult {
    filter_result: ExampleFilterState[];
    filter: {
        page: number;
    };
    total: number;
}
export interface ExampleFilterState {
    example_id?: number;
    example_name?: string;
    example_logo?: string;
    is_show?: boolean;
    sort_order?: number;
}


// 获取详情返回参数类型
export interface ExampleFormResult {
    item: ExampleFormState[];
}
export interface ExampleFormState {
    example_name?: string;
    example_logo?: string;
    example_desc?: string;
    sort_order?: string;
    is_show?: number;
}
