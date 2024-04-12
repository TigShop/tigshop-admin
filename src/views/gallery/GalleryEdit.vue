<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-form-table">
                <a-form ref="formRef" :model="formState" @finish="formSubmit" layout="horizontal" name="form_in_modal" :label-col="{ span: 4 }" :wrapper-col="{ span: 8 }"
                    :label-wrap="false">
                    <a-form-item name="gallery_name" label="相册名称" :rules="[{ required: true, message: '相册名称不能为空!' }]">
                        <a-input v-model:value="formState.gallery_name" />
                    </a-form-item>
                    <a-form-item name="gallery_sort" label="排序">
                        <a-input v-model:value="formState.gallery_sort" />
                    </a-form-item>
                    <a-form-item :hidden="isDialog" :wrapper-col="{ offset: 4, span: 16 }">
                        <a-button ref="submitBtn" class="form-submit-btn" type="primary" html-type="submit">提交</a-button>
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>

import { ref, reactive, toRefs } from "vue"
import request from '../../utils/request'
import { useRouter } from 'vue-router'
import { avatarProps } from "ant-design-vue/es/avatar";
import { message } from "ant-design-vue";

//获取来自父组件的参数 
const props = defineProps({
    id: {
        type: Number,
        default: 0
    },
    parentId: {
        type: Number,
        default: 0
    },
    act: {
        type: String,
        default: ''
    },
    isDialog: Boolean
})
const { parentId, id, act } = toRefs(props);
// 判断是处理更新还是添加
const operation = act.value == 'add' ? 'insert' : 'update';

// 表单参数初使化
const formRef = ref();  //表单Ref
let formState = reactive<any>({});  //表单数据
// 获取详情数据
request({
    url: 'setting/gallery/' + act.value + '/',
    method: 'get',
    params: {
        id: id.value
    }
}).then((result: any) => {
    // 合并前端的初使参数和获取到的参数
    formState = Object.assign(
        formState,
        result.item
    )
});
console.log(parentId.value)
// 父组件回调
const emit = defineEmits(["submitCallback", "okType"])

// 提交表单
const formSubmit = (values: any) => {
    //values返回的是前端表单内有name的项
    formRef.value.validate().then(() => {
        request({
            url: 'setting/gallery/' + operation + '/',
            method: 'post',
            data: {
                id: id.value,
                parent_id: parentId.value,
                ...values
            }
        }).then((result: any) => {
            if (result.errcode > 0) {
                emit("submitCallback", result);
                message.error(result.message)
            } else {
                // 如果是弹窗，回调给弹窗父组件，执行关闭弹窗等操作
                message.success(result.message)
                emit("submitCallback", result);
            }
        })
    });
};

// 处理
const submitBtn = ref<any>(null)
const onFormSubmit = () => {
    submitBtn.value.$el.click();
};

defineExpose({
    onFormSubmit
});

</script>