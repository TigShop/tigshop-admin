<template>

    <div class="link-style">
        <div class="left box">
            <div v-for="(item, index) in title" :key="index" :class="{ 'active': selectedIndex === index }" class="list-title" @click="selectItem(index)">
                <div>{{ item }}</div>
                <div class="right-ico"><em class="main_pel_m iconfont">&#xe630;</em></div>
            </div>
        </div>

        <div class="right box">

            <template v-if="selectedIndex===0" class="div0">
                <LinkBase v-model="selectData"></LinkBase>
            </template>
            <template v-if="selectedIndex===1">
                <SelectProduct v-model:ids="selectData" :isMultiple="false"></SelectProduct>
            </template>
            <template v-if="selectedIndex===2">
                <LinkCategory v-model:modelValue="selectData" :slide="false"></LinkCategory>
            </template>
            <template v-if="selectedIndex===3">
                <LinkCategory v-model:modelValue="selectData" :slide="true"></LinkCategory>
            </template>
            <template v-if="selectedIndex===4">
                <SelectBrand v-model:brand_id="selectData" :isMultiple="false"></SelectBrand>
            </template>
            <template v-if="selectedIndex===5">{{ selectedIndex }}</template>
            <template v-if="selectedIndex===6">
                <SelectCoupon v-model:modelValue="selectData" :isMultiple="false"></SelectCoupon>
            </template>
            <template v-if="selectedIndex===7">
                <SelectStore v-model:modelValue="selectData" :isMultiple="false"></SelectStore>
            </template>
            <template v-if="selectedIndex===8">
                <SelectArticle v-model:modelValue="selectData" :isMultiple="false"></SelectArticle>
            </template>
            <template v-if="selectedIndex===9">
                <LinkCustom v-model:modelValue="selectData"></LinkCustom>
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import LinkBase from "@/views/link/src/LinkBase.vue";
import LinkCategory from "@/views/link/src/LinkCategory.vue";
import LinkCustom from "@/views/link/src/LinkCustom.vue";
import SelectProduct from "@/views/product/product/src/SelectProduct.vue";
import SelectBrand from "@/views/product/brand/src/SelectBrand.vue";
import SelectArticle from "@/views/content/article/src/SelectArticle.vue";
import SelectStore from "@/views/store/store/src/SelectStore.vue";
import SelectCoupon from "@/views/promotion/coupon/src/SelectCoupon.vue";

const selectData = ref()
const title = ref([
    '基础页面', '商品详情页', '分类搜索', '滑动分类页', '品牌搜索', '微页面', '优惠券', '店铺页面', '文章资讯', '自定义链接'
])
const selectedIndex = ref<number>(0);
const selectItem = (index) => {
    selectedIndex.value = index;
};
//监听页面执行默认搜索
// ===0


</script>
<style lang="less" scoped>
.link-style {
    display: flex;
    gap: 10px;
    min-height: 100%;

    .box {
        border: 1px solid #eee;
        border-radius: 3px;
        padding: 0 0 4px 0;
        white-space: nowrap;
    }

    .left {
        min-width: 150px;
        display: flex;
        flex-direction: column;
        gap: 4px;

        .list-title {
            width: 100%;
            height: 40px;
            display: flex;
            box-sizing: border-box;
            padding: 0 15px 5px 15px;
            justify-content: start;
            line-height: 40px;
            cursor: pointer;

            .right-ico {
                flex: 1;
                text-align: right
            }
        }

        .list-title.active {
            background-color: #eef2ff;
            color: #428ce8;
        }
    }

    .right {
        padding: 10px;
        flex: 1;
    }
}


</style>
