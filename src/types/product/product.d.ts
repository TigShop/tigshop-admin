// 列表查询时筛选参数类型
import type {SeckillProductState} from "@/types/promotion/seckill";

export interface ProductFilterParams {
    page?: number;
    size: number;
    sort_field?: string,
    sort_order?: string,
    keyword?: string;
    store_id?: number;
    category_id?: number;
    brand_id?: number;
    intro_type?: string;
    product_status?: number;
    check_status?: number;
    is_delete?: number;
    ids?: number[];
}

// 获取列表返回参数类型
export interface ProductFilterState {
    product_id: number;
    shipping_tpl_id: any;
    product_name: string;
    product_sn: string;
    url: string;
    pic_thumb: string;
    brand_name: string;
    store_title: string;
    type: number;
    suppliers_name: string;
    check_status: number;
    status: number;
    is_best: number;
    is_new: number;
    is_hot: number;
    product_stock: number;
    product_exist: number;
    sort_order: number;
    ids: number[];

}
export interface ProductFilterResult {
    filter_result: ProductFilterState[];
    filter: ProductFilterParams;
    total: number;
    waiting_checked_count: number;
}


// 获取详情返回参数类型
export interface ProductFormState {
    product_type?: number;
    product_id?: string;
    pic_thumb?: string;
    product_name?: string;
    img_list?: Array<ImgListItem>;
    product_stock?: number;
    category_id?: number;
    product_brief?: string;
    product_price?: number;
    market_price?: number;
    product_sn?: string;
    product_tsn?: string;
    brand_id?: number;
    suppliers_list?: SuppliersListType[];
    suppliers_id?: number;
    shipping_tpl_id?: number;
    shipping_tpl_list?: ShippingTplListType[];
    free_shipping?: number;
    seckill_max_num?: number;
    product_status?: number;
// ==
    limit_number?: number;
    is_best?: number;
    is_new?: number;
    is_hot?: number;
    is_promote?: number;
    promote_price?: number;
    promote_start_date?: string;
    promote_end_date?: string;
    volume_list?: Object[]; //==
    user_rank_list?: UserRankListType[]; //==
    give_integral?: number;
    rank_integral?: number;
    integral?: number;
// ==
    product_video?: string;
    product_desc_arr?: ProductDescArrItem[];
// ==
    attr_list?: Object[];
    product_list?: SeckillProductState[];
    attr_changed?: boolean;
// ==
    virtual_sales?: number;
    comment_tag?: string;
    seo_product_title?: string;
    product_weight?: number;
    warn_number?: number;
    is_alone_sale?: number;
    keywords?: string;
    product_info?: string;
    remark?: string;
    product_care?: string;
    service_list: ServiceList[];
    product_service_ids?: number[];
    is_support_cod?: number;
    is_support_return?: number;
// ==
    product_related?: number[];
    product_article_list?: number[];

}
export interface UserRankListType {
    rank_id:number;
    rank_name:string;
    price:number;
}

export interface SuppliersListType{
    suppliers_id:number;
    suppliers_name:string;
}
export interface ShippingTplListType{
    shipping_tpl_id:number;
    is_default:number;
    shipping_tpl_name:string;
}

export interface ImgListItem{
    pic_desc:string;
    pic_large:string;
    pic_original:string;
    pic_thumb:string;
    pic_url:string;
    pic_id:number;
    product_id:number;
    sort_order:number;
}

export interface ProductDescArrItem {
    type:string;
    pic:string;
    html:string;
}

export interface ServiceList {
    check:number;
    product_service_id:number;
    product_service_name:string;
}
export interface ProductFormResult {
    item: ProductFormState;
    attr_tpl_list:Object[];
    user_rank_list:Object[];
    service_list:ServiceList[];
}


