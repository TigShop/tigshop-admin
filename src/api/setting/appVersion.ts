import type {AppVersionFormResult} from "@/types/setting/appVersion.d";
import request from "@/utils/request";

export  const getAppVersion = () => {
    return request<AppVersionFormResult>({
        url: "setting/app_version/detail",
        method: "get"
    });
}

export const updateAppVersionLinks = ( data: object) => {
    return request({
        url: "setting/app_version/update",
        method: "post",
        data
    });
}
