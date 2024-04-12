
export interface LogisticsCompanyFilterParams {
    page: number;
    size: number;
    sort_field?: string;
    sort_order?: string;
    keyword?: string;
}

export interface LogisticsCompanyFilterResult {
    filter_result: LogisticsCompanyFilterState[];
    filter: {
        page: number;
    };
    total: number;
}

export interface LogisticsCompanyFilterState {
    logistics_id: number;
    logistics_code?: string;
    logistics_name?: string;
    logistics_desc?: string;
    is_show?: number;
    sort_order?: number;
}

export interface LogisticsCompanyFormResult {
    item: LogisticsCompanyFormState;
}

export interface LogisticsCompanyFormState {
    logistics_id?:number;
    logistics_name?:string;
    logistics_code?:string;
    logistics_desc?:string;
    sort_order?:number;
    is_show?:number;
}
