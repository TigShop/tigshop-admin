<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-form-table">
                <el-form v-if="!loading" ref="formRef" :model="formState" label-width="auto">
                    <el-form-item :rules="[{ required: true, message: '标题不能为空!' }]" label="标题" prop="message_title">
                        <el-input v-model="formState.message_title"/>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true, message: '内容不能为空!' }]" label="内容" prop="message_content">
                        <el-input v-model="formState.message_content" row="2" type="textarea"/>
                    </el-form-item>
                    <el-form-item label="链接" prop="is_show">
                        <SelectLink v-model="formState.message_link"></SelectLink>
                    </el-form-item>
                    <el-form-item label="发送类型" prop="brand_is_hot">
                        <el-select v-model="formState.send_user_type" style="width: 100%;margin-bottom: 20px">
                            <el-option :value="0" label="全部会员"/>
                            <el-option :value="1" label="单个会员"/>
                            <el-option :value="2" label="会员等级"/>
                            <el-option :value="3" label="部分会员"/>
                        </el-select>
                        <template v-if="formState.send_user_type===1">
                            <SelectUser v-model="formState.user_ids"></SelectUser>
                        </template>
                        <template v-else-if="formState.send_user_type===2">
                            <SelectRankList v-model="formState.user_rank"></SelectRankList>
                        </template>
                        <template v-else-if="formState.send_user_type===3">
                            <el-input v-model="formState.user_ids" row="2" type="textarea"/>
                            <div class="extra">注意：输入会员名称时，请用英文逗号隔开。</div>
                        </template>
                        <template v-else>

                        </template>
                    </el-form-item>
                    <el-form-item v-show="!props.isDialog" :wrapper-col="{ offset: 4, span: 16 }">
                        <el-button ref="submitBtn" class="form-submit-btn" type="primary" @click="onSubmit">提交</el-button>
                    </el-form-item>
                </el-form>
                <a-spin :spinning="loading" style="width:100%;margin-top:100px"/>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {onMounted, ref, shallowRef} from "vue"
import {useRouter} from 'vue-router'
import {message} from "ant-design-vue";
import type {MessageLogFormState} from '@/types/user/messageLog.d';
import {getMessageLog, updateMessageLog} from "@/api/user/messageLog";
import {SelectLink, SelectRankList, SelectUser} from "@/components/select";
// 父组件回调
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
const operation = action.value === 'add' ? 'insert' : 'update';
const formRef = shallowRef();
const formState = ref<MessageLogFormState>({});
const fetchMessageLog = async () => {
    try {
        const result = await getMessageLog(action.value, {id: id.value});
        Object.assign(
          formState.value,
          result.item
        )
    } catch (error: any) {
        message.error(error.message);
        emit('close');
    } finally {
        loading.value = false;
    }
};


onMounted(() => {
    // 获取详情数据
    fetchMessageLog();
});

// 表单通过验证后提交
const onSubmit = async () => {
    try {
        await formRef.value.validate();
        emit('update:confirmLoading', true);
        const result = await updateMessageLog(operation, {id: id.value, ...formState.value});
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
