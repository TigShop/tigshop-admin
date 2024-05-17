import type {FriendLinksFilterParams, FriendLinksFilterResult,FriendLinksFormResult} from "@/types/setting/friendLinks.d";
import request from "@/utils/request";

export const getFriendLinksList = (params: FriendLinksFilterParams) => {
    return request<FriendLinksFilterResult>({
        url: "setting/friend_links/list",
        method: "get",
        params,
    });
}

export const getFriendLinksAll = () => {
    return request<FriendLinksFilterResult>({
        url: "setting/friend_links/get_all",
        method: "get"
    });
}

// 商品分类页面批量操作
export const batchSubmit = (type: string, data: object) => {
    return request({
        url: "setting/friend_links/batch?type=" + type,
        method: "post",
        data,
    });
}

export const delFriendLinks = (data: object) => {
    return request({
        url: "setting/friend_links/del",
        method: "post",
        data,
    });
}

export  const getFriendLinks = (action: string, params: object) => {
    return request<FriendLinksFormResult>({
        url: "setting/friend_links/" + action,
        method: "get",
        params
    });
}

export const updateFriendLinks = (operation: string, data: object) => {
    return request({
        url: "setting/friend_links/" + operation,
        method: "post",
        data
    });
}

export const updateFriendLinksField = (data:object) => {
    return request({
        url: "setting/friend_links/update_field",
        method: "post",
        data
    });
}
