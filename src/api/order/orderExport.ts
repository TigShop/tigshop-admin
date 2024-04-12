import request from '@/utils/request';
import requestExport from '@/utils/export';
import {ExportItemInfoFilterState, SaveExportItemFilterResult, ExportItemListFilterState} from '@/types/order/orderExport'
// 订单导出可选标签列表
export const getExportItemList = () => {
    return request<ExportItemListFilterState>({
        url: 'order/order/get_export_item_list',
        method: 'get',
    });
}

// 订单导出保存标签列表
export const getExportItemInfo = () => {
    return request<ExportItemInfoFilterState>({
        url: 'order/order/export_item_info',
        method: 'get',
    });
}
// 订单导出保存的标签
export const saveExportItem = (data:SaveExportItemFilterResult) => {
    return request({
        url: 'order/save_export_item',
        method: 'post',
        data,
    });
}
// 导出订单
export const getOrderExport = (params: object) => {
    return requestExport({
        url: 'order/order_export/',
        params,
    })
}