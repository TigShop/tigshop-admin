
export interface ShippingTypeFilterParams {
    page: number;
    size: number;
    sort_field?: string;
    sort_order?: string;
    keyword?: string;
}

export interface ShippingTypeFilterResult {
    filter_result: ShippingTypeFilterState[];
    filter: {
        page: number;
    };
    total: number;
}

export interface ShippingTypeFilterState {
    shipping_type_id: number;
    is_support_cod?: string;
    logistics_name?: string;
    shipping_default_id?: number;
    shipping_time_desc?: string;
    shipping_type_desc?: string;
    shipping_type_name?: string;
    sort_order?: number;
    store_id?: number;
}

export interface ShippingTypeFormResult {
    item: ShippingTypeFormState;
}

export interface ShippingTypeFormState {
    shipping_type_id?:number;
    shipping_default_id?:number;
    logistics_name?: string;
    shipping_type_name?:string;
    shipping_type_desc?:string;
    shipping_time_desc?:string;
    sort_order?:number;
    is_support_cod?:number;
}
