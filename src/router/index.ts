import { createRouter, createWebHistory } from "vue-router";

// 白名单应该包含基本静态路由
const WHITE_NAME_LIST: string[] = [];
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/panel/index",
            name: "index",
            component: () => import("@/layouts/base/index.vue"),
            meta: { title: "首页" },
            redirect: "/panel/index",
            children: [
                // dashboard
                {
                    path: "/panel",
                    name: "panel",
                    redirect: "/panel/index",
                    meta: { title: "面板" },
                    children: [
                        {
                            path: "/panel/index/",
                            name: "consoleManage",
                            meta: { title: "控制台" },
                            component: () => import("@/views/panel/Index.vue"),
                        },
                        {
                            path: "/panel/statistics_order/list/",
                            name: "statisticsOrder",
                            meta: { title: "销售统计" },
                            component: () => import("@/views/panel/statisticsOrder/List.vue"),
                        },
                        {
                            path: "/panel/statistics_sale/list/",
                            name: "statisticsSale",
                            meta: { title: "销售明细" },
                            component: () => import("@/views/panel/statisticsSale/List.vue"),
                        },
                        {
                            path: "/panel/sale_targets/list/",
                            name: "saleTargets",
                            meta: { title: "销售指标" },
                            component: () => import("@/views/panel/saleTargets/List.vue"),
                        },
                        {
                            path: "/panel/statistics_goods/list/",
                            name: "statisticsGoods",
                            meta: { title: "销售排行" },
                            component: () => import("@/views/panel/statisticsGoods/List.vue"),
                        },
                        {
                            path: "/panel/statistics_user/list/",
                            name: "statisticsUser",
                            meta: { title: "用户统计" },
                            component: () => import("@/views/panel/statisticsUser/List.vue"),
                        },
                        {
                            path: "/panel/statistics_access/list/",
                            name: "statisticsAccess",
                            meta: { title: "访问统计" },
                            component: () => import("@/views/panel/statisticsAccess/List.vue"),
                        },
                        {
                            path: "/panel/consumer_ranking/list/",
                            name: "consumerRanking",
                            meta: { title: "消费排行" },
                            component: () => import("@/views/panel/consumerRanking/List.vue"),
                        },
                        {
                            path: "/panel/new_members/list/",
                            name: "newMembers",
                            meta: { title: "新增会员" },
                            component: () => import("@/views/panel/newMembers/List.vue"),
                        },
                    ],
                },
                {
                    path: "/content",
                    name: "content",
                    redirect: "/content/article/list",
                    meta: { title: "内容" },
                    children: [
                        {
                            path: "/content/article/list",
                            name: "articleManage",
                            meta: { title: "文章列表" },
                            component: () => import("@/views/content/article/List.vue"),
                        },
                        {
                            path: "/content/article_category/list",
                            name: "articleCategoryManage",
                            meta: { title: "文章分类" },
                            component: () => import("@/views/content/articleCategory/List.vue"),
                        },
                    ],
                },
                {
                    path: "/promotion",
                    name: "promotion",
                    redirect: "/promotion/coupon/list",
                    meta: { title: "营销" },
                    children: [
                        {
                            path: "/promotion/coupon/list",
                            name: "couponManage",
                            meta: { title: "优惠券列表" },
                            component: () => import("@/views/promotion/coupon/List.vue"),
                        },
                        {
                            path: "/promotion/seckill/list",
                            name: "seckillManage",
                            meta: { title: "限时秒杀列表" },
                            component: () => import("@/views/promotion/seckill/List.vue"),
                        },
                        {
                            path: "/promotion/product_activity/list",
                            name: "productActivityManage",
                            meta: { title: "优惠活动列表" },
                            component: () => import("@/views/promotion/productActivity/List.vue"),
                        },
                        {
                            path: "/promotion/points_exchange/list",
                            name: "pointsExchangeManage",
                            meta: { title: "积分商品列表" },
                            component: () => import("@/views/promotion/pointsExchange/List.vue"),
                        },
                        {
                            path: "/promotion/sign_in_setting/list",
                            name: "signInSettingManage",
                            meta: { title: "签到设置列表" },
                            component: () => import("@/views/promotion/signInSetting/List.vue"),
                        },
                        {
                            path: "/promotion/recharge_setting/list",
                            name: "rechargeSettingManage",
                            meta: { title: "充值余额列表" },
                            component: () => import("@/views/promotion/rechargeSetting/List.vue"),
                        },
                    ],
                },
                {
                    path: "/finance",
                    name: "finance",
                    redirect: "/finance/account_panel/list",
                    meta: { title: "财务" },
                    children: [
                        {
                            path: "/finance/account_panel/list",
                            name: "accountPanelManage",
                            meta: { title: "账户总览" },
                            component: () => import("@/views/finance/accountPanel/List.vue"),
                        },
                        {
                            path: "/finance/user_withdraw_apply/list",
                            name: "userWithdrawApplyManage",
                            meta: { title: "提现申请" },
                            component: () => import("@/views/finance/userWithdrawApply/List.vue"),
                        },
                        {
                            path: "/finance/user_recharge_order/list",
                            name: "userRechargeOrderManage",
                            meta: { title: "充值记录" },
                            component: () => import("@/views/finance/userRechargeOrder/List.vue"),
                        },
                        {
                            path: "/finance/user_balance_log/list",
                            name: "userBalanceLogManage",
                            meta: { title: "余额日志" },
                            component: () => import("@/views/finance/userBalanceLog/List.vue"),
                        },
                        {
                            path: "/finance/user_invoice/list",
                            name: "userInvoice",
                            meta: { title: "发票管理" },
                            children: [
                                {
                                    path: "/finance/user_invoice/list/",
                                    name: "userInvoiceManage",
                                    meta: { title: "发票资质管理" },
                                    component: () => import("@/views/finance/userInvoice/List.vue"),
                                },
                                {
                                    path: "/finance/order_invoice/list/",
                                    name: "orderInvoiceManage",
                                    meta: { title: "发票申请" },
                                    component: () => import("@/views/finance/orderInvoice/List.vue"),
                                },
                            ],
                        },
                        {
                            path: "/finance/refund_apply/list",
                            name: "refundApplyManage",
                            meta: { title: "退款申请" },
                            component: () => import("@/views/finance/refundApply/List.vue"),
                        },
                        {
                            path: "/finance/paylog/list",
                            name: "paylogManage",
                            meta: { title: "交易日志" },
                            component: () => import("@/views/finance/payLog/List.vue"),
                        },
                    ],
                },
                {
                    path: "/authority",
                    name: "authority",
                    redirect: "/authority/list",
                    meta: { title: "权限" },
                    children: [
                        {
                            path: "/authority/list",
                            name: "authorityManage",
                            meta: { title: "权限目录" },
                            component: () => import("@/views/authority/authority/List.vue"),
                        },
                        {
                            path: "/authority/admin_user/list",
                            name: "adminUserManage",
                            meta: { title: "管理员列表" },
                            component: () => import("@/views/authority/adminUser/List.vue"),
                        },
                        {
                            path: "/authority/admin_role/list",
                            name: "adminRoleManage",
                            meta: { title: "角色列表" },
                            component: () => import("@/views/authority/adminRole/List.vue"),
                        },
                        {
                            path: "/authority/admin_log/list",
                            name: "adminLogManage",
                            meta: { title: "管理员日志" },
                            component: () => import("@/views/authority/adminLog/List.vue"),
                        },
                        {
                            path: "/authority/suppliers/list",
                            name: "suppliersManage",
                            meta: { title: "供应商列表" },
                            component: () => import("@/views/authority/suppliers/List.vue"),
                        },
                        {
                            path: "/authority/code_file/index",
                            name: "codeFileManage",
                            meta: { title: "代码生成" },
                            component: () => import("@/views/authority/codeFile/Index.vue"),
                        },
                        {
                            path: "/authority/account_editing/index",
                            name: "accountEditingManage",
                            meta: { title: "个人中心" },
                            component: () => import("@/views/authority/accountEditing/Index.vue"),
                        },
                    ],
                },
                {
                    path: "/order",
                    name: "order",
                    redirect: "/order/list",
                    meta: { title: "订单" },
                    children: [
                        {
                            path: "/order/list",
                            name: "orderManage",
                            meta: { title: "订单列表" },
                            component: () => import("@/views/order/order/List.vue"),
                        },
                        {
                            path: "/order/info",
                            name: "orderInfoManage",
                            meta: { title: "订单详情" },
                            component: () => import("@/views/order/order/Info.vue"),
                        },
                        {
                            path: "/order/exchange_order/list",
                            name: "exchangeOrderManage",
                            meta: { title: "积分订单", queryParam: "is_exchange_order" },
                            component: () => import("@/views/order/order/List.vue"),
                        },
                        // {
                        //     path: '/order/add',
                        //     name: 'add_order',
                        //     meta: { title: '代会员下单' },
                        //     component: () => import('@/views/addOrder/List.vue'),
                        // },
                        {
                            path: "/order/aftersales/list",
                            name: "aftersalesManage",
                            meta: { title: "售后申请" },
                            component: () => import("@/views/order/aftersales/List.vue"),
                        },
                        {
                            path: "/order/order_export/list",
                            name: "orderExportManage",
                            meta: { title: "订单导出" },
                            component: () => import("@/views/order/orderExport/List.vue"),
                        },
                    ],
                },
                {
                    path: "/store",
                    name: "store",
                    redirect: "/store/list",
                    meta: { title: "店铺" },
                    children: [
                        {
                            path: "/store/list",
                            name: "storeManage",
                            meta: { title: "店铺列表" },
                            component: () => import("@/views/store/store/List.vue"),
                        },
                    ],
                },
                {
                    path: "/user",
                    name: "user",
                    redirect: "/user/list",
                    meta: { title: "会员" },
                    children: [
                        {
                            path: "/user/list",
                            name: "userManage",
                            meta: { title: "会员列表" },
                            component: () => import("@/views/user/user/List.vue"),
                        },
                        {
                            path: "/user/user_rank/list",
                            name: "userRankManage",
                            meta: { title: "会员等级" },
                            component: () => import("@/views/user/userRank/List.vue"),
                        },
                        {
                            path: "/user/user_right",
                            name: "userRight",
                            meta: { title: "会员权益" },
                            children: [
                                {
                                    path: "/user/user_type/list",
                                    name: "userTypeManage",
                                    meta: { title: "会员类型" },
                                    component: () => import("@/views/user/userType/List.vue"),
                                },
                                {
                                    path: "/user/user_right/list",
                                    name: "userRightManage",
                                    meta: { title: "会员权益" },
                                    component: () => import("@/views/user/userRight/List.vue"),
                                },
                                {
                                    path: "/user/agreement/list/",
                                    name: "agreementManage",
                                    meta: { title: "会员协议" },
                                    component: () => import("@/views/user/agreement/List.vue"),
                                },
                            ],
                        },
                        {
                            path: "/user/feedback/list",
                            name: "feedbackManage",
                            meta: { title: "会员留言" },
                            component: () => import("@/views/user/feedback/List.vue"),
                        },
                        {
                            path: "/user/message_log/list",
                            name: "messageLogManage",
                            meta: { title: "站内信" },
                            component: () => import("@/views/user/messageLog/List.vue"),
                        },
                        {
                            path: "/user/push_log/list",
                            name: "pushLogManage",
                            meta: { title: "APP消息推送" },
                            component: () => import("@/views/user/pushLog/List.vue"),
                        },
                        {
                            path: "/user/integral_log/list",
                            name: "integralLogManage",
                            meta: { title: "积分日志" },
                            component: () => import("@/views/user/integralLog/List.vue"),
                        },
                    ],
                },
                {
                    path: "/setting",
                    name: "setting",
                    redirect: "/config/base",
                    meta: { title: "设置" },
                    children: [
                        {
                            path: "/setting/config",
                            name: "config",
                            meta: { title: "系统设置" },
                            children: [
                                {
                                    path: "/setting/config/base",
                                    name: "configManage",
                                    meta: { title: "商城设置" },
                                    component: () => import("@/views/setting/config/Base.vue"),
                                },
                                {
                                    path: "/setting/config/mail",
                                    name: "mailManage",
                                    meta: { title: "邮箱服务器设置" },
                                    component: () => import("@/views/setting/config/Mail.vue"),
                                },
                                {
                                    path: "/setting/config/after_sales_service",
                                    name: "afterSalesServiceManage",
                                    meta: { title: "售后服务设置" },
                                    component: () => import("@/views/setting/config/AfterSalesService.vue"),
                                },
                                {
                                    path: "/setting/config/mail_template",
                                    name: "mailTemplateManage",
                                    meta: { title: "邮箱模板设置" },
                                    component: () => import("@/views/setting/config/MailTemplate.vue"),
                                },
                                {
                                    path: "/setting/config/message_type/list",
                                    name: "messageTypeManage",
                                    meta: { title: "消息设置" },
                                    component: () => import("@/views/setting/config/messageType/List.vue"),
                                },
                                {
                                    path: "/setting/config/payment",
                                    name: "paymentManage",
                                    meta: { title: "支付设置" },
                                    component: () => import("@/views/setting/config/Payment.vue"),
                                },
                            ],
                        },
                        {
                            path: "/setting/shipping",
                            name: "shipping",
                            meta: { title: "配送/运费设置" },
                            children: [
                                {
                                    path: "/setting/logistics_company/list",
                                    name: "logisticsCompanyManage",
                                    meta: { title: "物流公司" },
                                    component: () => import("@/views/setting/logisticsCompany/List.vue"),
                                },
                                {
                                    path: "/setting/shipping_type/list",
                                    name: "shippingTypeManage",
                                    meta: { title: "配送类型" },
                                    component: () => import("@/views/setting/shippingType/List.vue"),
                                },
                                {
                                    path: "/setting/shipping_tpl/list/",
                                    name: "shippingTplManage",
                                    meta: { title: "运费模板" },
                                    component: () => import("@/views/setting/shippingTpl/List.vue"),
                                },
                            ],
                        },
                        {
                            path: "/setting/region/list",
                            name: "regionManage",
                            meta: { title: "地区列表" },
                            component: () => import("@/views/setting/region/List.vue"),
                        },
                        {
                            path: "/setting/friend_links/list",
                            name: "friendLinksManage",
                            meta: { title: "友情链接" },
                            component: () => import("@/views/setting/friendLinks/List.vue"),
                        },
                        {
                            path: "/setting/crons/list",
                            name: "cronsManage",
                            meta: { title: "计划任务" },
                            component: () => import("@/views/setting/crons/List.vue"),
                        },
                        {
                            path: "/setting/app_version/list",
                            name: "appVersionManage",
                            meta: { title: "APP版本" },
                            component: () => import("@/views/setting/appVersion/List.vue"),
                        },
                    ],
                },
                {
                    path: "/product",
                    name: "product",
                    redirect: "/product/list",
                    meta: { title: "商品" },
                    children: [
                        {
                            path: "/product/list",
                            name: "productManage",
                            meta: { title: "商品列表" },
                            component: () => import("@/views/product/product/List.vue"),
                        },
                        {
                            path: "/product/brand/list",
                            name: "brandManage",
                            meta: { title: "商品品牌" },
                            component: () => import("@/views/product/brand/List.vue"),
                        },
                        {
                            path: "/product/category/list",
                            name: "categoryManage",
                            meta: { title: "商品分类" },
                            component: () => import("@/views/product/category/List.vue"),
                        },
                        {
                            path: "/product/product_batch",
                            name: "productBatch",
                            meta: { title: "商品批量处理" },
                            children: [
                                {
                                    path: "/product/product_batch/image/list",
                                    name: "productBatchImageManage",
                                    meta: { title: "图片批量处理" },
                                    component: () => import("@/views/product/productBatch/image/List.vue"),
                                },
                                {
                                    path: "/product/product_batch/export/list",
                                    name: "productBatchExportManage",
                                    meta: { title: "商品批量导出" },
                                    component: () => import("@/views/product/productBatch/export/List.vue"),
                                },
                                {
                                    path: "/product/product_batch/add/list",
                                    name: "productBatchAddManage",
                                    meta: { title: "商品批量上传" },
                                    component: () => import("@/views/product/productBatch/add/List.vue"),
                                },
                                {
                                    path: "/product/product_batch/edit/list",
                                    name: "productBatchEditManage",
                                    meta: { title: "商品批量修改" },
                                    component: () => import("@/views/product/productBatch/edit/List.vue"),
                                },
                            ],
                        },
                        {
                            path: "/product/comment/list",
                            name: "commentManage",
                            meta: { title: "商品评论" },
                            component: () => import("@/views/product/comment/List.vue"),
                        },
                        {
                            path: "/product/product_services/list",
                            name: "productServicesManage",
                            meta: { title: "商品服务列表" },
                            component: () => import("@/views/product/productServices/List.vue"),
                        },
                        {
                            path: "/product/example/list",
                            name: "example",
                            meta: { title: "演示模型" },
                            component: () => import("@/views/product/example/List.vue"),
                        },
                        // {
                        //     path: '/product/product_auto/list',
                        //     name: 'productAutoManage',
                        //     meta: { title: '商品自动上下架' },
                        //     component: () => import('@/views/product/productAuto/List.vue'),
                        // },
                        {
                            path: "/product/product_inventory_log/list",
                            name: "productInventoryLogManage",
                            meta: { title: "商品库存日志" },
                            component: () => import("@/views/product/productInventoryLog/List.vue"),
                        },
                        {
                            path: "/gallery/list",
                            name: "gallery",
                            meta: { title: "相册" },
                            component: () => import("@/views/gallery/Gallery.vue"),
                        },
                        {
                            path: "/product/product_attributes_tpl/list",
                            name: "productAttributesTplManage",
                            meta: { title: "属性模板" },
                            component: () => import("@/views/product/productAttributesTpl/List.vue"),
                        },
                    ],
                },
                {
                    path: "/decorate",
                    name: "decorate",
                    meta: { title: "装修" },
                    children: [
                        {
                            path: "/decorate/",
                            name: "mobileDecorate",
                            meta: { title: "移动端装修" },
                            children: [
                                {
                                    path: "/decorate/mobile_decorate/list",
                                    name: "mobileDecorateManage",
                                    meta: { title: "页面管理" },
                                    component: () => import("@/views/decorate/mobileDecorate/List.vue"),
                                },
                                {
                                    path: "/decorate/mobile_cat_nav/list",
                                    name: "mobileCatNavManage",
                                    meta: { title: "首页分类栏" },
                                    component: () => import("@/views/decorate/mobileCatNav/List.vue"),
                                },
                                {
                                    path: "/decorate/mobile_decorate/nav",
                                    name: "mobileNavManage",
                                    meta: { title: "导航栏设置" },
                                    component: () => import("@/views/decorate/mobileDecorate/Nav.vue"),
                                },
                            ],
                        },
                        {
                            path: "/decorate/",
                            name: "pcDecorate",
                            meta: { title: "PC端装修" },
                            children: [
                                {
                                    path: "/decorate/pc_decorate/list",
                                    name: "pcDecorateManage",
                                    meta: { title: "页面管理" },
                                    component: () => import("@/views/decorate/pcDecorate/List.vue"),
                                },
                                {
                                    path: "/decorate/pc_navigation/list",
                                    name: "pcNavigationManage",
                                    meta: { title: "PC导航栏" },
                                    component: () => import("@/views/decorate/pcNavigation/List.vue"),
                                },
                                {
                                    path: "/decorate/pc_cat_floor/list",
                                    name: "pcCatFloorManage",
                                    meta: { title: "PC分类抽屉" },
                                    component: () => import("@/views/decorate/pcCatFloor/List.vue"),
                                },
                                {
                                    path: "/decorate/pc_decorate/other",
                                    name: "pcDecorateOtherManage",
                                    meta: { title: "其它页面" },
                                    component: () => import("@/views/decorate/pcDecorate/Other.vue"),
                                },
                            ],
                        },
                        {
                            path: "/decorate/theme_style/info",
                            name: "themeStyleManage",
                            meta: { title: "主题风格" },
                            component: () => import("@/views/decorate/themeStyle/Info.vue"),
                        },
                    ],
                },
            ],
        },
        {
            path: "/decorate/index",
            name: "decorateEdit",
            component: () => import("@/layouts/decorate/index.vue"),
            meta: { title: "装修" },
            children: [
                // dashboard
                {
                    path: "/decorate/index",
                    name: "decorateEdit",
                    meta: { title: "装修" },
                    component: () => import("@/views/decorate/decorate/Index.vue"),
                },
                // dashboard
                {
                    path: "/decorate/pc",
                    name: "pcDecorateEdit",
                    meta: { title: "PC首页装修" },
                    component: () => import("@/views/decorate/decorate/Pc.vue"),
                },
            ],
        },
        {
            path: "/print/orderPrint",
            name: "print",
            component: () => import("@/layouts/blank/index.vue"),
            meta: { title: "打印" },
            children: [
                {
                    path: "/print/orderPrint",
                    name: "orderPrintManage",
                    meta: { title: "订单打印" },
                    component: () => import("@/views/print/orderPrint/List.vue"),
                },
            ],
        },
        {
            path: "/",
            name: "login",
            component: () => import("@/layouts/blank/index.vue"),
            meta: { title: "登录" },
            redirect: "/login/index",
            children: [
                // dashboard
                {
                    path: "/login/index",
                    name: "login",
                    meta: { title: "登录" },
                    component: () => import("@/views/login/Login.vue"),
                },
            ],
        },
        {
            path: "/:pathMatch(.*)",
            //访问主页的时候 重定向到index页面
            redirect: "/404",
        },
        {
            path: "/404",
            name: "404",
            component: () => import("@/layouts/blank.vue"),
        },
    ],
});

// reset router
export function resetRouter() {
    router.getRoutes().forEach((route) => {
        const { name } = route;
        if (name && !WHITE_NAME_LIST.includes(name as string)) {
            router.hasRoute(name) && router.removeRoute(name);
        }
    });
}

export default router;
