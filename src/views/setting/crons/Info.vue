<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-form-table">
                <el-form v-if="!loading" ref="formRef" :model="formState" label-width="auto">
                    <el-form-item :rules="[{ required: true, message: '计划任务名称不能为空!' }]" label="计划任务名称" prop="cron_name">
                        <el-input v-model="formState.cron_name"/>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true, message: '计划任务描述不能为空!' }]" label="计划任务描述" prop="cron_desc">
                        <el-input v-model="formState.cron_desc" row="4" type="textarea"/>
                    </el-form-item>
                    <el-form-item label="计划任务执行时间" prop="cron_type">
                        <el-radio-group v-model="formState.cron_type">
                         <div class="width100"><el-radio :value="1">每年</el-radio></div>
                         <div class="width100"><el-radio :value="2">每月</el-radio></div>
                         <div class="width100"><el-radio :value="3">每周</el-radio></div>
                         <div class="width100"><el-radio :value="4">每天</el-radio></div>
                         <div class="width100"><el-radio :value="5">每小时</el-radio></div>
                         <div class="width100"><el-radio :value="6">每分钟</el-radio></div>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="执行后关闭" prop="just_once">
                        <el-radio-group v-model="formState.just_once">
                            <el-radio :value="1">是</el-radio>
                            <el-radio :value="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="是否开启" prop="is_enabled">
                        <el-radio-group v-model="formState.is_enabled">
                            <el-radio :value="1">是</el-radio>
                            <el-radio :value="0">否</el-radio>
                        </el-radio-group>
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
import type {CronsFormState} from '@/types/setting/crons.d';
import {getCrons, updateCrons} from "@/api/setting/crons";
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
const formState = ref<CronsFormState>({});
const fetchCrons  = async () => {
    try {
        const result = await getCrons(action.value, { id: id.value });
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
    fetchCrons();
});

// 表单通过验证后提交
const onSubmit = async () => {
    try {
        await formRef.value.validate();
        emit('update:confirmLoading', true);
        const result = await updateCrons(operation, { id: id.value, ...formState.value });
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
<style lang="less" scoped>
.width100{
    width: 100%;
}
</style>
