// 列表查询时筛选参数类型
export interface AftersalesFilterParams {
    page: number;
    size: number;
    sort_field: string,
    sort_order: string,
    keyword?: string;
    aftersale_type?: number;
    status?: number;

}

// 获取列表返回参数类型
export interface AftersalesFilterResult {
    filter_result: AftersalesFilterState[];
    status_list: any[];
    type_list: any[];
    filter: {
        page: number;
    };
    total: number;
}

// 获取详情返回参数类型
export interface AftersalesFilterState {
    aftersale_id?: number;
    aftersales_sn?: number;
    order_item_id?: number;
    aftersale_type?: number;
    status?: number;
    number?: number;
    pics?: string[];
    description?: string;
    reply?: string;
    add_time?: string;
    shipping_time?: string;
    tracking_no?: string;   
    logistics_name?: string;   
    user_name?: string;   
    aftersale_reason?: string;   
    aftersales_type_name?: string;   
    status_name?: string;   
    aftersales_items: productList[]
}
export interface productList {
    aftersales_item_id?: number;
	order_item_id?: number;
	number?: number;
	aftersale_id?: number;
	order_sn?: string;
	product_name?: string;
	order_id?: number;
	pic_thumb?: string;
	product_sn?: string;
	product_id?: number;
	quantity?: number;
	price?: number;
}
export interface AftersalesFormResult {
    item: FormState;
}

export interface FormState {
    aftersale_id?:number;
    aftersale_type?:number;
    add_time?:string;
    shipping_time?:string;
    aftersales_type_config?:object[];
    aftersales_log?:object[];
    aftersales_type_name?:string;
    description?:string;
    logistics_name?:string;
    number:number;
    modify_number?:number;
    order_id?:number;
    order_item_id?:number;
    order_sn?:string;
    pic_thumb:string;
    pics?:string;
    product_name?:string;
    product_sn?:string;
    reply?:string;
    status?:number;
    status_name?:string;
    status_config?: object[];
    tracking_no?:string;
    user_name?:string;
}
