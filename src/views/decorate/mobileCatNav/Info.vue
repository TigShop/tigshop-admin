<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-form-table">
                <el-form v-if="!loading" ref="formRef" :model="formState" label-width="auto">
                    <el-form-item label="选择分类" :rules="[{ required: true, message: '名称不能为空!' }]" prop="category_id">
                        <SelectCategory v-model:category_id="formState.category_id"></SelectCategory>
                    </el-form-item>
                    <el-form-item label="分类颜色" prop="cat_color">
                        <SelectColor v-model:color="formState.cat_color"></SelectColor>
                    </el-form-item>
                    <el-form-item label="分类banner" prop="cat_color">
                        <FormAddGallery v-model:photos="formState.img_url" :isMultiple="true"></FormAddGallery>
                        <div class="extra">提示：您可以通过拖拽来调整相册图片顺序，请统一上传比例为2:1的图片</div>
                    </el-form-item>
                    <el-form-item label="推荐子分类" prop="child_cat_ids">
                        <SelectCategory v-model:category_id="formState.child_cat_ids" :multiple="true"></SelectCategory>
                    </el-form-item>
                    <el-form-item label="推荐品牌" prop="brand_ids">
                        <!-- <div v-for="(item,key) in formState.brand_ids" style="width: 100%;margin-bottom: 10px;"> -->
                            <SelectBrand v-model.brand_ids="formState.brand_ids" style="width:200px" multiple></SelectBrand>
                        <!-- </div> -->
                        <!-- <el-button type="primary" style="margin-top: 10px;" @click="formState.brand_ids.push('')">增加</el-button> -->
                    </el-form-item>
                    <el-form-item label="排序" prop="sort_order">
                        <el-input v-model="formState.sort_order" />
                    </el-form-item>
                    <el-form-item label="是否显示" prop="is_show">
                        <el-radio-group v-model="formState.is_show">
                            <el-radio :value="1">是</el-radio>
                            <el-radio :value="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item v-show="!props.isDialog" :wrapper-col="{ offset: 4, span: 16 }">
                        <el-button ref="submitBtn" class="form-submit-btn" type="primary" @click="onSubmit">提交</el-button>
                    </el-form-item>
                </el-form>
                <a-spin :spinning="loading" style="width: 100%; margin-top: 100px" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, shallowRef } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { FormAddGallery } from "@/components/gallery";
import { SelectBrand, SelectCategory, SelectColor } from "@/components/select";
import { MobileCatNavFormState } from "@/types/decorate/mobileCatNav.d";
import { getMobileCatNavInfo, updateMobileCatNav } from "@/api/decorate/mobileCatNav";
import {DeleteFilled} from '@element-plus/icons-vue'
// 父组件回调
const emit = defineEmits(["submitCallback", "update:confirmLoading", "close"]);
const props = defineProps({
    id: {
        type: Number,
        default: 0
    },
    type: {
        type: Number,
        default: 0
    },
    type_name: {
        type: String,
        default: ""
    },
    act: {
        type: String,
        default: ""
    },
    isDialog: Boolean,

});
const loading = ref<boolean>(true);
const query = useRouter().currentRoute.value.query;
const action = ref<string>(props.isDialog ? props.act : String(query.act));
const id = ref<number>(props.isDialog ? props.id : Number(query.id));
const operation = action.value === "add" ? "create" : "update";
const formRef = shallowRef();
const formState = ref<MobileCatNavFormState>({
    brand_ids:[],
    is_show: 1,
    sort_order: 50
});
const fetchPcNavigation = async () => {
    try {
        const result = await getMobileCatNavInfo(action.value, { id: id.value });
        if(result.item.brand_ids == null){
            result.item.brand_ids = []
        }
        Object.assign(formState.value, result.item);
    } catch (error: any) {
        message.error(error.message);
        emit("close");
    } finally {
        loading.value = false;
    }
};
onMounted(() => {
    if (action.value === "detail") {
        // 获取详情数据
        fetchPcNavigation();
    } else {
        loading.value = false;
    }
});
// 表单通过验证后提交
const onSubmit = async () => {
    // console.log(formState)
    // return
    try {
        await formRef.value.validate();
        emit("update:confirmLoading", true);
        const result = await updateMobileCatNav(operation, { id: id.value, ...formState.value });
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
