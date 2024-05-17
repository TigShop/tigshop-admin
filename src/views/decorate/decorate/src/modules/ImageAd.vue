<template>
    <div
        :class="
            'module-ad-con module-image_ad ' +
            ' ad-pic_type__' +
            module.pic_type +
            ' ad-pic_page_type__' +
            module.pic_page_type +
            ' ad-radio_style__' +
            module.pic_radio_style +
            ' '
        "
        :style="frameFormat.box_padding + frameFormat.box_padding_top + frameFormat.box_padding_bottom">
        <div class="module-ad-content" :style="frameFormat.background_color + ' ' + frameFormat.box_radius">
            <CommonTitle v-if="title?.show_title" v-model="title"></CommonTitle>
            <div class="module-ad-empty empty-image_ad" v-if="module.pic_list.length == 0">
                <div class="image-empty-bg"></div>
                <div class="desc">点击添加图片广告</div>
            </div>
            <template v-if="module.pic_type == 2">
                <div class="image-ad-warp" :style="frameFormat.inner_padding">
                    <div class="image-ad-con">
                        <Swiper :swiperOption="swiperOption" v-model="module.pic_list">
                            <template v-slot:default="{ item }">
                                <div class="image-ad-item">
                                    <div class="item-content" :style="format.img_padding">
                                        <div class="item-img-a" :url="item.pic_link ? item.pic_link.link : ''">
                                            <img class="item-img" :src="imageFormat(item.pic_url)" />
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </Swiper>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="image-ad-warp" :style="frameFormat.inner_padding">
                    <div class="image-ad-con">
                        <template v-if="module.pic_list" v-for="(pic, key) in module.pic_list">
                            <div class="image-ad-item">
                                <div class="item-content" :style="format.img_padding">
                                    <div class="item-img-a" :url="pic.pic_link ? pic.pic_link.link : ''">
                                        <img class="item-img" :src="imageFormat(pic.pic_url)" />
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed, Ref, watch } from "vue";
import { Swiper } from "@/components/swiper";
import { imageFormat } from "@/utils/format";
import { ModuleType, ModuleImageType } from "@/types/decorate/decorate.d";
import { mergeDefaultModule, defaultFrame, formatFrame, defaultTitle, CommonTitle } from "@/views/decorate/decorate/src/modules/";
// 在modules加入要使用的模块

import "swiper/css";
import "swiper/css/pagination"; // 轮播图底面的小圆点
// import 'swiper/css/navigation' // 轮播图两边的左右箭头
const module = defineModel<ModuleType & ModuleImageType>("module") as Ref<ModuleType & ModuleImageType>;
const defaultModule = ref({
    pic_type: 1,
    pic_list: [],
    swiper_pre_view: 1, //轮播显示数量
    swiper_page_color: "",
    img_padding: 0,
    pic_page_type: 1,
    pic_radio_style: 1,
    is_flux_width: 0,
    frame: defaultFrame,
    title: defaultTitle,
});
mergeDefaultModule(module.value, defaultModule.value);
const { frame, title } = module.value;
const frameFormat = computed(() => {
    return formatFrame(frame ?? {});
});
const format = computed(() => {
    return {
        img_padding: "padding:" + module.value?.img_padding + "px;",
    };
});
const swiperPageColor = computed(() => {
    return module.value.swiper_page_color || "#333";
});
const swiperOption = ref<any>({
    autoplay: {
        delay: 3000,
        disableOnInteraction: false, //用户操作swiper之后，是否禁止autoplay
        pauseOnMouseEnter: true, //鼠标置于swiper是否时暂停自动切换
    },
    pagination: {
        clickable: true,
    },
});
</script>
<style lang="less" scoped>
:deep(.swiper-pagination-bullet-active) {
    background: v-bind("swiperPageColor") !important;
}
</style>
