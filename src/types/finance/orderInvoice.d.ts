import type {UserInvoiceFormState} from "@/types/finance/userInvoice";

export interface OrderInvoiceFilterParams {
    page: number,
    size: number,
    sort_field: string,
    sort_order: string,
    keyword?: string;
    status?: number;
    invoice_type?: number;
    store_type?: number;
    store_id?: number;
}

// 获取列表返回参数类型
export interface OrderInvoiceFilterState {
    id: number;
    username?: string;
    invoice_type?: number;
    invoice_type_name?: string;
    company_name?: string;
    amount?: string;
    order_id?: number;
    order_sn?: string;
    add_time?: string;
    company_code?: string;
    company_address?: string;
    company_phone?: string;
    company_bank?: string;
    company_account?: string;
    apply_reply?: string;
    status_name?: string;
    status?: number;
}
export interface OrderInvoiceFilterResult {
    filter_result: OrderInvoiceFilterState[];
    filter: OrderInvoiceFilterParams;
    total: number;
}

export interface OrderInvoiceFormResult {
    item: OrderInvoiceFormState;
}

// 获取详情返回参数类型
export interface OrderInvoiceFormState {
    id?: number;
    username?: string;
    invoice_type?: number;
    invoice_type_name?: string;
    company_name?: string;
    amount?: string;
    order_id?: number;
    order_sn?: string;
    add_time?: string;
    company_code?: string;
    invoice_content?: string;
    company_address?: string;
    company_phone?: string;
    company_bank?: string;
    company_account?: string;
    apply_reply?: string;
    status_name?: string;
    mobile?: string;
    email?: string;
    status?: number;
    user_invoice?: UserInvoiceFormState;
}





