<template>
    <div class="module-ad-con">
        <div class="pc-module-box" style="height:100px">
            <div class="title">分类商品 - 宽</div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, defineModel } from 'vue';
import { ModuleType, PcCatProductType } from '@/types/decorate/decorate.d';
import { mergeDefaultModule } from '@/views/decorate/decorate/src/modules/'
const defaultModule = ref({
    category_id: 0,
    short_title: '',
    en_title: '',
    color: '',
    color2: '',
    logo: {
        'pic_url': '',
        'pic_thumb': '',
    },
    pic_list: [],
    pic_list2: [],
    product_ids: [],
    link_list:[],
})
const module = defineModel<ModuleType & PcCatProductType>('module');
mergeDefaultModule(module.value, defaultModule.value)
</script>

<style lang="less" scoped></style>