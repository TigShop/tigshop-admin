// 列表筛选
export interface SuppliersFilterParams {
    page: number,
    size: number,
    sort_field?: string;
    sort_order?: string;
    keyword?: string;
}

export interface SuppliersFilterResult {
    filter_result: SuppliersFilterState[];
    filter: {
        page: number;
    };
    total: number;
}


export interface SuppliersFilterState {
    is_check?: number;
    suppliers_id: number;
    suppliers_name?: string;
    suppliers_desc?: string;
    contact_name?: string;
    contact_phone?: string;
    contact_address?: string;
    regions?: number[];

}

// 编辑表单

export interface SuppliersFormResult {
    item: SuppliersFormState[];
}
export interface SuppliersFormState {
    is_check?: number;
    suppliers_id?: number;
    suppliers_name?: string;
    suppliers_desc?: string;
    contact_name?: string;
    contact_phone?: string;
    contact_address?: string;
    regions?: number[];
}
