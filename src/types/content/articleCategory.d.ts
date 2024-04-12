// 列表筛选
export interface ArticleCategoryFilterParams {
    page: number;
    size: number;
    sort_field?: string,
    sort_order?: string,
    keyword?: string;
    parent_id: number;
}

export interface ArticleCategoryFilterResult {
    filter_result: ArticleCategoryFilterState[];
    filter: {
        page: number;
    };
    parent_name?: string;
    total: number;
}

export interface ArticleCategoryFilterState {
    article_category_id: number;
    article_category_name?: string;
    category_sn?: string;
    category_type?: number;
    description?: string;
    keywords?: string;
    parent_id?: number;
    sort_order?: number;
    children?: ArticleCategoryFilterState[];
}

export interface ArticleCategoryFormResult {
    item: ArticleCategoryFormState;
}

export interface ArticleCategoryFormState {
    article_category_id?: number;
    article_category_name?: string;
    parent_id?: number;
    keywords?: string;
    sort_order?: number;
    description?: string;
}

export interface FormState {
    article_category_name: string;
    parent_id: number;
    keywords: string;
    description: string;
    sort_order: number;
}


