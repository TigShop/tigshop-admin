import request from "@/utils/request";
import { ArticleCategoryFilterResult, ArticleCategoryFormResult ,ArticleCategoryFilterParams} from "@/types/content/articleCategory";
// 获取商品分类列表
export const getArticleCategoryList = (params: ArticleCategoryFilterParams) => {
    return request<ArticleCategoryFilterResult>({
        url: "content/article_category/list",
        method: "get",
        params,
    });
}

export const getArticleCategoryTree = () => {
    return request<ArticleCategoryFilterResult>({
        url: "content/article_category/tree",
        method: "get"
    });
}

// 商品分类页面批量操作
export const batchSubmit = (type: string, data: object) => {
    return request({
        url: "content/article_category/batch?type=" + type,
        method: "post",
        data,
    });
}

// 商品分类页面更新项
export const updateArticleCategoryFiled = (data: object) => {
    return request({
        url: "content/article_category/update_field",
        method: "post",
        data,
    });
}

export const delArticleCategory = (data: object) => {
    return request({
        url: "content/article_category/del",
        method: "post",
        data,
    });
}

export  const getArticleCategory = (action: string, params: object) => {
    return request<ArticleCategoryFormResult>({
        url: "content/article_category/" + action,
        method: "get",
        params
    });
}

export const updateArticleCategory = (operation: string, data: object) => {
    return request({
        url: "content/article_category/" + operation,
        method: "post",
        data
    });
}

export const moveArticleCategory = ( data: object) => {
    return request({
        url: "content/article_category/move_cat",
        method: "post",
        data
    });
}
