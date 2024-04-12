<template>
    <div class="container" v-if="formState">
        <div class="order-info">
            <ul>
                <li class="item">
                    <div class="label">
                        购 货 人：
                    </div>
                    <div class="value">
                        {{ formState.username || '-' }}
                    </div>
                </li>
                <li class="item">
                    <div class="label">
                        付款时间：
                    </div>
                    <div class="value">
                        {{ formState.pay_time || '-' }}
                    </div>
                </li>
            </ul>
            <ul>
                <li class="item">
                    <div class="label">
                        下单时间：
                    </div>
                    <div class="value">
                        {{ formState.add_time || '-' }}
                    </div>
                </li>
                <li class="item">
                    <div class="label">
                        发货时间：
                    </div>
                    <div class="value">
                        {{ formState.shipping_time || '-' }}
                    </div>
                </li>
            </ul>
            <ul>
                <li class="item">
                    <div class="label">
                        支付方式：
                    </div>
                    <div class="value">
                        {{ formState.pay_type_name || '-' }}
                    </div>
                </li>
                <li class="item">
                    <div class="label">
                        配送方式：
                    </div>
                    <div class="value">
                        {{ formState.logistics_name || '-' }}
                    </div>
                </li>
            </ul>
            <ul>
                <li class="item">
                    <div class="label">
                        订单编号：
                    </div>
                    <div class="value">
                        {{ formState.order_sn || '-' }}
                    </div>
                </li>
                <li class="item">
                    <div class="label">
                        发货单号：
                    </div>
                    <div class="value">
                        {{ formState.tracking_no || '-' }}
                    </div>
                </li>
            </ul>
        </div>
        <div class="order-info">
            <ul>
                <li class="item">
                    <div class="label">
                        收货地址：
                    </div>
                    <div class="value">
                        {{ formState.detailed_address || '-' }}
                    </div>
                    <div class="label">
                        收货人：
                    </div>
                    <div class="value">
                        {{ formState.consignee || '-' }}
                    </div>
                    <div class="label">
                        手机：
                    </div>
                    <div class="value">
                        {{ geTel(formState.telephone) || '-' }}
                    </div>
                </li>
            </ul>
        </div>
        <table border="1">
            <tbody>
                <tr align="center" class="firstRow">
                    <td align="center">
                        <span>编号</span>
                    </td>
                    <td align="center">
                        <span>商品名称</span>
                    </td>
                    <td align="center">
                        <span>商品编号</span>
                    </td>
                    <td align="center">
                        <span>商品货号</span>
                    </td>
                    <td align="center">
                        <span>商品属性</span>
                    </td>
                    <td align="center">
                        <span>价格 </span>
                    </td>
                    <td align="center">
                        <span>数量</span>
                    </td>
                    <td align="center">
                        <span>小计</span>
                    </td>
                </tr>
                <tr v-for="(item,index) in formState.items">
                    <td align="center">
                        {{ index + 1 }}
                    </td>
                    <td>
                        <span>&nbsp;{{ item.product_name }}</span>
                    </td>
                    <td align="center">
                        <span>{{ item.product_sn }} </span>
                    </td>
                    <td align="center">
                        <span style="font-size: 12px;">
                            {{ item.sku_sn || '-' }}
                        </span>
                    </td>
                    <td align="center">
                        <span>
                            {{ item.sku_value || '-' }}
                        </span>
                    </td>
                    <td align="center">
                        <span style="font-weight: 700;">
                            {{ priceFormat(item.price) }}
                        </span>
                    </td>
                    <td align="center">
                        <span>1</span>
                    </td>
                    <td align="center">
                        <span style="font-weight: 700;">
                            {{ priceFormat(item.subtotal) }}
                        </span>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: right;" colspan="9">
                        商品总金额：
                        <span style="padding-right: 10px;font-weight: 700;">
                            {{ priceFormat(formState.product_amount) }}
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="total_num">
            <p>+ 商品总金额: <span style="font-weight: 700;">{{ priceFormat(formState.product_amount) }}</span> - 优惠券: <span style="font-weight: 700;">{{ priceFormat(formState.coupon_amount) }}</span></p>
            <p>= 订单总金额: <span style="font-weight: 700;">{{ priceFormat(formState.total_amount) }}</span></p>
        </div>
        <div class="tips">
            {{ formState.shop_name }} {{ formState.host }} 打印时间：{{ formState.print_time }}
        </div>
    </div>
</template>

<script setup lang="ts">
import '@/style/css/list.less'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue'
import { priceFormat } from "@/utils/format";
import { OrderPrintFormResult } from '@/types/order/order.d';
import { getOrderPrint } from "@/api/order/order";
import { reduce } from 'lodash-es';
const query = useRouter().currentRoute.value.query;

// 基本参数定义
const loading = ref<boolean>(true);
const formState = ref<OrderPrintFormResult>()
// 获取列表的查询结果
const loadFilter = async () => {
    loading.value = true;
    try {
        const result = await getOrderPrint(query);
        console.log(result.order_print)
        formState.value = result.order_print;
    } catch (error:any) {
        message.error(error.message);
    } finally {
        loading.value = false;
    }
}
onMounted(() => {
    loadFilter();
});
const geTel = (tel:any) => {
    if(tel){
        var reg = /^(\d{3})\d{4}(\d{4})$/;  
        return tel.replace(reg, "$1****$2")
    }
}
</script>
<style scoped lang="less">
.container{
    padding: 15px;
}
.order-info {
    display: flex;
    justify-content: space-between;
    padding-right: 15%;
    ul {
        .item {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            .label {
                font-size: 12px;
                font-weight: 700;
            }
            .value {
                margin-right: 20px;
            }
        }
    }

}
table{
    width: 100%;
    border-color: #000 !important;
    border-collapse:collapse;
    tr,td{
        height: 40px;line-height: 40px;
        border-color: #000 !important;
    }
    .firstRow{
        td{
            background-color: #f1f1f1;
        }
    }
}
.total_num{
    padding: 10px 5px;
    padding-bottom: 20px;
    text-align: right;
    line-height: 20px;
    border-bottom: 1px solid #f1f1f1;
}
.tips{
    padding-top: 40px;
    text-align: center;
}
</style>