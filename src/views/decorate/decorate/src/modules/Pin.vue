<template>
    <div
        :class="'module-ad-con  module-goods_ad module-pin-goods_ad ad-style__1 ad-buy_btn_style__1 ad-goods_style__1 ad-goods_radio_style__1 ad-text_align__1 ad-text_weight__1 ad-goods_name_row__2 ad-goods_name_padding__1 module-ad-con-1418active'"
        :style="frameFormat.box_padding + frameFormat.box_padding_top + frameFormat.box_padding_bottom"
    >
        <div class="module-ad-content" :style="frameFormat.background_color + ' ' + frameFormat.box_radius">
            <!-- <CommonTitle v-if="title.show_title" v-model="title"></CommonTitle> -->
            <!-- 暂时不需要 -->
            <template v-if="true">
                <div class="module-ad-empty empty-image_ad">
                    <div class="image-empty-bg"></div>
                    <div class="desc">拼团</div>
                </div>
            </template>
            <template v-else>
                <div class="goods-ad-warp">
                    <div class="goods-ad-con">
                        <div class="goods-ad-item">
                            <div class="item-content" >
                                <div class="item-con">
                                    <div class="item-photo">
                                        <a href="" title="" class="item-image-a"><img src="" alt="" /></a>

                                        <div class="cap-pin-goods__tag">
                                            <span class="cap-pin-goods__tag-title"> 拼团 </span>

                                            <div class="cap-pin-goods__tag-countdown">
                                                <span class="cap-pin-goods__tag-countdown-text"> </span>
                                                <div class="cap-pin-goods__countdown count_time">
                                                    <em class="cout_time">00</em>
                                                    <span class="cout_format">:</span>
                                                    <em class="cout_time">00</em>
                                                    <span class="cout_format">:</span>
                                                    <em class="cout_time">00</em>
                                                </div>
                                            </div>
                                            <div class="cap-pin-goods__tag-extra">人已团</div>
                                        </div>
                                    </div>
                                    <div class="item-info">
                                        <div class="item-name">
                                            <a class="item-name-a">
                                                <span class="title--tag"> 人团 </span>
                                            </a>
                                            <a class="item-brief"></a>
                                        </div>
                                        <div class="item-action">
                                            <div class="item-price"></div>
                                            <div class="item-buy">
                                                <a href="javascript:;" class="buy-btn lyecs-buyBtn">
                                                    <span>购买</span>

                                                    <span>马上抢</span>

                                                    <i class="module_ico"></i>
                                                </a>
                                            </div>
                                        </div>

                                        <div class="blank" style="height: 10px"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="swiper-pagination-con">
                        <div class="swiper-pagination"></div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { imageFormat } from "@/utils/format";
import { ModuleActivityType } from "@/types/decorate/decorate.d";
import { mergeDefaultModule, defaultFrame, formatFrame, defaultTitle, CommonTitle } from "@/views/decorate/decorate/src/modules/";
// 在modules加入要使用的模块
const module = defineModel<ModuleActivityType>("module");

const defaultModule = ref({
    style: 1,
    goods_style: 1,
    goods_radio_style: 1,
    text_align: 1,
    text_weight: 1,
    goods_name_row: 2,
    goods_name_padding: 1,
    show_name: 1,
    show_brief: 1,
    show_price: 1,
    goods_padding: 5,
    buy_btn_style: 1,
    background_color: "",
    box_radius: 0,
    inner_padding: 0,
    box_padding: 10,
    box_padding_top: 5,
    box_padding_bottom: 5,
    frame: defaultFrame,
    title: defaultTitle
});
mergeDefaultModule(module.value, defaultModule.value);
const { frame, title } = module.value;
const frameFormat = computed(() => {
    return formatFrame(frame);
});

const goodsFormat = computed(() => {
    return {
        inner_padding: `margin:${module.inner_padding}px`,
        goods_padding: `padding:${module.goods_padding}px`
    };
});

onMounted(async () => {});
onUnmounted(() => {});
</script>
