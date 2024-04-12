// 获取详情返回参数类型

export interface AfterSalesServiceFilterResult {
    filter_result: AfterSalesServiceFilterState[];
    filter: {
        page: number;
    };
    total: number;
}
export interface AfterSalesServiceFilterState {
    template_content?: string;
}
