<template>
    <perfect-scrollbar class="decorate-edit-con">
        <div class="dec-edit-title">
            <h3>优惠券</h3>
        </div>
        <div class="dec-edit-group">
            <div class="dec-edit-group-title">
                <div class="label">显示标题栏</div>
                <div class="value">{{ selectLabel.show_title[module.show_title || ''] }}</div>
            </div>
            <div class="dec-edit-group-con">
                <el-radio-group class="dec-radio-group" v-model="module.show_title">
                    <el-radio-button :value="1">显示</el-radio-button>
                    <el-radio-button :value="0">不显示</el-radio-button>
                </el-radio-group>
            </div>
        </div>
        <div class="dec-edit-group" v-if="module.show_title == 1">
            <div class="dec-edit-group-title dec-edit-group-block">
                <div class="label">标题内容</div>
                <div class="value"></div>
            </div>
            <div class="dec-edit-group-con">
                <el-input v-model="module.title" style="width: 240px" placeholder="请输入标题内容" />
            </div>
        </div>
        <div class="dec-edit-group" v-if="module.show_title == 1">
            <div class="dec-edit-group-title dec-edit-group-block">
                <div class="label">描述内容</div>
                <div class="value"></div>
            </div>
            <div class="dec-edit-group-con">
                <el-input type="textarea" v-model="module.desc" maxlength="500" placeholder="请输入描述内容, 字数不超过500" />
            </div>
        </div>
        <div class="dec-edit-group">
            <div class="dec-edit-group-title">
                <div class="label">显示标题栏</div>
                <div class="value">{{ selectLabel.color_style[module.color_style || ''] }}</div>
            </div>
            <div class="dec-edit-group-con">
                <el-radio-group class="dec-radio-group dec-radio-color-group" v-model="module.color_style">
                    <el-radio :value="1">
                        <div class="dec-radio-button dec-tip" :class="{'selected': module.color_style == 1}"><span class="dec-radio-color-button-con"><i style="background-color: #e74c2c;"></i></span></div>
                    </el-radio>
                    <el-radio :value="2">
                        <div class="dec-radio-button dec-tip" :class="{'selected': module.color_style == 2}"><span class="dec-radio-color-button-con"><i style="background-color: #ffe9b7;"></i></span></div>
                    </el-radio>
                    <el-radio :value="3">
                        <div class="dec-radio-button dec-tip" :class="{'selected': module.color_style == 3}"><span class="dec-radio-color-button-con"><i style="background-color: #383b3e;"></i></span></div>
                    </el-radio>
                    <el-radio :value="4">
                        <div class="dec-radio-button dec-tip" :class="{'selected': module.color_style == 4}"><span class="dec-radio-color-button-con"><i style="background-color: #e0f4e4;"></i></span></div>
                    </el-radio>
                </el-radio-group>
            </div>
        </div>
        <div class="dec-edit-group">
            <div class="dec-edit-group-title">
                <div class="label">组件背景</div>
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
                <div class="label">组件边距</div>
            </div>
            <div class="dec-edit-group-con">
                <div class="dec-range-group">
                    <el-slider v-model="module.item_padding" show-input :show-input-controls="false" size="small" input-size="default" :max="30" />
                </div>
            </div>
        </div>
        <div class="dec-edit-group">
            <div class="dec-edit-group-title">
                <div class="label">圆角</div>
            </div>
            <div class="dec-edit-group-con">
                <div class="dec-range-group">
                    <el-slider v-model="module.box_radius" show-input :show-input-controls="false" size="small" input-size="default" :max="30" />
                </div>
            </div>
        </div>
        <div class="dec-edit-group">
            <div class="dec-edit-group-title">
                <div class="label">左右边距</div>
            </div>
            <div class="dec-edit-group-con">
                <div class="dec-range-group">
                    <el-slider v-model="module.box_padding" show-input :show-input-controls="false" size="small" input-size="default" :max="30" />
                </div>
            </div>
        </div>
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
import { SelectColor } from '@/components/select'
import { PicSelect } from '@/components/decorate'
import CommonFrameEdit from "./src/CommonFrameEdit.vue";
import { ModuleCouponType } from "@/types/decorate/decorate.d";
import { ref, defineModel } from "vue";
import { defaultFrame, defaultIcoPic } from '@/views/decorate/decorate/src/modules/'

const module = defineModel<ModuleCouponType>("module", { default: () => ({}) });
const selectLabel = ref<any>({
    show_title: {
        1: "显示",
        0: "不显示",
    },
    color_style: {
        1: "红色",
        2: "黄色",
        3: "黑色",
        4: "绿色",
    },
});
</script>
<style lang="less" scoped>
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
.dec-edit-group :deep(.el-radio){
    margin-right: 0px;
}
.dec-edit-group :deep(.el-radio .el-radio__input){
    display: none;
}
</style>
