// 获取详情返回参数类型

export interface BaseFormResult {
    item?: BaseFormState;
    countrys: Regions[];
}
export interface Regions {
    region_id?: number;
    region_name?: string;
}
export interface BaseFormState {
    shop_name?: string;
    shop_title_suffix?: string;
    shop_title?: string;
    shop_keywords?: string;
    shop_desc?: string;
    shop_logo?: string;
    default_avatar?: string;
    ico_img?: string;
    pc_domain?: string;
    h5_domain?: string;
    is_open_goods_cache?: number;
    is_open_cat_cache?: number;
    is_open_data_cache?: number;
    is_display_error?: number;
    style_version: string;
    visit_stats?: number;
    is_buy_lymobile?: number;
    is_open_redis?: number;
    session_open_redis?: number;
    redis_host?: string;
    redis_host_port?: number;
    redis_host_password?: string;
    is_open_queue?: number;
    mobile_login_need_reg?: number;
    enable_mobile_logn?: number;
    is_wx_affiliate?: number;
    is_wx_auto_regist?: number;
    captcha_login_fail?: number;
    comment_check?: number;
    message_check?: number;
    shop_company?: string;
    kefu_address?: string;
    shop_icp_no?: string;
    shop_icp_no_url?: string;
    shop_110_no?: string;
    shop_110_link?: string;
    close_shop?: number;
    close_shop_reason?: string;
    shop_reg_closed?: number;
    dollar_sign?: string;
    dollar_sign_cn?: string;
    sn_prefix?: string;
    price_format?: number;
    default_storage?: number;
    goods_url_type?: number;
    limit_day?: number;
    is_auto_goods_keywords?: number;
    watermark?: string;
    watermark_place?: number;
    watermark_alpha?: string;
    is_show_price_trend?: number;
    show_selled_count?: number;
    show_marketprice?: number;
    is_spe_goods_number?: number;
    spe_goods_number_1?: number;
    spe_goods_number_2?: number;
    spe_goods_number_3?: number;
    page_size?: number;
    history_number?: number;
    ly_brand_type?: string;
    comment_default_tag?: string;
    market_price_rate?: number;
    use_storage?: number;
    stock_dec_time?: number;
    auto_split_paid_order?: number;
    child_area_need_region?: number;
    shipping_tpl_fee_merge?: number;
    auto_cancel_order_hour?: number;
    recover_cancel_order?: number;
    use_bonus?: number;
    // use_surplus?: number;
    use_integral?: number;
    integral_name?: string;
    integral_scale?: number;
    integral_percent?: number;
    comment_send_point?: number;
    show_send_point?: number;
    use_qiandao_point?: number;
    can_invoice?: number;
    invoice_content?: string;
    invoice_added?: number;
    lottery_closed?: number;
    lottery_point?: number;
    is_open_pin?: number;
    is_open_bargain?: number;
    return_consignee?: string;
    return_mobile?: string;
    return_address?: string;
    sms_key_id?: string;
    sms_key_secret?: string;
    sms_sign_name?: string;
    sms_shop_mobile?: string;
    service_email?: string;
    send_confirm_email?: number;
    order_pay_email?: number;
    send_service_email?: number;
    send_ship_email?: number;
    search_keywords?: string;
    msg_hack_word?: string;
    is_open_pscws?: string;
    self_store_name?: string;
    shop_default_regions?: any[];
    default_country?: number;
    show_cat_level?: number;
    is_show_cat_icos?: number;
    banner_height?: number;
    is_show_home_qgmod?: number;
    is_show_home_bonus?: number;
    is_show_group?: number;
    is_show_global_imported?: number;
    index_new_limit?: number;
    tool_bar_color?: string;
    kefu_type?: number;
    kefu_yzf_type?: number;
    kefu_yzf_sign?: string;
    kefu_workwx_id?: string;
    kefu_code?: string;
    kefu_code_blank?: number;
    kefu_javascript?: string;
    wap_kefu_javascript?: string;
    kefu_phone?: string;
    kefu_time?: string;
    lyecs_wechat_appId?: string;
    lyecs_wechat_appSecret?: string;
    lyecs_wechat_open_appId?: string;
    lyecs_wechat_open_appSecret?: string;
    lyecs_wechat_pay_mchid_type?: number;
    lyecs_wechat_pay_mchid?: string;
    lyecs_wechat_pay_sub_mchid?: string;
    lyecs_wechat_pay_key?: string;
    lyecs_wechat_miniProgram_appId?: string;
    lyecs_wechat_miniProgram_secret?: string;
    wechat_pay_app_id?: string;
    wechat_pay_app_secret?: string;
    ico_tig_css?: string;
    ico_defined_css?: string;
    qq_login_key?: string;
    qq_login_secret?: string;
    lyecs_api_key?: string;
    kuaidi100_limit?: number;
    kuaidi100_key?: string;
    storage_type?: number;
    storage_url?: string;
    storage_access_key_id?: string;
    storage_access_key_secret?: string;
    storage_bucket?: string;
    storage_region?: string;
    onebound_key?: string;
    onebound_secret?: string;
    use_wechat: number;
    use_alipay: number;
    use_surplus: number;
    use_offline: number;
    use_another: number;
}
export interface PaymentFormState {
    use_surplus?: number;
    use_cod?: number;
    use_points?: number;
    use_coupon?: number;
    use_wechat?: number;
    use_alipay?: number;
    use_offline?: number;
    wechat_mchid_type?: number;
    wechat_pay_mchid?: string;
    wechat_pay_sub_mchid?: string;
    wechat_pay_key?: string;
    wechat_pay_serial_no?: string;
    alipay_appid?: string;
    alipay_rsa_private_key?: string;
    alipay_rsa_public_key?: string;
}
