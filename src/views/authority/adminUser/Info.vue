<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-form-table">
                <el-form v-if="!loading" ref="formRef" :model="formState" label-width="auto">
                    <el-form-item :rules="[{ required: true, message: '管理员名称不能为空!' }]" label="管理员名称" prop="username">
                        <el-input v-model="formState.username" />
                    </el-form-item>
                    <el-form-item label="手机号" prop="mobile">
                        <el-input v-model="formState.mobile" />
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="formState.email" />
                    </el-form-item>
                    <el-form-item label="头像" prop="avatar">
                        <div class="avatar-type">
                            <FormAddGallery v-model:photo="formState.avatar"></FormAddGallery>
                            <DefaultAvatar v-model:avatar="formState.def_avatar"></DefaultAvatar>
                        </div>
                        <div class="extra">如果未设置自定义头像，将采用系统头像</div>
                    </el-form-item>
                    <template v-if="operation == 'create'">
                        <el-form-item :rules="[{ required: true, message: '设置密码不能为空!' }]" label="设置密码" prop="password">
                            <el-input v-model="formState.password" type="password" />
                        </el-form-item>
                        <el-form-item :rules="[{ required: true, message: '确认密码不能为空!' }]" label="确认密码" prop="pwd_confirm">
                            <el-input v-model="formState.pwd_confirm" type="password" />
                        </el-form-item>
                    </template>
                    <template v-else>
                        <el-form-item label="设置密码" prop="password">
                            <el-input v-model="formState.password" type="password" />
                        </el-form-item>
                        <el-form-item label="确认密码" prop="pwd_confirm">
                            <el-input v-model="formState.pwd_confirm" type="password" />
                        </el-form-item>
                    </template>
                    <el-form-item label="管理员权限组" prop="role_id">
                        <template v-if="formState.role_id != 2">
                            <el-select v-model="formState.role_id" style="width: 100%">
                                <el-option :value="0" label="自定义权限"></el-option>
                                <el-option v-for="item in role_list" :label="item.role_name" :value="item.role_id"></el-option>
                            </el-select>
                        </template>
                        <template v-else> 供应商 </template>
                    </el-form-item>
                    <el-form-item v-if="formState.role_id === 0" label="" prop="auth_list">
                        <AuthoritySelect v-model="formState.auth_list"></AuthoritySelect>
                    </el-form-item>
                    <el-form-item v-show="!props.isDialog" :wrapper-col="{ offset: 4, span: 16 }">
                        <el-button ref="submitBtn" class="form-submit-btn" type="primary" @click="onSubmit">提交</el-button>
                    </el-form-item>
                </el-form>
                <a-spin :spinning="loading" style="width: 100%; margin-top: 100px" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, shallowRef } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import {DefaultAvatar, FormAddGallery} from "@/components/gallery";
import { AdminUserFormState, AdminUserRoleListItem } from "@/types/authority/adminUser";
import { getAdminUser, updateAdminUser, getAdminUserConfig } from "@/api/authority/adminUser";
import AuthoritySelect from "@/views/authority/AuthoritySelect.vue";
import {extractContent} from "@/utils/util";
// 父组件回调
const emit = defineEmits(["submitCallback", "update:confirmLoading", "close"]);

const props = defineProps({
    id: {
        type: Number,
        default: 0,
    },
    suppliers_id: {
        type: Number,
        default: 0,
    },
    act: {
        type: String,
        default: "",
    },
    type: {
        type: String,
        default: "",
    },
    isDialog: Boolean,
});
const loading = ref<boolean>(true);
const query = useRouter().currentRoute.value.query;
const action = ref<string>(props.isDialog ? props.act : String(query.act));
const id = ref<number>(props.isDialog ? props.id : Number(query.id));
const operation = action.value === "add" ? "create" : "update";
const formRef = shallowRef();
const formState = ref<AdminUserFormState>({});
const role_list = ref<AdminUserRoleListItem[]>();
const fetchAdminUser = async () => {
    try {
        const result = await getAdminUser(action.value, { id: id.value });
        Object.assign(formState.value, result.item);
        if (operation != "update" && props.type === "suppliers") {
            formState.value.role_id = 2;
            formState.value.suppliers_id = props.suppliers_id;
        }
        let temp = extractContent(String(formState.value.avatar));
        if(temp){
            formState.value.def_avatar = temp
            formState.value.avatar = ''
        }
    } catch (error: any) {
        message.error(error.message);
        emit("close");
    } finally {
        loading.value = false;
    }
};
const fetchAdminUserConfit = async () => {
    try {
        const result = await getAdminUserConfig();
        role_list.value = result.role_list;
    } catch (error: any) {
        message.error(error.message);
    }
};

onMounted(() => {
    if (action.value === "detail") {
        // 获取详情数据
        fetchAdminUser();
    } else {
        loading.value = false;
    }
    fetchAdminUserConfit()
});

// 表单通过验证后提交
const onSubmit = async () => {
    await formRef.value.validate();
    try {
        emit("update:confirmLoading", true);
        let temp:any = {
            avatar:''
        }
        if(!formState.value.avatar&&formState.value.def_avatar){
            temp.avatar = formState.value.def_avatar
        }else{
            temp.avatar = formState.value.avatar
        }
        const result = await updateAdminUser(operation, { id: id.value, ...formState.value, avatar: temp.avatar });
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

defineExpose({ onFormSubmit });
</script>
<style lang="less" scoped>
.width100 {
    width: 100%;
}
.avatar-type{
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 100%;
    align-items: center;
}
</style>
