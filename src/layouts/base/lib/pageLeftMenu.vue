<template>
    <div class="body-menu" :class="{ active: menusStore.menuActive }">
        <perfect-scrollbar class="main-menu">
            <div class="main-menu-logo">
                <a class="lyecs-openPage" data-href="index.html" data-tag="default" title="起始页" style="padding: 0 3px">
                    <img src="@/style/images/logo_blue2.png" />
                </a>
            </div>
            <ul v-if="menus">
                <template v-for="(menu, key) in menus">
                    <li v-if="menu.is_show" :class="'main-menu-item menu_' + menu.authority_sn + ' ' + (menu.current ? 'current' : '')">
                        <a @click.prevent="actionPush(menu, true)" class="menu-tit" :href="'/' + menu.route_link">
                            <i :class="menu.authority_ico"></i>
                            <span class="nav-tit">{{ menu.authority_name }}</span>
                        </a>
                    </li>
                </template>
                <li style="height: 80px"></li>
            </ul>
        </perfect-scrollbar>
        <div :class="'child-menu ' + (childMenuShow ? 'child-menu-show' : '')">
            <template v-for="(menu, key) in menus">
                <perfect-scrollbar class="child_warp" v-if="menu.current && menu.is_show" :options="{ suppressScrollX: true }">
                    <div class="child-tit">{{ menu.authority_name }}</div>
                    <ul>
                        <template v-for="(child, ckey) in menu.children">
                            <template v-if="child.children">
                                <li :class="'menu-item ' + (child.current ? 'cur' : '')" v-if="child.is_show">
                                    <a class="menu-item-a" @click="child.current = !child.current">
                                        <i class="nav-icon iconfont icon-xiala"></i><span class="nav-title">{{ child.authority_name }}</span></a
                                    >
                                    <div class="menu-chider" v-if="child.current">
                                        <ul>
                                            <template v-for="(childer, m_ckey) in child.children">
                                                <li :class="'menu-item menu-chider-item ' + (childer.current ? 'current' : '')" v-if="childer.is_show">
                                                    <a class="" @click.prevent="actionPush(childer)">
                                                        <i class="nav-icon iconfont"></i>
                                                        <span class="nav-title">{{ childer.authority_name }}</span>
                                                    </a>
                                                </li>
                                            </template>
                                        </ul>
                                    </div>
                                </li>
                            </template>
                            <template v-else>
                                <li :class="'menu-item ' + (routerMatched[2].name == `${child.authority_sn}` ? 'current' : '')" v-if="child.is_show">
                                    <a class="menu-item-a" :target="child.blank ? '_blank' : ''" @click.prevent="actionPush(child)">
                                        <span class="nav-title">{{ child.authority_name }}</span>
                                    </a>
                                </li>
                            </template>
                        </template>
                        <li style="height: 80px"></li>
                    </ul>
                </perfect-scrollbar>
            </template>
            <div class="menu-bar-btn ng-scope" id="menu-bar-btn" @click="childMenuShow = !childMenuShow">
                <div class="menu-bar-inner">
                    <div class="menu-bar-bg"></div>
                    <div class="product-navbar-collapse">
                        <span class="icon-collapse-left iconfont">&#xe673;</span>
                        <span class="icon-collapse-right iconfont">&#xe673;</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="body-menu-mask" :class="{ active: menusStore.menuActive }" @click="menusStore.menuActive = !menusStore.menuActive"></div>
</template>
<script setup lang="ts">
import { ref, reactive, watchEffect, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useMenusStore } from "@/store/menu";
import type {MainMenu} from "@/types/common/common.d";

const menusStore = useMenusStore();
// 路由
const router = useRouter();
const store = useMenusStore();
const routerMatched = ref<any>([]);
// 伸缩子菜单
const childMenuShow = ref(true);
const showChildStatus = ref<any[]>([]);
// 获取当前路由用于匹配菜单选中状态
routerMatched.value = router.currentRoute.value.matched;
// 菜单
const menus = ref<MainMenu[]>(store.mainMenu);
// 加载菜单
// menus.value = reactive(store.mainMenu);
onMounted(() => {
    updateCurrentStatus(menus.value);
});
const updateCurrentStatus = (menuItems: any, level = 1, route = false) => {
    menuItems.forEach((menuItem: any) => {
        if (route == true && level == 2) {
            if (routerMatched.value[level].name === menuItem.authority_sn) {
                menuItem.current = true;
            }
        } else {
            menuItem.current = routerMatched.value[level] ? routerMatched.value[level].name === menuItem.authority_sn : false;
        }
        if (menuItem.children) {
            updateCurrentStatus(menuItem.children, level + 1, route);
        }
    });
};
// 主菜单栏目切换
const menuChange = (key: number) => {
    console.log(key);
    for (let i in menus.value) {
        menus.value[i].active = false;
    }
    menus.value[key].active = true;
};
// 子菜单栏展开子子菜单
const showChild = (key: any, ckey: any) => {
    showChildStatus.value[ckey] = !showChildStatus.value[ckey];
};
// 跳转页面
const actionPush = (menu: any, isMain = false) => {
    if (window.innerWidth <= 756) {
        if (isMain) {
            menus.value.forEach((element: any) => {
                element.current = false;
            });
            menu.current = true;
        } else {
            if (!menu.blank) {
                router.push("/" + menu.route_link);
            } else {
                window.open("/" + menu.route_link, "_blank");
            }
            menusStore.menuActive = false;
        }
    } else {
        if (!menu.blank) {
            router.push("/" + menu.route_link);
        } else {
            window.open("/" + menu.route_link, "_blank");
        }
    }
};
// 监听路由的变化
watchEffect(() => {
    routerMatched.value = router.currentRoute.value.matched;
    updateCurrentStatus(menus.value, 1, true);
});
</script>
<style lang="less" scoped>
.body-menu {
    z-index: 10;
    position: relative;
}

.main-menu {
    background: #eef2ff;
    width: 108px;
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    overflow: hidden;
}

.main-menu-logo {
    display: block;
    text-align: center;
    min-height: 85px;
}

.main-menu-logo img {
    width: 80%;
    margin: 20px 0;
}

.child-menu {
    background: #fff;
    width: 159px;
    position: fixed;
    left: 108px;
    top: 0;
    height: 100%;
    border-right: 1px solid #f0f2f5;
    -webkit-font-smoothing: initial;
}

.main-menu .menu-tit {
    color: #7a8599;
    cursor: pointer;
    height: 48px;
    line-height: 48px;
    overflow: hidden;
    position: relative;
    display: block;
    font-size: 14px;
    display: flex;
    justify-items: center;
}

.main-menu .menu-tit i {
    color: #7a8599;
    float: left;
    font-size: 18px;
    text-align: center;
    width: 48px;
    display: block;
    height: 48px;
}

.main-menu .menu-tit a {
    color: #fff;
}

.main-menu .menu-tit .nav-tit {
    vertical-align: middle;
    display: inline-block;
}

.main-menu li.current .menu-tit {
    background: #fff;
    color: var(--tig-primary);
    box-shadow: 0 5px 25px 1px rgba(0, 0, 0, 0.05);
}

.main-menu li.current .menu-tit i {
    color: var(--tig-primary);
}

.child_warp {
    overflow: hidden;
    position: relative;
    top: 60px;
    bottom: 0;
    left: 0;
    height: 100%;
}

.child-menu .child-tit {
    height: 70px;
    line-height: 70px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: bold;
    text-indent: 20px;
    width: 160px;
    color: #3b3b3b;
    font-size: 18px;
}

.child-menu li a.menu-item-a {
    color: #222;
    display: block;
    height: 40px;
    line-height: 40px;
    text-indent: 10px;
    position: relative;
    margin: 0 10px 4px;
    box-sizing: border-box;
    border-radius: 4px;
    font-size: 13px;
}

.child-menu li a.menu-item-a i.nav-icon {
    position: absolute;
    right: 7px;
    text-indent: 0;
    top: -1px;
    transform: rotate(0deg);
    display: block;
    transition: all 0.2s ease 0s;
}

.child-menu li.cur a.menu-item-a i.nav-icon {
    transform: rotate(180deg);
}

.child-menu li.cat a.menu-item-a {
    height: 32px;
    line-height: 32px;
}

.child-menu li a:hover {
    background: rgba(61, 127, 255, 0.06);
}

.child-menu li.menu-item.current a {
    background: rgba(61, 127, 255, 0.06);
    color: var(--tig-primary);
    border-radius: 4px;
}

.child-menu .menu-chider a {
    color: #888;
    display: block;
    height: 40px;
    line-height: 40px;
    text-indent: 20px;
    margin: 0 10px 4px;
    box-sizing: border-box;
}

.main-menu .menu_panel i.nav-icon::before {
    content: "\e7ca";
    font-size: 16px;
}

.main-menu .menu_product i.nav-icon::before {
    content: "\e74e";
    font-size: 17px;
}

.main-menu .menu_promotion i.nav-icon::before {
    content: "\e645";
}

.main-menu .menu_order i.nav-icon::before {
    content: "\e642";
}

.main-menu .menu_decorate i.nav-icon::before {
    content: "\e648";
    font-size: 20px;
}

.main-menu .menu_finance i.nav-icon::before {
    content: "\e647";
    font-size: 18px;
}

.main-menu .menu_stats i.nav-icon::before {
    content: "\e613";
    font-size: 17px;
}

.main-menu .menu_content i.nav-icon::before {
    content: "\e6f0";
    font-size: 17px;
}

.main-menu .menu_user i.nav-icon::before {
    content: "\e8b1";
}

.main-menu .menu_authority i.nav-icon::before {
    content: "\e641";
    font-size: 16px;
}

.main-menu .menu_setting i.nav-icon::before {
    content: "\e646";
}

.main-menu .menu_template i.nav-icon::before {
    content: "\e63a";
}

.main-menu .menu_backup i.nav-icon::before {
    content: "\e62a";
}

.main-menu .menu_distribution i.nav-icon::before {
    content: "\e640";
    font-size: 16px;
}

.main-menu .menu_email i.nav-icon::before {
    content: "\e744";
    font-size: 16px;
}

.main-menu .menu_store i.nav-icon::before {
    content: "\e643";
    font-size: 18px;
}

.main-menu .menu_team i.nav-icon::before {
    content: "\e649";
    font-size: 19px;
}

.menu-bar-btn *,
.menu-bar-btn *::before,
.menu-bar-btn *::after {
    box-sizing: border-box;
}

.menu-bar-btn {
    height: 50px;
    left: -20px;
    position: absolute;
    top: 50%;
    transition: all 0.2s ease 0s;
    width: 20px;
    z-index: 3;
    color: #f7f7f7;
}

.menu-bar-btn:hover .product-navbar-collapse {
    left: 0;
    left: auto;
    right: 0;
}

.menu-bar-btn:hover .menu-bar-bg {
    border-bottom: 8px solid transparent;
    border-left: 20px solid #d9dee4;
    border-top: 8px solid transparent;
    border-color: transparent #f7f7f7 transparent -moz-use-text-color;
    border-style: solid solid solid none;
    border-width: 8px 20px 8px medium;
}

.menu-bar-btn .menu-bar-inner {
    overflow: hidden;
    position: relative;
    top: -50%;
}

.menu-bar-btn .product-navbar-collapse {
    cursor: pointer;
    height: 50px;
    position: relative;
    text-align: center;
    transition:
        all 0.1s ease 0s,
        all 0.1s ease 0s;
    left: auto;
    right: -4px;
}

.menu-bar-btn .menu-bar-bg {
    border-bottom: 9px solid transparent;
    border-left: 13px solid #d9dee4;
    border-top: 9px solid transparent;
    height: 50px;
    left: 0;
    position: absolute;
    top: 0;
    transition:
        all 0.1s ease 0s,
        all 0.1s ease 0s;
    width: 0;
    border-color: transparent #f7f7f7 transparent -moz-use-text-color;
    border-style: solid solid solid none;
    border-width: 9px 13px 9px medium;
    left: auto;
    right: 0;
}

.menu-bar-btn .icon-collapse-left {
    display: none;
    font-size: 18px;
    line-height: 50px;
    vertical-align: text-top;
    vertical-align: text-top;
}

.menu-bar-btn .icon-collapse-right {
    display: inline-block;
    font-size: 18px;
    line-height: 50px;
    vertical-align: text-top;
    vertical-align: text-top;
    transform: rotate(180deg);
    color: #7a8599;
}

.child-menu-show .viewFramework-product-navbar-bg,
.child-menu-show .viewFramework-product-navbar {
    width: 160px;
}

.child-menu-show .viewFramework-product-body {
    left: 160px;
}

.child-menu-show .menu-bar-btn {
    left: 140px;
}

.child-menu-show .menu-bar-btn .product-navbar-collapse {
    left: auto;
    right: -7px;
}

.child-menu-show .menu-bar-btn .product-navbar-collapse > span {
    color: #7a8599;
}

.child-menu-show .menu-bar-btn .menu-bar-bg {
    border-color: transparent #f7f7f7 transparent -moz-use-text-color;
    border-style: solid solid solid none;
    border-width: 9px 13px 9px medium;
    left: auto;
    right: 0;
}

.child-menu-show .menu-bar-btn .icon-collapse-left {
    display: inline;
}

.child-menu-show .menu-bar-btn .icon-collapse-right {
    display: none;
}

.child-menu-show .menu-bar-btn:hover .product-navbar-collapse {
    left: auto;
    right: 0;
}

.child-menu-show .menu-bar-btn:hover .menu-bar-bg {
    border-color: transparent #f7f7f7 transparent -moz-use-text-color;
    border-style: solid solid solid none;
    border-width: 8px 20px 8px medium;
}
.body-menu-mask {
    display: none;
}
@media only screen and (max-width: 767px) {
    .body-menu {
        transform: translateX(-100%);
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        z-index: 1010;
        transition:
            transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1),
            box-shadow 0.3s cubic-bezier(0.7, 0.3, 0.1, 1),
            -webkit-transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1),
            -webkit-box-shadow 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
        width: 287px;
        &.active {
            visibility: visible;
            transform: translateX(0px);
        }
    }
    .main-menu {
        position: absolute;
        z-index: 9;
    }
    .child-menu {
        position: absolute;
        border-right: 0;
        box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    }
    .body-menu-mask {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgb(0, 0, 0);
        opacity: 0;
        z-index: 1000;
        position: fixed;
        transition: all 0.5s;
        visibility: hidden;
        display: block;
        &.active {
            visibility: inherit;
            display: block;
            opacity: 0.5;
        }
    }
    .menu-bar-btn {
        display: none;
    }
    .child_warp {
        top: 0;
    }
}
</style>
