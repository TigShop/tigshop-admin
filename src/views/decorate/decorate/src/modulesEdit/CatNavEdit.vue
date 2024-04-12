<template>
    <perfect-scrollbar class="decorate-edit-con">
        <div class="dec-edit-title">
            <h3>分类导航</h3>
        </div>
        <div class="dec-edit-group">
            <div class="dec-edit-group-title">
                <div class="label">分类名宽度(%)</div>
            </div>
            <div class="dec-edit-group-con">
                <div class="dec-range-group">
                    <el-slider v-model="module.item_width" show-input :show-input-controls="false" size="small" input-size="default" :max="50" />
                </div>
            </div>
        </div>
        <div class="dec-edit-group">
            <div class="dec-edit-group-title">
                <div class="label">文字颜色</div>
                <div class="value"></div>
            </div>
            <div class="dec-edit-group-con">
                <div class="dec-color-group" need-refresh="true">
                    <div class="dec-color-button">
                        <a class="dec-color-reset" @click="module.text_color = defaultFrame.text_color">重置</a>
                        <SelectColor v-model:color="module.text_color"></SelectColor>
                    </div>
                </div>
            </div>
        </div>
        <div class="dec-edit-group">
            <div class="dec-edit-group-title">
                <div class="label">背景颜色</div>
                <div class="value"></div>
            </div>
            <div class="dec-edit-group-con">
                <div class="dec-color-group" need-refresh="true">
                    <div class="dec-color-button">
                        <a class="dec-color-reset" @click="module.background_color = defaultFrame.background_color">重置</a>
                        <SelectColor v-model:color="module.background_color"></SelectColor>
                    </div>
                </div>
            </div>
        </div>
        <div class="dec-edit-group">
            <div class="dec-edit-group-title">
                <div class="label">背景图</div>
                <div class="value"></div>
            </div>
            <div class="dec-edit-group-con">
                <div class="dec-pic-group dec-picSingle-group">
                    <PicSelect v-model:photo="module.nav_background_pic" v-model:defaultValue="defaultBackgroundPic"> </PicSelect>
                </div>
            </div>
        </div>
        <div class="dec-edit-group">
            <div class="dec-edit-group-title">
                <div class="label">设置分类</div>
                <div class="value"></div>
            </div>
            <div class="dec-edit-group-con">
                <div class="dec-pic-group dec-picSingle-group">
                    <router-link :to="{ path: '/decorate/mobile_cat_nav/list' }" target="_blank" class="btn-link">前往设置</router-link>
                </div>
            </div>
        </div>
        <div class="dec-divider-line"></div>
        <div class="dec-edit-group">
            <div class="dec-edit-group-title">
                <div class="label">搜索联动</div>
                <div class="value">{{ selectLabel.is_ganged[module.is_ganged || ""] }}</div>
            </div>
            <div class="dec-edit-group-con">
                <el-radio-group class="dec-radio-group" v-model="module.is_ganged">
                    <el-radio-button :value="1">联动</el-radio-button>
                    <el-radio-button :value="0">不联动</el-radio-button>
                </el-radio-group>
            </div>
        </div>
        <div class="dec-edit-group">
            <div class="dec-edit-group-desc">
                <div class="pic-change-desc">
                    设置为联动时，顶部会替换为LOGO栏+搜索栏+分类导航。 屏幕下滑时LOGO栏会消失，搜索栏会替换至LOGO栏位置（请不要在该组件前再添加其它组件）。
                </div>
            </div>
        </div>
        <div class="dec-divider-line"></div>
        <div class="dec-edit-group">
            <div class="dec-edit-group-title">
                <div class="label">LOGO图</div>
                <div class="value"></div>
            </div>
            <div class="dec-edit-group-con">
                <div class="dec-pic-group dec-picSingle-group">
                    <PicSelect v-model:photo="module.logo_pic" v-model:defaultValue="defaultIcoPic"> </PicSelect>
                </div>
            </div>
        </div>
        <div class="dec-edit-group">
            <div class="dec-edit-group-title">
                <div class="label">LOGO高度</div>
            </div>
            <div class="dec-edit-group-con">
                <div class="dec-range-group">
                    <el-slider v-model="module.logo_height" show-input :show-input-controls="false" size="small" input-size="default" :max="200" />
                </div>
            </div>
        </div>
        <div class="dec-divider-line"></div>
        <div class="dec-edit-group">
            <div class="dec-edit-group-title">
                <div class="label">搜索框文字</div>
                <div class="value"></div>
            </div>
            <div class="dec-edit-group-con">
                <el-input v-model="module.search_text" style="width: 240px" placeholder="请输入搜索框文字" />
            </div>
        </div>
        <div class="dec-edit-group">
            <div class="dec-edit-group-title">
                <div class="label">搜索框边距</div>
            </div>
            <div class="dec-edit-group-con">
                <div class="dec-range-group">
                    <el-slider v-model="module.box_padding" show-input :show-input-controls="false" size="small" input-size="default" :max="30" />
                </div>
            </div>
        </div>
        <div class="dec-edit-group">
            <div class="dec-edit-group-title">
                <div class="label">搜索文字颜色</div>
                <div class="value"></div>
            </div>
            <div class="dec-edit-group-con">
                <div class="dec-color-group" need-refresh="true">
                    <div class="dec-color-button">
                        <a class="dec-color-reset" @click="module.search_text_color = defaultFrame.text_color">重置</a>
                        <SelectColor v-model:color="module.search_text_color"></SelectColor>
                    </div>
                </div>
            </div>
        </div>
        <div class="dec-edit-group">
            <div class="dec-edit-group-title">
                <div class="label">搜索组件背景</div>
                <div class="value"></div>
            </div>
            <div class="dec-edit-group-con">
                <div class="dec-color-group" need-refresh="true">
                    <div class="dec-color-button">
                        <a class="dec-color-reset" @click="module.item_background_color = defaultFrame.item_background_color">重置</a>
                        <SelectColor v-model:color="module.item_background_color"></SelectColor>
                    </div>
                </div>
            </div>
        </div>
        <div class="dec-edit-group">
            <div class="dec-edit-group-title">
                <div class="label">搜索组件圆角</div>
            </div>
            <div class="dec-edit-group-con">
                <div class="dec-range-group">
                    <el-slider v-model="module.item_radius" show-input :show-input-controls="false" size="small" input-size="default" :max="50" />
                </div>
            </div>
        </div>
        <div class="dec-divider-line"></div>
        <div class="dec-edit-group">
            <div class="dec-edit-group-title">
                <div class="label">上边距</div>
            </div>
            <div class="dec-edit-group-con">
                <div class="dec-range-group">
                    <el-slider v-model="module.box_padding_top" show-input :show-input-controls="false" size="small" input-size="default" :max="30" />
                </div>
            </div>
        </div>
        <div class="dec-edit-group">
            <div class="dec-edit-group-title">
                <div class="label">下边距</div>
            </div>
            <div class="dec-edit-group-con">
                <div class="dec-range-group">
                    <el-slider v-model="module.box_padding_bottom" show-input :show-input-controls="false" size="small" input-size="default" :max="30" />
                </div>
            </div>
        </div>
    </perfect-scrollbar>
</template>
<script lang="ts" setup>
import { SelectColor } from "@/components/select";
import { PicSelect } from "@/components/decorate";
import CommonFrameEdit from "./src/CommonFrameEdit.vue";
import { ModuleCatNavType } from "@/types/decorate/decorate.d";
import { ref, defineModel } from "vue";
import { defaultFrame, defaultIcoPic, defaultBackgroundPic } from "@/views/decorate/decorate/src/modules/";

const module = defineModel<ModuleCatNavType>("module", { default: () => ({}) });
const selectLabel = ref<any>({
    is_ganged: {
        1: "联动",
        0: "不联动"
    }
});
</script>
<style lang="less">
.handle {
    box-sizing: border-box;
    position: absolute;
    background: #fff;
    border: 1px solid #155bd4;
}

.vue-drag-resize-rotate {
    touch-action: none;
    position: absolute;
    box-sizing: border-box;
    border: 1px solid transparent;
    background: rgba(21, 91, 212, 0.6);
    color: #fff;
}

.vue-drag-resize-rotate.active {
    background: rgba(21, 91, 212, 0.9);
    border: 1px solid #155bd4;
}

.vue-drag-resize-rotate:hover {
    border: 1px solid #155bd4;
}
</style>
