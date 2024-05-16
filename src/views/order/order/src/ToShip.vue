<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-form-table">
                <div class="button-card babyBlue pd15">提示：如果订单分开发货，系统会自动将订单拆分为不同订单！</div>
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
                    <el-table :data="formState.items" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="50" />
                        <el-table-column label="商品名称" prop="product_id" width="300">
                            <template #default="{ row }">
                                <ProductCard
                                    :pic_thumb="row.pic_thumb"
                                    :product_id="row.product_id"
                                    :product_name="row.product_name"
                                    :product_type="row.product_type"
                                    :url="row.url"></ProductCard>
                            </template>
                        </el-table-column>
                        <el-table-column label="商品信息" prop="product_sn" />
                        <el-table-column label="库存" prop="stock"></el-table-column>
                        <el-table-column label="数量" prop="quantity"> </el-table-column>
                        <el-table-column label="待发货数量" prop="to_delivery_quantity" width="120">
                            <template #default="{ row }">
                                <el-input-number
                                    class="input-number"
                                    controls-position="right"
                                    v-model="row.to_delivery_quantity"
                                    @change="updateDeliverData"
                                    type="number"
                                    :min="1"
                                    :max="row.quantity" />
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-form-item v-show="!props.isDialog" :wrapper-col="{ offset: 4, span: 16 }">
                        <el-button ref="submitBtn" class="form-submit-btn" type="primary" @click="onSubmit">提交 </el-button>
                    </el-form-item>
                </el-form>
                <a-spin :spinning="loading" style="width: 100%; margin-top: 100px" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref, shallowRef } from "vue";
import { useRouter } from "vue-router";
import { message, Modal } from "ant-design-vue";
import type { OrderToShipFormState } from "@/types/order/order.d";
import { getOrder, orderDeliver } from "@/api/order/order";
import { ProductCard } from "@/components/list";
import { SelectLogisticsCompany, ShippingType } from "@/components/select";

const emit = defineEmits(["submitCallback", "update:confirmLoading", "close", "okType"]);

emit("okType", false);
const props = defineProps({
    id: { type: Number, default: 0 },
    act: { type: String, default: "" },
    isDialog: Boolean,
});
const loading = ref<boolean>(true);
const query = useRouter().currentRoute.value.query;
const action = ref<string>(props.isDialog ? props.act : String(query.act));
const id = ref<number>(props.isDialog ? props.id : Number(query.id));
const operation = action.value === "add" ? "create" : "update";
const formRef = shallowRef();
// 这里不要用OrderFormState
const formState = ref<OrderToShipFormState>({
    items: [],
    shipping_method: 1,
});
const warnSplitNeed = ref(false);
const selectedRows = ref<OrderToShipFormState["items"]>([]);
const deliverData = ref<{ item_id: number; to_delivery_quantity: number }[]>();
onMounted(() => {
    // 获取详情数据
    fetchOrder();
});
const fetchOrder = async () => {
    try {
        loading.value = true;
        console.log(id.value);
        const result = await getOrder(action.value, { id: id.value });
        Object.assign(formState.value, result.item);
        if (formState.value.items) {
            formState.value.items.forEach((item) => {
                item.to_delivery_quantity = item.quantity;
            });
        }
    } catch (error: any) {
        message.error(error.message);
        emit("close");
    } finally {
        loading.value = false;
    }
};
const updateDeliverData = () => {
    const arr = <{ item_id: number; to_delivery_quantity: number }[]>[];
    warnSplitNeed.value = false;
    if (selectedRows.value.length > 0) {
        selectedRows.value.forEach((element) => {
            console.log(element);
            if (element.to_delivery_quantity < element.quantity) {
                warnSplitNeed.value = true;
            }
            arr.push({
                item_id: element.item_id,
                to_delivery_quantity: element.to_delivery_quantity,
            });
        });
    }
    deliverData.value = arr;
    if (warnSplitNeed.value === false) {
        warnSplitNeed.value = selectedRows.value.length < formState.value.items.length;
    }
};
// 表单通过验证后提交
const onSubmit = async () => {
    if (warnSplitNeed.value === false) {
        deliverDo();
    } else {
        Modal.confirm({
            title: "您当前只选择了部份商品发货，系统将会自动将订单进行拆分，是否确认继续发货？",
            onOk: async () => {
                deliverDo();
            },
        });
    }
};
const deliverDo = async () => {
    await formRef.value.validate();
    try {
        emit("update:confirmLoading", true);
        console.log(deliverData.value);
        const result = await orderDeliver({
            id: id.value,
            deliver_data: deliverData.value,
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

const handleSelectionChange = (val: OrderToShipFormState["items"]) => {
    selectedRows.value = val;
    updateDeliverData();
    emit("okType", selectedRows.value.length > 0);
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
    flex-wrap: wrap; /* 允许换行 */
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
.input-number {
    width: 85px;
}
</style>
