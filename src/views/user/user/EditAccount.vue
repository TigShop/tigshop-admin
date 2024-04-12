<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-form-table">
                <el-form v-if="!loading" ref="formRef" :model="formState" label-width="auto">
                    <el-form-item label="当前会员">
                        <p>{{ filterState.username }}</p>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true, message: '帐户变动原因不能为空!' }]" label="帐户变动原因" prop="change_desc">
                        <el-input type="textarea" v-model="formState.change_desc" />
                    </el-form-item>

                    <el-form-item label="可用资金帐户" prop="balance">
                        <div class="flex">
                            <el-select v-model="formState.type_balance" style="width: 90px;margin-right: 10px;">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                            <el-input type="number" v-model="formState.balance" style="width: 100px;margin-right: 10px;" :min="0" :step="0.01" />
                            <p>当前值：¥{{ formState.balance }}</p>
                        </div>
                    </el-form-item>
                    <el-form-item label="冻结资金帐户" prop="frozen_balance">
                        <div class="flex">
                            <el-select v-model="formState.type_frozen_balance" style="width: 90px;margin-right: 10px;">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                            <el-input type="number" v-model="formState.frozen_balance" style="width: 100px;margin-right: 10px;" :min="0" :step="0.01" />
                            <p>当前值：¥0.00</p>
                        </div>
                    </el-form-item>
                    <el-form-item label="成长积分帐户" prop="points">
                        <div class="flex">
                            <el-select v-model="formState.type_points" style="width: 90px;margin-right: 10px;">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                            <el-input type="number" v-model="formState.points" style="width: 100px;margin-right: 10px;" :min="0" :step="0.01" />
                            <p>当前值：0</p>
                        </div>
                    </el-form-item>
                    <el-form-item label="消费积分帐户" prop="growth_points">
                        <div class="flex">
                            <el-select v-model="formState.type_growth_points" style="width: 90px;margin-right: 10px;">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                            <el-input type="number" v-model="formState.growth_points" style="width: 100px;margin-right: 10px;" :min="0" :step="0.01" />
                            <p>当前值：0</p>
                        </div>
                    </el-form-item>

                    <el-form-item v-show="!props.isDialog" :wrapper-col="{ offset: 4, span: 16 }">
                        <el-button ref="submitBtn" class="form-submit-btn" type="primary"
                            @click="onSubmit">提交</el-button>
                    </el-form-item>
                </el-form>
                <a-spin :spinning="loading" style="width:100%;margin-top:100px" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, shallowRef } from "vue"
import { useRouter } from 'vue-router'
import { message } from "ant-design-vue";
import { UserFundManagementFormState, UserFormState } from '@/types/user/user.d';
import { getUser, updateUserFundManagement } from "@/api/user/user";
import { SelectRankList } from "@/components/select";
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
    form: {
        type: Object,
        default: {}
    },
    isDialog: Boolean
});
const loading = ref<boolean>(true);
const query = useRouter().currentRoute.value.query;
const action = ref<string>(props.isDialog ? props.act : String(query.act));
const id = ref<number>(props.isDialog ? props.id : Number(query.id));
const operation = action.value === 'add' ? 'insert' : 'update';
const formRef = shallowRef();
const formState = ref<UserFundManagementFormState>({
    change_desc:"",
    type_balance:1,
    balance:0,
    type_frozen_balance:1,
    frozen_balance:0,
    type_points:1,
    points:0,
    type_growth_points:1,
    growth_points:0
});
const filterState = ref<any>({});
const options = [
    {
        value: 1,
        label: '增加',
    },
    {
        value: 2,
        label: '减少',
    },
]
const fetchUser = async () => {
    try {
        loading.value = true;
        const result = await getUser(action.value, { id: id.value });
        Object.assign(
            filterState.value,
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
    // 获取详情数据
    fetchUser();
    loading.value = false;
});

// 表单通过验证后提交
const onSubmit = async () => {
    try {
        await formRef.value.validate();
        emit('update:confirmLoading', true);
        const result = await updateUserFundManagement({ id: id.value, ...formState.value });
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
<style scoped>
.content_wrapper :deep(.el-select){
    min-width: none;
}
</style>