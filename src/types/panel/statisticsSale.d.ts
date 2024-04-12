/** 销售明细 */
export interface statisticsSalesFilterParams {
    /** 开始时间 */
    start_time?: string;
    /** 结束时间 */
    end_time?: string;
}

export interface statisticsSalesFilterState {
    sales_data: SalesData;
    sales_statistics_data: SalesStatisticsData;
    errcode: number;
    message: string;
}

export interface SalesData {
    product_view: number;
    product_view_growth_rate: string;
    product_visitor: number;
    product_visitor_growth_rate: string;
    order_num: number;
    order_num_growth_rate: string;
    payment_amount: number;
    payment_amount_growth_rate: string;
    refund_amount: number;
    refund_amount_growth_rate: string;
    refund_quantity: number;
    refund_quantity_growth_rate: string;
}

export interface SalesStatisticsData {
    horizontal_axis: string[];
    longitudinal_axis_payment_amount: number[];
    longitudinal_axis_refund_amount: number[];
    longitudinal_axis_product_view: number[];
    longitudinal_axis_product_visitor: number[];
}

/** 销售商品明细 */
export interface SaleDetaillistFilterParams {
    start_time: string;
    end_time: string;
    keyword: string;
    page: number;
    size: number;
    is_export?: string;
    sort_field?: string;
    sort_order?: string;
}

export interface SaleDetaillistFilterState {
    filter_result: SaleDetaillistFilterResult[];
    filter: SaleDetaillistFilter;
    total: number;
    errcode: number;
    message: string;
}

export interface SaleDetaillistFilter {
    start_time: string;
    end_time: string;
    keyword: string;
    is_export: number;
    page: number;
    size: number;
    sort_field: string;
    sort_order: string;
}

export interface SaleDetaillistFilterResult {
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
    subtotal: string;
    order: Order;
}

export interface Order {
    order_sn: string;
    add_time: string;
}

export interface SkuData {
    name: string;
    value: string;
}
