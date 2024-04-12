// 列表查询时筛选参数类型
import {getPushLogList} from "@/api/user/pushLog";

export interface PushLogFilterParams {
    page: number,
    size: number,
    sort_field: string,
    sort_order: string,
    keyword?: string;
}

// 获取列表返回参数类型
export interface PushLogFilterState {
    brand_id: number;
    brand_name: string;
    brand_logo: string;
    first_word: string;
    brand_is_hot: boolean;
    is_show: boolean;
    sort_order: number;
}
export interface PushLogFilterResult {
    filter_result: PushLogFilterState[];
    filter: PushLogFilterParams;
    total: number;
}

export interface PushLogFormResult {
    item: PushLogFormState;
}

// 获取详情返回参数类型
export interface PushLogFormState {
    brand_name?: string;
    brand_logo?: string;
    brand_desc?: string;
    sort_order?: string;
    first_word?: string;
    is_show?: number;
    brand_is_hot?: number;
    send_user_type?: number
}





