import request from "@/utils/request";
import type {AdminMsgFilterParams, AdminMsgSearchFilterResult} from "@/types/panel/adminMsg.d";

// 获取消息中心列表
export const getAdminMsgList = (params: AdminMsgFilterParams) => {
    return request<AdminMsgSearchFilterResult>({
        url: "msg/admin_msg/list",
        method: "get",
        params,
    });
}

// 已读单条消息
export const getAdminMsgSetReaded = (params: object) => {
    return request({
        url: "msg/admin_msg/set_readed",
        method: "get",
        params,
    });
}

// 已读全部消息
export const getAdminMsgSetAllReaded = () => {
    return request({
        url: "msg/admin_msg/set_all_readed",
        method: "post"
    });
}

// 一键直达
export const getSearchMenu = (params:Object) => {
    return request({
        url: "panel/panel/search_menu",
        method: "get",
        params
    });
}
