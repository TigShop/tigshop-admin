
export interface FriendLinksFilterParams {
    page: number;
    size: number;
    sort_field?: string;
    sort_order?: string;
    keyword?: string;
}

export interface FriendLinksFilterResult {
    filter_result: FriendLinksFilterState[];
    filter: {
        page: number;
    };
    total: number;
}

export interface FriendLinksFilterState {
    link_id: number;
    link_title?: string;
    link_logo?: string;
    link_url?: string;
    sort_order?: number;
}

export interface FriendLinksFormResult {
    item: FriendLinksFormState;
}

export interface FriendLinksFormState {
    link_id?: number;
    link_title?: string;
    link_logo?: string;
    link_url?: string;
    sort_order?: number;
}
