<template>
    <div class="module-ad-con">
        <div class="pc-module-box" style="height:100px">
            <div class="title">推荐商品-瀑布流</div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, defineModel } from 'vue';
import { ModuleType, PcRecommendProduct } from '@/types/decorate/decorate.d';
import { mergeDefaultModule } from '@/views/decorate/decorate/src/modules/'
const defaultModule = ref({
    products: {
        product_number:50,
    },
})
const module = defineModel<ModuleType & PcRecommendProduct>('module');
mergeDefaultModule(module.value, defaultModule.value)
</script>

<style lang="less" scoped></style>