<template>
    <div class="container">
        <div class="content_wrapper decoratePgaeWrap">
            <div class="flex box-wrapper">
                <div class="left-wrapper">
                    <div class="left-box tab-name">
                        <div :class="'left-cont tab-item ' + (type == 'pc_user_login' ? 'current' : '')">会员登录背景</div>
                    </div>
                </div>
                <div class="tab-box" v-if="type == 'pc_user_login'">
                    <div class="flex">
                        <div class="decorateWrap">
                            <div><img src="@/style/images/decorate/example/pc_user_bg.jpg" /></div>
                        </div>
                        <div class="right-box-warp">
                            <div class="dec-spread-title">
                                <div class="title">登录页广告设置</div>
                            </div>
                            <a-spin :spinning="loading">
                                <div class="dec-edit-group">
                                    <div class="dec-edit-group-desc">
                                        <div class="pic-change-desc">建议尺寸：高度不要超过580px，宽度可以1700px以内，请结合背景色设置</div>
                                    </div>
                                </div>
                                <div class="dec-edit-group">
                                    <div class="dec-edit-group-title">
                                        <div class="title">背景广告图</div>
                                    </div>
                                    <div class="dec-edit-group-con">
                                        <div class="dec-pic-group">
                                            <PicSelect v-model:photo="module.background_pic"></PicSelect>
                                        </div>
                                    </div>
                                </div>
                                <div class="dec-divider-line"></div>
                                <div class="dec-edit-group">
                                    <div class="dec-edit-group-title">
                                        <div class="title">背景色</div>
                                        <div class="value"></div>
                                    </div>
                                    <div class="dec-edit-group-con">
                                        <div class="dec-color-group">
                                            <div class="dec-color-button">
                                                <a class="dec-color-reset" @click="module.background_color = ''">重置</a>
                                                <SelectColor v-model:color="module.background_color"></SelectColor>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a-spin>
                            <div class="dec-edit-save">
                                <a-button :loading="confirmLoading" @click="onSubmit" type="primary" size="large" class="save-btn">保存</a-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import "@/views/decorate/decorate/src/css/decorate.less";
import { ref, shallowRef, onMounted } from "vue";
import { PicList, PicSelect } from "@/components/decorate";
import { SelectColor } from "@/components/select";
import { getDecorateDiscrete, updateDecorateDiscrete } from "@/api/decorate/decorateDiscrete";
import { DecorateDiscreteFormState } from "@/types/decorate/decorateDiscrete.d";
import { message } from "ant-design-vue";

const type = ref("pc_user_login");
const loading = ref(true);
const confirmLoading = ref(false);
const module = ref<DecorateDiscreteFormState>({
    background_color: "",
    background_pic: {
        pic_url: "",
        pic_thumb: "",
    },
});
// 表单通过验证后提交
onMounted(() => {
    // 获取详情数据
    fetchDecorateDiscrete();
});
const fetchDecorateDiscrete = async () => {
    try {
        const result = await getDecorateDiscrete({
            decorate_sn: type.value,
        });
        Object.assign(module.value, result.item.data);
    } catch (error: any) {
        message.error(error.message);
    } finally {
        loading.value = false;
    }
};
const onSubmit = async () => {
    try {
        confirmLoading.value = true;
        const result = await updateDecorateDiscrete({
            decorate_sn: type.value,
            data: module.value,
        });
        message.success(result.message);
    } catch (error: any) {
        message.error(error.message);
    } finally {
        confirmLoading.value = false;
    }
};
</script>
<style lang="less" scoped></style>
