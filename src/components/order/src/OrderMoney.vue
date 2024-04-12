<template>
    <div class="div-main">
        <div class="text-right">
            <div> + 商品总金额：<span class="money-style">{{ priceFormat(modelValue.product_amount) }}</span></div>
            <div v-if="modelValue.coupon_amount > 0">
                - 优惠券：<span class="money-style">{{ priceFormat(modelValue.coupon_amount) }}</span>
            </div>

        </div>
        <div class="text-right">= 订单总金额：<span class="money-style">{{ priceFormat(modelValue.total_amount) }}</span></div>
        <div class="text-right">实收金额：<span class="money-style">{{ priceFormat(modelValue.paid_amount) }}</span></div>
        <div class="text-right">= 未付款金额：<span class="money-style">{{ priceFormat(modelValue.unpaid_amount) }}</span></div>
    </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import type { OrderFormState } from "@/types/order/order";
import { priceFormat } from "@/utils/format";

const props = defineProps({
    modelValue: {
        type: Object,
        default: {
            product_amount: 0,
            coupon_amount: 0,
            total_amount: 0,
            paid_amount: 0,
            unpaid_amount: 0,
        }
    }
})
</script>
<style lang="less" scoped>
.div-main {
    padding: 20px;
    background-color: #f5f8ff;
    text-align: right;

    .text-right {
        width: 100%;
        text-align: right;
        line-height: 26px;
        display: flex;
        justify-content: right;
        font-size: 12px;
    }

    .text-right>div {
        padding-left: 5px;
    }

    .money-style {
        font-size: 14px;
        color: #F64747;
        font-weight: bold;
    }
}
</style>
