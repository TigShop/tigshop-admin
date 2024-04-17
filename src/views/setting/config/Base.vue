<template>
    <div class="container">
        <div class="content_wrapper">
            <el-tabs v-model="activeKey" class="lyecs-tabs" tab-position="top" @tab-change="onTabChange">
                <el-tab-pane :key="1" label="基础设置" name="基础设置"></el-tab-pane>
                <el-tab-pane :key="2" label="商品设置" name="商品设置"></el-tab-pane>
                <el-tab-pane :key="3" label="购物设置" name="购物设置"></el-tab-pane>
                <el-tab-pane :key="4" label="通知设置" name="通知设置"></el-tab-pane>
                <el-tab-pane :key="5" label="显示设置" name="显示设置"></el-tab-pane>
                <el-tab-pane :key="6" label="客服设置" name="客服设置"></el-tab-pane>
                <el-tab-pane :key="7" label="接口设置" name="接口设置"></el-tab-pane>
            </el-tabs>
            <a-spin :spinning="loading">
                <el-form ref="formRef" :model="formState" label-width="160px">
                    <div v-show="activeKey === '基础设置'" class="content">
                        <div class="title">店铺信息</div>
                        <el-form-item label="商城简称" prop="shop_name">
                            <el-input v-model="formState.shop_name" />
                            <div class="extra">该名称只需填写商城的名称即可，无需带其它关键词</div>
                        </el-form-item>
                        <el-form-item label="SEO标题后缀" prop="shop_title_suffix">
                            <el-input v-model="formState.shop_title_suffix" />
                            <div class="extra">该后缀将显示在浏览器的标题栏，与SEO有关，建议长度不要超过20字符，效果如：“购物车 - Tig商城”</div>
                        </el-form-item>
                        <el-form-item label="首页SEO标题" prop="shop_title">
                            <el-input v-model="formState.shop_title" />
                            <div class="extra">商城首页的完整标题（不带后缀）</div>
                        </el-form-item>
                        <el-form-item label="首页SEO关键词" prop="shop_keywords">
                            <InputTag v-if="!loading" v-model.modelValue="formState.shop_keywords" placeholder="请输入关键字，按回车键确认"></InputTag>
                            <div class="extra">首页关键词，该设置与SEO有关，建议不要超过10个关键词（输入完请按回车键确认）</div>
                        </el-form-item>
                        <el-form-item label="首页SEO描述" prop="shop_desc">
                            <el-input v-model="formState.shop_desc" />
                            <div class="extra">首页描述，该设置与SEO有关，建议长度不要超过50字符</div>
                        </el-form-item>
                        <el-form-item label="商城LOGO" prop="shop_logo">
                            <FormAddGallery v-model:photo="formState.shop_logo" />
                            <div class="extra">请根据首页模板设置对应大小的LOGO，高清需要上传双倍大小</div>
                        </el-form-item>
                        <el-form-item label="ico图标上传" prop="ico_img">
                            <FormAddGallery v-model:photo="formState.ico_img" />
                            <div class="extra">推荐使用高清128*128像素，格式为png或ico</div>
                        </el-form-item>
                        <el-form-item label="会员默认头像" prop="default_avatar">
                            <FormAddGallery v-model:photo="formState.default_avatar" />
                            <div class="extra">请上传1:1的200*200像素以内的图片</div>
                        </el-form-item>
                        <div class="title">全局设置</div>
                        <el-form-item label="PC端域名" prop="pc_domain">
                            <el-input v-model="formState.pc_domain" maxlength="40" placeholder="" />
                            <div class="extra">格式参考：www.tigshop.com（不要带http//或https://，后面不要带“/”），填写后查看商城或查看商品默认跳PC端</div>
                        </el-form-item>
                        <el-form-item label="H5端域名" prop="h5_domain">
                            <el-input v-model="formState.h5_domain" maxlength="40" placeholder="" />
                            <div class="extra">格式参考：m.tigshop.com（不要带http//或https://，后面不要带“/”），PC端域名未填写时，会跳转H5端</div>
                        </el-form-item>
                        <el-form-item label="是否开启商品缓存" prop="is_open_goods_cache">
                            <el-radio-group v-model="formState.is_open_goods_cache" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                            <div class="extra">首页等获取推荐商品时的数据查询会被缓存（当缓存出现异常时可关闭）</div>
                        </el-form-item>
                        <el-form-item label="是否开启分类缓存" prop="is_open_cat_cache">
                            <el-radio-group v-model="formState.is_open_cat_cache" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                            <div class="extra">分类相关数据会被缓存，当分类较多时，强列建议开启</div>
                        </el-form-item>
                        <el-form-item label="是否开启数据缓存" prop="is_open_data_cache">
                            <el-radio-group v-model="formState.is_open_data_cache" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                            <div class="extra">数据缓存保存的是设置项等经常要重复调用的数据，建议开启</div>
                        </el-form-item>
                        <el-form-item label="是否显示报错" prop="is_display_error">
                            <el-radio-group v-model="formState.is_display_error" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                            <div class="extra">正式上线后请关闭此项，如果需要调试数据库或代码报错请再开启</div>
                        </el-form-item>
                        <el-form-item label="JS和CSS版本号" prop="style_version">
                            <el-input
                                v-model="formState.style_version"
                                maxlength="40"
                                @input="formState.style_version = formState.style_version.replace(/[^\d]/g, '')" />
                            <div class="extra">用于清除JS、CSS缓存</div>
                        </el-form-item>
                        <el-form-item label="访问统计" prop="visit_stats">
                            <el-radio-group v-model="formState.visit_stats" class="itemWidth">
                                <el-radio :value="1">开启</el-radio>
                                <el-radio :value="0">关闭</el-radio>
                            </el-radio-group>
                            <div class="extra">开启后将记录访问日志，关闭则不记录，同时也会影响站点统计数据展示</div>
                        </el-form-item>
                        <el-form-item label="是否自动跳转H5" prop="is_buy_lymobile">
                            <el-radio-group v-model="formState.is_buy_lymobile" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                            <div class="extra">当识别到设备为移动设备时，访问PC端时自动跳转至手机H5端</div>
                        </el-form-item>
                        <div class="title">Redis设置</div>
                        <el-form-item label="缓存是否使用Redis" prop="is_open_redis">
                            <el-radio-group v-model="formState.is_open_redis" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                            <div class="extra">
                                开启Redis缓存后，数据、商品等将使用Redis缓存驱动机制，大幅提高速度和并发量（生效需要开启基础设置->全局设置里的缓存！）
                            </div>
                        </el-form-item>
                        <el-form-item label="Session是否使用Redis" prop="session_open_redis">
                            <el-radio-group v-model="formState.session_open_redis" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                            <div class="extra">Session使用Redis驱动能有效的配合负载均衡、分布式部署、主备服务器等高并发架构</div>
                        </el-form-item>
                        <el-form-item label="Redis服务器地址" prop="redis_host">
                            <el-input v-model="formState.redis_host" />
                            <div class="extra">Redis服务器与商城服务器请尽可能部署在同一局域网或同一环境内，不推荐远程连接使用</div>
                        </el-form-item>
                        <el-form-item label="Redis服务器端口" prop="redis_host_port">
                            <el-input v-model="formState.redis_host_port" />
                            <div class="extra">Redis默认端口为6379，安全考虑请在Redis服务器更换默认端口</div>
                        </el-form-item>
                        <el-form-item label="Redis服务器密码" prop="redis_host_password">
                            <el-input v-model="formState.redis_host_password" />
                        </el-form-item>
                        <div class="title">消息队列设置</div>
                        <el-form-item label="是否开启消息队列" prop="is_open_queue">
                            <el-radio-group v-model="formState.is_open_queue" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                            <div class="extra">消息队列默认使用Redis驱动，请开启前务必配置好Redis服务器，并且在终端项目根目录执行php lyecs queue:listen</div>
                        </el-form-item>
                        <div class="title">登录设置</div>
                        <el-form-item label="短信登录方式" prop="mobile_login_need_reg">
                            <el-radio-group v-model="formState.mobile_login_need_reg" class="itemWidth">
                                <el-radio :value="1">必须为注册会员</el-radio>
                                <el-radio :value="0">非会员时自动注册为会员</el-radio>
                            </el-radio-group>
                            <div>
                                <div class="extra">如果选“必须为注册会员”，则先判断登陆的手机是否已注册，没注册的话提示先注册；</div>
                                <div class="extra">如果选“非会员时自动注册为会员”，则自动注册验证的手机号为商城会员</div>
                            </div>
                        </el-form-item>
                        <el-form-item label="是否开启短信登陆" prop="enable_mobile_logn">
                            <el-radio-group v-model="formState.enable_mobile_logn" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                            <div class="extra">如果选择该项，登陆时可以支持手机短信验证登陆</div>
                        </el-form-item>
                        <el-form-item label="是否开启微信扫码登录" prop="is_wx_affiliate">
                            <el-radio-group v-model="formState.is_wx_affiliate" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                            <div class="extra">开启可以使用微信扫一扫登录（请通过接口设置完善微信开放平台信息设置）</div>
                        </el-form-item>
                        <el-form-item label="微信一键登录" prop="is_wx_auto_regist">
                            <el-radio-group v-model="formState.is_wx_auto_regist" class="itemWidth">
                                <el-radio :value="1">需完善手机号信息</el-radio>
                                <el-radio :value="0">自动生成会员，无需手机号</el-radio>
                            </el-radio-group>
                            <div>
                                <div class="extra">
                                    推荐选择“需完善手机号信息”，如果选择“自动生成会员，无需手机号”，扫码或微信一键登录时，系统会判断是否存在账号；
                                </div>
                                <div class="extra">如果不存在，自动以微信openId为用户名生成一个账号，昵称为微信账号名称（如果会员隐私设置公开的话）；</div>
                            </div>
                        </el-form-item>
                        <el-form-item label="登录三次失败强制验证码" prop="captcha_login_fail">
                            <el-radio-group v-model="formState.captcha_login_fail" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <div class="title">其他设置</div>
                        <el-form-item label="评论是否需要审核" prop="comment_check">
                            <el-radio-group v-model="formState.comment_check" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                            <div class="extra">开启后评论默认不会展示出来，需要后台审核后才会显示</div>
                        </el-form-item>
                        <el-form-item label="留言是否需要审核" prop="message_check">
                            <el-radio-group v-model="formState.message_check" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                            <div class="extra">开启后留言默认不会展示出来，需要后台审核后才会显示</div>
                        </el-form-item>
                        <div class="title">备案信息</div>
                        <el-form-item label="版权所有" prop="shop_company">
                            <el-input v-model="formState.shop_company" />
                        </el-form-item>
                        <el-form-item label="详细地址" prop="kefu_address">
                            <el-input v-model="formState.kefu_address" />
                        </el-form-item>
                        <el-form-item label="ICP备案号" prop="shop_icp_no">
                            <el-input v-model="formState.shop_icp_no" />
                        </el-form-item>
                        <el-form-item label="ICP备案链接" prop="shop_icp_no_url">
                            <el-input v-model="formState.shop_icp_no_url" placeholder="不填则默认为：http://beian.miit.gov.cn" />
                        </el-form-item>
                        <el-form-item label="公安备案号" prop="shop_110_no">
                            <el-input v-model="formState.shop_110_no" placeholder="不填则不显示" />
                        </el-form-item>
                        <el-form-item label="公安备案链接" prop="shop_110_link">
                            <el-input v-model="formState.shop_110_link" placeholder="可不填" />
                        </el-form-item>
                        <div class="title">关闭商城</div>
                        <el-form-item label="关闭商城" prop="close_shop">
                            <el-radio-group v-model="formState.close_shop" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item v-if="formState.close_shop == 1" label="关闭网店的原因" prop="close_shop_reason">
                            <el-input v-model="formState.close_shop_reason" :autosize="{ minRows: 4, maxRows: 8 }" type="textarea" />
                        </el-form-item>
                        <el-form-item label="是否关闭注册" prop="shop_reg_closed">
                            <el-radio-group v-model="formState.shop_reg_closed" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <div v-show="activeKey === '商品设置'" class="content">
                        <div class="title">商品基础设置</div>
                        <el-form-item label="商品货币符" prop="dollar_sign">
                            <el-input v-model="formState.dollar_sign" />
                            <div class="extra">货币符号 ，如：¥、€、$</div>
                        </el-form-item>
                        <el-form-item label="商品货币中文" prop="dollar_sign_cn">
                            <el-input v-model="formState.dollar_sign_cn" />
                            <div class="extra">货币符号中文，如：元、美元、欧元等</div>
                        </el-form-item>
                        <el-form-item label="商品货号前缀" prop="sn_prefix">
                            <el-input v-model="formState.sn_prefix" />
                        </el-form-item>
                        <el-form-item label="价格格式" prop="price_format">
                            <el-radio-group v-model="formState.price_format" class="itemWidth">
                                <el-radio :value="0">不处理</el-radio>
                                <el-radio :value="1">保留不为0的小数</el-radio>
                                <el-radio :value="2">保留一位小数</el-radio>
                                <el-radio :value="3">不保留小数</el-radio>
                                <el-radio :value="4">四舍五入，保留一位小数</el-radio>
                                <el-radio :value="5">四舍五入，不保留小数</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="默认库存" prop="default_storage">
                            <el-input v-model="formState.default_storage" />
                        </el-form-item>
                        <el-form-item label="商品URL格式" prop="goods_url_type">
                            <el-radio-group v-model="formState.goods_url_type" class="itemWidth">
                                <el-radio :value="0">商品ID</el-radio>
                                <el-radio :value="1">商品货号</el-radio>
                            </el-radio-group>
                            <div class="extra">选择商品ID是，商品链接为：/item/1.html；选择货号是链接为：/item/SN00001.html</div>
                        </el-form-item>
                        <el-form-item label="限购商品判定天数" prop="limit_day">
                            <el-input v-model="formState.limit_day" />
                            <div class="extra">如果商品设置了限购数量，在此天数内的订单商品都会计入数量。</div>
                        </el-form-item>
                        <el-form-item label="自动生成关键词" prop="is_auto_goods_keywords">
                            <el-radio-group v-model="formState.is_auto_goods_keywords" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                            <div class="extra">当商品关键词为空时，是否自动生成关键词（根据名称自动分词），该功能有利于搜索词匹配</div>
                        </el-form-item>
                        <div class="title">缩略图设置</div>
                        <el-form-item label="水印上传" prop="watermark">
                            <FormAddGallery v-model:photo="formState.watermark" />
                            <div class="extra">为保证透明效果，格式推荐为png</div>
                        </el-form-item>
                        <el-form-item label="水印位置" prop="watermark_place">
                            <el-radio-group v-model="formState.watermark_place" class="itemWidth">
                                <el-radio-button :value="0">无</el-radio-button>
                                <el-radio-button :value="1">左上</el-radio-button>
                                <el-radio-button :value="2">右上</el-radio-button>
                                <el-radio-button :value="3">居中</el-radio-button>
                                <el-radio-button :value="4">左下</el-radio-button>
                                <el-radio-button :value="5">右下</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="水印透明度" prop="watermark_alpha">
                            <el-input v-model="formState.watermark_alpha" />
                            <div class="extra">水印的透明度，可选值为0-100。当设置为100时则为不透明。</div>
                        </el-form-item>
                        <div class="title">显示相关</div>
                        <el-form-item label="显示价格走势" prop="is_show_price_trend">
                            <el-radio-group v-model="formState.is_show_price_trend" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                            <div class="extra">是否显示PC端商品详情页的价格趋势按钮</div>
                        </el-form-item>
                        <el-form-item label="显示销量" prop="show_selled_count">
                            <el-radio-group v-model="formState.show_selled_count" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                            <div class="extra">是否在商品详情页显示商品销量</div>
                        </el-form-item>
                        <el-form-item label="显示市场价" prop="show_marketprice">
                            <el-radio-group v-model="formState.show_marketprice" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                            <div class="extra">是否在商品详情页价格栏目中显示市场价</div>
                        </el-form-item>
                        <el-form-item label="是否模糊库存" prop="is_spe_goods_number">
                            <el-radio-group v-model="formState.is_spe_goods_number" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                            <div class="extra">钩选则详情页的库存量将模糊处理</div>
                        </el-form-item>
                        <el-form-item v-if="formState.is_spe_goods_number == 1" label="模糊库存设置">
                            <span>商品数为0时显示缺货，小于</span>
                            <el-input v-model="formState.spe_goods_number_1" class="ml8 width60"></el-input>
                            <span class="ml8">显示仅剩多少件 ，小于</span>
                            <el-input v-model="formState.spe_goods_number_2" class="ml8 width60"></el-input>
                            <span class="ml8">显示库存紧张， 大于</span>
                            <el-input v-model="formState.spe_goods_number_3" class="ml8 width60"></el-input>
                            <span class="ml8">显示库存充足</span>
                        </el-form-item>
                        <el-form-item label="列表页商品数量" prop="page_size">
                            <el-input v-model="formState.page_size" />
                            <div class="extra">请根据PC端模板填写合适的数量，仅对PC端列表页面、搜索页面有效</div>
                        </el-form-item>
                        <el-form-item label="浏览记录最多保存" prop="history_number">
                            <el-input v-model="formState.history_number" />
                        </el-form-item>
                        <el-form-item label="品牌分类" prop="ly_brand_type">
                            <el-input v-model="formState.ly_brand_type" :autosize="{ minRows: 4, maxRows: 38 }" type="textarea" />
                            <div class="extra">一行代表一种分类名称</div>
                        </el-form-item>
                        <el-form-item label="默认评论标签" prop="comment_default_tag">
                            <el-input v-model="formState.comment_default_tag" />
                            <div class="extra">如果商品不设置，则显示该默认标签，以,号分开</div>
                        </el-form-item>
                        <div class="title">其他设置</div>
                        <el-form-item label="市场价换算" prop="market_price_rate">
                            <el-input v-model="formState.market_price_rate" />
                            <div class="extra">输入商品价格时将自动根据该比例计算市场价格，推荐：1.2</div>
                        </el-form-item>
                    </div>
                    <div v-show="activeKey === '购物设置'" class="content">
                        <div class="title">购物全局设置</div>
                        <el-form-item label="是否启用库存" prop="use_storage">
                            <el-radio-group v-model="formState.use_storage" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                            <div class="extra">如果关闭，下单将不会再判断库存是否充足</div>
                        </el-form-item>
                        <el-form-item label="库存减少时机" prop="stock_dec_time">
                            <el-radio-group v-model="formState.stock_dec_time" class="itemWidth">
                                <el-radio :value="1">会员提交订单时</el-radio>
                                <el-radio :value="2">后台设置发货时</el-radio>
                            </el-radio-group>
                            <div class="extra">请根据实际情况设置，推荐设置为“会员提交订单时”</div>
                        </el-form-item>
                        <el-form-item label="不同店铺自动拆分" prop="auto_split_paid_order">
                            <el-radio-group v-model="formState.auto_split_paid_order" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                            <div class="extra">如果选是，会员的订单支付成功后，来自不同店铺的商品后会自动拆分为多个子订单（仅LYECS商家入驻版有效）</div>
                        </el-form-item>
                        <el-form-item label="运费模板地区设置机制" prop="child_area_need_region">
                            <el-radio-group v-model="formState.child_area_need_region" class="itemWidth">
                                <el-radio :value="1">仅设置的地区可配送</el-radio>
                                <el-radio :value="0">未设置的地区皆可配送（使用默认运费设置）</el-radio>
                            </el-radio-group>
                            <div>
                                <div class="extra">
                                    运费模板一旦增加指定地区运费，如果该设置为“仅设置的地区可配送”，将不再默认全国都可配送，而是只能配送到增加的地区（如果收货地址不在设置范围，该配送类型不可用）；
                                </div>
                                <div class="extra">
                                    如果设置为“未设置的地区使用默认运费设置”，收货地址如果是设置的地区范围内，则按该地区的运费计费，如果不在这范围内，则按默认计费（相当于不会存在不能配送的区域）；
                                </div>
                                <div class="extra">
                                    如何选择？如果所有商品可全国配送，就选“未设置的地区使用默认运费设置”，如果有的商品只配送给部分区域，则选前者，该设置会对全站商品生效，慎重设置！
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="运费叠加机制" prop="shipping_tpl_fee_merge">
                            <el-radio-group v-model="formState.shipping_tpl_fee_merge" class="itemWidth">
                                <el-radio :value="0">简单相加</el-radio>
                                <el-radio :value="1">取最大的运费值</el-radio>
                                <el-radio :value="2">智能计算（取全部的首重(件)价的最大值，再加上所有的增重(件)溢价）</el-radio>
                            </el-radio-group>
                            <div>
                                <div class="extra">该设置解决在下单时，同一店铺订单下的所有商品，如果含有多个不同运费模板，计算运费时的合并问题。</div>
                                <div class="extra">比如，有四件商品，其中两件是运费模板A（计算运费为15元），另两件是运费模板B（计算运费为5元）</div>
                                <div class="extra">如果简单相加，最终运费则为20元；</div>
                                <div class="extra">如果取最大值，最终运费则为15元；</div>
                                <div class="extra">如果智能计算（取全部的首重(件)价的最大值，再加上所有增重和增件溢价）；</div>
                                <div class="extra">最终运费比较：简单相加 > 智能计算 > 取最大的运费值</div>
                            </div>
                        </el-form-item>
                        <div class="title">订单设置</div>
                        <el-form-item label="未付款订单" prop="auto_cancel_order_hour">
                            <div class="itemWidth">
                                <el-input v-model="formState.auto_cancel_order_hour" style="width: 120px" />
                                <span class="ml8">小时自动取消</span>
                            </div>
                            <div class="extra">未支付的订单会自动取消，请填写小时，比如8则代表8小时未付款则取消订单，为0或空则不限制</div>
                        </el-form-item>
                        <el-form-item label="已取消订单能否恢复" prop="recover_cancel_order">
                            <el-radio-group v-model="formState.recover_cancel_order" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                            <div class="extra">后台订单操作中是可以恢复已取消的订单</div>
                        </el-form-item>
                        <div class="title">结算设置</div>
                        <el-form-item label="是否能使用优惠券" prop="use_bonus">
                            <el-radio-group v-model="formState.use_bonus" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                            <div class="extra">如果为否，订单结算时将不可选择优惠券抵扣</div>
                        </el-form-item>
                        <!-- <el-form-item label="是否能使用余额" prop="use_surplus">
                            <el-radio-group v-model="formState.use_surplus" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                            <div class="extra">如果为否，订单结算时将不可选择余额支付</div>
                        </el-form-item> -->
                        <div class="title">积分设置</div>
                        <el-form-item label="是否能使用积分" prop="use_integral">
                            <el-radio-group v-model="formState.use_integral" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                            <div class="extra">如果为否，订单结算时将不能使用积分抵扣</div>
                        </el-form-item>
                        <el-form-item label="积分名称" prop="integral_name">
                            <el-input v-model="formState.integral_name" />
                            <div class="extra">您可以将积分重新命名。例如：金豆、金币</div>
                        </el-form-item>
                        <el-form-item label="积分换算比例" prop="integral_scale">
                            <el-input v-model="formState.integral_scale" />
                            <div class="extra">每100积分可抵多少元现金</div>
                        </el-form-item>
                        <el-form-item label="积分支付比例" prop="integral_percent">
                            <el-input v-model="formState.integral_percent" />
                            <div class="extra">每100元商品最多可以使用多少元积分</div>
                        </el-form-item>
                        <el-form-item label="评论商品送积分" prop="comment_send_point">
                            <el-input v-model="formState.comment_send_point" />
                            <div class="extra">每次有效评论赠送积分数</div>
                        </el-form-item>
                        <el-form-item label="晒单商品送积分	" prop="show_send_point">
                            <el-input v-model="formState.show_send_point" />
                            <div class="extra">每次有效晒单赠送积分数</div>
                        </el-form-item>
                        <el-form-item label="签到赠送积分" prop="use_qiandao_point">
                            <el-radio-group v-model="formState.use_qiandao_point" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                            <div class="extra">是否开启每日签到赠送积分</div>
                        </el-form-item>
                        <div class="title">发票设置</div>
                        <el-form-item label="是否能开发票" prop="can_invoice">
                            <el-radio-group v-model="formState.can_invoice" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                            <div class="extra">如果为否，订单结算时将不显示发票</div>
                        </el-form-item>
                        <el-form-item label="发票内容" prop="invoice_content">
                            <el-input v-model="formState.invoice_content" />
                            <div class="extra">多个发票内容请使用逗号,隔开</div>
                        </el-form-item>
                        <el-form-item label="是否支持增值税专用发票" prop="invoice_added">
                            <el-radio-group v-model="formState.invoice_added" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                            <div class="extra">开启增值税专用发票会同步开启发票资质提交和审核，关闭则只显示“普通发票”</div>
                        </el-form-item>
                        <div class="title">活动设置</div>
                        <el-form-item label="大转盘是否开启" prop="lottery_closed">
                            <el-radio-group v-model="formState.lottery_closed" class="itemWidth">
                                <el-radio :value="0">开启</el-radio>
                                <el-radio :value="1">关闭</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="大转盘花费积分	" prop="lottery_point">
                            <el-input v-model="formState.lottery_point" />
                        </el-form-item>
                        <el-form-item label="拼团是否开启" prop="is_open_pin">
                            <el-radio-group v-model="formState.is_open_pin" class="itemWidth">
                                <el-radio :value="1">开启</el-radio>
                                <el-radio :value="0">关闭</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="砍一砍是否开启" prop="is_open_bargain">
                            <el-radio-group v-model="formState.is_open_bargain" class="itemWidth">
                                <el-radio :value="1">开启</el-radio>
                                <el-radio :value="0">关闭</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <div class="title">退换货设置</div>
                        <el-form-item label="回寄联系人设置" prop="return_consignee">
                            <el-input v-model="formState.return_consignee" />
                        </el-form-item>
                        <el-form-item label="回寄电话设置" prop="return_mobile">
                            <el-input v-model="formState.return_mobile" />
                        </el-form-item>
                        <el-form-item label="回寄地址设置" prop="return_address">
                            <el-input v-model="formState.return_address" />
                        </el-form-item>
                    </div>
                    <div v-show="activeKey === '通知设置'" class="content">
                        <div class="title">短信设置</div>
                        <el-form-item label="短信帐户用户名" prop="sms_key_id">
                            <el-input v-model="formState.sms_key_id" />
                            <div class="extra">您所申请的短信服务用户名，不填则表示不开通</div>
                        </el-form-item>
                        <el-form-item label="短信帐户密码" prop="sms_key_secret">
                            <el-input v-model="formState.sms_key_secret" />
                            <div class="extra">您所申请的短信服务密码</div>
                        </el-form-item>
                        <el-form-item label="短信签名" prop="sms_sign_name">
                            <el-input v-model="formState.sms_sign_name" />
                            <div class="extra">阿里短信这里填短信签名，其它的根据具体短信接口填写</div>
                        </el-form-item>
                        <el-form-item label="商家短信号码" prop="sms_shop_mobile">
                            <el-input v-model="formState.sms_shop_mobile" />
                            <div class="extra">用于接收会员订单等信息</div>
                        </el-form-item>
                        <div class="title">邮箱通知</div>
                        <el-form-item label="客服收件地址" prop="service_email">
                            <el-input v-model="formState.service_email" />
                            <div class="extra">该客服邮件地址可用于接收下面所设置的通知</div>
                        </el-form-item>
                        <el-form-item label="提交订单发送邮件" prop="send_confirm_email">
                            <el-radio-group v-model="formState.send_confirm_email" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                            <div class="extra">订单提交后发送（未支付），建议选“否”</div>
                        </el-form-item>
                        <el-form-item label="订单支付发送邮件" prop="order_pay_email">
                            <el-radio-group v-model="formState.order_pay_email" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                            <div class="extra">会员支付订单成功时，是否给会员发送邮件</div>
                        </el-form-item>
                        <el-form-item label="下单给客服发邮件" prop="send_service_email">
                            <el-radio-group v-model="formState.send_service_email" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                            <div class="extra">提示：此处为发送给客服，商城信息中的客服邮件地址不为空时，该选项有效</div>
                        </el-form-item>
                        <el-form-item label="发货时发送邮件" prop="send_ship_email">
                            <el-radio-group v-model="formState.send_ship_email" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                            <div class="extra">提示：该邮件是发给客户</div>
                        </el-form-item>
                    </div>
                    <div v-show="activeKey === '显示设置'" class="content">
                        <div class="title">通用设置</div>
                        <el-form-item label="搜索热门关键字" prop="search_keywords">
                            <el-input v-model="formState.search_keywords" />
                            <div class="extra">头部搜索框下方显示的搜索关键字,请用半角逗号(,)分隔多个关键字；颜色加亮请用b标签包含</div>
                        </el-form-item>
                        <el-form-item label="敏感词屏蔽" prop="msg_hack_word">
                            <el-input v-model="formState.msg_hack_word" />
                            <div class="extra">设置后留言中出现的字符会提示非法，请用“,”号隔开，</div>
                        </el-form-item>
                        <el-form-item label="搜索关键词分词" prop="is_open_pscws">
                            <el-radio-group v-model="formState.is_open_pscws" class="itemWidth">
                                <el-radio :value="1">开启</el-radio>
                                <el-radio :value="0">关闭</el-radio>
                            </el-radio-group>
                            <div class="extra">开启后将自动分词，比如：儿童机器人，分拆分为：儿童、机器人（会降低搜索结果精准度）</div>
                        </el-form-item>
                        <el-form-item label="自营名称" prop="self_store_name">
                            <el-input v-model="formState.self_store_name" />
                            <div class="extra">比如：官方自营、LYECS自营，仅对B2B2C多商户版本有效</div>
                        </el-form-item>
                        <div class="title">地区设置</div>
                        <el-form-item label="商城默认地区" prop="shop_country">
                            <div class="itemWidth">
                                <SelectRegion v-if="!loading" v-model="formState.shop_default_regions"></SelectRegion>
                            </div>
                            <div class="extra">此地区会在系统未判断出用户IP所在地域时，默认定位地区（仅影响PC端右上角送货地址）</div>
                        </el-form-item>
                        <el-form-item label="默认国家" prop="default_country">
                            <el-select v-model="formState.default_country" style="width: 100%">
                                <el-option value="0" label="不选择" />
                                <el-option v-for="item in countryList" :key="item.region_id" :value="item.region_id" :label="item.region_name" />
                            </el-select>
                            <div class="extra">
                                如果选择了默认国家，则会员在选择地址时默认会显示该国家下的省份或地区，不再显示国家选择（修改设置对已经添加的会员地址不生效）
                            </div>
                        </el-form-item>
                        <div class="title">分类显示</div>
                        <el-form-item label="商城分类级数" prop="show_cat_level">
                            <el-radio-group v-model="formState.show_cat_level" class="itemWidth">
                                <el-radio :value="1">二级</el-radio>
                                <el-radio :value="0">三级或以上</el-radio>
                            </el-radio-group>
                            <div class="extra">根据商城情况，选择最多有多少分类级别，会影响到手机端分类展示方式（不推荐只设置一级分类）</div>
                        </el-form-item>
                        <el-form-item label="是否显示分类小图标" prop="is_show_cat_icos">
                            <el-radio-group v-model="formState.is_show_cat_icos" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                            <div class="extra">PC端分类、首页楼层ICO小图标是否显示</div>
                        </el-form-item>
                        <el-form-item label="PC首页baner高度" prop="banner_height">
                            <el-input v-model="formState.banner_height" />
                            <div class="extra">请结合分类抽屉楼层设置，会直接影响到首页分类抽屉的高度，单位为像素px（只需填数字）</div>
                        </el-form-item>
                        <div class="title">PC端首页</div>
                        <el-form-item label="是否显示抢购活动" prop="is_show_home_qgmod">
                            <el-radio-group v-model="formState.is_show_home_qgmod" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="是否显示领券中心" prop="is_show_home_bonus">
                            <el-radio-group v-model="formState.is_show_home_bonus" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="是否显示每日推荐" prop="is_show_group">
                            <el-radio-group v-model="formState.is_show_group" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="是否显示全球进口" prop="is_show_global_imported">
                            <el-radio-group v-model="formState.is_show_global_imported" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="新品速递最多显示数量" prop="index_new_limit">
                            <el-input v-model="formState.index_new_limit" />
                            <div class="extra">默认：30，为0则不显示</div>
                        </el-form-item>
                        <el-form-item label="侧边栏背景颜色" prop="tool_bar_color">
                            <div class="itemWidth">
                                <el-color-picker v-model="formState.tool_bar_color" :predefine="['#7a6e6e']" class="itemWidth" show-alpha />
                            </div>
                            <div class="extra">默认：#7a6e6e</div>
                        </el-form-item>
                    </div>
                    <div v-show="activeKey === '客服设置'" class="content">
                        <div class="title">客服设置</div>
                        <el-form-item label="客服选择" prop="kefu_type">
                            <el-radio-group v-model="formState.kefu_type" class="itemWidth">
                                <el-radio-button :value="0">无客服</el-radio-button>
                                <el-radio-button :value="1">腾讯云客服</el-radio-button>
                                <el-radio-button :value="2">企业微信客服</el-radio-button>
                                <el-radio-button :value="3">自定义客服</el-radio-button>
                            </el-radio-group>
                            <div v-if="formState.kefu_type == 1">
                                <div class="extra">腾讯云设置地址：https://yzf.qq.com/xv/html/admin/chat/channel/web</div>
                                <div class="extra">设置流程：1、注册账号；2、会话->渠道设置->网站渠道，点击新增网站；3、在编辑里获取sign的值</div>
                            </div>
                            <div v-if="formState.kefu_type == 2">
                                <div class="extra">提示：PC端打开企业微信客服会唤起PC端微信，如果未安装PC端微信也可查看二维码后扫码使用;</div>
                                <div class="extra">企业微信客服设置地址：https://work.weixin.qq.com/wework_admin/frame#/apps</div>
                                <div class="extra">设置流程：1、注册账号；2、应用管理->应用->微信客服->客服帐号->创建账号；3、客服账号获取帐号ID</div>
                            </div>
                            <div v-if="formState.kefu_type == 3">
                                <div class="extra">提示：来回切换设置会丢失自定义客服的设置项，如需恢复请勿提交保存，刷新页面即可</div>
                            </div>
                        </el-form-item>

                        <div v-if="formState.kefu_type == 1">
                            <el-form-item label="腾讯云客服打开方式" prop="kefu_yzf_type">
                                <el-radio-group v-model="formState.kefu_yzf_type">
                                    <el-radio :value="1">内嵌弹窗打开</el-radio>
                                    <el-radio :value="0">打开链接地址</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="腾讯云客服sign	" prop="kefu_yzf_sign">
                                <el-input v-model="formState.kefu_yzf_sign" />
                                <div class="extra">提示：sign为空时客服设置不生效！</div>
                            </el-form-item>
                        </div>

                        <div v-if="formState.kefu_type == 2">
                            <el-form-item label="企业微信客服ID" prop="kefu_workwx_id">
                                <el-input v-model="formState.kefu_workwx_id" />
                                <div class="extra">提示：ID为空时客服设置不生效！</div>
                            </el-form-item>
                        </div>
                        <div v-if="formState.kefu_type == 3">
                            <el-form-item label="客服链接" prop="kefu_code">
                                <el-input v-model="formState.kefu_code" />
                                <div class="extra">如果是脚本控制的链接，请在此处填入： 请填写http开头的客服链接;</div>
                            </el-form-item>
                            <el-form-item label="客服链接打开方式" prop="kefu_code_blank">
                                <el-radio-group v-model="formState.kefu_code_blank">
                                    <el-radio :value="0">打开链接地址</el-radio>
                                    <el-radio :value="1">内嵌弹窗打开</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </div>

                        <div class="title">客服信息</div>
                        <el-form-item label="客服热线电话" prop="kefu_phone">
                            <el-input v-model="formState.kefu_phone" />
                            <div class="extra">不填则不显示</div>
                        </el-form-item>
                        <el-form-item label="服务时间" prop="kefu_time">
                            <el-input v-model="formState.kefu_time" />
                        </el-form-item>
                    </div>
                    <div v-show="activeKey === '接口设置'" class="content">
                        <div class="title">微信公众号</div>
                        <el-form-item label="微信APPID" prop="lyecs_wechat_appId">
                            <el-input v-model="formState.lyecs_wechat_appId" />
                            <div class="extra">请从微信公众号后台获取，链接：https://mp.weixin.qq.com</div>
                        </el-form-item>
                        <el-form-item label="微信AppSecret" prop="lyecs_wechat_appSecret">
                            <el-input v-model="formState.lyecs_wechat_appSecret" />
                            <div class="extra">请从微信公众号后台获取</div>
                        </el-form-item>
                        <div class="title">微信开放平台<span class="subtitle">（PC端用户扫码登录使用）</span></div>
                        <el-form-item label="网站应用APPID" prop="lyecs_wechat_open_appId">
                            <el-input v-model="formState.lyecs_wechat_open_appId" />
                            <div class="extra">请从公众开放平台后台获取，链接：https://open.weixin.qq.com</div>
                        </el-form-item>
                        <el-form-item label="网站应用AppSecret" prop="lyecs_wechat_open_appSecret">
                            <el-input v-model="formState.lyecs_wechat_open_appSecret" />
                            <div class="extra">请从公众开放平台后台获取</div>
                        </el-form-item>
                        <div class="title">微信商户</div>
                        <el-form-item label="微信商户号类型" prop="lyecs_wechat_pay_mchid_type">
                            <el-radio-group v-model="formState.lyecs_wechat_pay_mchid_type">
                                <el-radio :value="1">服务商模式</el-radio>
                                <el-radio :value="0">普通商户</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="微信支付商户号" prop="lyecs_wechat_pay_mchid">
                            <el-input v-model="formState.lyecs_wechat_pay_mchid" />
                            <div class="extra">请从微信商户号后台获取，链接：https://pay.weixin.qq.com</div>
                        </el-form-item>
                        <el-form-item label="微信支付子商户号" prop="lyecs_wechat_pay_sub_mchid">
                            <el-input v-model="formState.lyecs_wechat_pay_sub_mchid" />
                            <div class="extra">开通服务商模式请填写此项！</div>
                        </el-form-item>
                        <el-form-item label="微信支付APP KEY" prop="lyecs_wechat_pay_key">
                            <el-input v-model="formState.lyecs_wechat_pay_key" />
                            <div class="extra">请从微信商户号后台获取</div>
                        </el-form-item>
                        <div class="title">微信小程序</div>
                        <el-form-item label="微信小程序AppID" prop="lyecs_wechat_miniProgram_appId">
                            <el-input v-model="formState.lyecs_wechat_miniProgram_appId" />
                            <div class="extra">微信小程序公众平台->设置->开发设置中获取，开通小程序必填</div>
                        </el-form-item>
                        <el-form-item label="微信小程序AppSecret" prop="lyecs_wechat_miniProgram_secret">
                            <el-input v-model="formState.lyecs_wechat_miniProgram_secret" />
                            <div class="extra">微信小程序公众平台->设置->开发设置中获取，开通小程序必填</div>
                        </el-form-item>
                        <div class="title">微信APP支付</div>
                        <el-form-item label="应用APP ID" prop="wechat_pay_app_id">
                            <el-input v-model="formState.wechat_pay_app_id" />
                            <div class="extra">需开通微信开发者平台，创建APP应用（未开通LYECS APP商城可忽略）</div>
                        </el-form-item>
                        <el-form-item label="应用APP SECRET" prop="wechat_pay_app_secret">
                            <el-input v-model="formState.wechat_pay_app_secret" />
                            <div class="extra">需通微信开发者平台获取（未开通LYECS APP商城可忽略）</div>
                        </el-form-item>
                        <div class="title">ICO图标</div>
                        <el-form-item label="官方图标库地址" prop="ico_tig_css">
                            <el-input v-model="formState.ico_tig_css" />
                            <div>
                                <div class="extra">
                                    官方图标库不建议修改，自定义图标库功能可以满足自定义需求，如需恢复默认可填：https://at.alicdn.com/t/c/font_4441878_29ep8jtwh2k.css
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="自定义ico图标库" prop="ico_defined_css">
                            <el-input v-model="formState.ico_defined_css" />
                            <div>
                                <div class="extra">
                                    自定义ico图标库，前往http://iconfont.cn添加，按Tigshop教程操作，这里只需填写如：<br />https//at.alicdn.com/t/font_400590_y7t88bzlwhskbj4i.css
                                </div>
                                <div class="extra">您也可以下载至本地服务器，只需填写能访问到iconfont的完整域名和存放路径</div>
                            </div>
                        </el-form-item>
                        <div class="title">第三方登录</div>
                        <el-form-item label="QQ登陆 KEY" prop="qq_login_key">
                            <el-input v-model="formState.qq_login_key" />
                            <div class="extra">请填写第三方提供的id KEY，不填则不显示，申请链接：https://connect.qq.com</div>
                        </el-form-item>
                        <el-form-item label="QQ登陆 SECRET" prop="qq_login_secret">
                            <el-input v-model="formState.qq_login_secret" />
                            <div class="extra">请填写第三方提供的密钥 SECRET</div>
                        </el-form-item>
                        <div class="title">物流接口</div>
                        <el-form-item label="LYECS物流KEY" prop="lyecs_api_key">
                            <el-input v-model="formState.lyecs_api_key" />
                            <div class="extra">请通过LYECS获取物流API KEY，每一个物流单号（不限查询次数）会消耗一点API账户余额</div>
                        </el-form-item>
                        <div class="title">快递100订阅</div>
                        <el-form-item label="是否开启快递100订阅" prop="kuaidi100_limit">
                            <el-radio-group v-model="formState.kuaidi100_limit" class="itemWidth">
                                <el-radio :value="1">开启</el-radio>
                                <el-radio :value="0">关闭</el-radio>
                            </el-radio-group>
                            <div class="extra">开启后，物流签收会通知平台。</div>
                        </el-form-item>
                        <el-form-item label="快递100下发Key" prop="kuaidi100_key">
                            <el-input v-model="formState.kuaidi100_key" />
                        </el-form-item>
                        <div class="title">存储设置</div>
                        <el-form-item label="存储类型" prop="storage_type">
                            <el-radio-group v-model="formState.storage_type" class="itemWidth">
                                <el-radio :value="0">本地存储</el-radio>
                                <el-radio :value="1">阿里云OSS存储</el-radio>
                                <el-radio :value="2">腾讯云COS存储</el-radio>
                            </el-radio-group>
                            <div class="extra">开启云存储后，图片会直接通过接口上传至指定云存储，不会再保存在本地。</div>
                        </el-form-item>
                        <el-form-item label="图片存储路径" prop="storage_local_url" v-if="formState.storage_type == 0">
                            <el-input v-model="formState.storage_local_url" />
                            <div class="extra">参考格式： https://oss.tigshop.com/</div>
                        </el-form-item>
                        <el-form-item label="图片存储路径" prop="storage_oss_url" v-if="formState.storage_type == 1">
                            <el-input v-model="formState.storage_oss_url" />
                            <div class="extra">参考格式： https://oss.tigshop.com/</div>
                        </el-form-item>
                        <el-form-item label="图片存储路径" prop="storage_cos_url" v-if="formState.storage_type == 2">
                            <el-input v-model="formState.storage_cos_url" />
                            <div class="extra">参考格式： https://oss.tigshop.com/</div>
                        </el-form-item>
                        <template v-if="formState.storage_type != 0">
                            <el-form-item label="AccessKeyId" prop="storage_oss_access_key_id" v-if="formState.storage_type == 1">
                                <el-input v-model="formState.storage_oss_access_key_id" />
                            </el-form-item>
                            <el-form-item label="SecretId" prop="storage_cos_secret_id" v-if="formState.storage_type == 2">
                                <el-input v-model="formState.storage_cos_secret_id" />
                            </el-form-item>
                            <el-form-item label="AccessKeySecret" prop="storage_oss_access_key_secret" v-if="formState.storage_type == 1">
                                <el-input v-model="formState.storage_oss_access_key_secret" />
                            </el-form-item>
                            <el-form-item label="KeySecret" prop="storage_cos_secret_key" v-if="formState.storage_type == 2">
                                <el-input v-model="formState.storage_cos_secret_key" />
                            </el-form-item>
                            <el-form-item label="空间名称" prop="storage_oss_bucket" v-if="formState.storage_type == 1">
                                <el-input v-model="formState.storage_oss_bucket" />
                            </el-form-item>
                            <el-form-item label="空间名称" prop="storage_cos_bucket" v-if="formState.storage_type == 2">
                                <el-input v-model="formState.storage_cos_bucket" />
                            </el-form-item>
                            <el-form-item label="空间地区" prop="storage_oss_region" v-if="formState.storage_type == 1">
                                <el-input v-model="formState.storage_oss_region" />
                                <div class="extra"></div>
                            </el-form-item>
                            <el-form-item label="空间地区" prop="storage_cos_region" v-if="formState.storage_type == 2">
                                <el-input v-model="formState.storage_cos_region" />
                                <div class="extra"></div>
                            </el-form-item>
                        </template>
                        <div class="title">商品采集接口</div>
                        <el-form-item label="接口Key" prop="onebound_key">
                            <el-input v-model="formState.onebound_key" />
                        </el-form-item>
                        <el-form-item label="接口Secret" prop="onebound_secret">
                            <el-input v-model="formState.onebound_secret" />
                        </el-form-item>
                    </div>
                </el-form>
                <div style="height: 20px"></div>
                <div class="selected-action-warp">
                    <div class="selected-action" style="padding-left: 80px">
                        <a-button :loading="confirmLoading" class="form-submit-btn" size="large" type="primary" @click="onSubmit">提 交</a-button>
                    </div>
                </div>
            </a-spin>
        </div>
    </div>
</template>

<script lang="ts" setup>
import "@/style/css/list.less";
import { onMounted, ref, shallowRef } from "vue";
import { FormAddGallery } from "@/components/gallery";
import { InputTag } from "@/components/form";
import { SelectRegion } from "@/components/select";
import { message } from "ant-design-vue";
import { BaseFormState, Regions } from "@/types/setting/config";
import { getConfig, saveConfig } from "@/api/setting/config";

const formRef = shallowRef();
// 基本参数定义
const activeKey = ref<string>("基础设置");
const confirmLoading = ref<boolean>(false);
const formState = ref<BaseFormState>({
    style_version: "",
    use_wechat: 0,
    use_alipay: 0,
    use_surplus: 0,
    use_offline: 0,
    use_another: 0,
});
const onTabChange = (val: string) => {
    activeKey.value = val;
};
const countryList = ref<Regions[]>([]);
// 加载列表
onMounted(async () => {
    loadFilter();
});
const loading = ref<boolean>(true);
const loadFilter = async () => {
    try {
        const result = await getConfig({
            code: "base",
        });
        Object.assign(formState.value, result.item);
        countryList.value = result.countrys || [];
    } catch (error: any) {
        message.error(error.message);
    } finally {
        loading.value = false;
    }
};
// 表单通过验证后提交
const onSubmit = async () => {
    confirmLoading.value = true;

    try {
        const result = await saveConfig({
            code: "base",
            ...formState.value,
        });
        message.success(result.message);
    } catch (error: any) {
        message.error(error.message);
    } finally {
        confirmLoading.value = false;
    }
};
</script>
<style lang="less" scoped>
.content {
    padding: 10px;

    .title {
        font-weight: bold;
        padding-top: 20px;
        padding-bottom: 20px;
        font-size: 14px;
    }

    .subtitle {
        color: #999;
        font-weight: normal;
        font-size: 12px;
    }
}

.mr8 {
    margin-right: 8px;
}

.width60 {
    width: 60px;
}

.ml8 {
    margin-left: 8px;
}
</style>
<style>
.itemWidth {
    width: 100%;
}
</style>
