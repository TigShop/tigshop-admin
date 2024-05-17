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

import { ref, reactive, toRefs, onMounted } from "vue"
import { message } from "ant-design-vue";
import {getGalleryInfo,updateGalleryInfo} from "@/api/setting/gallery";
import type {GalleryDetail} from "@/types/setting/gallery.d";

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
const operation = act.value == 'add' ? 'create' : 'update';

// 表单参数初使化
const formRef = ref();  //表单Ref
let formState = reactive<GalleryDetail>({
    gallery_sort: 50
});  //表单数据
onMounted(() => {
    if (act.value === "detail") {
        // 获取详情数据
        fetchGalleryInfo()
    }
});
const fetchGalleryInfo = async () => {
    try {
        const result = await getGalleryInfo(act.value, { id: id.value });
        console.log(result)
        Object.assign(formState, result.item);
    } catch (error: any) {
        message.error(error.message);
    }
};
console.log(parentId.value)
// 父组件回调
const emit = defineEmits(["submitCallback", "okType"])

// 表单通过验证后提交
const formSubmit = async (values: any) => {
    try {
        await formRef.value.validate();
        const result = await updateGalleryInfo(operation, {
                id: id.value,
                parent_id: parentId.value,
                ...values
            });
        emit("submitCallback", result);
        message.success(result.message);
    } catch (error: any) {
        message.error(error.message);
    }
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