
export interface AdminRoleFilterParams {
    page: number;
    size: number;
    sort_field?: string;
    sort_order?: string;
    keyword?: string;
}

export interface AdminRoleFilterResult {
    filter_result: AdminRoleFilterState[];
    filter: {
        page: number;
    };
    total: number;
}

export interface AdminRoleFilterState {
    role_id: number;
    role_name?: string;
    role_desc?: string;
}

export interface AdminRoleFormResult {
    item: AdminRoleFormState;
}

export interface AdminRoleFormState {
    role_id?: number;
    role_name?: string;
    role_desc?: string;
    authority_list?: string[];
}
