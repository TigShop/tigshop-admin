<template>
    <div :class="'module-ad-con module-search_bar'" :style="frameFormat.box_padding + frameFormat.box_padding_top + frameFormat.box_padding_bottom">
        <div class="module-ad-content" :style="frameFormat.background_color + ' ' + frameFormat.box_radius">
            <div class="searchBar-warp">
                <div class="searchBar-con">
                    <div class="searchBar-item">
                        <div class="item-content">
                            <div class="item-search-con">
                                <div
                                    class="item-search-form"
                                    :style="allFormat.item_background_color + allFormat.item_border_radius + allFormat.item_height + allFormat.text_color"
                                >
                                    <el-icon style="margin-left: 10px" color="#999" :size="18"><Search /></el-icon>
                                    <div class="item-search-input">{{ module?.text }}</div>
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
import { ref, computed } from "vue";
import { imageFormat } from "@/utils/format";
import { ModuleType } from "@/types/decorate/decorate.d";
import { mergeDefaultModule, defaultFrame, formatFrame, defaultIcoPic } from "@/views/decorate/decorate/src/modules/";
import { Search } from "@element-plus/icons-vue";
// 在modules加入要使用的模块
const module = defineModel<ModuleType>("module");
const defaultModule = ref({
    text: "搜索商品",
    ico_pic: defaultIcoPic,
    frame: defaultFrame
});
mergeDefaultModule(module.value, defaultModule.value);
const { frame } = module.value;
const frameFormat = computed(() => {
    return formatFrame(frame);
});
const allFormat = computed(() => {
    return {
        item_background_color: `background-color: ${module?.value?.frame?.item_background_color};`,
        item_height: `height: ${module?.value?.frame?.item_height}px;`,
        item_border_radius: `border-radius: ${module?.value?.frame?.item_radius}px;`,
        text_color: `color: ${module?.value?.frame?.text_color};`
    };
});
</script>
