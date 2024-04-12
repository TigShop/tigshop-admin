<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-form-table">
                <a-spin :spinning="loading">
                    <el-form ref="formRef" :model="formState" label-width="auto">
                        <el-form-item label="邮件模板" prop="selTemplate">
                            <el-select v-model="formState.template_id" style="width: 100%">
                                <el-option
                                  v-for="item in filterState"
                                  :key="item.template_id"
                                  :label="item.template_name"
                                  :value="item.template_id"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="邮件主题" prop="template_subject">
                            <el-input v-model="formState.template_subject" type="text"/>
                        </el-form-item>
                        <el-form-item label="邮件内容" prop="template_content">
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
import type {MailTemplateFilterState} from '@/types/setting/mailTemplate.d';
import {getMailTemplateList, updateMailTemplate} from "@/api/setting/mailTemplate";
import {Editor} from "@/components/editor/index"
// 父组件回调
const emit = defineEmits(["submitCallback", "update:confirmLoading", "close"]);
const confirmLoading = ref(false);

const loading = ref<boolean>(true);
const formRef = shallowRef();
const formState = ref<MailTemplateFilterState>({
    template_name: '',
    template_id: 0,
});
const filterState = ref<MailTemplateFilterState[]>([]);
const loadFilter = async () => {
    try {
        const result = await getMailTemplateList();
        filterState.value = result.filter_result;
        if (filterState.value && filterState.value?.length > 0) {
            formState.value.template_id = filterState.value[0].template_id
        }
    } catch (error:any) {
        message.error(error.message);
    } finally {
        loading.value = false;
    }
}
watch(
  () => formState.value.template_id,
  (newTemplateId) => {
      // 从邮件模板数据中找到被选择的模板
      const template = filterState.value.find((item: MailTemplateFilterState) => item.template_id == newTemplateId);
      // 将模板数据更新到 formState 中
      if (template) {
          Object.assign(formState.value, template);
      }
  }
);


onMounted(() => {
    // 获取详情数据
    loadFilter();
});

// 表单通过验证后提交
const onSubmit = async () => {
    try {
        await formRef.value.validate();
        emit('update:confirmLoading', true);
        const result = await updateMailTemplate({id: formState.value.template_id, ...formState.value});
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
<style lang="less" scoped>
.notice-warp {
    background-color: #eef2ff;
    border-radius: 9px;
    padding: 15px;
    margin-bottom: 20px;
    line-height: 24px;
}
</style>
