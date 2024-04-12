import request from '@/utils/request';
import type {MessageTypeFilterParams, MessageTypeFilterResult, MessageTypeFormResult} from '@/types/setting/messageType';
// 获取示例模板列表
export const getMessageTypeList = (params: MessageTypeFilterParams) => {
    return request<MessageTypeFilterResult>({
        url: 'setting/message_type/index/',
        method: 'get',
        params,
    });
}
// 示例模板列表页面批量操作
export const batchSubmit = (type: string, data: object) => {
    return request({
        url: 'setting/message_type/batch/?type=' + type,
        method: 'post',
        data,
    });
}
// 示例模板列表页面删除项
export const delMessageType = (data: object) => {
    return request({
        url: 'setting/message_type/del/',
        method: 'post',
        data,
    });
}
// 示例模板列表页面更新项
export const updateMessageTypeFiled = (data: object) => {
    return request({
        url: 'setting/message_type/update_field/',
        method: 'post',
        data,
    });
}

export const miniProgramMessageTemplate = () => {
    return request({
        url: 'setting/message_type/mini_program_message_template/',
        method: 'post'
    });
}

export const miniProgramMessageTemplateSync = () => {
    return request({
        url: 'setting/message_type/mini_program_message_template_sync/',
        method: 'post'
    });
}


// 获取示例模板详情
export const getMessageType = (action: string, params: object) => {
    return request<MessageTypeFormResult>({
        url: 'setting/message_type/' + action + '/',
        method: 'get',
        params
    });
}
// 更新示例模板
export const updateMessageType = (operation: string, data: object) => {
    return request({
        url: 'setting/message_type/' + operation + '/',
        method: 'post',
        data
    });
}
