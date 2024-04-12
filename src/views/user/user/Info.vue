<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-form-table">
                <el-form v-if="!loading" ref="formRef" :model="formState" label-width="auto">
                    <el-form-item v-if="operation==='insert'" :rules="[{ required: true, message: '会员名称不能为空!' }]" label="会员名称" prop="username">
                        <el-input v-model="formState.username"/>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="mobile">
                        <el-input v-model="formState.mobile"/>
                    </el-form-item>
                    <el-form-item label="邮箱地址" prop="email">
                        <el-input v-model="formState.email"/>
                    </el-form-item>
                    <template v-if="operation==='insert'">
                        <el-form-item :rules="[{ required: true, message: '新密码不能为空!' }]" label="新密码" prop="password">
                            <el-input v-model="formState.password"/>
                        </el-form-item>
                        <el-form-item :rules="[{ required: true, message: '确认密码不能为空!' }]" label="确认密码" prop="pwd_confirm">
                            <el-input v-model="formState.pwd_confirm"/>
                        </el-form-item>
                    </template>
                    <template v-else>
                        <el-form-item label="新密码" prop="password">
                            <el-input v-model="formState.password"/>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="pwd_confirm">
                            <el-input v-model="formState.pwd_confirm"/>
                        </el-form-item>
                    </template>
                    <el-form-item label="会员等级" prop="rank_id">
                        <el-select style="width: 100%" v-model="formState.rank_id" >
                            <el-option
                              v-for="item in options"
                              :key="item.rank_id"
                              :label="item.rank_name"
                              :value="item.rank_id"
                            />
                        </el-select>
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
import {UserFormState} from '@/types/user/user.d';
import {getUser, updateUser} from "@/api/user/user";
import {SelectRankList} from "@/components/select";
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
const formState = ref<UserFormState>({
    balance: 0,
    frozen_balance: 0,
    avatar: "",
    password: "",
    pwd_confirm: ""
});
const options = ref()
const fetchUser = async () => {
    try {
        loading.value = true;
        const result = await getUser(action.value, {id: id.value});
        Object.assign(
          formState.value,
          result.item
        )
        options.value = result.rank_list
    } catch (error:any) {
        message.error(error.message);
        emit('close');
    } finally {
        loading.value = false;
    }
};


onMounted(() => {
    // 获取详情数据
    fetchUser();
});

// 表单通过验证后提交
const onSubmit = async () => {
    await formRef.value.validate();
    try {
        emit('update:confirmLoading', true);
        const result = await updateUser(operation, {id: id.value, ...formState.value});
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

