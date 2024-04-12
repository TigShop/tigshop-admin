// 列表查询时筛选参数类型
export interface FeedbackFilterParams {
    page: number,
    size: number,
    sort_field: string,
    sort_order: string,
    keyword?: string;
    type?: number,
}

// 获取列表返回参数类型
export interface FeedbackFilterState {
    id?: number;
    add_time?: string;
    content?: string;
    complaint_info?: string;
    email?: string;
    feedback_pics?: string[];
    mobile?: string;
    order_id?: number;
    parent_id?: number;
    store_id?: number;
    status?: number;
    status_name?: string;
    title?: string;
    type?: number;
    user_id?: number;
    username?: string;
    order_info?: order_info;
}
export interface FeedbackFilterResult {
    filter_result: FeedbackFilterState[];
    filter: FeedbackFilterParams;
    total: number;
}

export interface FeedbackFormResult {
    item: FeedbackFormState;
}

interface product {
    product_id: number;
    product_name: string;
}

interface order_info {
    order_id: number;
    order_sn: string;
}

interface store {
    store_id: number;
    store_title: string;
}

interface reply {
    content: string;
    email: string;
    id: number;
    mobile: string;
    parent_id: number;
    status: number;
    status_name: string;
    type: number;
    type_name: string;
    username: string;
}

// 获取详情返回参数类型
export interface FeedbackFormState {
    id?: number;
    add_time?: string;
    content?: string;
    complaint_info?: string;
    email?: string;
    feedback_pics?: string[];
    mobile?: string;
    order_id?: number;
    order_info?: order_info;
    parent_id?: number;
    store_id?: number;
    store?: store;
    status?: number;
    status_name?: string;
    title?: string;
    type?: number;
    type_name?: string;
    user_id?: number;
    username?: string;
    product_id?: number;
    product: product;
    reply?: reply;
}


