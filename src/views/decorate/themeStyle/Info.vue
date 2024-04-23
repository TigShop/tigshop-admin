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
                                    <div :style="{ background: item['--main-bg'] }"></div>
                                    <div :style="{ background: item['--vice-bg'] }"></div>
                                </div>
                            </div>
                            <a-button :loading="confirmLoading" class="form-submit-btn" type="primary" @click="onSubmit">保存</a-button>
                        </div>
                        <div class="right">
                            <h3>预览效果</h3>
                            <div class="example">
                                <div class="card info">
                                    <div class="info-item1">
                                        <p :style="{ color: formState['--price'] }" class="text">¥299-599</p>
                                        <p :style="{ color: formState['--vice-text'], background: formState['--vice-bg'] }" class="bg-card">会员价</p>
                                    </div>
                                    <div class="info-item2">
                                        <div>
                                            <div :style="{ color: formState['--vice-text'], background: formState['--vice-bg'] }">加入购物车</div>
                                            <div :style="{ color: formState['--main-text'], background: formState['--main-bg'] }">立即购买</div>
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
import {onMounted, ref} from "vue";
import {message} from "ant-design-vue";
import type {ColorList, ThemeStyleFormState} from "@/types/decorate/themeStyle.d";
import {getConfig, updateConfig} from "@/api/setting/config";
// 父组件回调
const emit = defineEmits(["submitCallback", "update:confirmLoading", "close"]);
const confirmLoading = ref(false);

const loading = ref<boolean>(true);
const formState = ref<ThemeStyleFormState>({
    theme_id: 0,
});
const ColorList = ref<ColorList[]>([
    {
        check: false, theme_id: 1,
        "--general": "#4a90e2",
        "--main-bg": "#4a90e2",
        "--main-btn-hover-bg": "",
        "--main-bg-gradient": "#4a90e2",
        "--main-text": "#ffffff",
        "--vice-bg": "#D6E9FC",
        "--vice-text": "#0080FF",
        "--icon": "#0080FF",
        "--price": "#0080FF",
        "--tag-text": "#0080FF",
        "--tag-bg": "#E5F2FF"
    }
    , {
        check: false, theme_id: 2,
        "--general": "#ff4444",
        "--main-bg": "#ff4444",
        "--main-btn-hover-bg": "",
        "--main-bg-gradient": "#ff4444",
        "--main-text": "#ffffff",
        "--vice-bg": "#ff8855",
        "--vice-text": "#fff",
        "--icon": "#FC0000",
        "--price": "#FC0000",
        "--tag-text": "#CF0000",
        "--tag-bg": "#FFF2F2"
    }
    , {
        check: false, theme_id: 3,
        "--general": "#ff5e15",
        "--main-bg": "#ff5e15",
        "--main-btn-hover-bg": "",
        "--main-bg-gradient": "#ff5e15",
        "--main-text": "#ffffff",
        "--vice-bg": "#FF9300",
        "--vice-text": "#ffffff",
        "--icon": "#ff5e15",
        "--price": "#ff5e15",
        "--tag-text": "#ff5e15",
        "--tag-bg": "#FFEDE6"
    }
    , {
        check: false, theme_id: 4,
        "--general": "#ff547b",
        "--main-bg": "#ff547b",
        "--main-btn-hover-bg": "",
        "--main-bg-gradient": "#ff547b",
        "--main-text": "#ffffff",
        "--vice-bg": "#FFE6E8",
        "--vice-text": "#ff547b",
        "--icon": "#ff547b",
        "--price": "#ff547b",
        "--tag-text": "#ff547b",
        "--tag-bg": "#FFF2F5"
    }
    , {
        check: false, theme_id: 5,
        "--general": "#FF4444",
        "--main-bg": "#FF4444",
        "--main-btn-hover-bg": "",
        "--main-bg-gradient": "#FF4444",
        "--main-text": "#ffffff",
        "--vice-bg": "#555555",
        "--vice-text": "#ffffff",
        "--icon": "#FC0000",
        "--price": "#FC0000",
        "--tag-text": "#CF0000",
        "--tag-bg": "#FFF2F2"
    }
    , {
        check: false, theme_id: 6,
        "--general": "#FCC600",
        "--main-bg": "#FCC600",
        "--main-btn-hover-bg": "",
        "--main-bg-gradient": "#FCC600",
        "--main-text": "#ffffff",
        "--vice-bg": "#1D262E",
        "--vice-text": "#ffffff",
        "--icon": "#FCC600",
        "--price": "#FCC600",
        "--tag-text": "#FCC600",
        "--tag-bg": "#FFF4CD"
    }
    , {
        check: false, theme_id: 7,
        "--general": "#65c4aa",
        "--main-bg": "#65c4aa",
        "--main-btn-hover-bg": "",
        "--main-bg-gradient": "#65c4aa",
        "--main-text": "#ffffff",
        "--vice-bg": "#D9F6EF",
        "--vice-text": "#65c4aa",
        "--icon": "#65c4aa",
        "--price": "#65c4aa",
        "--tag-text": "#65c4aa",
        "--tag-bg": "#F2FFFC"
    }
    , {
        check: false, theme_id: 8,
        "--general": "#09bb07",
        "--main-bg": "#09bb07",
        "--main-btn-hover-bg": "",
        "--main-bg-gradient": "#09bb07",
        "--main-text": "#ffffff",
        "--vice-bg": "#383838",
        "--vice-text": "#ffffff",
        "--icon": "#09BB07",
        "--price": "#09BB07",
        "--tag-text": "#09BB07",
        "--tag-bg": "#E6F8E6"
    }
    , {
        check: false, theme_id: 9,
        "--general": "#63be72",
        "--main-bg": "#63be72",
        "--main-btn-hover-bg": "",
        "--main-bg-gradient": "#63be72",
        "--main-text": "#ffffff",
        "--vice-bg": "#E1F4E3",
        "--vice-text": "#6CBE72",
        "--icon": "#6CBE72",
        "--price": "#6CBE72",
        "--tag-text": "#6CBE72",
        "--tag-bg": "#F0F8F0"
    }
    , {
        check: false, theme_id: 10,
        "--general": "#c3a769",
        "--main-bg": "#c3a769",
        "--main-btn-hover-bg": "",
        "--main-bg-gradient": "#c3a769",
        "--main-text": "#ffffff",
        "--vice-bg": "#F3EEE1",
        "--vice-text": "#C3A769",
        "--icon": "#C3A769",
        "--price": "#C3A769",
        "--tag-text": "#C3A769",
        "--tag-bg": "#F9F6F0"
    }
    , {
        check: false, theme_id: 11,
        "--general": "#2f2f34",
        "--main-bg": "#2f2f34",
        "--main-btn-hover-bg": "",
        "--main-bg-gradient": "#2f2f34",
        "--main-text": "#ffffff",
        "--vice-bg": "#EBECF2",
        "--vice-text": "#2F2F34",
        "--icon": "#2F2F34",
        "--price": "#2F2F34",
        "--tag-text": "#2F2F34",
        "--tag-bg": "#EAEAEA"
    }
    , {
        check: false, theme_id: 12,
        "--general": "#884cff",
        "--main-bg": "#884cff",
        "--main-btn-hover-bg": "",
        "--main-bg-gradient": "#884cff",
        "--main-text": "#ffffff",
        "--vice-bg": "#EFE6FF",
        "--vice-text": "#884cff",
        "--icon": "#884cff",
        "--price": "#884cff",
        "--tag-text": "#884cff",
        "--tag-bg": "#F3EDFF"
    }
    , {
        check: false, theme_id: 13,
        "--general": "#EE0A24",
        "--main-bg": "#EE0A24",
        "--main-btn-hover-bg": "",
        "--main-bg-gradient": "#EE0A24",
        "--main-text": "#ffffff",
        "--vice-bg": "#FF9518FF",
        "--vice-text": "#ffffff",
        "--icon": "#EE0A24",
        "--price": "#EE0A24",
        "--tag-text": "#EE0A24",
        "--tag-bg": "#FDE6E9"
    }
]);
const selectItem = (theme_id: number) => {
    ColorList.value.forEach((item) => {
        // 如果当前项是被点击的项，则将其 check 设置为 true
        // 否则，将其他项的 check 设置为 false
        if (item.theme_id === theme_id) {
            Object.assign(formState.value,item)
            item.check = true;
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
        console.log(formState.value);
        delete formState.value.check
        const result = await updateConfig({code: "theme_style", data: {...formState.value}});
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
                background: url("@/style/images/decorate/themeStyle/temp2.png") center center;
                background-size: cover;
            }

            .check {
                background: url("@/style/images/decorate/themeStyle/temp3.png") center center;
                background-size: cover;
            }
        }
    }
}
</style>
