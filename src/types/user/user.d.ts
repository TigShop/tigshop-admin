// 列表查询时筛选参数类型
import type {UserRankFilterState} from "@/types/user/userRank";

export interface UserFilterParams {
    page?: number;
    size?: number;
    sort_field?: string;
    sort_order?: string;
    from_tag?: number;
    balance?: number;
    points_gt?: number;
    points_lt?: number;
    rank_id?: number;
    keyword?: string;
    user_id?:number;
    username?:string;
}

export interface UserFilterResult {
    filter_result: UserFilterState[];
    filter: UserFilterParams;
    total: number;
}

// 获取列表返回参数类型
export interface UserFilterState {
    user_id: number;
    username: string;
    from_tag: number;
    from_tag_name: string;
    rank_id: number;
    rank_ico: string;
    rank_name: string;
    mobile_validated: number;
    email_validated: number;
    mobile: string;
    email: string;
    balance: number;
    frozen_balance: number;
    points: number;
    order_count: number;
    order_amount: number;
    reg_time: string;
}


export interface UserFormResult {
    item: UserFormState;
    rank_list: UserRankFilterState[];
}
// 获取详情返回参数类型
export interface UserFormState {
    user_id?: number;
    is_admin?: number;
    username?: string;
    nickname?: string;
    from_tag?: number;
    from_tag_name?: string;
    rank_id?: number;
    rank_ico?: string;
    rank_name?: string;
    birthday?: string;
    growth_points?: number;
    mobile_validated?: number;
    email_validated?: number;
    mobile?: string;
    email?: string;
    balance: number;
    frozen_balance: number;
    points?: number;
    order_count?: number;
    order_amount?: number;
    reg_time?: string;
    password?: string;
    pwd_confirm?: string;
    avatar: string;
    tag: Array<string>;
}



// 编辑表单
export interface UserFundManagementFormState {
	id?: number;
	change_desc?: string;
	type_balance?: number;
	balance?: number;
	type_frozen_balance?: number;
	frozen_balance?: number;
	type_points?: number;
	points?: number;
	type_growth_points?: number;
	growth_points?: number;
}

export interface UserFundFilterResult {
    filter_result: UserFundList[];
    filter: UserFilterParams;
    total: number;
}

export interface UserFundList {
    change_type_name: string;
    before_balance: string;
    before_frozen_balance: string
    log_id: number;
    user_id: number;
    balance: string;
    frozen_balance: string;
    change_time: string;
    change_desc: string;
    change_type: number;
    username: string;
    after_balance: string;
    after_frozen_balance: string;
}


