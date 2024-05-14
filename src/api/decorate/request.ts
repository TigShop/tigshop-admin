import request from "@/utils/request";

export const getProductList = (params: object) => {
    return request({
        url: "decorate/decorate/decorate_request/product_list",
        method: "get",
        params,
    });
};
