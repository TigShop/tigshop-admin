// 列表查询时筛选参数类型
export interface PcCatFloorFilterParams {
    page: number;
    size: number;
    sort_field: string,
    sort_order: string,
    keyword?: string;
}

// 获取列表返回参数类型
export interface PcCatFloorFilterState {
    cat_floor_id: number;
    cat_floor_name?: string;
    category_ids?: string;
    category_names?: string;
    brand_ids?: string;
    hot_cat?: string;
    floor_ico?: string;
    floor_ico_font?: string;
    is_show?: boolean;
    sort_order?: number;

}
export interface PcCatFloorFilterResult {
    filter_result: PcCatFloorFilterState[];
    filter: PcCatFloorFilterParams;
    total: number;
}


// 获取详情返回参数类型
export interface PcCatFloorFormState {
    category_list?: CategoryListItem[];
    brand_list?: CategoryListItem[];
    cat_floor_id?: number;
    cat_floor_name?: string;
    category_ids?: number[];
    category_names?: string[];
    brand_ids?: number[];
    hot_cat?: string;
    floor_ico?: string;
    floor_ico_font?: string;
    is_show?: boolean;
    sort_order?: number;

}

export interface PcCatFloorFormResult {
    item: PcCatFloorFormState;
}

export interface CategoryListItem{
    category_id?:number;
    brand_id?:number;
    category_name?:string;
}

// 编辑表单


