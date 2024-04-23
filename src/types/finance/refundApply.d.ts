

export interface RefundApplyFilterParams {
    page: number,
    size: number,
    sort_field: string,
    sort_order: string,
    keyword?: string;
    refund_status?: number;
}

// 获取列表返回参数类型
export interface RefundApplyFilterState {
    refund_id: number;
    refund_type_name: string;
    order_sn: string;
    product_name: string;
    pic_thumb: string;
    refund_status_name: string;
    add_time: string;
}
export interface RefundApplyFilterResult {
    filter_result: RefundApplyFilterState[];
    filter: RefundApplyFilterParams;
    total: number;
}

export interface RefundApplyFormResult {
    item: RefundApplyFormState;
}

// 获取详情返回参数类型
export interface RefundApplyFormState {
    refund_id?: number;
    refund_type?: number;
    order_id?: number;
    order_sn?: string;
    product_name?: string;
    pic_thumb?: string;
    product_sn?: string;
    quantity?: number;
    refund_number?: number;
    price?: string;
    subtotal?: string;
    refund_amount?: string;
    refund_status?: number;
    refund_note?: string;
    aftersale_id?: number;
    aftersales_sn?: string;
    refund_balance?: number;
    balance?: number;
    effective_balance?: number;
    online_balance?: number;
    effective_online_balance?: number;
    online_paid_amount?: number;
    offline_balance?: number;
    offline_paid_amount?: number;
}





