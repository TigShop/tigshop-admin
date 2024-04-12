<template>
    <div
        :class="
            'module-ad-con module-goods_ad module-seckill-goods_ad ad-style__' +
            module?.style +
            ' ad-buy_btn_style__' +
            module?.buy_btn_style +
            ' ad-goods_style__' +
            module?.goods_style +
            ' ad-goods_radio_style__' +
            module?.goods_radio_style +
            ' ad-text_align__' +
            module?.text_align +
            ' ad-text_weight__' +
            module?.text_weight +
            ' ad-goods_name_row__' +
            module?.goods_name_row +
            ' ad-goods_name_padding__' +
            module?.goods_name_padding
        "
        :style="frameFormat.box_padding + frameFormat.box_padding_top + frameFormat.box_padding_bottom"
    >
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
            "
        >
            <CommonTitle v-if="title?.show_title" v-model="title"></CommonTitle>
            <div class="goods-ad-warp" style="">
                <div class="goods-ad-con">
                    <div class="goods-ad-item" v-for="item in seckillList" :key="item.id">
                        <div class="item-content" :style="allFormat.goods_padding">
                            <div class="item-con">
                                <div class="item-photo">
                                    <a href="" title="" class="item-image-a"><img :src="imageFormat(item.pic_url)" alt="" /></a>
                                    <div :class="'cap-seckill-goods__tag ' + className">
                                        <span class="cap-seckill-goods__tag-title" v-if="module?.style === 1"> 秒杀 </span>
                                        <el-countdown
                                            title=""
                                            format="HH:mm:ss"
                                            :value="time"
                                            :value-style="{ color: '#fff', fontSize: '12px', 'font-weight': '700' }"
                                        />
                                    </div>
                                </div>
                                <div class="item-info">
                                    <!-- {if $module.show_name} -->
                                    <div class="item-name">
                                        <a v-if="module?.show_name" href="" title="" class="item-name-a">{{ item.goods_name }}</a>
                                        <a v-if="module?.show_brief" href="" title="" class="item-brief">{{ item.goods_dsc }}</a>
                                    </div>
                                    <div class="item-action" v-if="module?.show_price">
                                        <div class="item-price">
                                            <b class="price_format">
                                                {{ priceFormat(item.price) }}
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
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed, watch, Ref, onMounted } from "vue";
import { imageFormat, urlFormat, priceFormat } from "@/utils/format";
import { ModuleActivityType, ModuleType } from "@/types/decorate/decorate.d";
import { mergeDefaultModule, defaultFrame, formatFrame, defaultTitle, CommonTitle } from "@/views/decorate/decorate/src/modules/";
import { getMobileSeckillList } from "@/api/decorate/mobileSeckill";
// 在modules加入要使用的模块
const module = defineModel<ModuleType & ModuleActivityType>("module") as Ref<ModuleType & ModuleActivityType>;
const time = ref(Date.now() + 1000 * 60 * 60 * 7);
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
        goods_padding: `padding: ${module?.value?.goods_padding}px;`
    };
});
const className = computed(() => {
    switch (module?.value?.style) {
        case 1:
            return "big";
        case 2:
            return "small flex-end";
        case 5:
            return "list flex-end";
        case 6:
            return "small flex-end";
    }
});

const seckillList = ref();
const mockData = [
    {
        id: 1,
        pic_url: "https://oss.lyecs.com/img/gallery/202403/1711433097NsIWOkRxZ34V3hBZgs.png?x-oss-process=image/resize,m_pad,h_200,h_200",
        goods_name: "商品标题",
        price: 100,
        goods_dsc: "商品描述"
    },
    {
        id: 2,
        pic_url: "https://oss.lyecs.com/img/gallery/202403/1711433097NsIWOkRxZ34V3hBZgs.png?x-oss-process=image/resize,m_pad,h_200,h_200",
        goods_name: "商品标题",
        price: 100,
        goods_dsc: "商品描述"
    },
    {
        id: 3,
        pic_url: "https://oss.lyecs.com/img/gallery/202403/1711433097NsIWOkRxZ34V3hBZgs.png?x-oss-process=image/resize,m_pad,h_200,h_200",
        goods_name: "商品标题",
        price: 100,
        goods_dsc: "商品描述"
    },
    {
        id: 4,
        pic_url: "https://oss.lyecs.com/img/gallery/202403/1711433097NsIWOkRxZ34V3hBZgs.png?x-oss-process=image/resize,m_pad,h_200,h_200",
        goods_name: "商品标题",
        price: 100,
        goods_dsc: "商品描述"
    }
];
const getData = async () => {
    try {
        // const result = await getMobileSeckillList({});
        seckillList.value = mockData;
    } catch (error) {
        console.error(error);
    }
};

onMounted(() => {
    getData();
});
</script>

<style lang="less" scoped>
.cap-seckill-goods__tag {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &.flex-end {
        justify-content: flex-end;
    }
}

.iconh5-style {
    color: #f23030;
    font-size: 18px;
    margin-right: 5px;
}
</style>
