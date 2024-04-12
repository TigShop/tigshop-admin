<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-form-table">
                <el-form v-if="!loading" ref="formRef" :model="formState" label-width="auto">
                    <el-form-item label="商品总金额" prop="product_amount">
                        {{ priceFormat(formState.product_amount) }}
                    </el-form-item>
                    <el-form-item label="优惠券" prop="coupon_amount">
                        {{ priceFormat(formState.coupon_amount) }}
                    </el-form-item>
                    <el-form-item label="积分抵扣" prop="points_amount">
                        {{ priceFormat(formState.points_amount) }}
                    </el-form-item>
                    <el-form-item label="使用余额" prop="balance">
                        {{ priceFormat(formState.balance) }}
                    </el-form-item>
                    <el-form-item label="配送费用" prop="shipping_fee">
                        <el-input v-model="formState.shipping_fee" type="text" />
                    </el-form-item>
                    <el-form-item label="发票税额" prop="invoice_fee">
                        <el-input v-model="formState.invoice_fee" type="text" />
                    </el-form-item>
                    <el-form-item label="服务费" prop="service_fee">
                        <el-input v-model="formState.service_fee" type="text" />
                    </el-form-item>
                    <el-form-item label="折扣优惠" prop="discount_amount">
                        <el-input v-model="formState.discount_amount" type="text" >
                            <template #prefix>
                               <span>-</span>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="订单号" prop="update_order_sn">
                        <Checkbox v-model.modelValue="formState.update_order_sn">
                            <template #default>
                                变更订单号
                            </template>
                        </Checkbox>
                    </el-form-item>
                    <el-form-item label="订单总金额" prop="total_amount">
                        {{ priceFormat(formState.total_amount) }}
                    </el-form-item>
                    <el-form-item label="已付款金额" prop="paid_amount">
                        {{ priceFormat(formState.paid_amount) }}
                    </el-form-item>
                    <el-form-item label="未付款金额" prop="unpaid_amount">
                        {{ priceFormat(formState.unpaid_amount) }}
                    </el-form-item>
                    <el-form-item v-show="!props.isDialog" :wrapper-col="{ offset: 4, span: 16 }">
                        <el-button ref="submitBtn" class="form-submit-btn" type="primary" @click="onSubmit()">提交
                        </el-button>
                    </el-form-item>
                </el-form>
                <a-spin :spinning="loading" style="width:100%;margin-top:100px"/>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, shallowRef } from "vue"
import { useRouter } from 'vue-router'
import { message } from "ant-design-vue";
import { OrderFormState } from '@/types/order/order.d';
import { getOrder, modifyOrderMoney } from "@/api/order/order";
import { priceFormat } from "@/utils/format";
import { Checkbox } from "@/components/radio";

const emit = defineEmits(["submitCallback", "update:confirmLoading", "close"]);
const props = defineProps({
    id: {
        type: Number,
        default: 0
    },
    act: {
        type: String,
        default: ''
    },
    form: {
        type: Object as () => OrderFormState,
        default: () => ({})
    },
    isDialog: Boolean
});
const loading = ref<boolean>(true);
const query = useRouter().currentRoute.value.query;
const action = ref<string>(props.isDialog ? props.act : String(query.act));
const id = ref<number>(props.isDialog ? props.id : Number(query.id));
const formRef = shallowRef();
const formState = ref<OrderFormState>(props.form);

onMounted(() => {
    // 获取详情数据
    fetchOrder();
});
const fetchOrder = async () => {
    try {
        const result = await getOrder(action.value, { id: id.value });
        Object.assign(
            formState.value,
            result.item
        )
        console.log(formState.value)
    } catch (error:any) {
        message.error(error.message);
        emit('close');
    } finally {
        loading.value = false;
    }
};


// 表单通过验证后提交
const onSubmit = async () => {
    try {
        await formRef.value.validate();
        emit('update:confirmLoading', true);
        console.log(formState.value)
        return
        const result = await modifyOrderMoney({ id: id.value, ...formState.value });
        emit('submitCallback', result);
        message.success(result.message);
    } catch (error:any) {
        message.error(error.message);
    } finally {
        emit('update:confirmLoading', false);
    }
};
// 表单提交
const onFormSubmit = () => {
    onSubmit()
};

defineExpose({ onFormSubmit });
</script>
<style lang="less" scoped></style>
