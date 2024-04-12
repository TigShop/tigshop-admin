<template>
    <template v-if='title.show_title'>
        <div :class="'image-ad-title ad-title_style__' + title.title_style" :style="titleFormat.title_background + titleFormat.title_radius">
            <div class="image-ad-title-l">
                <div class="image-ad-title-h" :style="'color: ' + title.title_color">{{ title.title_text }}</div>
                <div class="image-ad-title-d" :style="'color: ' + title.desc_color">{{ title.desc_text }}</div>
            </div>
            <template v-if='title.show_more'>
                <div class="image-ad-title-r">
                    <div class='more-link' url="{{title.more_link ? title.more_link.link : ''}}" style="color: {{title?.more_color}}">
                        <text>查看更多</text>
                        <text class='module_ico module-ico-youjiantou'></text>
                    </div>
                </div>
            </template>
        </div>
    </template>
</template>
<script lang="ts" setup>
import { ref, computed, Ref } from 'vue';
import { imageFormat } from "@/utils/format";
import { ModuleTitleType } from '@/types/decorate/decorate.d';
import { mergeDefaultModule, defaultTitle, formatTitle } from '@/views/decorate/decorate/src/modules/'
// 在modules加入要使用的模块
const title = defineModel<ModuleTitleType>('modelValue') as Ref<ModuleTitleType> ;
const titleFormat = computed(() => { 
    return formatTitle(title.value) 
});
</script>