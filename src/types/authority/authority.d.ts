// 列表筛选
export interface AuthorityFilterParams {
    page: number,
    size: number,
    sort_field?: string;
    sort_order?: string;
    keyword?: string;
    parent_id: number;
}

export interface AuthorityFilterState {
    authority_id: number;
    authority_name?: string;
    authority_sn?: string;
    category_ico?: string;
    route_link?: string;
    has_children?: number;
    is_show?: number;
    is_system?: number;
    parent_id?: number;
    sort_order?: number;
    store_available?: number;
    authority_ico?: string;
    child_auth?: ChildAuthItem[];
}


export interface AuthorityFilterResult {
    filter_result: AuthorityFilterState[];
    filter: {
        page: number;
    };
    parent_name:string;
    total: number;
}

// 编辑表单

export interface AuthorityFormResult {
    item: AuthorityFormState[];
}
export interface AuthorityFormState {
    authority_id?: number;
    authority_name?: string;
    authority_sn?: string;
    is_check?: boolean;
    indeterminate?: boolean;
    category_ico?: string;
    route_link?: string;
    has_children?: number;
    is_show?: number;
    is_system?: number;
    parent_id?: number;
    sort_order?: number;
    store_available?: number;
    authority_ico?: string;
    children?: AuthorityFormState[];
    child_auth?: ChildAuthItem[];
}

export interface ChildAuthItem{
    auth_name?:string;
    auth_sn?:string;
}
