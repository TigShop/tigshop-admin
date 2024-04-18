// 列表查询时筛选参数类型
export interface DecorateDiscreteFormState {
    background_color?: string;
    background_pic?: {
        pic_url?: string;
        pic_thumb?: string;
    };
    nav_list?: {
        pic_url?: string;
        pic_thumb?: string;
        pic_active_url?: string;
        pic_active_thumb?: string;
        pic_link?: {
            link?: string;
            title?: string;
        };
        pic_title?: string;
        pic_desc?: string;
    }[];
}

// 获取详情返回参数类型
export interface FormResult {
    item: {
        data?: DecorateDiscreteFormState;
    };
}
