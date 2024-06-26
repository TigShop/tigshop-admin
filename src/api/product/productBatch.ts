import request from "@/utils/request";

// 图片批量处理
export const productBatchDealSubmit = (data: object) => {
    return request({
        url: "product/product_batch/product_batch_deal",
        method: "post",
        data,
    });
}
// 商品批量导出
export const productBatchExportSubmit = (params: object) => {
    return request({
        url: "product/product_batch/product_batch_deal",
        method: "get",
        responseType: "arraybuffer",
        params,
    });
}

// 商品批量上传/修改
export const productBatchModifySubmit = (data: object) => {
    return request({
        url: "product/product_batch/product_batch_modify",
        method: "post",
        data,
    });
}
// 下载模板文件
export const productBatchDownloadTemplateSubmit = () => {
    return request({
        url: "product/product_batch/download_template",
        method: "get",
        responseType: "arraybuffer",
    });
}
