<template>
    <div :class="'module-ad-con module-image_hotarea'" :style="frameFormat.box_padding + frameFormat.box_padding_top + frameFormat.box_padding_bottom">
        <div class="module-ad-content" :style="frameFormat.background_color + ' ' + frameFormat.box_radius">
            <div class="module-ad-empty empty-image_ad" v-if="module.pic_list?.length == 0">
                <div class="image-empty-bg"></div>
                <div class="desc">点击添加热图绘制</div>
            </div>
            <CommonTitle v-if="title?.show_title" v-model="title"></CommonTitle>
            <div class="image-ad-warp image-hotarea-warp" :style="frameFormat.inner_padding">
                <div class="image-ad-con" ref="containerRef">
                    <div v-for="(pic, index) in module.pic_list" :key="index" class="image-ad-item">
                        <div class="item-content" :style="format.img_padding">
                            <div class="item-content-hotatrea">
                                <img class="item-img-bg" :alt="pic.pic_title" :src="imageFormat(pic.pic_url)" style="display: block" />
                                <div
                                    v-for="(picHotarea, idx) in pic.hotarea"
                                    :key="idx"
                                    :href="picHotarea.link"
                                    class="image-hotarea-link"
                                    :style="picHotarea.position"
                                >
                                    <span class="area_box_con_text">{{ picHotarea.link?.name }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, watch, Ref } from "vue";
import { imageFormat } from "@/utils/format";
import { ModuleType, ModuleImageHotareaType } from "@/types/decorate/decorate.d";
import { mergeDefaultModule, defaultFrame, formatFrame, defaultTitle, CommonTitle } from "@/views/decorate/decorate/src/modules/";
// 在modules加入要使用的模块
const module = defineModel<ModuleType & ModuleImageHotareaType>("module") as Ref<ModuleType & ModuleImageHotareaType>;
const defaultModule = ref({
    pic_list: [],
    img_padding: 0,
    pic_radio_style: 1,
    frame: defaultFrame,
    title: defaultTitle
});
mergeDefaultModule(module.value, defaultModule.value);
const { frame, title } = module.value;
const frameFormat = computed(() => {
    return formatFrame(frame ?? {});
});
const format = computed(() => {
    return {
        img_padding: "padding:" + module.value.img_padding + "px;"
    };
});

const containerRef = ref<HTMLDivElement>();
const containerWidth = ref(0);
const updateWidth = () => {
    if (containerRef.value) {
        containerWidth.value = containerRef.value.offsetWidth;
    }
    module.value.pic_list?.forEach((pics) => {
        if (pics.hotarea) {
            pics.hotarea.forEach((picHotarea) => {
                picHotarea.position =
                    "width:" +
                    resize(picHotarea.width ?? 0) +
                    "px;height:" +
                    resize(picHotarea.height ?? 0) +
                    "px;top:" +
                    resize(picHotarea.top ?? 0) +
                    "px" +
                    ";left:" +
                    resize(picHotarea.left ?? 0) +
                    "px";
            });
        }
    });
};
const resize = (size: number) => {
    return (containerWidth.value / 500) * size; //500为绘制区域原始宽度px
};
// 监听容器宽度的变化
watch(module.value, updateWidth, { immediate: true });
onMounted(async () => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
});
onUnmounted(() => {
    window.removeEventListener("resize", updateWidth);
});
</script>
