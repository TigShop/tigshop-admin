<template>
    <div class="module-ad-con">
        <div class="pc-module-box" style="height:100px">
            <div class="title">轮播Banner</div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, defineModel } from 'vue';
import { ModuleType, PcBannerType } from '@/types/decorate/decorate.d';
import { mergeDefaultModule } from '@/views/decorate/decorate/src/modules/'
const defaultModule = ref({
    banner_style: 1,
    show_cat: 1,
    logo: {
        'pic_url': '',
        'pic_thumb': '',
    },
    pic_list: [],
    pic_list2: [],
    pic_list3: [],
})
const module = defineModel<ModuleType & PcBannerType>('module');
mergeDefaultModule(module.value, defaultModule.value)
</script>

<style lang="less" scoped></style>