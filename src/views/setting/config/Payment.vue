<template>
    <div class="container">
        <div class="content_wrapper">
            <el-tabs v-model="activeKey" class="lyecs-tabs" tab-position="top" @tab-change="onTabChange">
                <el-tab-pane :key="1" label="基础设置" name="base"></el-tab-pane>
                <el-tab-pane :key="2" label="微信支付" name="wechat"></el-tab-pane>
                <el-tab-pane :key="3" label="支付宝" name="alipay"></el-tab-pane>
                <el-tab-pane :key="5" label="线下支付" name="offline"></el-tab-pane>
            </el-tabs>
            <a-spin :spinning="loading">
                <el-form ref="formRef" :model="formState" label-width="160px">
                    <div v-show="activeKey === 'base'" class="content">
                        <el-form-item label="余额支付" prop="use_surplus">
                            <el-radio-group v-model="formState.use_surplus" class="itemWidth">
                                <el-radio :value="1">支持</el-radio>
                                <el-radio :value="0">不支持</el-radio>
                            </el-radio-group>
                            <div class="extra">订单结算页面是否支持余额支付功能，不支持则不显示</div>
                        </el-form-item>
                        <el-form-item label="货到付款" prop="use_cod">
                            <el-radio-group v-model="formState.use_cod" class="itemWidth">
                                <el-radio :value="1">支持</el-radio>
                                <el-radio :value="0">不支持</el-radio>
                            </el-radio-group>
                            <div class="extra">订单结算页面支付方式是否支持货到付款功能，不支持则不显示</div>
                        </el-form-item>
                        <el-form-item label="积分抵扣" prop="use_points">
                            <el-radio-group v-model="formState.use_points" class="itemWidth">
                                <el-radio :value="1">支持</el-radio>
                                <el-radio :value="0">不支持</el-radio>
                            </el-radio-group>
                            <div class="extra">订单结算页面是否支持积分抵扣功能，不支持则不显示</div>
                        </el-form-item>
                        <el-form-item label="优惠券" prop="use_coupon">
                            <el-radio-group v-model="formState.use_coupon" class="itemWidth">
                                <el-radio :value="1">支持</el-radio>
                                <el-radio :value="0">不支持</el-radio>
                            </el-radio-group>
                            <div class="extra">订单结算页面是否支持优惠券功能，不支持则不显示</div>
                        </el-form-item>
                    </div>
                    <div v-show="activeKey === 'wechat'" class="content">
                        <el-form-item label="是否开启" prop="use_wechat">
                            <el-radio-group v-model="formState.use_wechat" class="itemWidth">
                                <el-radio :value="1">开启</el-radio>
                                <el-radio :value="0">关闭</el-radio>
                            </el-radio-group>
                            <div class="extra">是否开启微信支付，如关闭则不显示微信支付选项</div>
                        </el-form-item>
                        <div v-show="formState.use_wechat === 1">
                            <el-form-item label="微信商户类型" prop="wechat_mchid_type">
                                <el-radio-group v-model="formState.wechat_mchid_type" class="itemWidth">
                                    <el-radio :value="1">普通商户模式</el-radio>
                                    <el-radio :value="2">服务商模式</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="微信商户号" prop="wechat_pay_mchid">
                                <el-input v-model="formState.wechat_pay_mchid" />
                            </el-form-item>
                            <el-form-item label="微信子商户号" prop="wechat_pay_sub_mchid" v-if="formState.wechat_mchid_type === 2">
                                <el-input v-model="formState.wechat_pay_sub_mchid" />
                                <div class="extra">请填写由服务商提供的子商户号</div>
                            </el-form-item>
                            <el-form-item label="商户API密钥" prop="wechat_pay_key">
                                <el-input v-model="formState.wechat_pay_key" />
                                <div class="extra">请使用APIv3密钥</div>
                            </el-form-item>
                          <el-form-item label="商户证书序列号" prop="wechat_pay_serial_no">
                            <el-input v-model="formState.wechat_pay_serial_no" />
                            <div class="extra">请使用API证书序列号</div>
                          </el-form-item>
                          <el-form-item label="商户API证书" prop="wechat_pay_certificate">
                              <div style="width: 100%">
                                  <Upload
                                      name="file"
                                      :action="requestUrl.prefix + '/setting/config/upload_file?type=1'"
                                      :headers="requestUrl.headers"
                                      @change="handleChange"
                                      :showUploadList="false"
                                      :multiple="true">
                                      <el-button>{{formState.wechat_pay_certificate ? '点击上传' : '点击修改'}}</el-button>
                                      <span class="ml10">apiclient_key.pem</span>
                                  </Upload>
                              </div>
                              <div class="extra">调用微信商户接口时需要用到的API证书，文件名称一般为apiclient_cert.pem，具体操作请参考教程</div>
                          </el-form-item>
                          <el-form-item label="商户API证书密钥" prop="wechat_pay_private_key">
                            <div style="width: 100%">
                              <Upload
                                  name="file"
                                  :action="requestUrl.prefix + '/setting/config/upload_file?type=2'"
                                  :headers="requestUrl.headers"
                                  @change="handleChange"
                                  :showUploadList="false"
                                  :multiple="true">
                                <el-button>{{formState.wechat_pay_private_key ? '点击上传' : '点击修改'}}</el-button>
                                <span class="ml10">apiclient_key.pem</span>
                              </Upload>
                            </div>
                            <div class="extra">调用微信商户接口时需要用到的API证书密钥，文件名称一般为apiclient_key.pem，具体操作请参考教程</div>
                          </el-form-item>
                          <el-form-item label="平台证书" prop="">
                            <el-button :loading="confirmLoading" class="form-submit-btn" type="success" @click="getPlatformCertificate">生成证书</el-button>
                          </el-form-item>
                        </div>
                    </div>
                    <div v-show="activeKey === 'alipay'" class="content">
                      <el-form-item label="是否开启" prop="use_alipay">
                        <el-radio-group v-model="formState.use_alipay" class="itemWidth">
                          <el-radio :value="1">开启</el-radio>
                          <el-radio :value="0">关闭</el-radio>
                        </el-radio-group>
                        <div class="extra">是否开启支付宝支付，如关闭则不显示支付宝支付选项</div>
                      </el-form-item>
                      <el-form-item label="支付宝APPID" prop="alipay_appid">
                        <el-input v-model="formState.alipay_appid" />
                      </el-form-item>
                      <el-form-item label="应用私钥" prop="alipay_rsa_private_key">
                        <el-input type="textarea" v-model="formState.alipay_rsa_private_key" :rows="10" />
                      </el-form-item>
                      <el-form-item label="支付宝公钥" prop="alipay_rsa_public_key">
                        <el-input type="textarea" v-model="formState.alipay_rsa_public_key" :rows="5" />
                      </el-form-item>
                    </div>

                    <div v-show="activeKey === 'offline'" class="content">
                      <el-form-item label="是否开启" prop="use_offline">
                        <el-radio-group v-model="formState.use_offline" class="itemWidth">
                          <el-radio :value="1">开启</el-radio>
                          <el-radio :value="0">关闭</el-radio>
                        </el-radio-group>
                        <div class="extra">是否开启线下支付，如关闭则不显示线下支付选项</div>
                      </el-form-item>
                      <el-form-item label="汇款说明">
                        <el-tabs type="border-card" v-model="activeName">
                            <el-tab-pane label="银行汇款" :name="1">
                                <Editor v-model:html="formState.offline_pay_bank"></Editor>
                            </el-tab-pane>
                            <el-tab-pane label="企业汇款" :name="2">
                                <Editor v-model:html="formState.offline_pay_company"></Editor>
                            </el-tab-pane>
                        </el-tabs>
                      </el-form-item>
                    </div>
                </el-form>
                <div style="height: 20px"></div>
                <div class="selected-action-warp">
                    <div class="selected-action" style="padding-left: 80px">
                        <el-button :loading="confirmLoading" class="form-submit-btn" size="large" type="primary" @click="onSubmit">提 交</el-button>
                    </div>
                </div>
            </a-spin>
        </div>
    </div>
</template>

<script lang="ts" setup>
import "@/style/css/list.less";
import { onMounted, ref, shallowRef } from "vue";
import {Editor} from "@/components/editor/index"
import { FormAddGallery } from "@/components/gallery";
import { InputTag } from "@/components/form";
import { SelectRegion } from "@/components/select";
import { message, Upload } from "ant-design-vue";
import type { PaymentFormState, Regions } from "@/types/setting/config";
import request, { requestUrl } from "@/utils/request";
import { getConfig, saveConfig, createPlatformCertificate } from "@/api/setting/config";
import { Tickets } from "@element-plus/icons-vue";

const formRef = shallowRef();
// 基本参数定义
const activeKey = ref<string>("base");
const activeName = ref<number>(1)
const confirmLoading = ref<boolean>(false);
const formState = ref<PaymentFormState>({
    use_wechat: 1,
    use_alipay: 1,
    use_surplus: 1,
    use_offline: 1,
    wechat_pay_key: "",
    wechat_mchid_type: 1,
});
const onTabChange = (val: string) => {
    activeKey.value = val;
};
const countryList = ref<Regions[]>([]);
// 加载列表
onMounted(async () => {
    loadFilter();
});
const loading = ref<boolean>(true);
const getPlatformCertificate = async () => {
    try {
        const result = await createPlatformCertificate();
        message.success(result.message);
        loadFilter();
    } catch (error: any) {
        message.error(error.message);
    } finally {
        loading.value = false;
    }
}
const loadFilter = async () => {
    try {
        const result = await getConfig({
            code: "payment",
        });
        Object.assign(formState.value, result.item);
        countryList.value = result.countrys;
    } catch (error: any) {
        message.error(error.message);
    } finally {
        loading.value = false;
    }
};
// 表单通过验证后提交
const onSubmit = async () => {
    confirmLoading.value = true;
    try {
        const result = await saveConfig({
            code: "payment",
            ...formState.value,
        });
        message.success(result.message);
    } catch (error: any) {
        message.error(error.message);
    } finally {
        confirmLoading.value = false;
    }
};
const handleChange = (info: any) => {
    if (info.file.status == "uploading") {
    }
    if (info.file.status !== "uploading") {
    }
    if (info.file.status === "done") {
        // 上传完成
        if (info.file.response.data.errcode !== 0) {
            info.file.status = "error";
            message.error(info.file.response.data.message);
        } else {
            for (let index in info.fileList) {
                if (info.file.uid == info.fileList[index].uid) {
                    info.fileList[index] = Object.assign(info.fileList[index], info.fileList[index].response.data);
                }
            }
            message.success("文件上传成功！");
        }
    } else if (info.file.status === "error") {
        message.error(`${info.file.name} 文件上传失败！`);
    }
    // uploadPicList.value = info.fileList
};
</script>
<style lang="less" scoped>
.content {
    padding: 10px;

    .title {
        font-weight: bold;
        padding-top: 20px;
        padding-bottom: 20px;
        font-size: 14px;
    }

    .subtitle {
        color: #999;
        font-weight: normal;
        font-size: 12px;
    }
}

.mr8 {
    margin-right: 8px;
}

.width60 {
    width: 60px;
}

.ml8 {
    margin-left: 8px;
}
</style>
<style>
.itemWidth {
    width: 100%;
}
</style>
