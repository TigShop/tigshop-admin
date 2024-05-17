// 列表查询时筛选参数类型
export interface CommentFilterParams {
    page: number;
    size: number;
    sort_field: string,
    sort_order: string,
    is_showed?: number;
    keyword?: string;
}

// 获取列表返回参数类型
export interface CommentFilterResult {
    filter_result: CommentFilterState[];
    filter: {
        page: number;
    };
    total: number;
}
export interface CommentFilterState {
    comment_id?: number;
    content?: string;
    comment_title?: string;
    comment_desc?: string;
    is_show?: boolean;
    sort_order?: number;
    is_recommend?: number;
}


// 获取详情返回参数类型
export interface CommentFormResult {
    item: CommentFormState;
}
export interface CommentFormState {
    product_ids: number[];
    product_id?: number;
    is_recommend?: number;
    username?: string;
    avatar?: string;
    comment_rank?: number;
    comment_tag: string[];
    content?: string;
    add_time?: string;
    show_pics?: Array<string>;
    sort_order?: number;
    status?: number;
    is_top?: number;
    reply?: {
        comment_id: number;
        user_id: number;
        username: string;
        content: string;
        add_time: string;
        parent_id: number;
    }
}
