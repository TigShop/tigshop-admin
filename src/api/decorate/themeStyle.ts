import request from "@/utils/request";
import type { ThemeStyleFormResult} from "@/types/decorate/themeStyle.d"



export const getThemeStyle  = ( params: object) => {
    return request<ThemeStyleFormResult>({
        url: "decorate/decorate/theme_style/list",
        method: "get",
        params
    });
}


export const saveThemeStyle  = ( params: object) => {
    return request<ThemeStyleFormResult>({
        url: "decorate/decorate/theme_style/save_theme_style",
        method: "post",
        data:params
    });
}


