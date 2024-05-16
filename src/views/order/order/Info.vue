<template>
    <div v-if="!loading">
        <div class="container-card">
            <div class="border-bottom">
                订单编号：{{ formState.order_sn }}
                <el-divider direction="vertical" />
                下单时间：{{ formState.add_time }}
                <template v-if="formState.store_title">
                    <el-divider direction="vertical" />
                    <span>下单店铺：{{ formState.store_title }}</span>
                </template>
            </div>
            <el-space :size="10" class="button-card">
                <el-button v-if="formState.available_actions.set_confirm" bg class="buttonColor" size="small" text type="primary" @click="setConfirm">
                    确认订单<Tooltip ico content="确认订单可允许在未支付的情况下发货" />
                </el-button>
                <DialogForm
                    v-if="formState.available_actions.set_paid && formState.pay_type_id === 3"
                    :params="{ act: 'set_paid', id: formState.order_id }"
                    isDrawer
                    path="order/order/src/Operation"
                    title="设置为已支付"
                    width="600px"
                    @okCallback="updateDataWithList">
                    <el-button bg class="buttonColor" size="small" text type="primary"> 设置为已支付 </el-button>
                </DialogForm>
                <DialogForm
                    v-if="formState.available_actions.cancel_order"
                    :params="{ act: 'cancel_order', id: formState.order_id }"
                    isDrawer
                    path="order/order/src/Operation"
                    title="取消订单"
                    width="600px"
                    @okCallback="updateDataWithList">
                    <el-button bg class="buttonColor" size="small" text type="primary"> 取消订单 </el-button>
                </DialogForm>
                <el-button v-if="formState.available_actions.del_order" bg size="small" text type="primary" @click="onDelClick"> 删除订单 </el-button>
                <DialogForm
                    v-if="formState.available_actions.deliver"
                    :params="{ act: 'detail', id: formState.order_id }"
                    :title="'订单发货 ' + formState.order_sn"
                    isDrawer
                    path="order/order/src/ToShip"
                    width="900px"
                    @okCallback="updateDataWithList">
                    <el-button bg size="small" text type="danger"> 去发货 </el-button>
                </DialogForm>
                <el-button v-if="formState.available_actions.confirm_receipt" bg size="small" text type="primary" @click="onReceiptClick"> 确认已收货 </el-button>
                <el-button v-if="formState.available_actions.split_order" bg size="small" text type="danger" @click="onSplitClick">
                    拆分店铺订单<Tooltip ico content="该订单来自多个店铺且还未拆分，在做任何操作前，您需要先拆分该订单" />
                </el-button>
                <DialogForm
                    :params="{ act: 'detail', id: formState.order_id, valueName: 'admin_note' }"
                    isDrawer
                    path="order/order/src/EditRemark"
                    title="编辑备注"
                    width="600px"
                    @okCallback="updateDataWithList">
                    <el-button bg class="buttonColor" size="small" text type="primary"> 商家备注 </el-button>
                </DialogForm>
                <el-button bg size="small" text type="primary" @click="openPage(`/print/orderPrint?id=${formState.order_id}`)"> 打印订单 </el-button>
            </el-space>
            <div class="button-card babyBlue pd20" v-if="formState.step_status">
                <Steps
                    :current="formState.step_status.current"
                    size="small"
                    :status="formState.step_status.status"
                    :items="formState.step_status.steps"></Steps>
            </div>
            <div v-if="formState.admin_note">
                <span class="orange">商家备注：</span>{{ formState.admin_note }}
                <DialogForm
                    :params="{ act: 'detail', id: formState.order_id, valueName: 'admin_note' }"
                    isDrawer
                    path="order/order/src/EditRemark"
                    title="编辑备注"
                    width="600px"
                    @okCallback="updateDataWithList">
                    <el-button bg class="buttonColor" size="small" text type="primary"> 修改 </el-button>
                </DialogForm>
            </div>
        </div>
        <div class="container-card">
            <div class="title">订单明细</div>
            <div class="info-card">
                <div class="card-title">
                    <div class="min-title">
                        收货人信息
                        <DialogForm
                            :params="{ act: 'detail', id: formState.order_id, form: formState}"
                            isDrawer
                            path="order/order/src/EditConsignee"
                            title="编辑收货人信息"
                            width="600px"
                            @okCallback="updateDataWithList">
                            <el-button bg class="ml10" size="small" text type="primary"> 编辑 </el-button>
                        </DialogForm>
                    </div>
                    <ul>
                        <li class="card-li">
                            会员名称：<span class="li-info">{{ formState.username }}</span>
                        </li>
                        <li class="card-li">
                            收货人：<span class="li-info">{{ formState.consignee ? formState.consignee : "--" }}</span>
                        </li>
                        <li class="card-li">
                            联系电话：<span class="li-info">{{ formState.mobile ? formState.mobile : "--" }}</span>
                        </li>
                        <li class="card-li" v-if="formState.telephone">
                            手机：<span class="li-info">{{ formState.telephone ? formState.telephone : "--" }}</span>
                        </li>
                        <li class="card-li" v-if="formState.email">
                            电子邮件：<span class="li-info">{{ formState.email }}</span>
                        </li>
                        <li class="card-li" v-if="formState.postcode">
                            邮政编码：<span class="li-info">{{ formState.postcode }}</span>
                        </li>
                        <li class="card-li">
                            收货地址：
                            <span class="li-info">
                                {{ formState.user_address ? formState.user_address : "--" }}
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="card-title">
                    <div class="min-title">
                        配送信息
                        <DialogForm
                            :params="{ act: 'detail', id: formState.order_id }"
                            isDrawer
                            path="order/order/src/EditShipping"
                            title="编辑配送方式"
                            width="600px"
                            @okCallback="updateDataWithList">
                            <el-button :disabled="!formState.available_actions.modify_shipping_info" bg class="buttonColor" size="small" text type="primary">
                                编辑
                            </el-button>
                        </DialogForm>
                    </div>
                    <ul>
                        <li class="card-li">
                            配送方式：<span class="li-info">{{ formState.shipping_type_name }}</span>
                        </li>
                        <li class="card-li">
                            发货时间：<span class="li-info">{{ formState.shipping_time ? formState.shipping_time : "--" }}</span>
                        </li>
                        <li class="card-li">
                            物流名称：<span class="li-info">{{ formState.logistics_name ? formState.logistics_name : "--" }}</span>
                        </li>
                        <li class="card-li">
                            发货单号：<span class="li-info">{{ formState.tracking_no ? formState.tracking_no : "--" }}</span>
                        </li>
                    </ul>
                </div>
                <div class="card-title">
                    <div class="min-title">付款信息</div>
                    <ul>
                        <li class="card-li">
                            支付方式：<span class="li-info">{{
                                formState.pay_type_id === 1 ? "在线支付" : formState.pay_type_id === 2 ? "货到付款" : "线下支付"
                            }}</span>
                            <!-- <DialogForm :params="{ act: 'info', id: 0 }" :showClose="false" :showOnOk="false" isDrawer path="order/src/PaymentLog" title="支付日志" width="860px"
                                @okCallback="fetchOrder">
                            </DialogForm> -->
                        </li>
                        <li class="card-li">
                            付款时间：<span class="li-info">{{ formState.pay_time ? formState.pay_time : "--" }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="container-card">
            <div class="title">
                商品信息
                <DialogForm
                    :params="{ act: 'detail', id: formState.order_id }"
                    isDrawer
                    path="order/order/src/EditProduct"
                    title="编辑商品信息"
                    width="1050px"
                    @okCallback="updateDataWithList">
                    <el-button :disabled="!formState.available_actions.modify_order" bg class="buttonColor" size="small" text type="primary"> 编辑 </el-button>
                </DialogForm>
            </div>
            <el-table :data="formState.items">
                <el-table-column label="商品名称" prop="product_id" width="220">
                    <template #default="{ row }">
                        <ProductCard
                            :pic_thumb="row.pic_thumb"
                            :product_id="row.product_id"
                            :product_name="row.product_name"
                            :product_type="row.product_type"
                            :url="row.url">
                        </ProductCard>
                    </template>
                </el-table-column>
                <el-table-column label="属性" prop="product_attr"></el-table-column>
                <el-table-column label="商品编号" width="150">
                    <template #default="{ row }">
                        {{ row.product_sn }}
                    </template>
                </el-table-column>
                <el-table-column label="价格" prop="price">
                    <template #default="{ row }">
                        {{ priceFormat(row.price) }}
                    </template>
                </el-table-column>
                <el-table-column label="数量" prop="quantity"></el-table-column>
                <el-table-column label="库存" prop="stock"></el-table-column>
                <el-table-column label="小计" prop="subtotal"></el-table-column>
            </el-table>
            <div class="total">
                <span class="gray" style="margin-right: 16px">商品总重量：{{ formState.total_weight }}kg</span>
                <span>合计：{{ priceFormat(formState.product_amount) }}</span>
            </div>
            <div class="title">
                订单金额
                <DialogForm
                    :params="{ act: 'detail', id: formState.order_id }"
                    isDrawer
                    path="order/order/src/EditMoney"
                    title="编辑金额"
                    width="600px"
                    @okCallback="updateDataWithList">
                    <el-button :disabled="!formState.available_actions.modify_order_money" bg class="buttonColor" size="small" text type="primary">
                        编辑
                    </el-button>
                </DialogForm>
            </div>
            <OrderMoney v-model="formState"></OrderMoney>
        </div>
        <!-- <div class="container-card">
            <div class="title">其他信息
                <el-button bg class="ml10" size="small" text type="primary">
                    编辑
                </el-button>
            </div>
            <div class="info-card">
                <div class="card-title">
                    <div class="min-title">发票信息</div>
                    <ul>
                        <li class="card-li">发票类型：<span class="li-info"></span></li>
                        <li class="card-li">发票抬头：<span class="li-info"></span></li>
                        <li class="card-li">发票内容：<span class="li-info"></span></li>
                    </ul>
                </div>
                <div class="card-title">
                    <div class="min-title">备注信息</div>
                    <ul>
                        <li class="card-li">订单备注：<span class="li-info">{{ formState.buyer_note }}</span></li>
                        <li class="card-li">商家备注：<span class="li-info">{{ formState.admin_note }}</span></li>
                    </ul>
                </div>
            </div>
        </div> -->
        <div class="container-card">
            <div class="title">
                物流追踪
                <el-button bg class="ml10" size="small" text type="primary"> 展开 </el-button>
            </div>
        </div>
        <OperationLog :order_id="formState.order_id"></OperationLog>
    </div>
    <a-spin :spinning="loading" style="width: 100%; margin-top: 100px" />
</template>
<script lang="ts" setup>
import { onMounted, ref, shallowRef, reactive } from "vue";
import { useRouter } from "vue-router";
import { message, Steps, Modal } from "ant-design-vue";
import { OrderFormState } from "@/types/order/order.d";
import { getOrder, updateOrder, getOrderLogList, setConfirmOrder, splitStoreOrder, operationOrder } from "@/api/order/order";
import { DialogForm } from "@/components/dialog";
import { OrderMoney } from "@/components/order";
import { imageFormat, priceFormat } from "@/utils/format";
import { Image } from "@/components/image";
import { Tooltip } from "@/components/form";
import { ProductCard, Pagination } from "@/components/list";
import { useConfigStore } from "@/store/config";
import { StringDecoder } from "string_decoder";
import { AnyCnameRecord } from "dns";
import OperationLog from "@/views/order/order/src/OperationLog.vue";
const config: any = useConfigStore();

const emit = defineEmits(["submitCallback", "callback", "update:confirmLoading", "close"]);

const props = defineProps({
    id: {
        type: Number,
        default: 0,
    },
    act: {
        type: String,
        default: "",
    },
    isDialog: Boolean,
});
const loading = ref<boolean>(true);
const query = useRouter().currentRoute.value.query;
console.log(useRouter().currentRoute);
const action = ref<string>(props.isDialog ? props.act : String(query.act));
const id = ref<number>(props.isDialog ? props.id : Number(query.id));
const operation = action.value === "add" ? "create" : "update";
const formRef = shallowRef();
const formState = ref<OrderFormState>({
    balance: 0,
    coupon_amount: 0,
    points_amount: 0,
    product_amount: 0,
    total_weight: 0,
    order_id: 0,
    items: [],
    pay_type: 0,
    available_actions: {},
    total_amount: 0,
    paid_amount: 0,
    update_order_sn: 0,
    unpaid_amount: 0,
});


onMounted(() => {
    // 获取详情数据
    loading.value = true;
    fetchOrder();
});
const fetchOrder = async () => {
    try {
        const result = await getOrder(action.value, { id: id.value });
        Object.assign(formState.value, result.item);
    } catch (error: any) {
        message.error(error.message);
        emit("close");
    } finally {
        loading.value = false;
    }
};

const setConfirm = async () => {
    try {
        const result = await setConfirmOrder({ id: id.value });
        fetchOrder();
    } catch (error: any) {
        message.error(error.message);
    } finally {
        loading.value = false;
    }
};
const onSplitClick = () => {
    Modal.confirm({
        title: "确认拆分订单吗？",
        onOk: async () => {
            try {
                const result = await splitStoreOrder({ id: id.value });
                message.success(result.message);
                updateDataWithList();
            } catch (error: any) {
                message.error(error.message);
            } finally {
                loading.value = false;
            }
        },
    });
};
const onDelClick = () => {
    Modal.confirm({
        title: "确认删除订单吗？",
        content: "被删除的订单可以通过筛选查找并恢复",
        onOk: async () => {
            try {
                const result = await operationOrder("del_order", { id: id.value });
                message.success(result.message);
                updateDataWithList();
            } catch (error: any) {
                message.error(error.message);
            } finally {
                loading.value = false;
            }
        },
    });
};
const onReceiptClick = (id:number) => {
    Modal.confirm({
        title: "确认订单已收货吗？",
        onOk: async () => {
            try {
                const result = await operationOrder("confirm_receipt", { id: id });
                message.success(result.message);
                updateDataWithList();
            } catch (error: any) {
                message.error(error.message);
            } finally {
                loading.value = false;
            }
        },
    });
};
// 会同时更新列表数据
const updateDataWithList = (result: any = {}) => {
    fetchOrder();
    emit("callback", result);
};

// 表单通过验证后提交
const onSubmit = async () => {
    try {
        await formRef.value.validate();
        emit("update:confirmLoading", true);
        const result = await updateOrder(operation, { id: id.value, ...formState.value });
        emit("submitCallback", result);
        message.success(result.message);
    } catch (error: any) {
        message.error(error.message);
    } finally {
        emit("update:confirmLoading", false);
    }
};
// 表单提交
const onFormSubmit = () => {
    onSubmit();
};

const openPage = (href: string) => {
    window.open(href, "_blank");
};

defineExpose({ onFormSubmit });
</script>
<style lang="less" scoped>
.container-card {
    border: 1px solid #ececec;
    /* 添加淡淡的边框 */
    box-shadow: 2px 2px 5px rgba(203, 193, 193, 0.2);
    border-radius: 2px;
    padding: 20px;
    background: #fff;
    margin-bottom: 20px;

    .border-bottom {
        border-bottom: 1px solid #ececec;
        padding-bottom: 16px;
        margin-bottom: 16px;
    }

    .button-card {
        margin-bottom: 12px;
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        /* 允许换行 */
        gap: 8px;
    }

    .babyBlue {
        background-color: rgba(61, 127, 255, 0.06);
        border-radius: 6px;
    }

    .pd20 {
        padding: 20px;
    }

    .orange {
        color: #ed6a0c;
    }

    .title {
        font-size: 16px;
        line-height: 25px;
        color: #323233;
        margin-bottom: 15px;
        font-weight: 700;
    }

    .info-card {
        display: flex;
        flex-direction: row;
        gap: 20px;
        white-space: nowrap;

        .card-title {
            flex: 1;
            display: flex;
            flex-direction: column;
            font-size: 14px;
            line-height: 30px;
            font-weight: 500;
            color: #646566;
        }

        .min-title {
            margin-bottom: 10px;
        }

        .card-li {
            font-weight: normal;
            font-size: 12px;
            line-height: 28px;
        }

        .li-info {
            color: black;
        }
    }

    .total {
        margin: 24px 0;
        width: 100%;
        text-align: right;
    }
}
</style>
