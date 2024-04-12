<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-form-table">
                <el-form v-if="!loading" ref="formRef" :model="formState" label-width="auto">
                        <el-form-item label="申请会员" prop="username">
                            {{formState.username}}
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
<!--                        <el-form-item label="税务登记证副本" prop="postscript">-->
<!--                        </el-form-item>-->
                        <el-form-item label="申请状态" prop="status">
                            <el-radio-group v-model="formState.status">
                                <el-radio :value="1">审核通过</el-radio>
                                <el-radio :value="2">待审核</el-radio>
                                <el-radio :value="3">审核未通过</el-radio>
                            </el-radio-group>
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
import type {UserInvoiceFormState} from '@/types/finance/userInvoice.d';
import {getUserInvoice, updateUserInvoice} from "@/api/finance/userInvoice";
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
const formState = ref<UserInvoiceFormState>({
});
const fetchUserInvoice = async () => {
    try {
        const result = await getUserInvoice(action.value, {id: id.value});
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
    fetchUserInvoice();
});

// 表单通过验证后提交
const onSubmit = async () => {
    try {
        await formRef.value.validate();
        emit('update:confirmLoading', true);
        const result = await updateUserInvoice(operation, {id: id.value, ...formState.value});
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
