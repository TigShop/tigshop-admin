import request from "@/utils/request";
import type {MessageLogFilterParams, MessageLogFilterResult, MessageLogFormResult} from "@/types/user/messageLog"
// 获取站内信列表
export const getMessageLogList = (params: MessageLogFilterParams) => {
    return request<MessageLogFilterResult>({
        url: "user/user_message_log/list",
        method: "get",
        params,
    });
}
// 删除
export const delMessageLog= (data: object) => {
    return request({
        url: "user/user_message_log/del",
        method: "post",
        data,
    });
}

export const recallMessageLog= (data: object) => {
    return request({
        url: "user/user_message_log/recall",
        method: "post",
        data,
    });
}
//获取分类详情
export const getMessageLog  = (action: string, params: object) => {
    return request<MessageLogFormResult>({
        url: "user/user_message_log/" + action,
        method: "get",
        params
    });
}

// 更新分类
export const updateMessageLog = (operation: string, data: object) => {
    return request({
        url: "user/user_message_log/" + operation,
        method: "post",
        data
    });
}

// 批量操作
export const batchSubmit = (type: string, params: object) => {
    return request({
        url: "user/user_message_log/batch?type=" + type,
        method: "post",
        params,
    });
}
