// 获取详情返回参数类型

export interface MailTemplateFilterResult {
    filter_result: MailTemplateFilterState[];
    filter: {
        page: number;
    };
    total: number;
}
export interface MailTemplateFilterState {
    template_id: number;
    template_name: string;

    template_code?: string;
    is_html?: number;
    template_subject?: string;
    template_content?: string;
    last_modify?: number;
    last_send?: number;
    type?: string;
}

