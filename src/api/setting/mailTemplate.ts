import request from "@/utils/request";
import type {MailTemplateFilterResult} from "@/types/setting/mailTemplate";


export const getMailTemplateList = () => {
    return request<MailTemplateFilterResult>({
        url: "setting/mail_templates/list",
        method: "get"
    });
}

export const updateMailTemplate = (data: object) => {
    return request({
        url: "setting/mail_templates/update/",
        method: "post",
        data
    });
}
