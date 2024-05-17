import type {AdminInfoFilterResult} from "@/types/authority/accountEditing.d";
import request from "@/utils/request";

export const getAdminInfo = (params:Object) => {
    return request<AdminInfoFilterResult>({
        url: "authority/admin_user/detail",
        method: "get",
        params,
    });
}
export const adminInfoSubmit = (data: object) => {
    return request({
        url: "authority/admin_user/modify_manage_accounts",
        method: "post",
        data,
    });
}

export const getAdminCode = (params: object) => {
    return request({
        url: "authority/admin_user/get_code",
        method: "get",
        params,
    });
}
