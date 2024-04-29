<template>
    <div class="page-top">
        <div class="page-top-warp">
            <div class="top-bar-left">
                <div class="top-bar-item wap-show" v-if="0">
                    <span class="open-menu-btn icon-zhankai iconfont"></span>
                </div>
                <div class="top-bar-item wap-show" v-if="0">
                    <a class="wap-refresh-btn icon-shuaxin iconfont" href="javascript:;" onclick="location.reload();"></a>
                </div>
                <div class="top-bar-item wap-show" v-if="0">
                    <a class="wap-openShop-btn icon-wangdianwaibao iconfont" href="{$lycfg.domain}" target="_blank"></a>
                </div>
                <div class="top-bar-item top-bar-search-warp">
                    <div class="top-bar-search">
                        <el-input
                            v-model="keyword"
                            style="width: 300px"
                            placeholder="在这里查找功能，一键直达"
                            :prefix-icon="Search"
                            @input="onInput"
                            @blur="onBlur" />
                    </div>
                </div>
                <div class="search-menu-con" v-show="isShow">
                    <div class="search-menu-title">搜索结果</div>
                    <div class="search-menu-list">
                        <div class="menu-item" v-for="item in searchMenu" @click="toPage(item.route_link)">
                            <!-- <router-link :to="{ path: '/' + item.route_link }"> -->
                            <p>{{ item.authority_name }}</p>
                            <!-- </router-link> -->
                        </div>
                        <div class="empty" v-if="searchMenu.length < 1">没有搜索到栏目！</div>
                    </div>
                </div>
            </div>
            <div class="top-bar-right">
                <div class="top-bar-item top-admin_msg">
                    <DialogForm
                        v-bind:is-drawer="false"
                        path="panel/adminMsg/AdminMsg"
                        title="消息中心"
                        :showFooter="false"
                        width="1000px"
                        :bodyStyle="{ padding: 0 }">
                        <a class="top-bar-btn lyecs-dialogPage">
                            <i class="admin-iconfont icon-tongzhi"></i><span>消息</span><em class="admin_msg-count" v-if="unreadMsg">{{ unreadMsg }}</em>
                        </a>
                    </DialogForm>
                </div>
                <div class="top-bar-item openShop-btn">
                    <a class="top-bar-btn" :href="urlFormat('/')" target="_blank"><i class="iconfont icon-guanli"></i><span>查看店铺</span></a>
                </div>
                <div class="top-bar-item" id="dropdown-memu">
                    <a-dropdown>
                        <a class="top-bar-btn" href="javascript:;">
                            <span class="admin-user-photo">
                                     <template v-if="extractContent(String(userInfo.avatar))">
                                          <img :src="getAssetsFile(extractContent(String(userInfo.avatar)))" />
                                    </template>
                                    <template v-else>
                                              <img :src="imageFormat(userInfo.avatar)" />
                                    </template>
                            </span>
                            {{ userInfo.username }}<i class="iconfont icon-xiala"></i>
                        </a>
                        <template #overlay>
                            <div class="dropdown-memu top-bar-memu">
                                <div class="entrance-list">
                                    <router-link :to="{ path: '/authority/account_editing/index' }">
                                        <p class="entrance lyecs-openPage">
                                            <i class="iconfont icon-gerenshezhi" style="font-size: 22px"></i>
                                            <span>管理账号</span>
                                        </p>
                                    </router-link>
                                    <p class="entrance" @click="clearCache">
                                        <i class="iconfont icon-qingchuhuancun" style="font-size: 22px"></i>
                                        <span>清除缓存</span>
                                    </p>
                                    <router-link :to="{ path: '/setting/config/base' }">
                                        <p class="entrance lyecs-openPage">
                                            <i class="iconfont icon-quanxian" style="font-size: 22px"></i>
                                            <span>后台设置</span>
                                        </p>
                                    </router-link>
                                </div>
                                <div>
                                    <div class="admin_exit">
                                        <a @click="onLogout"><span>退出登录</span></a>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </a-dropdown>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import request from "@/utils/request";
import { useUserStore } from "@/store/user";
import { useConfigStore } from "@/store/config";
import { useMenusStore } from "@/store/menu";
import { useCategoryStore } from "@/store/category";
import { notification } from "ant-design-vue";
import { DialogForm } from "@/components/dialog";
import { urlFormat, imageFormat } from "@/utils/format";
import { Search } from "@element-plus/icons-vue";
import { getSearchMenu } from "@/api/panel/adminMsg";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import {extractContent, getAssetsFile} from "@/utils/util";
import {Image} from "@/components/image";
const router = useRouter();
interface searchFrom {
    authority_name: string;
    route_link: string;
}
const keyword = ref("");
const searchMenu = ref<searchFrom[]>([]);
const isShow = ref(false);
const onInput = async (e: any) => {
    try {
        const result: any = await getSearchMenu({ keyword: keyword.value });
        searchMenu.value = result.item;
        if (keyword.value) {
            isShow.value = true;
        }
    } catch (error: any) {
        message.error(error.message);
    }
};
const toPage = (route_link: string) => {
    isShow.value = false;
    keyword.value = "";
    searchMenu.value = [];
    router.push({
        path: "/" + route_link,
    });
};
const onBlur = () => {
    if (keyword.value == "") {
        isShow.value = false;
    }
};
const { setUserInfo, logout } = useUserStore();
const userInfo = computed(() => useUserStore().userInfo);
const unreadMsg = ref(0);
// 清除缓存
const clearCache = () => {
    request({
        url: "common/cache_manage/cleanup/",
        method: "post",
        params: {},
    }).then((result: any) => {
        const config = useConfigStore();
        const menus = useMenusStore();
        const cateGory = useCategoryStore();
        // 更新后台设置项
        setUserInfo(result.user_info);
        config.setConfig(result.config);
        menus.setMenus(result.main_menu);
        // cateGory.getCategoryList('getNew')
        notification["success"]({
            message: "缓存已清除",
            description: "缓存清除后可刷新页面更新效果",
        });
    });
};
const onLogout = () => {
    logout();
};
</script>
<style lang="less" scoped>
.page-top {
    background: #eef2ff;
    clear: both;
    font-size: 12px;
    height: 60px;
    min-width: 990px;
    position: fixed;
    top: 0;
    left: 108px;
    right: 0;
    z-index: 100;
    border-bottom: 1px solid #f0f2f5;
    box-sizing: border-box;
}

.page-top-warp {
    background: #fff;
    border-radius: 20px 0 0 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.dis_block {
    display: block;
}

.page-top .notice_box {
    background: #fff;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.12);
    position: absolute;
    right: 0;
    width: 200px;
    top: 50px;
    display: none;
    border-radius: 9px;
    padding: 20px 10px;
}

.page-top .notice_box .notice_bar {
    height: 20px;
    line-height: 20px;
    padding: 10px 15px;
    font-size: 14px;
    color: #333;
    font-weight: bold;
}

.page-top .notice_box a {
    line-height: 26px;
    color: #222;
    display: block;
    padding: 7px 15px;
    font-size: 13px;
    border-radius: 5px;
}

.page-top .notice_box a:hover {
    background: rgba(61, 127, 255, 0.06);
}

.page-top .notice_box .noc-warn {
    background: #f9243f;
    width: 19px;
    height: 19px;
    border-radius: 3px;
    position: absolute;
    right: 15px;
    margin-top: 4px;
    text-align: center;
    line-height: 19px;
    color: #333;
}

.page-top .notice_box .notice-arrow {
    border-bottom: 6px solid #fff;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    left: 193px;
    position: absolute;
    top: -6px;
    display: none;
}

.page-top .notice_box .notice_data_null {
    padding: 10px;
    text-align: center;
    font-size: 16px;
}

.dropdown-memu {
    background-color: #ffffff;
    box-shadow:
        0 6px 16px 0 rgba(0, 0, 0, 0.08),
        0 3px 6px -4px rgba(0, 0, 0, 0.12),
        0 9px 28px 8px rgba(0, 0, 0, 0.05);
    font-size: 12px;
    border-radius: 9px;
    position: relative;
    top: -5px;
}

.dropdown-memu .entrance-list {
    margin: 8px 0;
    overflow: hidden;
    padding: 8px 15px;
    width: 240px;
    display: flex;
    align-items: center;
}

.dropdown-memu .entrance-list p {
    border-radius: 2px;
    color: #333;
    height: 80px;
    text-align: center;
    width: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.dropdown-memu .entrance-list p:hover {
    background: #f5f5f5;
}

.dropdown-memu .entrance-list .page-top i {
    color: #788d9b;
    display: block;
    font-size: 20px;
    height: 40px;
    line-height: 40px;
    margin: 8px auto 4px;
    width: 40px;
    display: block;
}

.dropdown-memu .admin_exit {
    border-top: 1px solid #f5f5f5;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.dropdown-memu .admin_exit a {
    line-height: 40px;
    padding: 0 10px;
}

.page-top .more-memu {
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    position: absolute;
    font-size: 18px;
    width: 202px;
    padding: 0;
    display: none;
}

.page-top .more-memu a {
    display: block;
    float: left;
    width: 100px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    font-size: 12px;
    border-right: 1px solid #f1f1f1;
}

.page-top .more-memu a.odd {
    border-right: 0;
    width: 101px;
}

.page-top .more-memu a:hover {
    background: #f64747;
    color: #fff;
}

.search-menu-con {
    right: auto !important;
    left: 30px !important;
    top: 40px;
    background-clip: padding-box;
    background-color: #ffffff;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.12);
    font-size: 12px;
    position: absolute;
    border-radius: 9px;
}

.search-menu-con .empty {
    padding: 0;
}

.search-menu-con .search-menu-title {
    padding: 20px 20px 0 20px;
    color: #333;
}

.search-menu-con .search-menu-list {
    padding: 20px;
    width: 350px;
    display: flex;
    flex-wrap: wrap;
}

.search-menu-con .search-menu-list .menu-item {
    margin: 0 12px 12px 0;
    padding: 10px 18px;
    border-radius: 9px;
    background: #f7f8fa;
    cursor: pointer;
    display: inline-block;
    color: #666;
    font-size: 13px;
}
.search-menu-con .search-menu-list .menu-item a {
    color: #666;
}

.top-bar-left {
    display: flex;
    position: relative;
}

.top-bar-right {
    float: right;
    display: flex;
    align-items: center;
}

.top-bar-item {
    position: relative;
    display: flex;
    align-items: center;
}

.top-bar-item .top-bar-btn {
    display: block;
    height: 40px;
    padding: 0 16px;
    margin-right: 10px;
    font-size: 14px;
    color: #788d9b;
    text-align: center;
    transition:
        background 0.2s ease 0s,
        color 0.2s ease 0s;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    position: relative;
}

.top-bar-item .top-bar-btn:hover {
    background: #f7f7f7;
}

.top-bar-item .top-bar-btn .admin-user-photo img {
    width: 26px;
    height: 26px;
    border-radius: 26px;
    margin-right: 10px;
}

.top-bar-item .top-bar-btn i {
    padding: 0 3px;
    font-size: 18px;
}

.top-bar-item .top-bar-btn i.fs-18 {
    font-size: 18px;
}

.top-bar-item .top-bar-btn .noc_count {
    background: #ff9900;
    padding: 4px 7px;
    border-radius: 6px;
    vertical-align: top;
    margin-left: 4px;
}

.top-bar-item .top-bar-btn .admin_msg-count {
    position: absolute;
    right: 58px;
    top: 5px;
    font-size: 12px;
    color: #fff;
    background-color: #f33;
    line-height: 14px;
    padding: 0 5px;
    border-radius: 8px;
    border: 1px solid #fff;
}

.top-bar-search {
    position: relative;
    margin: 0 0 0 30px;
    :deep(.el-input__wrapper) {
        background: #f2f4f7;
        box-shadow: 0 0 0 1px #f2f4f7 inset;
        border: 1px solid #f2f4f7;
        border-radius: 15px;
        font-size: 13px;
    }
    :deep(.el-input__wrapper.is-focus) {
        box-shadow: 0 0 0 1px var(--tig-primary) inset;
    }
    :deep(.el-input__wrapper i) {
        color: #98a9cc;
        font-size: 14px;
    }
}

.top-bar-search input.top-bar-search-input {
    background: #f2f4f7;
    border: 1px solid #f2f4f7;
    border-radius: 15px;
    padding: 10px;
    height: 30px;
    line-height: 30px;
    box-sizing: border-box;
    padding-left: 30px;
    width: 300px;
}

.top-bar-search i {
    color: #98a9cc;
    position: absolute;
    left: 10px;
    top: 8px;
    font-size: 14px;
}
</style>
