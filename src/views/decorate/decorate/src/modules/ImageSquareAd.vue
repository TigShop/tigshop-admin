<template>
    <div
        :class="
            'module-ad-con module-image_ad ' +
            ' ad-pic_type__' +
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
                <div class="desc">点击添加模块图片广告</div>
            </div>
            <template v-else>
                <div class="image-ad-warp" :style="frameFormat.inner_padding">
                    <div class="image-ad-con">
                        <template v-if="module.pic_list">
                            <template v-if="module.pic_type == 5">
                                <div class="image-square-layout">
                                    <div class="image-ad-item">
                                        <div class="item-content" :style="format.img_padding">
                                            <div class="item-img-a" :url="module.pic_list[0]?.pic_link">
                                                <img class="item-img" :src="imageFormat(module.pic_list[0]?.pic_url)" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="grid-layout-2">
                                        <div class="image-ad-item">
                                            <div class="item-content" :style="format.img_padding">
                                                <div class="item-img-a" :url="module.pic_list[1]?.pic_link">
                                                    <img class="item-img" :src="imageFormat(module.pic_list[1]?.pic_url)" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="image-ad-item">
                                            <div class="item-content" :style="format.img_padding">
                                                <div class="item-img-a" :url="module.pic_list[2]?.pic_link">
                                                    <img class="item-img" :src="imageFormat(module.pic_list[2]?.pic_url)" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template v-else-if="module.pic_type == 7">
                                <div class="image-square-layout2">
                                    <div class="image-ad-item">
                                        <div class="item-content" :style="format.img_padding">
                                            <div class="item-img-a" :url="module.pic_list[0]?.pic_link">
                                                <img class="item-img" :src="imageFormat(module.pic_list[0]?.pic_url)" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="grid-layout-2">
                                        <div class="image-ad-item">
                                            <div class="item-content" :style="format.img_padding">
                                                <div class="item-img-a" :url="module.pic_list[1]?.pic_link">
                                                    <img class="item-img" :src="imageFormat(module.pic_list[1]?.pic_url)" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="image-ad-item">
                                            <div class="item-content" :style="format.img_padding">
                                                <div class="item-img-a" :url="module.pic_list[2]?.pic_link">
                                                    <img class="item-img" :src="imageFormat(module.pic_list[2]?.pic_url)" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template v-else-if="module.pic_type == 6">
                                <div class="image-square-layout image-square-layout3">
                                    <div class="image-ad-item">
                                        <div class="item-content" :style="format.img_padding">
                                            <div class="item-img-a" :url="module.pic_list[0]?.pic_link">
                                                <img class="item-img" :src="imageFormat(module.pic_list[0]?.pic_url)" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="grid-layout-2">
                                        <div>
                                            <div class="image-ad-item">
                                                <div class="item-content" :style="format.img_padding">
                                                    <div class="item-img-a" :url="module.pic_list[1]?.pic_link">
                                                        <img class="item-img" :src="imageFormat(module.pic_list[1]?.pic_url)" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="grid-layout-3">
                                            <div class="image-ad-item">
                                                <div class="item-content" :style="format.img_padding">
                                                    <div class="item-img-a" :url="module.pic_list[2]?.pic_link">
                                                        <img class="item-img" :src="imageFormat(module.pic_list[2]?.pic_url)" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="image-ad-item">
                                                <div class="item-content" :style="format.img_padding">
                                                    <div class="item-img-a" :url="module.pic_list[3]?.pic_link">
                                                        <img class="item-img" :src="imageFormat(module.pic_list[3]?.pic_url)" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                <div :class="'image-square-layout-' + module.pic_type">
                                    <div class="image-ad-item" v-for="(pic, key) in module.pic_list" :key="key">
                                        <div class="item-content" :style="format.img_padding">
                                            <div class="item-img-a" :url="pic.pic_link ? pic.pic_link.link : ''">
                                                <img class="item-img" :src="imageFormat(pic.pic_url)" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </template>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed, watch, Ref } from "vue";
import { imageFormat } from "@/utils/format";
import { ModuleType, ModuleImageType } from "@/types/decorate/decorate.d";
import { mergeDefaultModule, defaultFrame, formatFrame, defaultTitle, CommonTitle } from "@/views/decorate/decorate/src/modules/";
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
        img_padding: "padding:" + module.value.img_padding + "px;",
    };
});
</script>
<style lang="less" scoped>
.image-square-layout-1 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}
.image-square-layout-2 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}
.image-square-layout-3 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
}
.image-square-layout-4 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);

    .image-ad-item:nth-child(2) {
        grid-column: 1 / 2;
    }
    .image-ad-item:nth-child(3) {
        grid-row: 1 / 2;
        grid-column: 2 / 2;
    }
}

.image-square-layout {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    .item-content {
        height: 100%;
    }
    .item-img-a {
        height: 100%;
    }
    .item-img {
        height: 100%;
    }

    & .grid-layout-2 {
        display: grid;
        grid-template-rows: repeat(2, 1fr);
    }

    &.image-square-layout3 {
        & .grid-layout-3 {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
        }
    }
}

.image-square-layout2 {
    & .grid-layout-2 {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
