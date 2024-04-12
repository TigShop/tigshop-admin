import request from "@/utils/request";
import type { getProductListFilterState } from "@/types/decorate/mobileProduct";

export const getProductList = (params: object) => {
    return request<getProductListFilterState>({
        url: "decorate/decorate_request/product_list/",
        method: "get",
        params
    });
};
