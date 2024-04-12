<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-form-table">
                <a-spin :spinning="loading">
                    <div class="theme-style-info">
                        <div class="left">
                            <h3>主题配色</h3>
                            <div class="color-list">
                                <div
                                  v-for="item in ColorList"
                                  :style="{ border: item.check ? '1px solid #0080f9' : '1px solid transparent' }"
                                  class="color-card"
                                  @click="selectItem(item.theme_id)">
                                    <div :style="{ backgroundColor: item.color1 }"></div>
                                    <div :style="{ backgroundColor: item.color2 }"></div>
                                </div>
                            </div>
                            <a-button :loading="confirmLoading" class="form-submit-btn" type="primary" @click="onSubmit">保存</a-button>
                        </div>
                        <div class="right">
                            <h3>预览效果</h3>
                            <div class="example">
                                <div class="card info">
                                    <div class="info-item1">
                                        <p :style="{ color: formState.color1 }" class="text">¥299-599</p>
                                        <p :style="{ color: formState.color1, backgroundColor: formState.color3 }" class="bg-card">会员价</p>
                                    </div>
                                    <div class="info-item2">
                                        <div>
                                            <div :style="{ color: formState.color4, backgroundColor: formState.color2 }">加入购物车</div>
                                            <div :style="{ color: 'white', backgroundColor: formState.color1 }">立即购买</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card buy"></div>
                                <div class="card check"></div>
                            </div>
                        </div>
                    </div>
                </a-spin>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import "@/style/css/list.less";
import {onMounted, ref, shallowRef} from "vue";
import {message} from "ant-design-vue";
import type {ColorList, ThemeStyleFormState} from "@/types/decorate/themeStyle.d";
import {getConfig, updateConfig} from "@/api/setting/config";
// import {getThemeStyle, updateThemeStyle} from "@/api/decorate/themeStyle";
// 父组件回调
const emit = defineEmits(["submitCallback", "update:confirmLoading", "close"]);
const confirmLoading = ref(false);

const loading = ref<boolean>(true);
const formState = ref<ThemeStyleFormState>({
    theme_id: 0,
    color1: "",
    color2: "",
    color3: "",
    color4: "",
});
const ColorList = ref<ColorList[]>([
    {check: false, theme_id: 1, color1: "#4A90E2", color2: "#D6EAFC", color3: "#E5F2FF", color4: "#4A90E2"},
    {check: false, theme_id: 2, color1: "#FF4444", color2: "#FFCCCC", color3: "#FFF2F2", color4: "#FFFFFF"},
    {check: false, theme_id: 3, color1: "#FF5E15", color2: "#FF9302", color3: "#FFEDE6", color4: "#FFFFFF"},
    {check: false, theme_id: 4, color1: "#FF547B", color2: "#FFE6E9", color3: "#FFF2F5", color4: "#FF547B"},
    {check: false, theme_id: 5, color1: "#FF4444", color2: "#555555", color3: "#FFF2F2", color4: "#FFFFFF"},
    {check: false, theme_id: 6, color1: "#FCC600", color2: "#1D262E", color3: "#FFF4CD", color4: "#FFFFFF"},
    {check: false, theme_id: 7, color1: "#65C4AA", color2: "#D9F7EF", color3: "#F2FFFC", color4: "#65C4AA"},
    {check: false, theme_id: 8, color1: "#09BB07", color2: "#383838", color3: "#E6F8E6", color4: "#FFFFFF"},
    {check: false, theme_id: 9, color1: "#63BE72", color2: "#E2F4E3", color3: "#F0F8F0", color4: "#09BB07"},
    {check: false, theme_id: 10, color1: "#C3A769", color2: "#F3EEE1", color3: "#F9F6F0", color4: "#C3A769"},
    {check: false, theme_id: 11, color1: "#2F2F34", color2: "#EBECF2", color3: "#EAEAEA", color4: "#2F2F34"},
    {check: false, theme_id: 12, color1: "#884CFF", color2: "#EFE6FF", color3: "#F3EDFF", color4: "#884CFF"},
    {check: false, theme_id: 13, color1: "#EE0A24", color2: "#FF9518", color3: "#FDE6E9", color4: "#FFFFFF"},
]);
const selectItem = (theme_id: number) => {
    ColorList.value.forEach((item) => {
        // 如果当前项是被点击的项，则将其 check 设置为 true
        // 否则，将其他项的 check 设置为 false
        if (item.theme_id === theme_id) {
            item.check = true;
            formState.value.theme_id = item.theme_id;
            formState.value.color1 = item.color1;
            formState.value.color2 = item.color2;
            formState.value.color3 = item.color3;
            formState.value.color4 = item.color4;
        } else {
            item.check = false;
        }
    });
};

const loadFilter = async () => {
    try {
        const result = await getConfig({
            code: "theme_style",
        });
        Object.assign(formState.value, result.item);
        selectItem(Number(formState.value.theme_id))
    } catch (error: any) {
        message.error(error.message);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    // 获取详情数据
    loadFilter();
});

// 表单通过验证后提交
const onSubmit = async () => {
    try {
        emit('update:confirmLoading', true);
        const result = await updateConfig({code: "theme_style",data:{...formState.value}});
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
    onSubmit();
};

defineExpose({onFormSubmit});
</script>
<style lang="less" scoped>
.theme-style-info {
    display: flex;
    flex-direction: row;
    gap: 20px;

    .left {
        width: 30%;
        padding: 0 20px;
        box-sizing: border-box;
        border-right: 1px solid #e0e0e0;

        .form-submit-btn {
            margin-top: 50px;
            padding: 0 25px;
            height: 40px;
            font-size: 14px;
        }

        .color-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 10px;

            .color-card {
                display: flex;
                box-sizing: border-box;
                padding: 2px;
                cursor: pointer;

                & > div {
                    height: 24px;
                    width: 24px;
                    flex: 1;
                }
            }
        }
    }

    .right {
        flex: 1;
        padding: 0 20px;

        .example {
            margin-top: 10px;
            display: flex;
            flex-direction: row;
            gap: 10px;

            .bg-card {
                font-size: 8px;
                display: inline-block;
                height: 8px;
                padding: 2px;
                border-radius: 8px;
            }

            .card {
                width: 230px;
                height: 410px;
                border: 0.1px solid #e0e0e0;
                position: relative; /* 设置父容器为相对定位 */
            }

            .info {
                background-image: url("@/style/images/decorate/themeStyle/temp1.png");
                background-position: center center;
                background-size: cover;

                .info-item1 {
                    position: absolute;
                    left: 10px;
                    top: 300px;
                    display: flex;
                    flex-direction: row;
                    font-size: 14px;
                    font-weight: 500;
                    gap: 3px;
                    align-items: center;
                }

                .info-item2 {
                    position: absolute; /* 设置绝对定位，相对于最近的相对定位父容器 */
                    bottom: 4px;
                    right: 4px;
                    display: flex;
                    border-radius: 18px;
                    overflow: hidden;

                    & > div {
                        display: flex;

                        & > div {
                            padding: 8px 12px;
                            font-size: 8px;
                        }
                    }
                }
            }

            .buy {
                background: url("@/style/images/decorate/themeStyle/temp2.png");
                background-position: center center;
                background-size: cover;
            }

            .check {
                background: url("@/style/images/decorate/themeStyle/temp3.png");
                background-position: center center;
                background-size: cover;
            }
        }
    }
}
</style>
