
export interface AdminLogFilterParams {
    page: number;
    size: number;
    sort_field?: string;
    sort_order?: string;
    log_time?: number;
    keyword?: string;
    user_id?: number;
}

export interface AdminLogFilterResult {
    filter_result: AdminLogFilterState[];
    filter: {
        page: number;
    };
    total: number;
}

export interface AdminLogFilterState {
    log_id?: number;
    user_id?: number;
    ip_address?: string;
    log_time?: string;
    username?: string;
    log_info?: string;
}

