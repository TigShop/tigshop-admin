<template>
    <div class="container">
        <div class="content_wrapper decoratePgaeWrap">
            <div class="flex box-wrapper">
                <div class="tab-box" v-if="type == 'pc_user_login'">
                    <div class="flex">
                        <div class="decorateWrap">
                            <div class="decorate-page-window" style="background-position: center top; height: 600px; margin-top: 10px">
                                <div class="theme-modules-warp">
                                    <div class="list-item modules-item modules-item-topbar" draggable="false">
                                        <div class="module-ad-con module-topbar-warp">
                                            <div class="module-topbar-con">
                                                <div class="module-topbar-title-con"><div class="title-item" style="">页面标题</div></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="list-item modules-item modules-item-bottom_nav module-item-active">
                                        <div class="module-ad-con">
                                            <div class="bottom-nav-con">
                                                <div class="bottom-nav-item">
                                                    <div class="item-content">
                                                        <a class="item-img-a">
                                                            <img
                                                                class="item-img"
                                                                src="https://demo2.lyecs.com/img/gallery/demo/1680247587QG2y44h7a7f0M1dx9T!!pic.png" />
                                                        </a>
                                                        <a class="item-text-a">
                                                            <span class="item-text">首页</span>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="bottom-nav-item">
                                                    <div class="item-content">
                                                        <a class="item-img-a">
                                                            <img
                                                                class="item-img"
                                                                src="https://demo2.lyecs.com/img/gallery/demo/1680247587QG2y44h7a7f0M1dx9T!!pic.png" />
                                                        </a>
                                                        <a class="item-text-a">
                                                            <span class="item-text">首页</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="right-box-warp">
                            <div class="dec-spread-title">
                                <div class="title">底部导航设置</div>
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
<style lang="less" scoped>
.modules-item-bottom_nav {
    background: #fff;
}
.modules-item-bottom_nav .bottom-nav-con {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    text-align: center;
}
.modules-item-bottom_nav .bottom-nav-item {
    flex: 1;
}
.modules-item-bottom_nav .item-content .item-img-a {
    display: block;
}
.modules-item-bottom_nav .item-content .item-text-a {
    color: #222;
    margin-top: 3px;
    display: block;
}
.modules-item-bottom_nav .item-content .item-img-a img {
    width: 25px;
    height: 25px;
}
.bottom-nav-con {
    background: #fff;
    height: 54px;
    padding: 5px 0;
    box-sizing: border-box;
}
</style>
