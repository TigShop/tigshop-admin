<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-form-table">
                <el-form ref="formRef" :model="formState" label-width="auto">
                    <el-form-item label="旧密码：" prop="old_password" :rules="[{ required: true, message: '旧密码不能为空!', trigger: 'blur' }]">
                        <el-input type="password" v-model="formState.old_password" />
                    </el-form-item>
                    <el-form-item label="新密码：" prop="password" :rules="[{ required: true, message: '请输入新密码', trigger: 'blur' }]">
                        <el-input type="password" v-model="formState.password" />
                    </el-form-item>
                    <el-form-item label="确认密码：" prop="pwd_confirm" :rules="[{ required: true, validator: validatePwd, trigger: 'blur' }]">
                        <el-input type="password" v-model="formState.pwd_confirm" />
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {onMounted, ref, shallowRef} from "vue"
import {useRouter} from 'vue-router'
import {message} from "ant-design-vue";
import { AccountPassWordEditingFormState } from "@/types/authority/accountEditing";
import { adminInfoSubmit } from "@/api/authority/accountEditing";
const emit = defineEmits(["submitCallback", "update:confirmLoading", "close"]);
const props = defineProps({
    id: {
        type: Number,
        default: 0
    },
    isDialog: Boolean
});
const formRef = shallowRef();
const formState = ref<AccountPassWordEditingFormState>({
    old_password: "",
    password: "",
    pwd_confirm: "",
});
const validatePwd = (rule: any, value: any, callback: any) => {
    if (!value) {
        callback(new Error('确认密码不能为空'))
        return;
    }
    // 判断是否符合国际手机号格式  
    if (formState.value.password == value) {
        callback()
    } else {
        callback('两次密码输入不一致')
    }
}
// 表单通过验证后提交
const onSubmit = async () => {
    try {
        await formRef.value.validate();
        emit('update:confirmLoading', true);
        const result = await adminInfoSubmit({modify_type: 2, ...formState.value});
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
