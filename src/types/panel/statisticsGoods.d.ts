export interface statisticsGoodsFilterParams {
    start_time: string;
    end_time: string;
    is_export?: string;
    keyword: string;
    page: number;
    size?: number;
    sort_field?: string;
    sort_order?: string;
}



export interface statisticsGoodsFilterState {
    filter_result: FilterResult[];
    filter: Filter;
    total: number;
    errcode: number;
    message: string;
}

export interface Filter {
    start_time: string;
    end_time: string;
    keyword: string;
    is_export: number;
    page: number;
    size: number;
    sort_field: string;
    sort_order: string;
}

export interface FilterResult {
    item_id: number;
    order_id: number;
    order_sn: string;
    user_id: number;
    price: string;
    quantity: number;
    product_id: number;
    product_name: string;
    product_sn: string;
    pic_thumb: string;
    sku_id: number;
    sku_data: SkuData | null;
    delivery_quantity: number;
    product_type: number;
    is_gift: number;
    store_id: number;
    is_pin: number;
    prepay_price: string;
    total_sales_amount: string;
    total_sales_num: string;
    think_count: number;
}

export interface SkuData {
    name: string;
    value: string;
}
