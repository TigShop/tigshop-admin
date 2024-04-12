<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-form-table">
                <a-spin :spinning="loading">
                    <el-form ref="formRef" :model="formState" label-width="auto">
                        <el-form-item label="售后服务" prop="template_content">
                            <Editor v-model:html="formState.template_content"></Editor>
                        </el-form-item>
                    </el-form>
                    <div v-if="!loading" class="selected-action-warp">
                        <div class="selected-action" style="padding-left: 80px;">
                            <a-button :loading="confirmLoading" class="form-submit-btn" size="large" type="primary" @click="onSubmit">提 交</a-button>
                        </div>
                    </div>
                </a-spin>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import '@/style/css/list.less'
import {onMounted, ref, shallowRef, watch} from "vue"
import {message} from "ant-design-vue";
import type {AfterSalesServiceFilterState} from '@/types/setting/afterSalesService.d';
import {getAfterSalesServiceList, updateAfterSalesService} from "@/api/setting/afterSalesService";
import {Editor} from "@/components/editor/index"
import {getConfig, updateConfig} from "@/api/setting/config";
// 父组件回调
const emit = defineEmits(["submitCallback", "update:confirmLoading", "close"]);
const confirmLoading = ref(false);

const loading = ref<boolean>(true);
const formRef = shallowRef();
const formState = ref<AfterSalesServiceFilterState>({});
const loadFilter = async () => {
    try {
        const result = await getConfig({
            code: "after_sales_service",
        });
        Object.assign(formState.value, result.item);
    } catch (error: any) {
        message.error(error.message);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    // 获取详情数据
    loadFilter();
});

// 表单通过验证后提交
const onSubmit = async () => {
    try {
        emit('update:confirmLoading', true);
        const result = await updateConfig({code: "after_sales_service",data:{...formState.value}});
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

defineExpose({onFormSubmit});
</script>
<style lang="less" scoped>
.notice-warp {
    background-color: #eef2ff;
    border-radius: 9px;
    padding: 15px;
    margin-bottom: 20px;
    line-height: 24px;
}
</style>
