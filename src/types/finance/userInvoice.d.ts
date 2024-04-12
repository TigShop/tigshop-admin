
export interface UserInvoiceFilterParams {
    page: number,
    size: number,
    sort_field: string,
    sort_order: string,
    keyword?: string;
    status?: number;
}

// 获取列表返回参数类型
export interface UserInvoiceFilterState {
    invoice_id: number;
    username?: string;
    company_name?: string;
    company_code?: string;
    company_address?: string;
    company_phone?: string;
    company_bank?: string;
    company_account?: string;
    apply_reply?: string;
    status_name?: string;
    status?: number;
}
export interface UserInvoiceFilterResult {
    filter_result: UserInvoiceFilterState[];
    filter: UserInvoiceFilterParams;
    total: number;
}

export interface UserInvoiceFormResult {
    item: UserInvoiceFormState;
}

// 获取详情返回参数类型
export interface UserInvoiceFormState {
    id?:number;
    username?: string;
    company_name?: string;
    company_code?: string;
    company_address?: string;
    company_phone?: string;
    company_bank?: string;
    company_account?: string;
    apply_reply?: string;
    status?: number;
}





