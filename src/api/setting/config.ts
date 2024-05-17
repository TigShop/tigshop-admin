import request from "@/utils/request";
import type { BaseFormResult, BaseFormState } from "@/types/setting/config";

export const getIcon = () => {
    return request({
        url: "setting/config/get_icon",
        method: "get",
    });
};

export const getConfig = (params: object) => {
    return request<BaseFormResult>({
        url: "setting/config/list",
        method: "get",
        params,
    });
};

export const saveConfig = (params: object) => {
    return request<BaseFormState>({
        url: "setting/config/save",
        method: "post",
        data: params,
    });
};
export const createPlatformCertificate = () => {
    return request({
        url: "setting/config/create_platform_certificate",
        method: "post"
    });
};
export const updateConfig = (params: object) => {
    return request<BaseFormState>({
        url: "setting/config/update",
        method: "post",
        data: params,
    });
};
