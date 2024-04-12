// 列表筛选
export interface CategoryFilterParams {
    page?: number;
    size?: number;
    sort_field?: string,
    sort_order?: string,
    keyword?: string;
    is_show?: number;
    parent_id: number;
}

export interface CategoryFilterState {
    category_id: number;
    category_name: string;
    category_pic: string;
    category_ico: string;
    measure_unit: string;
    is_hot: number;
    is_show: number;
    sort_order: number;
}
export interface CategoryFilterResult {
    filter_result: CategoryFilterState[];
    filter: {
        page: number;
    };
    parent_name:string;
    total: number;
}

// 编辑表单
export interface CategoryFormState {
    category_id?: number;
    category_name?: string;
    short_name?: string;
    parent_id?: number;
    category_pic?: string;
    measure_unit?: string;
    category_ico?: string;
    seo_title?: string;
    search_keywords?: string;
    keywords?: string;
    category_desc?: string;
    sort_order?: number;
    is_hot?: number;
    is_show?: number;
}
export interface CategoryFormResult {
    item: CategoryFormState;
}

export interface CategoryMoveState {
    id?:number;
    target_cat_id?: number;
}
