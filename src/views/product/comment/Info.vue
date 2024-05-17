<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-form-table">
                <el-form v-if="!loading" ref="formRef" :model="formState" label-width="auto">
                    <el-form-item label="评论商品" prop="product_ids">
                        <SelectProduct :isMultiple="false" v-if="!loading" v-model:ids="formState.product_ids">
                        </SelectProduct>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true, message: '会员名称不能为空!' }]" label="会员名称" prop="username">
                        <el-input v-model="formState.username" />
                    </el-form-item>
                    <el-form-item label="会员头像" prop="avatar">
                        <FormAddGallery v-model:photo="formState.avatar"></FormAddGallery>
                        <div class="extra">请统一上传比例为1:1的图片，宽100px，高100px（高清））</div>
                    </el-form-item>
                    <el-form-item label="评论星级" prop="comment_rank">
                        <el-radio-group v-model="formState.comment_rank">
                            <el-radio :value="1">一星</el-radio>
                            <el-radio :value="2">二星</el-radio>
                            <el-radio :value="3">三星</el-radio>
                            <el-radio :value="4">四星</el-radio>
                            <el-radio :value="5">五星</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="标签" prop="comment_tag">
                        <div class="flex flex-wrap">
                            <el-tag
                            style="margin: 5px;"
                            v-for="tag in formState.comment_tag"
                            :key="tag"
                            closable
                            :disable-transitions="false"
                            @close="handleClose(tag)"
                            >
                            {{ tag }}
                            </el-tag>
                            <el-input
                            style="margin: 5px;"
                            v-if="inputVisible"
                            ref="InputRef"
                            v-model="inputValue"
                            class="w-20"
                            size="small"
                            @keyup.enter="handleInputConfirm"
                            @blur="handleInputConfirm"
                            />
                            <el-button style="margin: 5px;" v-else class="button-new-tag" size="small" @click="showInput">
                                + 新增标签
                            </el-button>
                        </div>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true, message: '评论内容不能为空!' }]" label="评论内容" prop="content">
                        <el-input v-model="formState.content" type="textarea" />
                    </el-form-item>
                    <el-form-item label="评论日期" prop="add_time">
                        <el-date-picker v-model="formState.add_time" format="YYYY-MM-DD HH:mm:ss" placeholder="请选择日期"
                            type="datetime" value-format="YYYY-MM-DD HH:mm:ss" />
                    </el-form-item>
                    <el-form-item label="晒单" prop="show_pics">
                        <FormAddGallery v-if="!loading" v-model:photos="formState.show_pics" :isMultiple="true">
                        </FormAddGallery>
                    </el-form-item>
                    <el-form-item label="排序" prop="sort_order">
                        <el-input v-model="formState.sort_order" />
                    </el-form-item>
                    <el-form-item label="是否推荐" prop="is_recommend">
                        <el-radio-group v-model="formState.is_recommend">
                            <el-radio :value="1">是</el-radio>
                            <el-radio :value="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="是否置顶" prop="is_top">
                        <el-radio-group v-model="formState.is_top">
                            <el-radio :value="1">是</el-radio>
                            <el-radio :value="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item v-show="!props.isDialog" :wrapper-col="{ offset: 4, span: 16 }">
                        <el-button ref="submitBtn" class="form-submit-btn" type="primary" @click="onSubmit()">提交
                        </el-button>
                    </el-form-item>
                </el-form>
                <a-spin :spinning="loading" style="width:100%;margin-top:100px" />
            </div>
            <div class="container-card" v-if="action !== 'add'">
                <div class="title">
                    管理员回复 
                    <DialogForm :params="{ id: id }" isDrawer
                        path="product/comment/src/EditRemark" title="回复评论" width="600px" @okCallback="updateDataWithList">
                        <el-button bg class="buttonColor" size="small" text type="primary"> 回复评论 </el-button>
                    </DialogForm>
                </div>
                <div v-if="!formState.reply">
                    暂无回复！
                </div>
                <div v-else>
                    <p>内容：{{ formState.reply.content }}</p>
                    <p style="text-align: end;margin-top: 10px;">{{ formState.reply.username }}@{{ formState.reply.add_time }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {DialogForm} from '@/components/dialog'
import { onMounted, ref, shallowRef, nextTick } from "vue"
import { useRouter } from 'vue-router'
import { message } from "ant-design-vue";
import { FormAddGallery } from '@/components/gallery'
import { CommentFormState } from '@/types/product/comment';
import { getComment, updateComment } from "@/api/product/comment";
import { SelectProduct } from "@/components/select";
import { ElInput } from 'element-plus'

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
const formState = ref<CommentFormState>({
    comment_rank: 5,
    is_recommend: 1,
    is_top: 0,
    sort_order: 50,
    product_ids: [],
    comment_tag: []
});

const inputValue = ref('')
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()

const handleClose = (tag: string) => {
    formState.value.comment_tag.splice(formState.value.comment_tag.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    formState.value.comment_tag.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
onMounted(() => {
    if (action.value === "detail") {
        // 获取详情数据
        fetchComment();
    } else {
        loading.value = false;
    }
});
const fetchComment = async () => {
    try {
        const result = await getComment(action.value, { id: id.value });
        console.log(result.item)
        let product_ids: number[] = []
        if (result.item.product_id) {
            product_ids = [result.item.product_id]
        }
        Object.assign(
            formState.value,
            result.item,
            { product_ids: product_ids }
        )
    } catch (error: any) {
        message.error(error.message);
        emit('close');
    } finally {
        loading.value = false;
    }
};
const updateDataWithList = () => {
    // 获取详情数据
    fetchComment();
};

// 表单通过验证后提交
const onSubmit = async () => {
    try {
        await formRef.value.validate();
        emit('update:confirmLoading', true);
        let product_id = 0
        if (formState.value.product_ids.length > 0) {
            product_id = formState.value.product_ids[0]
        }
        const result = await updateComment(operation, { id: id.value, ...formState.value, product_id: product_id });
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

defineExpose({ onFormSubmit });
</script>
<style scoped lang="less">
.container-card {
    border: 1px solid #ececec;
    box-shadow: 2px 2px 5px rgba(203, 193, 193, 0.2);
    border-radius: 2px;
    padding: 20px;
    background: #fff;
    margin-bottom: 20px;
    .title{
        font-family: bold;
        font-size: 16px;
        line-height: 25px;
        color: #323233;
        margin-bottom: 15px;
    }
}
</style>