import type {CommonCleanupFormState} from "@/types/common/common.d";
import request from "@/utils/request";

// export const getAdminInfo = (params:Object) => {
//     return request<CommonFilterParams>({
//         url: "authority/admin_user/detail",
//         method: "get",
//         params,
//     });
// }
// export const adminInfoSubmit = (data: object) => {
//     return request({
//         url: "authority/admin_user/modify_manage_accounts",
//         method: "post",
//         data,
//     });
// }

// export const getAdminCode = (params: object) => {
//     return request({
//         url: "authority/admin_user/get_code",
//         method: "get",
//         params,
//     });
// }


export const cleanUp = () => {
    return request<CommonCleanupFormState>({
        url: "common/cache_manage/cleanup",
        method: "post"
    });
}