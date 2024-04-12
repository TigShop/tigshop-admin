import * as exp from "constants";

// 列表查询时筛选参数类型
export interface OrderFilterParams {
    page: number;
    size: number;
    sort_field: string;
    sort_order: string;
    keyword?: string;
    user_id?: number;
    store_id?: number;
    order_status?: number;
    pay_status?: number;
    shipping_status?: number;
    address?: string;
    email?: string;
    mobile?: string;
    logistics_id?: number;
    is_exchange_order?: number;
    add_time?: string[];
    add_end_time?: string;
    add_start_time?: string;
}

// 获取列表返回参数类型
export interface OrderFilterResult {
    filter_result: OrderFilterState[];
    filter: {
        page: number;
    };
    total: number;
}

export interface OrderPrintItems {
    product_name: number;
    product_sn: string;
    sku_sn: string;
    sku_value: string;
    price: number;
    subtotal: number;
}

export interface OrderPrintResult {
    order_print: OrderPrintFormResult;
}

export interface OrderPrintFormResult {
    username?: string;
    pay_time?: string;
    add_time?: string;
    shipping_time?: string;
    pay_type_name?: string;
    logistics_name?: string;
    order_sn?: string;
    consignee?: string;
    tracking_no?: number;
    telephone?: number;
    product_amount?: number;
    total_amount?: number;
    coupon_amount?: number;
    shop_name?: string;
    host?: string;
    print_time?: string;
    detailed_address?: string;
    address?: {
        telephone?: string;
        address?: string;
        region_name?: string[];
    };
    items: OrderPrintItems[];
}

// 获取详情返回参数类型
export interface OrderFormResult {
    item: OrderFormState;
}

export interface OrderFilterState {
    order_id?: number;
    add_time?: string;
    checkBox?: boolean;
    order_sn?: string;
    parent_order_id: number;
    store_id: number;
    store_title?: string;
    order_source?: string;
    product_amount: number;
    user_id?: number;
    username?: string;
    consignee?: string;
    mobile?: string;
    pay_type?: number;
    pay_status?: number;
    logistics_name?: string;
    shipping_type_name?: string;
    shipping_fee?: string;
    order_status?: number;
    is_del?: number;
    admin_note?: string;
    items: ItemInfo[];
    available_actions: AvailableActionsInfo;
}

export interface ItemInfo {
    product_id?: number;
    pic_thumb?: string;
    url?: string;
    product_name?: string;
    product_type?: number;
    price: number;
    quantity?: number;
}

export interface AvailableActionsInfo {
    cancel_order?: boolean;
    set_confirm?: boolean;
    confirm_receipt?: boolean;
    modify_order?: boolean;
    modify_order_money?: boolean;
    modify_shipping_info?: boolean;
    set_paid?: boolean;
    set_unpaid?: boolean;
    deliver?: boolean;
    split_order?: boolean;
    del_order?: boolean;
}


export interface OrderFormState {
    order_id?: number;
    store_id?: number;
    order_sn?: string;
    add_time?: string;
    parent_order_id?: number;
    parent_order_sn?: string;
    store_title?: string;
    items: OrderItem[];
    username?: string;
    user_address?: string;
    address?: string;
    consignee?: string;
    email?: string;
    mobile?: string;
    region_data?: number[];
    region_ids?: number[];
    region_name?: string[];
    telephone?: string;
    shipping_type?: number;
    shipping_method?: number;
    shipping_type_id?: number;
    shipping_type_name?: string;
    postcode?: string;
    logistics_id?: number;
    logistics_name?: string;
    pay_type?: number;
    pay_type_id?: number;
    is_store_splited?: number;
    pay_time?: string;
    product_amount: number;
    total_amount: number;
    coupon_amount: number;
    points_amount: number;
    invoice_fee?: number;
    service_fee?: number;
    shipping_fee?: number;
    paid_amount: number;
    balance: number;
    discount_amount?: number;
    update_order_sn: number;
    unpaid_amount: number;
    total_weight: number;
    buyer_note?: string;
    admin_note?: string;
    remark?: string;
    available_actions: AvailableActionsInfo;
    shipping_time?: string;
    tracking_no?: string;
    shipping?: number;
    shipping_list?: ShippingListType[];
    step_status?: StepStatus;
}

export interface StepStatus {
    current: number;
    status: any;
    steps: {
        title?: string;
        description?: string;
    }[];
}

export interface OrderItem {
    item_id: number;
    product_id?: number;
    product_name?: number;
    pic_thumb?: string;
    product_sn?: string;
    quantity: number;
    price?: number;
    is_deleted?: number;
    to_delivery_quantity: number;
}
export interface ShippingListType {
    logistics_id: number;
    logistics_name: string;
    shipping_type_name: string;
    total_fee: string;
    free_money: number;
}
export interface ProductOperation {
    description?: string;
}
export interface AddProductInfoByIdsResult {
    product_items: OrderItem[];
}

export interface OrderToShipFormState {
    items: OrderItem[];
    shipping_method?: number;
    shipping_type_id?: number;
    logistics_id?: number;
    tracking_no?: string;
}
