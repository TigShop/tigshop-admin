// 列表查询时筛选参数类型
export interface AdminMsgFilterParams {
    page: number;
    size: number;
    sort_field: string;
    sort_order: string;
    keyword: string;
    msg_type: number;
}

// 获取列表返回参数类型
export interface AdminMsgFilterState {
    admin_id: number;
    goods_id: number;
    order_id: number;
    store_id: number;
    is_readed: number;
    msg_type: number;
    msg_id: number;
    content: string;
    items?: object[];
    order?: object[];
    msg_link?: string;
    send_time?: string;
    title?: string;
}
export interface AdminMsgMsgTypeFilterState {
    cat_id: number;
    cat_name: string;
    child?: object;
    unread_count: number;
}
export interface AdminMsgSearchFilterResult {
    filter_result: AdminMsgFilterState[];
    msg_type_arr: AdminMsgMsgTypeFilterState[];
    filter: {
        page: number;
    };
    total: number;
}

export interface AdminMsgFilterResult {
    filter_result: AdminMsgFilterState[];
    filter: AdminMsgFilterParams;
    total: number;
}


