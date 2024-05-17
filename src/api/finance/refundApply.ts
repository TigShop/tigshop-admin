import request from "@/utils/request";
import type {RefundApplyFilterParams, RefundApplyFilterResult, RefundApplyFormResult} from "@/types/finance/refundApply.d"
// 获取退款申请
export const getRefundApplyList = (params: RefundApplyFilterParams) => {
    return request<RefundApplyFilterResult>({
        url: "finance/refund_apply/list",
        method: "get",
        params,
    });
}

// 删除
export const delRefundApply= (data: object) => {
    return request({
        url: "finance/refund_apply/del",
        method: "post",
        data,
    });
}


//获取退款申请详情
export const getRefundApply  = (action: string, params: object) => {
    return request<RefundApplyFormResult>({
        url: "finance/refund_apply/" + action,
        method: "get",
        params
    });
}

// 更新退款申请
export const updateRefundApply = (data: object) => {
    return request({
        url: "finance/refund_apply/update",
        method: "post",
        data
    });
}

// 批量操作
export const batchSubmit = (type: string, params: object) => {
    return request({
        url: "finance/refund_apply/batch?type=" + type,
        method: "post",
        params,
    });
}

// 确认线下转账
export const updateOfflineAudit = (data: object) => {
    return request({
        url: "finance/refund_apply/offline_audit",
        method: "post",
        data
    });
}