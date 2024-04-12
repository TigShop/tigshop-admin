// 列表查询时筛选参数类型
export interface ArticleFilterParams {
    page: number;
    size: number;
    sort_field: string,
    sort_order: string,
    keyword?: string;
    article_category_id?: number[];
    article_ids?: number[];
    is_show?: number;
    is_hot?: number;
}

// 获取列表返回参数类型
export interface ArticleFilterResult {
    filter_result: ArticleFilterState[];
    filter: {
        page: number;
    };
    total: number;
}
export interface ArticleFilterState {
    article_id: number;
    article_title?: string;
    article_sn?: string;
    is_hot?: number;
    is_show?: number;
    add_time?: string;
}


// 获取详情返回参数类型
export interface ArticleFormResult {
    item: ArticleFormState;
}
export interface ArticleFormState {
    article_id?: number;
    article_title?: string;
    article_category_id?: number[];
    article_category_name?: string;
    article_sn?: string;
    article_thumb?: string;
    article_author?: string;
    keywords?: string;
    article_tag?: string;
    description?: string;
    link?: string;
    article_type?: number;
    is_hot?: number;
    is_top?: number;
    is_show?: number;
    content?: string;
    product_ids?:number[]
}
