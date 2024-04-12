import request from "@/utils/request";
import type {AfterSalesServiceFilterResult} from "@/types/setting/afterSalesService.d";


export const getAfterSalesServiceList = () => {
    return request<AfterSalesServiceFilterResult>({
        url: 'setting/mail_templates/index/',
        method: 'get'
    });
}

export const updateAfterSalesService = (data: object) => {
    return request({
        url: 'setting/mail_templates/update/',
        method: 'post',
        data
    });
}
