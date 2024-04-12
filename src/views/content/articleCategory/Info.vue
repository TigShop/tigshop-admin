<template>
    <div class="container">
        <div class="content_wrapper">
            <div v-if="!loading" class="lyecs-form-table">
                <el-form ref="formRef" :model="formState" label-width="auto">
                    <el-form-item :rules="[{ required: true, message: '文章分类名称不能为空!' }]" extra="sfs" label="文章分类名称" prop="article_category_name">
                        <el-input v-model="formState.article_category_name" />
                    </el-form-item>
                    <el-form-item label="上级分类" prop="parent_id">
                        <SelectArticleCategory :min-width="'100%'" v-model="formState.parent_id" :disabled="action == 'add' && !parentId"></SelectArticleCategory>
                    </el-form-item>
                    <el-form-item label="关键字" prop="keywords">
                        <el-input v-model="formState.keywords" />
                    </el-form-item>
                    <el-form-item label="描述" prop="description">
                        <el-input v-model="formState.description" row="2" type="textarea" />
                        <div class="extra">关键字为选填项，其目的在于方便外部搜索引擎搜索</div>
                    </el-form-item>
                    <el-form-item prop="sort_order" label="排序">
                        <el-input v-model="formState.sort_order" />
                    </el-form-item>
                    <el-form-item v-show="!props.isDialog" :wrapper-col="{ offset: 4, span: 16 }">
                        <el-button ref="submitBtn" class="form-submit-btn" type="primary" @click="onSubmit">提交 </el-button>
                    </el-form-item>
                </el-form>
            </div>
            <a-spin :spinning="loading" style="width: 100%; margin-top: 100px" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, shallowRef, onMounted } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { FormAddGallery } from "@/components/gallery";
import { FormState } from "@/types/content/articleCategory.d";
import { getArticleCategory, updateArticleCategory } from "@/api/content/articleCategory";
import { SelectArticleCat, SelectGoods } from "@/components/select";
import SelectArticleCategory from "@/components/select/src/SelectArticleCategory.vue";

const emit = defineEmits(["submitCallback", "update:confirmLoading", "close"]);

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
        default: ""
    },
    isDialog: Boolean
});

const loading = ref<boolean>(true);
const query = useRouter().currentRoute.value.query;
const action = ref(props.isDialog ? props.act : String(query.act));
const id = ref<number>(props.isDialog ? props.id : Number(query.id));
const operation = action.value === "add" ? "insert" : "update";
const formRef = shallowRef();
const formState = ref<FormState>({
    article_category_name: "",
    parent_id: 0,
    keywords: "",
    description: "",
    sort_order: 0
});

onMounted(() => {
    // 获取详情数据
    fetchArticle();
});
const fetchArticle = async () => {
    try {
        loading.value = true;
        const result = await getArticleCategory(action.value, { id: id.value });
        Object.assign(formState.value, result.item);
        console.log(props.parentId);
        if (props.parentId) {
            formState.value.parent_id = props.parentId;
        }
    } catch (error: any) {
        message.error(error.message);
        emit("close");
    } finally {
        loading.value = false;
    }
};

// 表单通过验证后提交
const onSubmit = async () => {
    try {
        await formRef.value.validate();
        emit("update:confirmLoading", true);
        const result = await updateArticleCategory(operation, { id: id.value, ...formState.value });
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
