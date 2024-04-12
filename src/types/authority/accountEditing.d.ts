// 获取详情返回参数类型

export interface AccountEditingFilterParams {
}
export interface AccountEditingFormState {
    avatar: string;
    username: string;
    email: string;
}
export interface AccountPassWordEditingFormState {
    old_password: string;
    password: string;
    pwd_confirm: string;
}

export interface AccountMobileEditingFormState {
    mobile: string;
    code: string;
}
export interface AdminInfoFilterResult {
    item: AdminInfoFormState;
}
export interface AdminInfoFormState {
    admin_id?: number;
    username?: string;
    mobile?: string;
    avatar?: string;
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
}