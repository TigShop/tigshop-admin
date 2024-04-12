<template>
    <div
        :class="'module-ad-con module-title_ad ad-title_align__' + module?.title?.title_align"
        :style="frameFormat.box_padding + frameFormat.box_padding_top + frameFormat.box_padding_bottom"
    >
        <div class="module-ad-content" :style="frameFormat.background_color + ' ' + frameFormat.box_radius">
            <div class="title-ad-warp">
                <div class="title-ad-con">
                    <div class="title-ad-item">
                        <div class="item-content">
                            <div :class=" 'image-ad-title ad-title_style__' + module?.title?.title_style">
                                <div class="image-ad-title-l">
                                    <div class="image-ad-title-h" :style="allFormat.title_color">{{ module?.title?.title_text }}</div>
                                    <div class="image-ad-title-d" :style="allFormat.desc_color">{{ module?.title?.desc_text }}</div>
                                </div>
                                <template v-if="module?.title?.show_more === 1">
                                    <div class="image-ad-title-r">
                                        <a :href="''"><span :style="allFormat.more_color">查看更多</span> <i class="module_ico module-ico-youjiantou"></i></a>
                                    </div>
                                </template>
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
import { ModuleType, ModuleImageType } from "@/types/decorate/decorate.d";
import { mergeDefaultModule, defaultFrame, formatFrame, defaultTitle } from "@/views/decorate/decorate/src/modules/";
const module = defineModel<ModuleType & ModuleImageType>("module") as Ref<ModuleType & ModuleImageType>;

const defaultModule = ref({
    frame: defaultFrame,
    title: defaultTitle
});
mergeDefaultModule(module.value, defaultModule.value);
const { frame } = module.value;
const frameFormat = computed(() => {
    return formatFrame(frame ?? {});
});
const allFormat = computed(() => {
    return {
        desc_color: `color: ${module?.value?.title?.desc_color};`,
        more_color: `color: ${module?.value?.title?.more_color};`,
        title_color: `color: ${module?.value?.title?.title_color};`,
    };
});
</script>
