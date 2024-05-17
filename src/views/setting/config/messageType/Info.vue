<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-form-table">
                <el-tabs v-model="activeKey" class="lyecs-tabs" tab-position="top" @tab-change="onTabChange">
                    <template v-for="item in tabs">
                        <el-tab-pane v-if="(formState as any)[item.prop] > -1" :label="item.label" :name="item.label"></el-tab-pane>
                    </template>

                    <!--                    <el-tab-pane v-if="formState.is_message>-1" label="站内信" name="站内信"></el-tab-pane>-->
                    <!--                    <el-tab-pane v-if="formState.is_msg>-1" label="短信通知" name="短信通知"></el-tab-pane>-->
                    <!--                    <el-tab-pane v-if="formState.is_wechat>-1" label="微信模板消息" name="微信模板消息"></el-tab-pane>-->
                    <!--                    <el-tab-pane v-if="formState.is_mini_program>-1" label="小程序订阅消息" name="小程序订阅消息"></el-tab-pane>-->
                    <!--                    <el-tab-pane v-if="formState.is_app>-1" label="APP" name="APP"></el-tab-pane>-->
                    <!--                    <el-tab-pane v-if="formState.is_ding>-1" label="钉钉" name="钉钉"></el-tab-pane>-->
                </el-tabs>
                <el-form v-if="!loading" ref="formRef" :model="formState" label-width="auto">
                    <div v-if="activeKey==='站内信'">
                        <el-form-item label="通知标题" prop="template_name">
                            <el-input v-model="formState.template_message.message_data.template_name"/>
                        </el-form-item>
                        <el-form-item label="通知内容" prop="content">
                            <div class="tznr">
                                <el-input v-model="formState.template_message.message_data.content" :autosize="{ minRows: 9, maxRows: 60 }" class="fl1" type="textarea"/>
                                <div class="fl1 right-div">
                                    <p>请输入模板消息详细内容对应的变量，关键字个数需与添加的模板一致。可以使用如下变量：</p>
                                    <template v-if="formState.template_message.message_data.message_id!=4">
                                        <p>{order_sn}订单编号</p>
                                        <p>{pay_price}支付金额</p>
                                        <p>{shipping_name}物流公司</p>
                                        <p>{shipping_code}物流单号</p>
                                    </template>
                                    <template v-else>
                                        <p> {goods_name}商品名称</p>
                                    </template>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="是否开启" prop="is_message">
                            <el-radio-group v-model="formState.is_message">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <div v-if="activeKey==='短信通知'">
                        <el-form-item label="短信模板ID" prop="template_id">
                            <el-input v-model="formState.template_message.msg_data.template_id"/>
                        </el-form-item>
                        <el-form-item label="通知内容" prop="content">
                            <el-input v-model="formState.template_message.msg_data.content" :autosize="{ minRows: 9, maxRows: 60 }" class="fl1" disabled type="textarea"/>
                        </el-form-item>
                        <el-form-item label="是否开启" prop="is_msg">
                            <el-radio-group v-model="formState.is_msg">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <div v-if="activeKey==='微信模板消息'">
                        <el-form-item label="通知标题" prop="template_name">
                            <el-input v-model="formState.template_message.wechat_data.template_name" disabled/>
                        </el-form-item>
                        <el-form-item label="模板编号" prop="template_num">
                            <el-input v-model="formState.template_message.wechat_data.template_num" disabled/>
                        </el-form-item>
                        <el-form-item label="模板ID" prop="template_id">
                            <el-input v-model="formState.template_message.wechat_data.template_id"/>
                        </el-form-item>
                        <el-form-item label="模板" prop="content">
                            <el-input v-model="formState.template_message.wechat_data.content" :autosize="{ minRows: 9, maxRows: 60 }" class="fl1" disabled type="textarea"/>
                        </el-form-item>
                        <el-form-item label="是否开启" prop="is_wechat">
                            <el-radio-group v-model="formState.is_wechat">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <div v-if="activeKey==='小程序订阅消息'">
                        <el-form-item label="通知标题" prop="template_name">
                            <el-input v-model="formState.template_message.mini_program_data.template_name" disabled/>
                        </el-form-item>
                        <el-form-item label="模板编号" prop="template_num">
                            <el-input v-model="formState.template_message.mini_program_data.template_num" disabled/>
                        </el-form-item>
                        <el-form-item label="模板ID" prop="template_id">
                            <el-input v-model="formState.template_message.mini_program_data.template_id"/>
                        </el-form-item>
                        <el-form-item label="模板" prop="content">
                            <el-input v-model="formState.template_message.mini_program_data.content" :autosize="{ minRows: 9, maxRows: 60 }" class="fl1" disabled type="textarea"/>
                        </el-form-item>
                        <el-form-item label="是否开启" prop="is_mini_program">
                            <el-radio-group v-model="formState.is_mini_program">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <div v-if="activeKey==='APP'">
                        <el-form-item label="通知标题" prop="template_name">
                            <el-input v-model="formState.template_message.app_data.template_name"/>
                        </el-form-item>
                        <el-form-item label="通知内容" prop="content">
                            <el-input v-model="formState.template_message.app_data.content" :autosize="{ minRows: 9, maxRows: 60 }" class="fl1" type="textarea"/>
                        </el-form-item>
                        <el-form-item label="是否开启" prop="is_app">
                            <el-radio-group v-model="formState.is_app">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <div v-if="activeKey==='钉钉'">
                        <el-form-item label="选择钉钉成员" prop="template_name">
                            <el-input v-model="formState.template_message.ding_data.template_name"/>
                        </el-form-item>
                        <el-form-item label="通知内容" prop="content">
                            <el-input v-model="formState.template_message.ding_data.content" :autosize="{ minRows: 9, maxRows: 60 }" class="fl1" type="textarea"/>
                        </el-form-item>
                        <el-form-item label="是否开启" prop="is_app">
                            <el-radio-group v-model="formState.is_ding">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
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
import type {MessageTypeFormState} from '@/types/setting/messageType.d';
import {getMessageType, updateMessageType} from "@/api/setting/messageType";
import { AnyCnameRecord } from "dns";
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
const operation = action.value === 'add' ? 'create' : 'update';
const formRef = shallowRef();
const formState = ref<MessageTypeFormState>({
    template_message: {
        wechat_data: {},
        app_data: {},
        ding_data: {},
        message_data: {},
        mini_program_data: {},
        msg_data: {},
    }
});
const activeKey = ref<string>('站内信')
const onTabChange = (val: number) => {
    console.log(val);
}
let tabs = ref([
    {prop: 'is_message', label: '站内信'},
    {prop: 'is_msg', label: '短信通知'},
    {prop: 'is_wechat', label: '微信模板消息'},
    {prop: 'is_mini_program', label: '小程序订阅消息'},
    // {prop: 'is_app', label: 'APP'},
    // {prop: 'is_ding', label: '钉钉'},
]);
const fetchMessageType = async () => {
    try {
        const result = await getMessageType(action.value, {id: id.value});
        Object.assign(
          formState.value,
          result.item
        )
        for (const item of tabs.value) {
            const propValue = (formState.value as any)[item.prop];
            if (typeof propValue === "number" && propValue > -1) {
                activeKey.value = item.label;
                break;
            }
        }

    } catch (error:any) {
        message.error(error.message);
        emit('close');
    } finally {
        loading.value = false;
    }
};


onMounted(() => {
    if (action.value === "detail") {
        // 获取详情数据
        fetchMessageType();
    } else {
        loading.value = false;
    }
});

// 表单通过验证后提交
const onSubmit = async () => {
    try {
        await formRef.value.validate();
        emit('update:confirmLoading', true);
        const result = await updateMessageType(operation, {id: id.value, ...formState.value});
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
.tznr {
    display: flex;
    flex-direction: row;

    width: 100%;

    .fl1 {
        flex: 1;
    }

    .right-div {
        margin-left: 20px;
        background-color: #f2f2f2;
        padding: 10px;
        border-radius: 3px;
        color: #999999;
        line-height: 2;
    }
}

</style>
