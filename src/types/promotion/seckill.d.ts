// 列表查询时筛选参数类型
export interface SeckillFilterParams {
    page: number;
    size: number;
    sort_field: string,
    sort_order: string,
    keyword?: string;
}

// 获取列表返回参数类型
export interface SeckillFilterResult {
    filter_result: SeckillFilterState[];
    filter: {
        page: number;
    };
    total: number;
}
export interface SeckillFilterState {
    status_name?: string
    seckill_id?: number
    seckill_name?: string
    seckill_start_time?: string
    seckill_end_time?: string
    seckill_limit_num?: number
    product_id?: number
    product_name?: string
}


// 获取详情返回参数类型
export interface SeckillFormResult {
    item: SeckillFormState[];
}
export interface SeckillFormState {
    status_name?: string
    seckill_id?: number
    seckill_name?: string
    seckill_start_time?: string
    seckill_end_time?: string
    seckill_limit_num?: number
    product_id?: number
    product_name?: string
    pic_thumb?: string
    seckill_item:SeckillProductState[]
}

export interface SeckillProductState {
    sku_id: number
    product_id: number
    pic_thumb: string
    product_name: string
    tip_value: string
    sku_value: string
    sku_data: SkuState[]
    sku_sn: string
    sku_stock: number
    sku_tsn: string
    sku_price: string
    seconds_seckill: boolean;
    seckill_price: string;
    seckill_stock: number;
}
export  interface SkuState{
    name:string;
    value:string;
}
