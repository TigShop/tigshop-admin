// 列表查询时筛选参数类型
export interface MessageTypeFilterParams {
    page: number,
    size: number,
    sort_field: string,
    sort_order: string,
    keyword?: string;
    send_type?: number;
}

// 获取列表返回参数类型
export interface MessageTypeFilterResult {
    filter_result: MessageTypeFilterState[];
    filter: {
        page: number;
    };
    total: number;
}
export interface MessageTypeFilterState {
    message_id: number;
    name?: string;
    describe?: string;
    is_wechat?: number;
    is_mini_program?: number;
    is_message?: number;
    is_msg?: number;
    is_app?: number;
    is_ding?: number;
    add_time?: number;
}


// 获取详情返回参数类型
export interface MessageTypeFormResult {
    item: MessageTypeFormState[];
}
export interface MessageTypeFormState {
    message_id?: number;
    name?: string;
    describe?: string;
    is_wechat?: number;
    is_mini_program?: number;
    is_message?: number;
    is_msg?: number;
    is_app?: number;
    is_ding?: number;
    add_time?: number;
    template_message:TemplateMessageState;
}
export interface TemplateMessageState{
    wechat_data: TemplateMessageStateItem;
    app_data: TemplateMessageStateItem;
    ding_data: TemplateMessageStateItem;
    message_data: TemplateMessageStateItem;
    mini_program_data: TemplateMessageStateItem;
    msg_data: TemplateMessageStateItem;

}

export interface TemplateMessageStateItem{
    content?: string;
    id?: number;
    message_id?: number;
    template_id?: string;
    template_name?: string;
    template_num?: string;
    to_userid?: string;
    type?: number;
    type_name?: string;
}
