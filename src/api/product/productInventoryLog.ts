import request from '@/utils/request';
import type {ProductInventoryLogFilterParams, ProductInventoryLogFilterResult} from '@/types/product/productInventoryLog';
// 获取商品分类列表
export const getProductInventoryLogList = (params: ProductInventoryLogFilterParams) => {
    return request<ProductInventoryLogFilterResult>({
        url: 'product/product_inventory_log/index/',
        method: 'get',
        params,
    });
}

// 商品分类页面批量操作
export const batchSubmit = (type: string, data: object) => {
    return request({
        url: 'product/product_inventory_log/batch/?type=' + type,
        method: 'post',
        data,
    });
}

