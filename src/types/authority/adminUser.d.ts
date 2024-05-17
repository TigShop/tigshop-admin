// 列表查询时筛选参数类型


export interface AdminUserFilterParams {
    page: number;
    size: number;
    sort_field: string,
    sort_order: string,
    keyword?: string;
    suppliers_id?: number;
}

// 获取列表返回参数类型

export interface AdminUserFilterResult {
    filter_result: AdminUserFilterState[];
    filter: {
        page: number;
    };
    total: number;
}
export interface AdminUserFilterState {
    admin_id: number;
    username?: string;
    mobile?: string;
    avatar?: string;
    password?: string;
    email?: string;
    add_time?: string;
    auth_list?: string[];
    suppliers_id?: number;
    role_id?: number;
    store_id?: number;
    parent_id?: number;
    menu_tag?: string;
    order_export?: string;
    extra?: string;
}

// 获取详情返回参数类型
export interface AdminUserFormResult {
    item: AdminUserFormState;
    role_list: AdminUserRoleListItem[];
}

export interface AdminUserFormState {
    admin_id?: number;
    username?: string;
    mobile?: string;
    avatar?: string;
    def_avatar?: string;
    password?: string;
    pwd_confirm?: string;
    old_password?: string;
    email?: string;
    add_time?: string;
    auth_list?: string[];
    suppliers_id?: number;
    role_id?: number;
    store_id?: number;
    parent_id?: number;
    menu_tag?: string[];
    order_export?: string[];
    extra?: string[];
    role_list?: AdminUserRoleListItem[];
}

export interface AdminUserRoleListItem {
    role_id: number;
    role_name: string;
}

// 编辑表单


