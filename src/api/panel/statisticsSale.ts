import request from "@/utils/request";
import requestExport from "@/utils/export";
import type {
    statisticsSalesFilterParams,
    statisticsSalesFilterState,
    SaleDetaillistFilterParams,
    SaleDetaillistFilterState
} from "@/types/panel/statisticsSale";

//  销售明细
export const getSaleDetail = (data: statisticsSalesFilterParams) => {
    return request<statisticsSalesFilterState>({
        url: "panel/sales_statistics/sales_detail",
        method: "get",
        params: data
    });
};

// 销售商品明细
export const getSaleDetaillist = (data: SaleDetaillistFilterParams) => {
    return request<SaleDetaillistFilterState>({
        url: "panel/sales_statistics/sales_product_detail",
        method: "get",
        params: data
    });
};

// 销售商品明细导出
export const exportSaleDetaillis = (data: SaleDetaillistFilterParams) => {
    return requestExport({
        url: "panel/sales_statistics/sales_product_detail",
        data
    });
};
