
export interface saleTargetsFilterState {
    filter_result: FilterResult;
    errcode: number;
    message: string;
}

export interface FilterResult {
    order_num: string;
    order_product_num: string;
    order_total_amount: string;
    user_num: string;
    consumer_membership_num: string;
    capita_consumption: string;
    click_count: string;
    click_rate: string;
    order_rate: string;
    consumer_membership_rate: string;
    purchase_rate: string;
}
