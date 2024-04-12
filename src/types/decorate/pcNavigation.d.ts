
import type { LinkType } from "@/types/decorate/decorate"
// 列表查询时筛选参数类型
export interface PcNavigationFilterParams {
    page: number;
    size: number;
    sort_field: string,
    sort_order: string,
    keyword?: string;
    type?:number
}

// 获取列表返回参数类型
export interface PcNavigationFilterState {
    id: number;
    title?: string;
    link?: LinkType;
    is_show?: boolean;
    is_blank?: boolean;
    sort_order?: number;
    type?: number;
    parent_id?: number;
}
export interface PcNavigationFilterResult {
    filter_result: PcNavigationFilterState[];
    filter: PcNavigationFilterParams;
    total: number;
}


// 获取详情返回参数类型
export interface PcNavigationFormState {
    id?: number;
    title?: string;
    icon?: string;
    link?: LinkType;
    is_show?: boolean;
    is_blank?: boolean;
    sort_order?: number;
    type: number;
    type_name?: string;
    parent_id?: number;
}

export interface PcNavigationFormResult {
    item: PcNavigationFormState;
}

export interface PcNavigationLinkResult{
    item: LinkFilterState[];
}

export interface LinkFilterState{
    name?:string;
    app_link?:string;
    link?:string;
}


