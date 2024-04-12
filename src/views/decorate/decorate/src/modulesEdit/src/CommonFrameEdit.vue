<template>
    <!-- 结构设置 -->
    <div class="dec-divider-line" v-if="type != 'live'"></div>

    <div class="dec-spread-title" v-if="type != 'notice' && type != 'search_bar' && type != 'live'">
        <div class="title">模块设置</div>
    </div>
    <div class="dec-edit-group" v-if="type == 'notice' || type == 'search_bar'">
        <div class="dec-edit-group-title">
            <div class="label">文字颜色</div>
            <div class="value"></div>
        </div>
        <div class="dec-edit-group-con">
            <div class="dec-color-group" need-refresh="true">
                <div class="dec-color-button">
                    <a class="dec-color-reset" @click="frame.text_color = defaultFrame.text_color">重置</a>
                    <SelectColor v-model:color="frame.text_color"></SelectColor>
                </div>
            </div>
        </div>
    </div>
    <div class="dec-edit-group" v-if="type == 'notice' || type == 'search_bar'">
        <div class="dec-edit-group-title">
            <div class="label">组件背景</div>
            <div class="value"></div>
        </div>
        <div class="dec-edit-group-con">
            <div class="dec-color-group" need-refresh="true">
                <div class="dec-color-button">
                    <a class="dec-color-reset" @click="frame.item_background_color = defaultFrame.item_background_color">重置</a>
                    <SelectColor v-model:color="frame.item_background_color"></SelectColor>
                </div>
            </div>
        </div>
    </div>
    <div class="dec-edit-group" v-if="type == 'notice' || type == 'search_bar'">
        <div class="dec-edit-group-title">
            <div class="label">组件圆角</div>
        </div>
        <div class="dec-edit-group-con">
            <div class="dec-range-group">
                <el-slider v-model="frame.item_radius" show-input :show-input-controls="false" size="small" input-size="default" :max="50" />
            </div>
        </div>
    </div>
    <div class="dec-edit-group" v-if="type == 'notice' || type == 'search_bar'">
        <div class="dec-edit-group-title">
            <div class="label">组件高度</div>
        </div>
        <div class="dec-edit-group-con">
            <div class="dec-range-group">
                <el-slider v-model="frame.item_height" show-input :show-input-controls="false" size="small" input-size="default" :max="50" />
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
                    <a class="dec-color-reset" @click="frame.background_color = defaultFrame.background_color">重置</a>
                    <SelectColor v-model:color="frame.background_color"></SelectColor>
                </div>
            </div>
        </div>
    </div>
    <div class="dec-edit-group" v-if="type != 'line' && type != 'notice' && type != 'search_bar'">
        <div class="dec-edit-group-title">
            <div class="label">圆角</div>
        </div>
        <div class="dec-edit-group-con">
            <div class="dec-range-group">
                <el-slider v-model="frame.box_radius" show-input :show-input-controls="false" size="small" input-size="default" :max="30" />
            </div>
        </div>
    </div>
    <div class="dec-edit-group"  v-if="type != 'line' && type != 'notice' && type != 'search_bar'">
        <div class="dec-edit-group-title">
            <div class="label">内边距</div>
        </div>
        <div class="dec-edit-group-con">
            <div class="dec-range-group">
                <el-slider v-model="frame.inner_padding" show-input :show-input-controls="false" size="small" input-size="default" :max="30" />
            </div>
        </div>
    </div>
    <div class="dec-edit-group">
        <div class="dec-edit-group-title">
            <div class="label">左右边距</div>
        </div>
        <div class="dec-edit-group-con">
            <div class="dec-range-group">
                <el-slider v-model="frame.box_padding" show-input :show-input-controls="false" size="small" input-size="default" :max="30" />
            </div>
        </div>
    </div>
    <div class="dec-edit-group">
        <div class="dec-edit-group-title">
            <div class="label">上边距</div>
        </div>
        <div class="dec-edit-group-con">
            <div class="dec-range-group">
                <el-slider v-model="frame.box_padding_top" show-input :show-input-controls="false" size="small" input-size="default" :max="30" />
            </div>
        </div>
    </div>
    <div class="dec-edit-group">
        <div class="dec-edit-group-title">
            <div class="label">下边距</div>
        </div>
        <div class="dec-edit-group-con">
            <div class="dec-range-group">
                <el-slider v-model="frame.box_padding_bottom" show-input :show-input-controls="false" size="small" input-size="default" :max="30" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { SelectColor } from "@/components/select";
import { ModuleFrameType } from "@/types/decorate/decorate.d";
import { mergeDefaultModule, defaultFrame } from "@/views/decorate/decorate/src/modules/";
const frame = defineModel<ModuleFrameType>("modelValue", { default: () => ({}) });
console.log(frame.value);
// 传值
const props = defineProps({
    type: {
        type: String,
        default: ''
    }
})
</script>
