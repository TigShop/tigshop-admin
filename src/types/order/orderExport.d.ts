
// 列表查询时筛选参数类型
export interface ExportItemListFilterParams {
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
export interface ExportItemList {
	order_sn?: string;
	add_time?: string;
	order_status_name?: string;
	pay_status_name?: string;
	store_title?: string;
	username?: string;
	consignee?: string;
	mobile?: string;
	address?: string;
	country?: string;
	total_amount?: string;
	balance?: string;
	discount_amount?: string;
	points_amount?: string;
	coupon_amount?: string;
	pay_time?: string;
	pay_type_id?: string;
	paid_amount?: string;
	shipping_time?: string;
	shipping_fee?: string;
	logistics_name?: string;
	tracking_no?: string;
	buyer_note?: string;
	admin_note?: string;
	product_info?: string;
	shipping_status_name?: string;
	product_weight?: string;
	use_points?: string;
}
export interface ExportItemListFilterState {
	export_item_list: ExportItemList;
}
export interface ExportItemInfoFilterState {
	item: ExportItemList;
}
export interface ExportItem {
    order_sn?: string;
	add_time?: string;
	order_status_name?: string;
	pay_status_name?: string;
	store_title?: string;
	username?: string;
	consignee?: string;
	mobile?: string;
	address?: string;
	country?: string;
	total_amount?: string;
	balance?: string;
	discount_amount?: string;
	points_amount?: string;
	coupon_amount?: string;
	pay_time?: string;
	pay_type_id?: string;
	paid_amount?: string;
	shipping_time?: string;
	shipping_fee?: string;
	logistics_name?: string;
	tracking_no?: string;
	buyer_note?: string;
	admin_note?: string;
	product_info?: string;
	shipping_status_name?: string;
	product_weight?: string;
	use_points?: string;
}
export interface SaveExportItemFilterResult{
	export_item: string[];
}
