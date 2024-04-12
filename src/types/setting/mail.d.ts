// 获取详情返回参数类型

export interface MailFormResult {
    item: MailFormState;
}

export interface MailFormState {
    mail_service?: number;
    smtp_ssl?: number;
    smtp_host?: string;
    smtp_port?: string;
    smtp_user?: string;
    smtp_pass?: string;
    smtp_mail?: string;
    mail_charset?: string;
    test_mail_address?: string;
    test_mail_address?: string;
}

