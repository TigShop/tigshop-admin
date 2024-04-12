<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-form-table">

                <div class="notice-warp">
                    <p> 提示：推荐使用QQ的域名邮箱（免费），设置流程请看LYECS教程，另外请确保服务器防火墙未拦截邮箱发送，且对应的端口开放。</p>
                </div>
                <a-spin :spinning="loading" style="width:100%;margin-top:100px">
                    <el-form ref="formRef" :model="formState" label-width="auto">
                        <el-form-item label="邮件服务" prop="mail_service">
                            <el-radio-group v-model="formState.mail_service" class="itemWidth">
                                <el-radio :value="0">本地邮件服务器</el-radio>
                                <el-radio :value="1">SMTP服务</el-radio>
                            </el-radio-group>
                            <div class="extra">如果您选择了采用服务器内置的 Mail 服务，您不需要填写下面的内容。</div>
                        </el-form-item>
                        <el-form-item label="是否加密连接(SSL)" prop="smtp_ssl">
                            <el-radio-group v-model="formState.smtp_ssl" class="itemWidth">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                            <div class="extra">SMTP一般要求加密</div>
                        </el-form-item>
                        <el-form-item label="发送邮件服务器地址(SMTP)" prop="smtp_host">
                            <el-input v-model="formState.smtp_host" type="text"/>
                            <div class="extra">邮件服务器主机地址。如果本机可以发送邮件则设置为localhost</div>
                        </el-form-item>
                        <el-form-item label="服务器端口" prop="smtp_port">
                            <el-input v-model="formState.smtp_port" type="text"/>
                        </el-form-item>
                        <el-form-item label="邮件发送帐号" prop="smtp_user">
                            <el-input v-model="formState.smtp_user" type="text"/>
                            <div class="extra">发送邮件所需的认证帐号，如果没有就为空着</div>
                        </el-form-item>
                        <el-form-item label="帐号密码" prop="smtp_pass">
                            <el-input v-model="formState.smtp_pass" type="password"/>
                        </el-form-item>
                        <el-form-item label="邮件回复地址" prop="smtp_mail">
                            <el-input v-model="formState.smtp_mail" type="text"/>
                        </el-form-item>
                        <el-form-item label="邮件编码" prop="mail_charset">
                            <el-radio-group v-model="formState.mail_charset">
                                <el-radio label="UTF8">国际编码(UTF8)</el-radio>
                                <el-radio label="GB2312">简体中文(GB2312)</el-radio>
                                <el-radio label="BIG5">繁体中文(BIG5)</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="测试邮件地址" prop="test_mail_address">
                            <el-input v-model="formState.test_mail_address" type="text">
                                <template #append>
                                    <el-button :loading="confirmLoading" @click="onSendTestEmail">发送测试邮件
                                    </el-button>
                                </template>
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <div class="selected-action-warp">
                        <div class="selected-action" style="padding-left: 80px;">
                            <a-button :loading="confirmLoading" class="form-submit-btn" size="large" type="primary" @click="onSubmit">提 交</a-button>
                        </div>
                    </div>
                </a-spin>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import '@/style/css/list.less'
import {onMounted, ref, shallowRef} from "vue"
import {message} from "ant-design-vue";
import type {MailFormState} from '@/types/setting/mail.d';
import {getMail, saveMail, sendTestEmail} from "@/api/setting/mail";

// 父组件回调
const emit = defineEmits(["submitCallback", "update:confirmLoading", "close"]);
const confirmLoading = ref(false);

const loading = ref<boolean>(true);
const formRef = shallowRef();
const formState = ref<MailFormState>({});
const loadFilter = async () => {
    try {
        const result = await getMail({
            code: 'mail_server'
        });
        Object.assign(
          formState.value,
          result.item
        )
    } catch (error:any) {
        message.error(error.message);
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    // 获取详情数据
    loadFilter();
});

const onSendTestEmail = async () => {
    confirmLoading.value = true;
    try {
        const result = await sendTestEmail({
            code: 'mail_server',
            test_mail_address: formState.value.test_mail_address
        });
        message.success(result.message);
    } catch (error:any) {
        message.error(error.message);
    } finally {
        confirmLoading.value = false;
    }
}

// 表单通过验证后提交
const onSubmit = async () => {
    confirmLoading.value = true;
    try {
        const result = await saveMail({
            code: 'mail_server',
            ...formState.value
        });
        message.success(result.message);
    } catch (error:any) {
        message.error(error.message);
    } finally {
        confirmLoading.value = false;
    }
};
// 表单提交
const onFormSubmit = () => {
    onSubmit()
};

defineExpose({onFormSubmit});
</script>
<style lang="less" scoped>
.itemWidth {
    width: 100%;
}

.notice-warp {
    background-color: #eef2ff;
    border-radius: 9px;
    padding: 15px;
    margin-bottom: 20px;
    line-height: 24px;
}
</style>
