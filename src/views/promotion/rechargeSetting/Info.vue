<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-form-table">
                <el-form v-if="!loading" ref="formRef" :model="formState" label-width="auto">
                    <el-form-item prop="money" label="充值金额" :rules="[{ required: true, message: '充值金额不能为空!' }]">
                        <el-input type="number" v-model="formState.money" />
                    </el-form-item>
                    <el-form-item prop="discount_money" label="赠送金额" :rules="[{ required: true, message: '赠送金额不能为空!' }]">
                        <el-input type="number" v-model="formState.discount_money" />
                    </el-form-item>
                    <el-form-item prop="sort_order" label="排序">
                        <el-input v-model="formState.sort_order" />
                    </el-form-item>
                    <el-form-item prop="is_show" label="是否显示">
                        <el-radio-group v-model="formState.is_show">
                            <el-radio :value="1">是</el-radio>
                            <el-radio :value="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item v-show="!props.isDialog" :wrapper-col="{ offset: 4, span: 16 }">
                        <el-button ref="submitBtn" class="form-submit-btn" type="primary" @click="onSubmit">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, shallowRef, onMounted } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { FormAddGallery } from "@/components/gallery";
import { RechargeSettingFormState } from "@/types/promotion/rechargeSetting.d";
import { getRechargeSetting, updateRechargeSetting } from "@/api/promotion/rechargeSetting";

const emit = defineEmits(["submitCallback", "update:confirmLoading", "close"]);

const props = defineProps({
    id: {
        type: Number,
        default: 0
    },
    act: {
        type: String,
        default: ""
    },
    isDialog: Boolean
});
const loading = ref<boolean>(true);
const query = useRouter().currentRoute.value.query;
const action = ref<string>(props.isDialog ? props.act : String(query.act));
const id = ref<number>(props.isDialog ? props.id : Number(query.id));
const operation = action.value === "add" ? "create" : "update";
const formRef = shallowRef();
const formState = ref<RechargeSettingFormState>({
    sort_order: 1,
    is_show: 1
});

onMounted(() => {
    if (action.value === "detail") {
        // 获取详情数据
        fetchRechargeSetting();
    } else {
        loading.value = false;
    }
});
const fetchRechargeSetting = async () => {
    try {
        const result = await getRechargeSetting(action.value, { id: id.value });
        Object.assign(formState.value, result.item);
    } catch (error: any) {
        message.error(error.message);
        emit("close");
    } finally {
        loading.value = false;
    }
};

// 表单通过验证后提交
const onSubmit = async () => {
    await formRef.value.validate();
    try {
        emit("update:confirmLoading", true);
        const result = await updateRechargeSetting(operation, { id: id.value, ...formState.value });
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
