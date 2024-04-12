
export interface ShippingTplFilterParams {
    page: number;
    size: number;
    sort_field?: string;
    sort_order?: string;
    keyword?: string;
}

export interface ShippingTplFilterResult {
    filter_result: ShippingTplFilterState[];
    filter: {
        page: number;
    };
    total: number;
}

export interface ShippingTplFilterState {
    shipping_tpl_id: number;
    is_show?: number;
    sort_order?: number;
}

export interface ShippingTplFormResult {
    item: ShippingTplFormState;
}

export interface ShippingTplFormState {
    shipping_tpl_id?: number;
    shipping_tpl_name?: string;
    shipping_time?: string;
    is_default?: number;
    is_free?: number;
    sort_order?: number;
    pricing_type?: number;
    shipping_tpl_info: ShippingTplInfo[];
}

export interface ShippingTplInfo {
    shipping_type_id?: number;
    shipping_type_name?: string;
    is_checked:number;
    default_tpl_info: ShippingTplInfoItem;
    area_tpl_info: ShippingTplInfoItem[];
}
export interface ShippingTplInfoItem {
    id?: number;
    shipping_tpl_id?: number;
    shipping_type_id?: number;
    shipping_type_name?: string;
    start_number?: string;
    start_price?: string;
    add_number?: string;
    add_price?: string;
    free_price?: string;
    region_data: RegionDataItem;

}

export interface RegionDataItem {
    area_regions: number[];
    area_region_names: string[];
}
