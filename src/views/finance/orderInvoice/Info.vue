<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-form-table">
                <el-form v-if="!loading" ref="formRef" :model="formState" label-width="auto">
                    <el-form-item label="申请会员" prop="username">
                        {{formState.username}}
                    </el-form-item>
                    <el-form-item label="发票类型" prop="invoice_type_name">
                        {{formState.invoice_type_name}}
                    </el-form-item>
                    <template v-if="formState.invoice_type===2&&formState.user_invoice">
                        <el-form-item label="增票资质状态" prop="company_name">
                            <DialogForm :showOnOk="false" :params="{ act: 'edit', id: formState.user_invoice.invoice_id }" isDrawer
                                        path="finance/userInvoice/Info"
                                        title="编辑增票资质申请" width="600px">
                                {{ formState.user_invoice.status_name }} <a class="btn-link">[查看]</a>
                            </DialogForm>
                        </el-form-item>
                        <el-form-item label="公司名称" prop="company_name">
                            {{formState.company_name}}
                        </el-form-item>
                        <el-form-item label="纳税人识别码" prop="company_code">
                            {{formState.company_code}}
                        </el-form-item>
                        <el-form-item label="注册地址" prop="company_address">
                            {{formState.company_address}}
                        </el-form-item>
                        <el-form-item label="注册电话" prop="company_phone">
                            {{formState.company_phone}}
                        </el-form-item>
                        <el-form-item label="开户银行" prop="company_bank">
                            {{formState.company_bank}}
                        </el-form-item>
                        <el-form-item label="银行账户" prop="company_account">
                            {{formState.company_account}}
                        </el-form-item>
                    </template>
                    <template v-else>
                        <el-form-item label="发票抬头" prop="company_name">
                            {{formState.company_name}}
                        </el-form-item>
                        <el-form-item label="企业税号" prop="company_code">
                            {{formState.company_code}}
                        </el-form-item>
                        <el-form-item label="发票内容" prop="invoice_content">
                            {{formState.invoice_content}}
                        </el-form-item>
                    </template>
                    <el-form-item label="收票人姓名" prop="company_name">
                        {{formState.company_name}}
                    </el-form-item>
                    <el-form-item label="收票人电话" prop="mobile">
                        {{formState.mobile}}
                    </el-form-item>
                    <el-form-item label="收票人邮箱" prop="email">
                        {{formState.email}}
                    </el-form-item>
                    <el-form-item label="收票人地址" prop="company_address">
                        {{formState.company_address}}
                    </el-form-item>
                    <el-form-item label="申请状态" prop="status">
                        <el-radio-group v-model="formState.status">
                            <el-radio :value="0">待处理</el-radio>
                            <el-radio :value="1">已开</el-radio>
                            <el-radio :value="2">失败/作废</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="发票金额" prop="amount">
                        <el-input v-model="formState.amount"  type="text"/>
                    </el-form-item>
                    <el-form-item label="申请未通过原因" prop="apply_reply">
                        <el-input v-model="formState.apply_reply" row="2" type="textarea"/>
                        <div class="extra">若通过可不写</div>
                    </el-form-item>
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
import type {OrderInvoiceFormState} from '@/types/finance/orderInvoice.d';
import {getOrderInvoice, updateOrderInvoice} from "@/api/finance/orderInvoice";
import {DialogForm} from "@/components/dialog";
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
const formState = ref<OrderInvoiceFormState>({
});
const fetchOrderInvoice = async () => {
    try {
        const result = await getOrderInvoice(action.value, {id: id.value});
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
    fetchOrderInvoice();
});

// 表单通过验证后提交
const onSubmit = async () => {
    try {
        await formRef.value.validate();
        emit('update:confirmLoading', true);
        const result = await updateOrderInvoice(operation, {id: id.value, ...formState.value});
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
<style scoped lang="less">

</style>
