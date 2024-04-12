import request from "@/utils/request";
import type { MailFormResult} from "@/types/setting/mail";

export const getMail  = ( params: object) => {
    return request<MailFormResult>({
        url: 'setting/config/index/',
        method: 'get',
        params
    });
}

export const saveMail  = ( params: object) => {
    return request<MailFormResult>({
        url: 'setting/config/save_mail/',
        method: 'post',
        data:params
    });
}

export const sendTestEmail  = ( params: object) => {
    return request<MailFormResult>({
        url: 'setting/config/send_test_email/',
        method: 'post',
        data:params
    });
}
