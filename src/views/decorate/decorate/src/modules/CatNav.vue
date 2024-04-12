<template>
    <div
        class="catnav-main module-ad-con  module-cat_nav"
        :style="mainFormat['background-color'] + mainFormat['padding-top'] + mainFormat['padding-bottom'] + mainFormat['background-image']"
    >
        <img class="catnav-logo" :style="logoFormat.logo_height" :src="imageFormat(logoFormat.logo_pic?.pic_url || '')" />

        <div class="default-search" :style="searchFormat['padding-right'] + searchFormat['padding-left']">
            <div class="default-search-config catnav-search" :style="searchFormat['item_background_color'] + searchFormat['item_radius']">
                <el-icon style="margin-left: 10px" color="#999" :size="18"><Search /></el-icon>
                <div class="catnav-search-text" :style="searchFormat['search_text_color']">{{ searchFormat.search_text }}</div>
            </div>
        </div>
        <div class="catnav-menu">
            <ul class="catnav-flex">
                <li class="catnav-menu-item" :style="catitemFormat.witdh" v-for="(item, index) in catNavList" :key="item.mobile_cat_nav_id">
                    <div :class="{ active: index === 0 }" :style="catitemFormat.color">{{ item.category_name }}</div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed, onUnmounted, onBeforeMount, Ref } from "vue";
import { imageFormat } from "@/utils/format";
import { ModuleCatNavType, ModuleType } from "@/types/decorate/decorate.d";
import { mergeDefaultModule, defaultFrame, formatFrame, defaultIcoPic, defaultBackgroundPic } from "@/views/decorate/decorate/src/modules/";
import { getMobileCatNavList } from "@/api/decorate/mobileCatNav";
import { Search } from "@element-plus/icons-vue";
import type { MobileCatNavFilterState } from "@/types/decorate/mobileCatNav.d";
// 在modules加入要使用的模块
const module = defineModel<ModuleType & ModuleCatNavType>("module") as Ref<ModuleType & ModuleCatNavType>;

const defaultModule = ref({
    nav_background_pic: defaultBackgroundPic,
    logo_pic: defaultIcoPic,
    item_width: 50,
    text_color: "",
    background_color: "",
    item_background_color: "",
    search_text_color: "",
    is_ganged: 0,
    logo_height: 0,
    search_text: "搜索商品",
    box_padding: 10,
    item_radius: 3,
    box_padding_top: 5,
    box_padding_bottom: 5,
    frame: defaultFrame
});
mergeDefaultModule(module.value, defaultModule.value);
const { frame } = module.value;
const frameFormat = computed(() => {
    return formatFrame(frame ?? {});
});
const mainFormat = computed(() => {
    return {
        "background-color": "background-color:" + module?.value.background_color + ";",
        "padding-top": "padding-top:" + module?.value.box_padding_top + "px;",
        "padding-bottom": "padding-bottom:" + module?.value.box_padding_bottom + "px;",
        "background-image": `background: url('${imageFormat(module?.value?.nav_background_pic?.pic_url)}') no-repeat center center`
    };
});
const logoFormat = computed(() => {
    return {
        logo_height: "height:" + module?.value.logo_height + "px;",
        logo_pic: module?.value.logo_pic
    };
});
const searchFormat = computed(() => {
    return {
        search_text: module?.value.search_text ? module.value.search_text : "搜索商品",
        item_background_color: "background-color:" + module?.value.item_background_color + ";",
        search_text_color: "color:" + module?.value.search_text_color + ";",
        item_radius: "border-radius:" + module?.value.item_radius + "px;",
        "padding-right": "padding-right:" + module?.value.box_padding + "px;",
        "padding-left": "padding-left:" + module?.value.box_padding + "px;"
    };
});
const catitemFormat = computed(() => {
    return {
        witdh: "width:" + module?.value.item_width + "%;",
        color: "color:" + module?.value.text_color
    };
});

const catNavList = ref<MobileCatNavFilterState[]>([]);
const getMobileCatNavData = async () => {
    try {
        const result = await getMobileCatNavList({ paging: 0, is_show: 1 });
        if (result.errcode === 0) {
            catNavList.value = result.filter_result;
        }
    } catch (error) {
        console.error(error);
    }
};

onBeforeMount(async () => {
    getMobileCatNavData();
});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.catnav-logo {
    margin-left: 10px;
    margin-top: 5px;
    margin-bottom: 10px;
}
.default-search {
    padding: 0 10px;
    margin-bottom: 5px;
}
.default-search-config {
    background-color: #fff;
    border-radius: 3px;
}
.catnav-search {
    display: flex;
    align-items: center;
    height: 35px;
}
.catnav-search-text {
    font-size: 14px;
    margin-left: 5px;
}
.catnav-menu {
    height: 40px;
    width: 100%;
    overflow: hidden;
    .catnav-flex {
        height: 100%;
        width: 100%;
        white-space: nowrap;
        .catnav-menu-item {
            height: 40px;
            line-height: 40px;
            text-align: center;
            width: 100%;
            display: inline-block;
            div {
                width: 100%;
                font-size: 16px;
                font-weight: bold;
                position: relative;

                &.active {
                    font-size: 22px;
                }

                &.active::after {
                    content: "";
                    position: absolute;
                    bottom: 1px;
                    left: 20%;
                    right: 20%;
                    background: rgba(255, 255, 255, 0.7);
                    border-radius: 3px;
                    height: 3px;
                }
            }
        }

        .catnav-menu-item:nth-child(1) {
            margin-left: 10px;
        }
    }
}
</style>
