<template>
    <div class="displayRow">
        <div v-if="pic_thumb" class="orderImage">
            <Image :src="imageFormat(pic_thumb)" fit="contain"/>
        </div>
        <div>
            <a :href="url" class="color999 alink" target="_blank">
                {{ product_name }}
            </a>
        </div>
        <br/>
        <el-tag v-if="product_type === 0" disable-transitions effect="plain" size="small" type="danger">虚拟产品
        </el-tag>
    </div>
</template>
<script lang="ts" setup>

import {imageFormat} from "@/utils/format";
import {Image} from "@/components/image";

const props = defineProps({
    product_id: Number,
    product_type: {
        type: Number,
        define: 1
    },
    url: String,
    pic_thumb: String,
    product_name: String,
});

</script>
<style lang="less" scoped>
.displayRow {
    display: flex;
    flex-direction: row;
    gap: 8px;


    .color999 {
        color: #666666;
    }
    .alink{line-height: 22px;display: block;}
    .orderImage {
        min-width: 50px;
        min-height: 50px;
        max-width: 50px;
        max-height: 50px;
        border: 1px solid #eee;
        margin-top: 5px;
    }
}


</style>
