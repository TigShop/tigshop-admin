
export interface RegionFilterParams {
    page?: number,
    size?: number,
    sort_field?: string;
    sort_order?: string;
    keyword?: string;
    id?:number;
    parent_id:number;
    region_id?:number;
}

export interface RegionFilterResult {
    filter_result: RegionFilterState[];
    filter: {
        page: number;
    };
    total: number;
    data?: Object;
}

export interface RegionFilterState {
    region_id: number;
    is_hot?: number;
    id?:number;
    region_name?: string;
    first_word?: string;
    parent_id?: number;

}

export interface RegionFormResult {
    item: RegionFormState;
}

export interface RegionFormState {
    region_id?:number;
    region_name?:number;
    is_hot?: number;
    parent_name?: string;
    parent_id?: number;
}
