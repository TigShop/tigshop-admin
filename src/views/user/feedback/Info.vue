<template>
    <div class="container">
        <div class="lyecs-form-table">
            <h2>
                <span>类型:{{ formData.type_name }} </span>
                <span v-if="formData.product_id">【 {{ formData.product.product_name }} 】</span>
            </h2>
        </div>
        <el-divider />
        <div class="lyecs-form-table">
            <!-- <p>原因: </p> -->
            <p>内容: {{ formData.content }}</p>
            <p style="text-align: end;">【 留言板 】{{ formData.username }} @ {{ formData.add_time }}</p>
        </div>
        <el-divider />
        <div class="content_wrapper">
            <div class="lyecs-form-table">
                <el-form v-if="!loading" ref="formRef" :model="formState" label-width="auto">
                    <el-form-item label="会员名称" prop="username">
                        <el-input v-model="formState.username"/>
                    </el-form-item>
                    <el-form-item label="联系方式" prop="mobile">
                        <el-input v-model="formState.mobile"/>
                    </el-form-item>
                    <el-form-item label="回复内容" prop="content">
                        <el-input type="textarea" :rows="5" v-model="formState.content"/>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {onMounted, ref, shallowRef} from "vue"
import {useRouter} from 'vue-router'
import {message} from "ant-design-vue";
import {FeedbackFormState} from '@/types/user/feedback';
import {getFeedback, updateFeedback} from "@/api/user/feedback";
// 父组件回调
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
const loading = ref<boolean>(true);
const query = useRouter().currentRoute.value.query;
const action = ref<string>(props.isDialog ? props.act : String(query.act));
const id = ref<number>(props.isDialog ? props.id : Number(query.id));
const operation = action.value === 'add' ? 'insert' : 'update';
const formRef = shallowRef();
const formData = ref<FeedbackFormState>({
    product:{
        product_id: 0,
        product_name: ''
    }
});
const formState = ref<FeedbackFormState>({
    product:{
        product_id: 0,
        product_name: ''
    }
});
const fetchUserRank = async () => {
    try {
        const result = await getFeedback(action.value, {id: id.value});
        console.log(result.item)
        Object.assign(
          formData.value,
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
    fetchUserRank();
});
// 表单通过验证后提交
const onSubmit = async () => {
    try {
        await formRef.value.validate();
        emit('update:confirmLoading', true);
        let parent_id:any = 0;
        if(formData.value.status == 1){
            parent_id = formData.value.id
        }
        const result = await updateFeedback(operation, {id: id.value,parent_id:parent_id, ...formState.value});
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
.lyecs-form-table{
    h2{
        line-height: 30px;
    }
    p{
        line-height: 20px;
    }
}
</style>
