<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-form-table">
                <div class="button-card babyBlue pd15">
                    提示：在当前页面修改配送方式或物流公司不会更改订单运费，如需修改运费请编辑订单金额（仅对未支付的订单支持订单金额编辑）
                </div>
                <el-form v-if="!loading" ref="formRef" :model="formState" label-width="auto">
                    <el-form-item label="配送方式" prop="shipping_method">
                        <el-radio-group v-model="formState.shipping_method">
                            <el-radio :value="1">物流配送</el-radio>
                            <el-radio :value="2">商家配送</el-radio>
                            <el-radio :value="3">无需配送</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <div v-show="formState.shipping_method === 1">
                        <el-form-item label="配送类型" prop="shipping_type_id">
                            <ShippingType v-model:id="formState.shipping_type_id" @change="onChangeShippingType"></ShippingType>
                        </el-form-item>
                        <el-form-item label="物流公司" prop="logistics_id">
                            <SelectLogisticsCompany v-model:id="formState.logistics_id"></SelectLogisticsCompany>
                        </el-form-item>
                        <el-form-item label="快递单号" prop="tracking_no"> <el-input v-model="formState.tracking_no" /> </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, shallowRef } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { OrderToShipFormState } from "@/types/order/order.d";
import { modifyOrderShipping } from "@/api/order/order";
import { SelectLogisticsCompany, ShippingType } from "@/components/select";
import { getOrder } from "@/api/order/order";

const emit = defineEmits(["submitCallback", "update:confirmLoading", "close"]);

const props = defineProps({
    id: {
        type: Number,
        default: 0,
    },
    form: {
        type: Object as () => OrderToShipFormState,
        default: () => ({}),
    },
    valueName: String,
    isDialog: Boolean,
});
const loading = ref<boolean>(true);
const query = useRouter().currentRoute.value.query;

const id = ref<number>(props.isDialog ? props.id : Number(query.id));
const currentFactor = ref<number>(1);
const formRef = shallowRef();
const formState = ref<OrderToShipFormState>({
    items: [],
});

onMounted(() => {
    // 获取详情数据
    fetchOrder();
});
const fetchOrder = async () => {
    try {
        const result = await getOrder("detail", { id: id.value });
        Object.assign(formState.value, result.item);
    } catch (error: any) {
        message.error(error.message);
        emit("close");
    } finally {
        loading.value = false;
    }
};

const clickChange = (val: number) => {
    currentFactor.value = val;
};

// 表单通过验证后提交
const onSubmit = async () => {
    try {
        await formRef.value.validate();
        emit("update:confirmLoading", true);
        const result = await modifyOrderShipping({
            id: id.value,
            shipping_method: formState.value.shipping_method,
            logistics_id: formState.value.logistics_id,
            tracking_no: formState.value.tracking_no,
        });
        emit("submitCallback", result);
        message.success(result.message);
    } catch (error: any) {
        message.error(error.message);
    } finally {
        emit("update:confirmLoading", false);
    }
};
const onChangeShippingType = (defaultLogisticsId: number) => {
    formState.value.logistics_id = defaultLogisticsId;
};
// 表单提交
const onFormSubmit = () => {
    onSubmit();
};

defineExpose({ onFormSubmit });
</script>
<style lang="less" scoped>
.button-card {
    margin-top: 12px;
    margin-bottom: 12px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    /* 允许换行 */
    gap: 8px;
    line-height: 24px;
}

.babyBlue {
    background-color: rgba(61, 127, 255, 0.06);
    border-radius: 9px;
}

.pd15 {
    padding: 15px;
}

.mt20 {
    margin-top: 20px;
}
</style>
