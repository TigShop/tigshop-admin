<template>
    <perfect-scrollbar class="decorate-edit-con">
        <div class="dec-edit-title">
            <h3>页面设置</h3>
        </div>
        <div class="dec-edit-group dec-edit-group-block">
            <div class="dec-edit-group-title">
                <div class="title">页面标题</div>
            </div>
            <div class="dec-edit-group-con">
                <div class="dec-input-group" dynamic-class=".title-item">
                    <el-input v-model="module.title" placeholder="请输入页面标题，可不填，默认为页面名称"></el-input>
                </div>
            </div>
        </div>
        <div class="dec-edit-group">
            <div class="dec-edit-group-title">
                <div class="label">标题栏背景色</div>
                <div class="value"></div>
            </div>
            <div class="dec-edit-group-con">
                <div class="dec-color-group">
                    <div class="dec-color-button">
                        <a class="dec-color-reset" @click="module.title_background_color = defaultModule.title_background_color">重置</a>
                        <SelectColor v-model:color="module.title_background_color"></SelectColor>
                    </div>
                </div>
            </div>
        </div>
        <div class="dec-edit-group">
            <div class="dec-edit-group-title">
                <div class="label">标题栏文字颜色</div>
                <div class="value"></div>
            </div>
            <div class="dec-edit-group-con">
                <div class="dec-color-group">
                    <div class="dec-color-button">
                        <a class="dec-color-reset" @click="module.title_color = defaultModule.title_color">重置</a>
                        <SelectColor v-model:color="module.title_color"></SelectColor>
                    </div>
                </div>
            </div>
        </div>
        <div class="dec-edit-group">
            <div class="dec-edit-group-desc">
                <div class="">提示：标题背景颜色和文字修改仅适用于微信小程序和原生/半原生APP。</div>
            </div>
        </div>

        <div class="dec-divider-line"></div>

        <div class="dec-edit-group">
            <div class="dec-edit-group-title">
                <div class="label">页面背景颜色</div>
                <div class="value"></div>
            </div>
            <div class="dec-edit-group-con">
                <div class="dec-color-group">
                    <div class="dec-color-button">
                        <a class="dec-color-reset" @click="module.background_color = defaultModule.background_color">重置</a>
                        <SelectColor v-model:color="module.background_color"></SelectColor>
                    </div>
                </div>
            </div>
        </div>
        <div class="dec-edit-group">
            <div class="dec-edit-group-title">
                <div class="label">背景图</div>
            </div>
            <div class="dec-edit-group-con">
                <div class="dec-pic-group">
                    <PicSelect v-model:photo="module.background_image" v-model:defaultValue="defaultModule.background_image"></PicSelect>
                </div>
            </div>
        </div>
        <div class="dec-edit-group dec-edit-group-block">
            <div class="dec-edit-group-title">
                <div class="label">背景图显示</div>
                <div class="value">{{ selectLabel.background_repeat[module.background_repeat] }}</div>
            </div>
            <div class="dec-edit-group-con">
                <el-radio-group class="dec-radio-group" v-model="module.background_repeat">
                    <el-radio-button :value="1">不平铺</el-radio-button>
                    <el-radio-button :value="2">平铺</el-radio-button>
                    <el-radio-button :value="3">纵向平铺</el-radio-button>
                    <el-radio-button :value="4">横向平铺</el-radio-button>
                </el-radio-group>
            </div>
        </div>
        <div class="dec-edit-group dec-edit-group-block">
            <div class="dec-edit-group-title">
                <div class="label">背景图填充大小</div>
                <div class="value">{{ selectLabel.background_size[module.background_size] }}</div>
            </div>
            <div class="dec-edit-group-con">
                <el-radio-group class="dec-radio-group" v-model="module.background_size">
                    <el-radio-button :value="1">横向100%</el-radio-button>
                    <el-radio-button :value="2">纵向100%</el-radio-button>
                    <el-radio-button :value="3">100%填充</el-radio-button>
                </el-radio-group>
            </div>
        </div>
    </perfect-scrollbar>
</template>
<script lang="ts" setup>
import { SelectColor } from "@/components/select";
import { PicSelect } from "@/components/decorate";
import { ref, onMounted, reactive } from "vue";
const selectLabel = ref<any>({
    background_repeat: {
        1: "不平铺",
        2: "平铺",
        3: "纵向平铺",
        4: "横向平铺"
    },
    background_size: {
        1: "横向100%",
        2: "纵向100%",
        3: "100%填充"
    }
});
// 页面设置
const defaultModule = {
    title: "",
    title_color: "",
    title_background_color: "",
    background_image: {
        pic_url: "",
        pic_thumb: ""
    },
    background_color: "",
    background_repeat: 1,
    background_size: 1
};
const props = defineProps({
    module: {
        type: Object,
        default: () => {
            return {};
        }
    }
});
const module = ref(props.module);
const dealDefault = () => {
    for (let i in defaultModule) {
        if (typeof (module.value as any)[i] === "undefined") {
            (module.value as any)[i] = (defaultModule as any)[i];
        }
    }
};
onMounted(async () => {
    dealDefault();
});
</script>
