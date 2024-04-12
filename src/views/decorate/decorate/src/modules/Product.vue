<template>
    <div
        :class="
            'module-ad-con module-goods_ad ad-style__' +
            module.style +
            ' ad-buy_btn_style__' +
            module.buy_btn_style +
            ' ad-goods_style__' +
            module.goods_style +
            ' ad-goods_radio_style__' +
            module.goods_radio_style +
            ' ad-text_align__' +
            module.text_align +
            ' ad-text_weight__' +
            module.text_weight +
            ' ad-goods_name_row__' +
            module.goods_name_row +
            ' ad-goods_name_padding__' +
            module.goods_name_padding
        "
        :style="frameFormat.box_padding + frameFormat.box_padding_top + frameFormat.box_padding_bottom">
        <div
            class="module-ad-content"
            :style="
                frameFormat.background_color +
                ' ' +
                frameFormat.box_radius +
                allFormat.background_color +
                allFormat.box_padding +
                allFormat.box_padding_bottom +
                allFormat.box_padding_top +
                allFormat.box_radius +
                allFormat.inner_padding
            ">
            <div class="module-ad-empty empty-image_ad" v-if="!productList || productList.length == 0">
                <div class="image-empty-bg"></div>
                <div class="desc">点击添加图片广告</div>
            </div>
            <CommonTitle v-if="title?.show_title" v-model="title"></CommonTitle>
            <div class="goods-ad-warp" style="">
                <div class="goods-ad-con">
                    <template v-if="module.style === 7">
                        <Swiper :swiperOption="swiperOption" v-model="swiperList">
                            <template v-slot:default="{ item }">
                                <div class="goods-ad-item" v-for="(subItem, index) in item" :key="index">
                                    <div class="item-content" :style="allFormat.goods_padding">
                                        <div class="item-con">
                                            <div class="item-photo">
                                                <a href="" title="" class="item-image-a"><img :src="imageFormat(subItem.pic_thumb)" alt="" /></a>
                                            </div>
                                            <div class="item-info">
                                                <div class="item-name">
                                                    <a v-if="module?.show_name" href="" title="" class="item-name-a">{{ subItem.product_name }}</a>
                                                    <a v-if="module?.show_brief" href="" title="" class="item-brief">{{ "商品描述" }}</a>
                                                </div>
                                                <div class="item-action" v-if="module?.show_price">
                                                    <div class="item-price">
                                                        <b class="price_format">
                                                            {{ priceFormat(Number(subItem.product_price)) }}
                                                        </b>
                                                    </div>
                                                    <div class="item-buy"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </Swiper>
                    </template>

                    <template v-else>
                        <div class="goods-ad-item" v-for="item in productList" :key="item.product_id">
                            <div class="item-content" :style="allFormat.goods_padding">
                                <div class="item-con">
                                    <div class="item-photo">
                                        <a href="" title="" class="item-image-a"><img :src="imageFormat(item.pic_thumb)" alt="" /></a>
                                    </div>
                                    <div class="item-info">
                                        <div class="item-name">
                                            <a v-if="module?.show_name" href="" title="" class="item-name-a">{{ item.product_name }}</a>
                                            <a v-if="module?.show_brief" href="" title="" class="item-brief">{{ "商品描述" }}</a>
                                        </div>
                                        <div class="item-action" v-if="module?.show_price">
                                            <div class="item-price">
                                                <b class="price_format">
                                                    {{ priceFormat(Number(item.product_price)) }}
                                                </b>
                                            </div>
                                            <div class="item-buy">
                                                <a href="javascript:;" class="buy-btn lyecs-buyBtn">
                                                    <template v-if="module.buy_btn_style === 5 || module.buy_btn_style === 6">
                                                        <span>购买</span>
                                                    </template>
                                                    <template v-if="module.buy_btn_style === 7 || module.buy_btn_style === 8">
                                                        <span>马上抢</span>
                                                    </template>
                                                    <template v-if="module.buy_btn_style === 1">
                                                        <span class="iconfont-h5 icon-gouwuche iconh5-style"></span>
                                                    </template>
                                                    <template v-if="module.buy_btn_style === 2">
                                                        <span class="iconfont-h5 icon-gouwuche1 iconh5-style"></span>
                                                    </template>
                                                    <template v-if="module.buy_btn_style === 3">
                                                        <span class="iconfont-h5 icon-jia iconh5-style"></span>
                                                    </template>
                                                    <template v-if="module.buy_btn_style === 4">
                                                        <span class="iconfont-h5 icon-jia1 iconh5-style"></span>
                                                    </template>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, watch, Ref, watchEffect } from "vue";
import { imageFormat, priceFormat } from "@/utils/format";
import { ModuleType, ModuleActivityType } from "@/types/decorate/decorate.d";
import { getProductList } from "@/api/decorate/mobileProduct";
import type { ProductList } from "@/types/decorate/mobileProduct";
import { mergeDefaultModule, defaultFrame, defaultProducts, formatFrame, defaultTitle, CommonTitle } from "@/views/decorate/decorate/src/modules/";
import { ShoppingCart, ShoppingCartFull, CirclePlus, CirclePlusFilled } from "@element-plus/icons-vue";
import { Swiper } from "@/components/swiper";
// 在modules加入要使用的模块
const module = defineModel<ModuleType & ModuleActivityType>("module") as Ref<ModuleType & ModuleActivityType>;

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
    img_padding: 1,
    frame: defaultFrame,
    title: defaultTitle,
    products: defaultProducts,
});
mergeDefaultModule(module.value, defaultModule.value);
const { frame, title } = module.value;
const productList = ref<ProductList[]>();
const frameFormat = computed(() => {
    return formatFrame(frame ?? {});
});

const allFormat = computed(() => {
    return {
        background_color: `background-color: ${module?.value?.background_color};`,
        box_padding: `margin-left: ${module?.value?.box_padding}px;margin-right: ${module?.value?.box_padding}px;`,
        box_padding_bottom: `margin-bottom: ${module?.value?.box_padding_bottom}px;`,
        box_padding_top: `margin-top: ${module?.value?.box_padding_top}px;`,
        box_radius: `border-radius: ${module?.value?.box_radius}px;`,
        inner_padding: `padding: ${module?.value?.inner_padding}px;`,
        goods_padding: `padding: ${module?.value?.goods_padding}px;`,
    };
});
onMounted(() => {
    _getproductList();
});
const _getproductList = async () => {
    try {
        const result = await getProductList({ ...module.value.products });
        productList.value = result.product_list;
    } catch (error) {
    } finally {
    }
};
const swiperList = ref<any[]>([]);
const getSwiperList = () => {
    swiperList.value = [];
    if (module.value.style === 7 && productList.value) {
        let swiperListNum = Math.ceil(productList.value.length / 3);
        for (let index = 0; index < swiperListNum; index++) {
            swiperList.value.push(productList.value.slice(index * 3, (index + 1) * 3));
        }
    }
};
//监听module.value.products的变化

watch(
    () => module.value.products,
    () => {
        _getproductList();
    },
    { deep: true }
);

watchEffect(() => {
    getSwiperList();
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
.iconh5-style {
    color: #f23030;
    font-size: 18px;
    margin-right: 5px;
}
</style>
