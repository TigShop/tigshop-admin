<template>
    <div class="module-ad-con">
        <div class="pc-module-box" style="height:100px">
            <div class="title">自定义模块2</div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, defineModel } from 'vue';
import { ModuleType, PcCustomAd2Type } from '@/types/decorate/decorate.d';
import { mergeDefaultModule } from '@/views/decorate/decorate/src/modules/'
const defaultModule = ref({
    link_list:[],
    pic_list: [],
    pic_list2: [],
    pic_list3: [],
})
const module = defineModel<ModuleType & PcCustomAd2Type>('module');
mergeDefaultModule(module.value, defaultModule.value)
</script>

<style lang="less" scoped></style>