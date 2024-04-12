<template>
    <div
        :class="`module-ad-con module-image_hotarea ad-color_style__${module?.color_style}`"
        :style="frameFormat.box_padding + frameFormat.box_padding_top + frameFormat.box_padding_bottom"
    >
        <div
            class="module-ad-content"
            :style="frameFormat.background_color + ' ' + frameFormat.box_radius + couponFormat.box_radius + couponFormat.background_color"
        >
            <div class="module-ad-empty empty-image_ad" v-if="Object.values(module).length === 0">
                <div class="image-empty-bg"></div>
                <div class="desc">优惠券</div>
            </div>
            <div v-else class="coupon-ad-warp" :style="couponFormat.box_padding + couponFormat.box_padding_bottom + couponFormat.box_padding_top">
                <div class="coupon-title" v-if="module?.show_title === 1">
                    <div class="coupon-title-text">
                        <h4 class="coupon-maintitle">{{ module.title }}</h4>
                        <span class="coupon-title-con">{{ module.desc }}</span>
                    </div>
                    <div>
                        <a class="oupon-title-more"
                            >更多 <el-icon><ArrowRight /></el-icon
                        ></a>
                    </div>
                </div>
                <div class="coupon-con">
                    <div class="coupon-item" :style="couponFormat.item_padding">
                        <div class="item-coupon-con">
                            <div class="coupon-money">
                                <div class="coupon-money-c">5.00</div>
                                <div class="coupon-money-d">元</div>
                            </div>
                            <div class="coupon-name">
                                <div class="coupon-name-text">满60减5</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, Ref } from "vue";
import { ModuleCouponType, ModuleType } from "@/types/decorate/decorate.d";
import { mergeDefaultModule, defaultFrame, formatFrame } from "@/views/decorate/decorate/src/modules/";
import { ArrowRight } from "@element-plus/icons-vue";
// 在modules加入要使用的模块
const module = defineModel<ModuleType & ModuleCouponType>("module") as Ref<ModuleType & ModuleCouponType>;
const defaultModule = ref({
    show_title: 0,
    title: "每日领券",
    desc: "天天优惠领不停",
    color_style: 0,
    item_background_color: "#ffffff",
    background_color: "#ffffff",
    item_padding: 10,
    box_radius: 8,
    box_padding: 10,
    box_padding_top: 5,
    box_padding_bottom: 5,
    frame: defaultFrame
});
mergeDefaultModule(module.value, defaultModule.value);
const { frame } = module.value;
const frameFormat = computed(() => {
    return formatFrame(frame ?? {});
});

const couponFormat = computed(() => {
    return {
        item_background_color: `background-color:${module.value?.item_background_color}`,
        box_padding: `padding-left:${module.value?.box_padding}px;padding-right:${module.value?.box_padding}px;`,
        box_padding_bottom: `padding-bottom:${module.value?.box_padding_bottom}px;`,
        box_padding_top: `padding-top:${module.value?.box_padding_top}px;`,
        box_radius: `border-radius:${module.value?.box_radius}px;`,
        item_padding: `padding:${module.value?.item_padding}px;`,
        background_color: `background-color:${module.value?.background_color}`
    };
});

onMounted(async () => {});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.coupon-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;

    .coupon-title-text {
        display: flex;
        align-items: end;

        .coupon-maintitle {
            color: #2a3145;
            font-size: 16px;
            margin-right: 5px;
        }

        .coupon-title-con {
            color: #aaa;
            font-size: 12px;
        }
    }

    .oupon-title-more {
        display: flex;
        color: #aaa;
        font-size: 12px;
        align-items: center;
    }
}
</style>
