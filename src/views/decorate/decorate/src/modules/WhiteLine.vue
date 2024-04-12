<template>
    <div :class="'module-ad-con module-image_hotarea'" :style="frameFormat.box_padding + frameFormat.box_padding_top + frameFormat.box_padding_bottom">
        <div class="module-ad-content" :style="frameFormat.background_color + ' ' + frameFormat.box_radius">
            <template v-if="Object.values(module).length === 0">
                <div class="module-ad-empty empty-image_ad">
                    <div class="image-empty-bg"></div>
                    <div class="desc">空白分割线</div>
                </div>
            </template>
            <template v-else>
                <div class="white-line-warp">
                    <div class="white-line-con">
                        <template v-if="module.line_type === 2">
                            <div
                                class="white-line-item"
                                :class="{ 'white-line-item2': module?.line_style === 2, 'white-line-item3': module?.line_style === 3 }"
                            >
                                <div class="item-content">
                                    <div class="item-line"></div>
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
import { imageFormat } from "@/utils/format";
import { ModuleType } from "@/types/decorate/decorate.d";
import { mergeDefaultModule, defaultFrame, formatFrame } from "@/views/decorate/decorate/src/modules/";
// 在modules加入要使用的模块
const module = defineModel<ModuleType>("module") as Ref<ModuleType>;
const defaultModule = ref({
    line_type: 1,
    line_style: 1,
    frame: defaultFrame
});
mergeDefaultModule(module.value, defaultModule.value);
const { frame } = module.value;
const frameFormat = computed(() => {
    return formatFrame(frame ?? {});
});
</script>
<style lang="less" scoped>
.white-line-warp .white-line-con .white-line-item2 {
    border: 1px dashed #e5e5e5;
}
.white-line-warp .white-line-con .white-line-item3 {
    border: 1px dotted #e5e5e5;
}
</style>
