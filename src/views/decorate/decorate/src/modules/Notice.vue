<template>
    <div :class="'module-ad-con module-notice'" :style="frameFormat.box_padding + frameFormat.box_padding_top + frameFormat.box_padding_bottom">
        <div class="notice-ad-warp">
            <div class="notice-con" :style="frameFormat.background_color + ' ' + frameFormat.box_radius">
                <!-- <div class="module-ad-empty empty-image_ad">
                <div class="image-empty-bg"></div>
                <div class="desc">公告</div>
            </div> -->
                <div class="notice-item">
                    <div class="item-content">
                        <div class="item-notice-con" :style="itemFormat.item_background_color + itemFormat.item_height + itemFormat.item_radius">
                            <div class="item-notice-ico"><img :src="module?.ico_pic?.pic_url" /></div>
                            <div class="item-notice-list">
                                <div class="item-notice-input" :style="itemFormat.text_color">{{ module?.text }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed, Ref } from "vue";
import { imageFormat } from "@/utils/format";
import { ModuleType } from "@/types/decorate/decorate.d";
import { mergeDefaultModule, defaultFrame, formatFrame, defaultIcoPic } from "@/views/decorate/decorate/src/modules/";
// 在modules加入要使用的模块
const module = defineModel<ModuleType>("module") as Ref<ModuleType>;
const defaultModule = ref({
    text: "公告内容",
    ico_pic: defaultIcoPic,
    frame: defaultFrame
});
mergeDefaultModule(module.value, defaultModule.value);
const { frame } = module.value;
const frameFormat = computed(() => {
    return formatFrame(frame ?? {});
});
const itemFormat = computed(() => {
    return {
        item_background_color: `background-color:${module?.value?.frame?.item_background_color};`,
        item_radius: `border-radius:${module?.value?.frame?.item_radius}px;`,
        item_height: `height:${module?.value?.frame?.item_height}px;`,
        text_color: `color:${module?.value?.frame?.text_color};`
    };
});
</script>
