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
                <el-form v-if="!loading" ref="formRef" :model="formState" label-width="auto">
                    <el-form-item :label="(formState.refund_type===1?'商品所在':'')+'订单编号'" prop="order_sn">
                        <DialogForm :params="{ act: 'edit', id: formState.order_id }" isDrawer
                                    path="order/order/Info" title="查看订单信息"
                                    width="700px">
                            <a class="btn-link">{{ formState.order_sn }}</a>
                        </DialogForm>
                    </el-form-item>
                    <el-form-item :label="(formState.refund_type===1?'商品所在':'')+'订单金额'" prop="brand_name">
                        <OrderMoney v-model="formState"></OrderMoney>
                    </el-form-item>
                    <template v-if="formState.refund_type===1">
                        <el-form-item label="商品名称" prop="product_name">
                            {{ formState.product_name }}
                        </el-form-item>
                    </template>
                    <el-form-item label="商品图片" prop="pic_thumb">
                        <img :src="formState.pic_thumb" style="width: 50px">
                    </el-form-item>
                    <template v-if="formState.refund_type===1">
                        <el-form-item label="商品编号" prop="product_sn">
                            {{ formState.product_sn }}
                        </el-form-item>
                        <el-form-item label="商品数量" prop="quantity">
                            {{ formState.quantity }}
                        </el-form-item>
                        <el-form-item label="退款商品数量" prop="refund_number">
                            <el-input v-model="formState.refund_number"/>
                        </el-form-item>
                        <el-form-item label="商品单价" prop="price">
                            {{ formState.price }}
                        </el-form-item>
                        <el-form-item label="退款总价" prop="subtotal">
                            {{ formState.subtotal }}（仅供参考）
                        </el-form-item>
                    </template>
                    <el-form-item label="最终退款金额" prop="refund_amount">
                        <el-input v-model="formState.refund_amount"/>
                        <div class="extra">请根据实际情况填写金额</div>
                    </el-form-item>
                    <el-form-item label="处理状态" prop="refund_status">
                        <el-radio-group v-model="formState.refund_status">
                            <el-radio :value="0">未处理</el-radio>
                            <el-radio :value="1">已处理</el-radio>
                            <el-radio :value="2">已取消</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="本次操作备注" prop="refund_note">
                        <el-input v-model="formState.refund_note" row="2" type="textarea"/>
                    </el-form-item>
<!--                    <el-table :data="table">-->
<!--                        <el-table-column :width="120" label="操作者" prop="refund_type_name"></el-table-column>-->
<!--                        <el-table-column :width="120" label="操作状态" prop="refund_type_name"></el-table-column>-->
<!--                        <el-table-column :width="160" label="操作时间" prop="refund_type_name"></el-table-column>-->
<!--                        <el-table-column label="操作备注" prop="refund_type_name"></el-table-column>-->
<!--                    </el-table>-->
                    <el-form-item v-show="!props.isDialog" :wrapper-col="{ offset: 4, span: 16 }">
                        <el-button ref="submitBtn" class="form-submit-btn" type="primary" @click="onSubmit">提交</el-button>
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
import {getRefundApply, updateRefundApply} from "@/api/finance/refundApply";
import {DialogForm} from "@/components/dialog";
import {OrderMoney} from "@/components/order";
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
const operation = action.value === 'add' ? 'insert' : 'update';
const formRef = shallowRef();
const formState = ref<RefundApplyFormState>({});
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


onMounted(() => {
    // 获取详情数据
    fetchRefundApply();
});

// 表单通过验证后提交
const onSubmit = async () => {
    try {
        await formRef.value.validate();
        emit('update:confirmLoading', true);
        const result = await updateRefundApply(operation, {id: id.value, ...formState.value});
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


defineExpose({onFormSubmit});
</script>
<style lang="less" scoped>
.notice-warp {
    background-color: #eef2ff;
    border-radius: 9px;
    padding: 15px;
    margin-bottom: 20px;
    line-height: 24px;
}
</style>
