// 列表查询时筛选参数类型
export interface MessageLogFilterParams {
    page: number,
    size: number,
    sort_field: string,
    sort_order: string,
    keyword?: string;
}

// 获取列表返回参数类型
export interface MessageLogFilterState {
    send_type_name: string;
	status_name: string;
	message_log_id: number;
	message_type: number;
	send_user_type: number;
	user_ids: string;
	user_rank: number;
	message_title: string;
	message_content: string;
	message_link: string;
	send_time: string;
	is_recall: number;
}
export interface MessageLogFilterResult {
    filter_result: MessageLogFilterState[];
    filter: MessageLogFilterParams;
    total: number;
}
export interface MessageLogFormResult {
    item: MessageLogFormState;
}

// 获取详情返回参数类型
export interface MessageLogFormState {
    message_log_id?: number;
    message_title?: string;
    message_content?: string;
    message_link?: Object;
    user_ids?: number;
    user_rank?: number;
    user_list?: string;
    send_user_type?: number;
}



