<template>
    <div class="container">
        <div class="content_wrapper decoratePgaeWrap">
            <div class="flex box-wrapper">
                <div class="tab-box">
                    <div class="flex">
                        <div class="decorateWrap">
                            <div class="decorate-page-window" style="background-position: center top; height: 700px; margin-top: 10px">
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
                                                <div class="bottom-nav-item" v-for="(item, index) in module.pic_list">
                                                    <div class="item-content">
                                                        <a class="item-img-a">
                                                            <img class="item-img" :src="imageFormat(item.pic_url)" v-if="item.pic_url" />
                                                        </a>
                                                        <a class="item-text-a">
                                                            <span class="item-text">{{ item.pic_title }}</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="right-box-warp" style="width: 510px">
                            <div class="dec-spread-title">
                                <div class="title">底部导航设置</div>
                            </div>
                            <a-spin :spinning="loading">
                                <div class="dec-edit-group dec-edit-group-block">
                                    <div class="dec-edit-group-title">
                                        <div class="title">添加图片</div>
                                    </div>
                                    <div class="dec-edit-group-con">
                                        <NavPicList :isMultiple="true" v-model:photos="module.pic_list"></NavPicList>
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
import { NavPicList, PicSelect } from "@/components/decorate";
import { SelectColor } from "@/components/select";
import { getDecorateDiscrete, updateDecorateDiscrete } from "@/api/decorate/decorateDiscrete";
import { DecorateDiscreteFormState } from "@/types/decorate/decorateDiscrete.d";
import { message } from "ant-design-vue";
import { imageFormat } from "@/utils/format";

const type = ref("mobile_nav");
const loading = ref(true);
const confirmLoading = ref(false);
const module = ref<DecorateDiscreteFormState>({
    pic_list: [{}, {}, {}],
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
