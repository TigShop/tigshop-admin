<template>
    <div :class="'module-ad-con module-image_hotarea'" :style="frameFormat.box_padding + frameFormat.box_padding_top + frameFormat.box_padding_bottom">
        <div class="module-ad-content" :style="frameFormat.background_color + ' ' + frameFormat.box_radius">
            <div class="module-ad-empty empty-image_ad">
                <div class="image-empty-bg"></div>
                <div class="desc">砍价</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>

import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { imageFormat } from "@/utils/format";
import { ModuleActivityType } from '@/types/decorate/decorate.d';
import { mergeDefaultModule, defaultFrame, formatFrame, defaultTitle } from '@/views/decorate/decorate/src/modules/'
import { number } from 'echarts';
// 在modules加入要使用的模块
const module = defineModel<ModuleActivityType>('module');

const defaultModule = ref({
    'style': 1,
    'goods_style': 1,
    'goods_radio_style': 1,
    'text_align': 1,
    'text_weight': 1,
    'goods_name_row': 2,
    'goods_name_padding': 1,
    'show_name': 1,
    'show_brief': 1,
    'show_price': 1,
    'goods_padding': 5,
    'buy_btn_style': 1,
    'background_color': '',
    'box_radius': 0,
    'inner_padding': 0,
    'box_padding': 10,
    'box_padding_top': 5,
    'box_padding_bottom': 5,
    'frame': defaultFrame,
    'title': defaultTitle
})
mergeDefaultModule(module.value, defaultModule.value)
const { frame } = module.value
const frameFormat = computed(() => {
    return formatFrame(frame)
});
const format = computed(() => {
    return {
        'img_padding': 'padding:' + module.value.img_padding + 'px;'
    };
});

const containerRef = ref(null);
const containerWidth = ref(0);
const resize = (size: number) => {
    return (containerWidth.value / 500) * size;   //500为绘制区域原始宽度px

}
onMounted(async () => {
});
onUnmounted(() => {
});
</script>