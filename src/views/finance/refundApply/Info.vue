<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-form-table">
                <div class="notice-warp">
                    <p>最终退款金额可根据实际需要填写，该金额会展示在会员用户的订单详情页面中（如果退款类型为商品，订单会统计所有该订单下商品的最终退款总额）；</p>
                    <p>处理状态为未处理或已处理时，佣金等相关功能不会计算最终退款金额；</p>
                    <p>处理状态为取消时，佣金等相关功能会忽略该退款；</p>
                    <p>积分、优惠券等退还与本操作无关，取消订单或商品退货操作确认后会自动退还！</p>
                </div>
                <el-table :data="formState.items" style="width: 100%;margin-bottom: 20px;" border>
                    <el-table-column label="商品信息" width="400">
                        <template #default="{row}">
                            <div class="flex">
                                <ProductCard
                                    :pic_thumb="row.pic_thumb"
                                    :product_id="row.product_id"
                                    :product_name="row.product_name"
                                    >
                                </ProductCard>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品价格" align="center">
                        <template #default="{row}">
                            <div>{{ priceFormat(row.price) }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="quantity" label="商品数量" align="center" />
                    <el-table-column prop="number" label="退货数量" align="center" />
                </el-table>
                <el-form v-if="!loading" ref="formRef" :model="formState" label-width="auto">
                    <el-form-item :label="'售后编号'" prop="order_sn">
                        <DialogForm :params="{ act: 'detail', id: formState.aftersale_id }" isDrawer
                                    path="order/aftersales/Info" title="查看售后信息"
                                    width="700px" :showClose="false" :showOnOk="false">
                            <a class="btn-link">{{ formState.aftersales_sn }}</a>
                        </DialogForm>
                    </el-form-item>
                    <el-form-item :label="'订单编号'" prop="order_sn">
                        <DialogForm 
                            :params="{ act: 'detail', id: formState.order_id }"
                            isDrawer
                            :showClose="false"
                            :showOnOk="false"
                            path="order/order/Info"
                            title="查看订单信息"
                            width="880px">
                            <a class="btn-link">{{ formState.order_sn }}</a>
                        </DialogForm>
                    </el-form-item>
                    <el-form-item :label="'订单金额'" prop="brand_name">
                        <OrderMoney v-model="formState"></OrderMoney>
                    </el-form-item>
                    <el-form-item label="余额退款金额" prop="refund_balance">
                        <el-input v-model="formState.refund_balance" :max="formState.effective_balance" :disabled="formState.refund_status != 0" />
                        <div class="extra">请根据实际情况填写金额, 最多可操作金额 {{ priceFormat(formState.effective_balance) }}</div>
                    </el-form-item>
                    <el-form-item label="线上退款金额" prop="online_balance">
                        <el-input v-model="formState.online_balance" :max="formState.effective_online_balance" :disabled="formState.refund_status != 0"/>
                        <div class="extra">请根据实际情况填写金额, 最多可操作金额 {{ priceFormat(formState.effective_online_balance) }}</div>
                    </el-form-item>
                    <el-form-item label="线下退款金额" prop="offline_balance">
                        <el-input v-model="formState.offline_balance" :disabled="formState.refund_status != 0"/>
                        <div class="extra">请根据实际情况填写金额</div>
                    </el-form-item>
                    <el-form-item label="本次操作备注" prop="refund_note">
                        <el-input v-model="formState.refund_note" rows="4" type="textarea" :disabled="formState.refund_status != 0"/>
                    </el-form-item>
                    <el-form-item>
                        <div class="btn-box">
                            <el-button v-if="formState.refund_status == 0" ref="submitBtn" class="form-submit-btn" type="primary" @click="onSubmit(1)">同意退款</el-button>
                            <el-button v-if="formState.is_offline == 1" ref="submitBtn" class="form-submit-btn" type="primary" @click="offlineAudit()">确认已线下转账</el-button>
                        </div>
                    </el-form-item>
                </el-form>
                <a-spin :spinning="loading" style="width:100%;margin-top:100px"/>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {onMounted, ref, shallowRef} from "vue"
import {useRouter} from 'vue-router'
import {message} from "ant-design-vue";
import {RefundApplyFormState} from '@/types/finance/refundApply.d';
import {getRefundApply, updateRefundApply, updateOfflineAudit} from "@/api/finance/refundApply";
import {DialogForm} from "@/components/dialog";
import {OrderMoney} from "@/components/order";
import {ProductCard} from '@/components/list';
import { priceFormat } from "@/utils/format";
// 父组件回调
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
    isDialog: Boolean
});
const loading = ref<boolean>(true);
const query = useRouter().currentRoute.value.query;
const action = ref<string>(props.isDialog ? props.act : String(query.act));
const id = ref<number>(props.isDialog ? props.id : Number(query.id));
const formRef = shallowRef();
const formState = ref<RefundApplyFormState>({
    effective_balance: 0,
    refund_balance: 0,
    effective_online_balance: 0,
    online_balance: 0,
    offline_balance: 0,
    refund_amount: 0,
    paid_amount: 0,
});
const fetchRefundApply = async () => {
    try {
        const result = await getRefundApply(action.value, {id: id.value});
        Object.assign(
          formState.value,
          result.item
        )
    } catch (error:any) {
        message.error(error.message);
        emit('close');
    } finally {
        loading.value = false;
    }
};
const offlineAudit = async () => {
    try {
        const result = await updateOfflineAudit({refund_id: id.value});
        emit('submitCallback', result);
        message.success(result.message);
    } catch (error:any) {
        message.error(error.message);
        emit('close');
    } finally {
        loading.value = false;
    }
};


onMounted(() => {
    // 获取详情数据
    fetchRefundApply();
});

// 表单通过验证后提交
const onSubmit = async (status: number) => {
     //refund_status 1同意 2拒绝
     await formRef.value.validate();
     if(status == 1){
        if(formState.value.refund_balance > formState.value.effective_balance){
            message.error('退款金额不能大于最多可操作金额');
            return;
        }
        if(formState.value.online_balance > formState.value.effective_online_balance){
            message.error('退款金额不能大于最多可操作金额');
            return;
        }
        if(formState.value.offline_balance > formState.value.paid_amount){
            message.error('退款金额不能大于实收金额');
            return;
        }
        let total = Number(formState.value.refund_balance) + Number(formState.value.online_balance) + Number(formState.value.offline_balance);
        if(total > formState.value.paid_amount){
            message.error('总退款金额不能大于实收金额');
            return;
        }
     }
    try {
        emit('update:confirmLoading', true);
        let obj = {
            id: id.value, // 退款id
            refund_note: formState.value.refund_note,
            online_balance: formState.value.online_balance, // 线上金额
            offline_balance: formState.value.offline_balance, // 线下金额
            refund_balance: formState.value.refund_balance, // 余额
        }
        const result = await updateRefundApply(obj);
        emit('submitCallback', result);
        message.success(result.message);
    } catch (error:any) {
        message.error(error.message);
    } finally {
        emit('update:confirmLoading', false);
    }
};

</script>
<style lang="less" scoped>
.notice-warp {
    background-color: #eef2ff;
    border-radius: 9px;
    padding: 15px;
    margin-bottom: 20px;
    line-height: 24px;
}
.btn-box{
    width: 100%;
    text-align: right;
}
</style>
