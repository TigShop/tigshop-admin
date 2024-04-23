<template>
    <div class="div-main">
        <div class="text-right">
            <div> + 商品总金额：<span class="money-style">{{ priceFormat(modelValue.product_amount) }}</span></div>
            <div v-if="modelValue.coupon_amount > 0">
                - 优惠券抵扣：<span class="money-style">{{ priceFormat(modelValue.coupon_amount) }}</span>
            </div>
            <div v-if="modelValue.discount_amount > 0">
                - 优惠券折扣：<span class="money-style">{{ priceFormat(modelValue.discount_amount) }}</span>
            </div>
            <div v-if="modelValue.points_amount > 0">
                - 积分抵扣：<span class="money-style">{{ priceFormat(modelValue.points_amount) }}</span>
            </div>
            <div v-if="modelValue.balance > 0">
                - 余额抵扣：<span class="money-style">{{ priceFormat(modelValue.balance) }}</span>
            </div>
            <div v-if="modelValue.online_paid_amount > 0">
                - 线上支付：<span class="money-style">{{ priceFormat(modelValue.online_paid_amount) }}</span>
            </div>
            <div v-if="modelValue.offline_paid_amount > 0">
                - 线下支付：<span class="money-style">{{ priceFormat(modelValue.offline_paid_amount) }}</span>
            </div>
        </div>
        <div class="text-right">= 订单总金额：<span class="money-style">{{ priceFormat(modelValue.total_amount) }}</span></div>
        <div class="text-right">实收金额：<span class="money-style">{{ priceFormat(modelValue.paid_amount) }}</span></div>
        <div class="text-right">= 未付款金额：<span class="money-style">{{ priceFormat(modelValue.unpaid_amount) }}</span></div>
        <div class="text-right" v-if="modelValue.refund_amount > 0">售后协商金额：<span class="money-style">{{ priceFormat(modelValue.refund_amount) }}</span></div>
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
            discount_amount: 0,
            points_amount: 0,
            balance: 0,
            online_paid_amount: 0,
            offline_paid_amount: 0,
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
        line-height: 26px;
        text-align: right;
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
