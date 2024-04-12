<template>
    <div class="container">
        <div class="content_wrapper">
            <el-tabs v-model:activeKey="activeKey" class="lyecs-tabs" tab-position="top">
                <el-tab-pane :key="1" label="基本信息">
                    <div class="lyecs-form-table">
                        <el-form ref="formRef" :model="formState" label-width="auto">
                            <el-form-item :rules="[{ required: true, message: '文章标题不能为空!' }]" extra="sfs" label="文章标题" prop="article_title">
                                <el-input v-model="formState.article_title" />
                            </el-form-item>
                            <el-form-item label="文章编号" prop="article_sn">
                                <el-input v-model="formState.article_sn" />
                                <div class="extra">编号用于前台调用某些指定的文章</div>
                            </el-form-item>
                            <el-form-item label="文章分类" prop="article_category_id">
                                <SelectArticleCategory v-model="formState.article_category_id" :min-width="'100%'"></SelectArticleCategory>
                            </el-form-item>
                            <el-form-item label="缩略图" prop="article_thumb">
                                <FormAddGallery v-model:photo="formState.article_thumb"></FormAddGallery>
                                <div class="extra">请统一上传比例为1:2的图片，宽100px，高200px（高清）</div>
                            </el-form-item>
                            <el-form-item label="文章作者" prop="article_author">
                                <el-input v-model="formState.article_author" />
                            </el-form-item>
                            <el-form-item label="关键字" prop="keywords">
                                <el-input v-model="formState.keywords" />
                            </el-form-item>
                            <el-form-item label="标签" prop="article_tag">
                                <el-input v-model="formState.article_tag" />
                            </el-form-item>
                            <el-form-item label="描述" prop="description">
                                <el-input v-model="formState.description" row="2" type="textarea" />
                            </el-form-item>
                            <el-form-item label="相关链接" prop="link">
                                <el-input v-model="formState.link" />
                            </el-form-item>
                            <el-form-item label="文章类型" prop="article_type">
                                <el-radio-group v-model="formState.article_type">
                                    <el-radio :value="1">普通文章</el-radio>
                                    <el-radio :value="2">帮助文章</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="是否置顶" prop="is_top">
                                <el-radio-group v-model="formState.is_top">
                                    <el-radio :value="1">是</el-radio>
                                    <el-radio :value="0">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="是否热门" prop="is_hot">
                                <el-radio-group v-model="formState.is_hot">
                                    <el-radio :value="1">是</el-radio>
                                    <el-radio :value="0">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="是否显示" prop="is_show">
                                <el-radio-group v-model="formState.is_show">
                                    <el-radio :value="1">是</el-radio>
                                    <el-radio :value="0">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item v-show="!props.isDialog" :wrapper-col="{ offset: 4, span: 16 }">
                                <el-button ref="submitBtn" class="form-submit-btn" type="primary" @click="onSubmit">提交 </el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-tab-pane>
                <el-tab-pane :key="2" label="文章内容">
                    <Editor v-model:html="formState.content"></Editor>
                </el-tab-pane>
                <el-tab-pane :key="3" label="关联商品">
                    <el-form-item label="">
                        <SelectProduct v-if="!loading" v-model:ids="formState.product_ids"></SelectProduct>
                        <div class="extra">最多添加10个商品，添加的商品会在结算后自动加入订单（不会计价格）</div>
                    </el-form-item>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, shallowRef } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { FormAddGallery } from "@/components/gallery";
import { ArticleFormState } from "@/types/content/article.d";
import { getArticle, updateArticle } from "@/api/content/article";
import { SelectArticleCategory, SelectProduct } from "@/components/select";
import { Editor } from "@/components/editor/index";

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
const activeKey = ref<number>(1);
const loading = ref<boolean>(true);
const query = useRouter().currentRoute.value.query;
const action = ref<string>(props.isDialog ? props.act : String(query.act));
const id = ref<number>(props.isDialog ? props.id : Number(query.id));
const operation = action.value === "add" ? "insert" : "update";
const formRef = shallowRef();
const formState = ref<ArticleFormState>({});

onMounted(() => {
    // 获取详情数据
    fetchArticle();
});
const fetchArticle = async () => {
    try {
        loading.value = true;
        const result = await getArticle(action.value, { id: id.value });
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
    try {
        await formRef.value.validate();
        emit("update:confirmLoading", true);
        const result = await updateArticle(operation, { id: id.value, ...formState.value });
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
