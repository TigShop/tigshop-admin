<template>
  <div class="container">
    <div class="content_wrapper">
      <div class="lyecs-form-table">
        <div class="negotiation-box">
          <el-form ref="formRef" :model="formState" label-width="auto">
            <el-form-item label="售后方式：">
              <p>{{ formData.aftersales_type_name }}</p>
            </el-form-item>
            <el-form-item label="售后状态：">
              <p>{{ formData.status_name }}</p>
            </el-form-item>
            <el-form-item label="退货地址：" prop="return_address" v-if="formData.aftersale_type == 1 && status == 2" :rules="[{ required: status == 2 ? true : false, message: '退货地址不能为空' }]">
              <el-input
                v-model="formState.return_address"
                :rows="6"
                type="textarea"
                placeholder="请输入退货地址"
              />
            </el-form-item>
            <el-form-item label="拒绝说明：" prop="reply" v-if="status == 3" :rules="[{ required: status == 3 ? true : false, message: '拒绝说明不能为空' }]">
              <el-input
                v-model="formState.reply"
                :rows="6"
                type="textarea"
                placeholder="请输入拒绝说明"
              />
              <div>
                <el-tag
                  v-for="item in formData.refuse_reason"
                  :key="item"
                  type="info"
                  style="margin-right: 5px;"
                  @click="onChangeReason"
                >
                  {{ item }}
                </el-tag>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="btn-box">
                <el-button type="primary" v-if="formData.aftersale_type == 1" @click="onSubmit">{{ status == 2 ? '同意并发送退货地址' : '拒绝退款'}}</el-button>
                <el-button type="primary" v-if="formData.aftersale_type == 5" @click="onSubmit">{{ status == 2 ? '同意仅退款' : '拒绝仅退款'}}</el-button>
                <el-button @click="close">取消</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, shallowRef, PropType } from "vue";
import { message } from "ant-design-vue";
import { FormState } from "@/types/order/aftersales";
import { updateAftersales } from "@/api/order/aftersales";

// 父组件回调
const emit = defineEmits(["submitCallback", "update:confirmLoading", "close"]);

const props = defineProps({
  formData: {
    type: Object as PropType<FormState>,
    default: 0,
  },
  status: {
    type: Number,
    default: 2,
  },
});
const loading = ref<boolean>(true);
const formRef = shallowRef();
const formState = ref<any>({
  status: props.status,
  reply: "",
  return_address: ""
});

const close = () => {
  emit('close');
};
const onChangeReason = (e: any) => {
  formState.value.reply = e.target.innerText;
};

// 表单通过验证后提交
const onSubmit = async () => {
  await formRef.value.validate();
  try {
    emit("update:confirmLoading", true);
    const result = await updateAftersales({
      id: props.formData.aftersale_id,
      ...formState.value,
    });
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
.negotiation-box{
  cursor: pointer;
}
.btn-box {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
</style>
