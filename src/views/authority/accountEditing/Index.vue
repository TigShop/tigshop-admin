<template>
    <div class="container">
        <div class="content_wrapper">
            <a-spin :spinning="loading">
                <el-form ref="formRef" :model="formState" label-width="100px" style="max-width: 500px">
                    <el-form-item label="管理员名称" prop="username">
                        <!-- <el-input v-model="formState.username" disabled /> -->
                        <p>{{ formState.username }}</p>

                        <DialogForm
                            :title="'修改密码'"
                            isDrawer
                            :params="{ id: userInfo.admin_id }"
                            path="authority/accountEditing/Info"
                            width="600px"
                            @okCallback="loadFilter">
                            <el-button key="primary" type="primary" link>修改密码</el-button>
                        </DialogForm>
                    </el-form-item>
                    <el-form-item label="手机号" prop="mobile">
                        {{ formState.mobile }}
                        <DialogForm
                            :title="'修改手机号'"
                            isDrawer
                            :params="{ id: userInfo.admin_id, form: userInfo }"
                            path="authority/accountEditing/EditMobile"
                            width="600px"
                            @okCallback="loadFilter">
                            <el-button key="primary" type="primary" link>修改手机号</el-button>
                        </DialogForm>
                    </el-form-item>
                    <el-form-item label="用户头像" prop="avatar">
                        <div class="avatar-type">
                            <FormAddGallery v-if="!loading" v-model:photo="formState.avatar"></FormAddGallery>
                            <DefaultAvatar v-if="!loading" v-model:avatar="formState.def_avatar"></DefaultAvatar>
                        </div>
                        <div class="extra">如果未设置自定义头像，将采用系统头像</div>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="formState.email" />
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="confirmLoading" size="large" type="primary" @click="onSubmit">提 交</el-button>
                    </el-form-item>
                </el-form>
            </a-spin>
        </div>
    </div>
</template>

<script lang="ts" setup>
import "@/style/css/list.less";
import { onMounted, reactive, ref, shallowRef } from "vue";
import {DefaultAvatar, FormAddGallery} from "@/components/gallery";
import { DialogForm } from "@/components/dialog";
import { message } from "ant-design-vue";
import { AccountEditingFormState } from "@/types/authority/accountEditing.d";
import { useUserStore } from "@/store/user";
import { getAdminInfo, adminInfoSubmit } from "@/api/authority/accountEditing";
import {extractContent} from "@/utils/util";

// 基本参数定义
const confirmLoading = ref<boolean>(false);
const loading = ref<boolean>(false);
const user = reactive<any>(useUserStore());
const userInfo = reactive<any>(useUserStore().userInfo);
const formState = ref<AccountEditingFormState>({
    avatar: userInfo.avatar,
    def_avatar: userInfo.avatar,
    username: userInfo.username,
    email: userInfo.email,
    mobile: "",
});
// 加载列表
onMounted(async () => {
    loadFilter();
});

const loadFilter = async () => {
    loading.value = true;
    try {
        const result = await getAdminInfo({
            id: userInfo.admin_id,
        });
        formState.value.mobile = String(result.item.mobile);
        formState.value.email = String(result.item.email);
        let temp = extractContent(String(result.item.avatar));
        if(temp){
            formState.value.def_avatar = temp
            formState.value.avatar = ''
        }else{
            formState.value.def_avatar = ''
        }
        user.setUserInfo(result.item);
    } catch (error: any) {
        message.error(error.message);
    } finally {
        loading.value = false;
    }
};
// 表单通过验证后提交
const onSubmit = async () => {
    confirmLoading.value = true;
    try {
        let temp:any = {
            avatar:''
        }
        if(!formState.value.avatar&&formState.value.def_avatar){
            temp.avatar = formState.value.def_avatar
        }else{
            temp.avatar = formState.value.avatar
        }
        const result = await adminInfoSubmit({ modify_type: 1, ...formState.value , avatar: temp.avatar });
        message.success(result.message);
        loadFilter();
    } catch (error: any) {
        message.error(error.message);
    } finally {
        confirmLoading.value = false;
    }
};
</script>

<style lang="less" scoped>
p {
    line-height: 16px;
    margin-right: 20px;
}
.el-button {
    margin-right: 15px;
}
.avatar-type{
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 100%;
    align-items: center;
}
</style>
