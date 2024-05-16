<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-form-table">
                <el-form v-if="!loading" ref="formRef" :model="formState" label-width="auto">
                    <el-form-item :rules="[{ required: true, message: '权限组名称不能为空!' }]" label="权限组名称" prop="role_name">
                        <el-input v-model="formState.role_name"/>
                    </el-form-item>
                    <el-form-item label="权限组描述" prop="role_desc">
                        <el-input v-model="formState.role_desc" row="3" type="textarea"/>
                    </el-form-item>
                    <el-form-item label="" prop="authority_list">
                      <AuthoritySelect v-model="formState.authority_list"></AuthoritySelect>
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
import type {AdminRoleFormState} from '@/types/authority/adminRole.d';
import {getAdminRole, updateAdminRole} from "@/api/authority/adminRole";

import AuthoritySelect from "@/views/authority/AuthoritySelect.vue";
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
const operation = action.value === 'add' ? 'create' : 'update';
const formRef = shallowRef();
const formState = ref<AdminRoleFormState>({});
const fetchAdminRole  = async () => {
    try {
        const result = await getAdminRole(action.value, { id: id.value });
        Object.assign(
          formState.value,
          result.item
        )
    } catch (error: any) {
        message.error(error.message);
        emit('close');
    } finally {
        loading.value = false;
    }
};


onMounted(() => {
    if (action.value === "detail") {
        // 获取详情数据
        fetchAdminRole();
    } else {
        loading.value = false;
    }
});

// 表单通过验证后提交
const onSubmit = async () => {
    try {
        await formRef.value.validate();
        emit('update:confirmLoading', true);
        const result = await updateAdminRole(operation, { id: id.value, ...formState.value });
        emit('submitCallback', result);
        message.success(result.message);
    } catch (error: any) {
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
