
export interface CommonCleanupFormState {
    config: ConfigObject;
    errcode: number;
    message: string;
    main_menu:MainMenu[];
    user_info: UserInfoObject;
}

export interface UserInfoObject {
	admin_id: number;
	username: string;
	mobile: string;
	avatar: string;
	email: string;
	add_time: string;
	auth_list: string[];
	suppliers_id: number;
	role_id: number;
	store_id: number;
	parent_id: number;
	menu_tag?: any;
	order_export: string[];
	extra?: any;
}

export interface ConfigObject {
	ico_defined_css: string;
	dollar_sign: string;
	storage_type: number;
	storage_url: string;
	pc_domain: string;
	h5_domain: string;
}

export interface Children {
	authority_id: number;
	is_show: number;
	authority_sn: string;
	authority_name: string;
	parent_id: number;
	authority_ico: string;
	route_link: string;
	child_auth: any[];
	children: any[];
    current?:boolean;
    blank?:string;
}

export interface MainMenu {
	authority_id: number;
    active?:boolean;
	is_show: number;
	authority_sn: string;
	authority_name: string;
	parent_id: number;
	authority_ico: string;
	route_link: string;
	child_auth: any[];
	children: Children[];
    current?:boolean;
    blank?:string;
}