<template>
    <!-- 结构设置 -->
    <div class="dec-edit-group dec-edit-group-block"  v-if="type != 'product'">
        <div class="dec-edit-group-title">
            <div class="label">选择模板</div>
            <div class="value">{{ selectLabel.style[frame.style || ''] }}</div>
        </div>
        <div class="dec-edit-group-con">
            <el-radio-group class="dec-radio-group" v-model="frame.style">
                <el-radio-button :value="1">一行一个</el-radio-button>
                <el-radio-button :value="2">一行两个</el-radio-button>
                <el-radio-button :value="5">详细列表</el-radio-button>
                <el-radio-button :value="6">横向滑动</el-radio-button>
            </el-radio-group>
        </div>
    </div>
    <div class="dec-divider-line" v-if="type != 'product'"></div>
    <CommonProductEdit v-if="type == 'product'" v-model="frame.products"></CommonProductEdit>
    <div class="dec-edit-group dec-edit-group-block">
        <div class="dec-edit-group-title">
            <div class="label">商品卡样式</div>
            <div class="value">{{ selectLabel.goods_style[frame.goods_style || ''] }}</div>
        </div>
        <div class="dec-edit-group-con">
            <el-radio-group class="dec-radio-group" v-model="frame.goods_style">
                <el-radio-button :value="1">标准</el-radio-button>
                <el-radio-button :value="2">投影</el-radio-button>
                <el-radio-button :value="3">描边</el-radio-button>
                <el-radio-button :value="4">透明底</el-radio-button>
            </el-radio-group>
        </div>
    </div>
    <div class="dec-edit-group">
        <div class="dec-edit-group-title">
            <div class="label">商品卡边角</div>
            <div class="value">{{ selectLabel.goods_radio_style[frame.goods_radio_style || ''] }}</div>
        </div>
        <div class="dec-edit-group-con">
            <el-radio-group class="dec-radio-group" v-model="frame.goods_radio_style">
                <el-radio-button :value="1">直角</el-radio-button>
                <el-radio-button :value="2">圆角</el-radio-button>
            </el-radio-group>
        </div>
    </div>
    <div class="dec-edit-group">
        <div class="dec-edit-group-title">
            <div class="label">文本对齐</div>
            <div class="value">{{ selectLabel.text_align[frame.text_align || ''] }}</div>
        </div>
        <div class="dec-edit-group-con">
            <el-radio-group class="dec-radio-group" v-model="frame.text_align">
                <el-radio-button :value="1">左对齐</el-radio-button>
                <el-radio-button :value="2">居中对齐</el-radio-button>
            </el-radio-group>
        </div>
    </div>
    <div class="dec-edit-group">
        <div class="dec-edit-group-title">
            <div class="label">文字粗细</div>
            <div class="value">{{ selectLabel.text_weight[frame.text_weight || ''] }}</div>
        </div>
        <div class="dec-edit-group-con">
            <el-radio-group class="dec-radio-group" v-model="frame.text_weight">
                <el-radio-button :value="1">常规体</el-radio-button>
                <el-radio-button :value="2">加粗体</el-radio-button>
            </el-radio-group>
        </div>
    </div>
    <div class="dec-edit-group">
        <div class="dec-edit-group-title">
            <div class="label">商品名称行数</div>
            <div class="value">{{ selectLabel.goods_name_row[frame.goods_name_row || ''] }}</div>
        </div>
        <div class="dec-edit-group-con">
            <el-radio-group class="dec-radio-group" v-model="frame.goods_name_row">
                <el-radio-button :value="1">1行</el-radio-button>
                <el-radio-button :value="2">2行</el-radio-button>
            </el-radio-group>
        </div>
    </div>
    <div class="dec-edit-group">
        <div class="dec-edit-group-title">
            <div class="label">商品信息边距</div>
            <div class="value">{{ selectLabel.goods_name_padding[frame.goods_name_padding || ''] }}</div>
        </div>
        <div class="dec-edit-group-con">
            <el-radio-group class="dec-radio-group" v-model="frame.goods_name_padding">
                <el-radio-button :value="1">有边距</el-radio-button>
                <el-radio-button :value="0">无边距</el-radio-button>
            </el-radio-group>
        </div>
    </div>
    <div class="dec-edit-group">
        <div class="dec-edit-group-title">
            <div class="label">显示商品名称</div>
            <div class="value">{{ selectLabel.show_name[frame.show_name || ''] }}</div>
        </div>
        <div class="dec-edit-group-con">
            <el-radio-group class="dec-radio-group" v-model="frame.show_name">
                <el-radio-button :value="1">显示</el-radio-button>
                <el-radio-button :value="0">不显示</el-radio-button>
            </el-radio-group>
        </div>
    </div>
    <div class="dec-edit-group">
        <div class="dec-edit-group-title">
            <div class="label">显示商品描述</div>
            <div class="value">{{ selectLabel.show_brief[frame.show_brief || ''] }}</div>
        </div>
        <div class="dec-edit-group-con">
            <el-radio-group class="dec-radio-group" v-model="frame.show_brief">
                <el-radio-button :value="1">显示</el-radio-button>
                <el-radio-button :value="0">不显示</el-radio-button>
            </el-radio-group>
        </div>
    </div>
    <div class="dec-edit-group">
        <div class="dec-edit-group-title">
            <div class="label">显示商品价格</div>
            <div class="value">{{ selectLabel.show_price[frame.show_price || ''] }}</div>
        </div>
        <div class="dec-edit-group-con">
            <el-radio-group class="dec-radio-group" v-model="frame.show_price">
                <el-radio-button :value="1">显示</el-radio-button>
                <el-radio-button :value="0">不显示</el-radio-button>
            </el-radio-group>
        </div>
    </div>
    <div class="dec-edit-group">
        <div class="dec-edit-group-title">
            <div class="label">商品边距</div>
        </div>
        <div class="dec-edit-group-con">
            <div class="dec-range-group">
                <el-slider v-model="frame.goods_padding" show-input :show-input-controls="false" size="small"
                    input-size="default" :max="50" />
            </div>
        </div>
    </div>
    <div class="dec-edit-group dec-edit-group-block">
        <div class="dec-edit-group-title">
            <div class="label">购买按钮样式</div>
            <div class="value">{{ selectLabel.buy_btn_style[frame.buy_btn_style || ''] }}</div>
        </div>
        <div class="dec-edit-group-con">
            <el-radio-group class="dec-radio-group" v-model="frame.buy_btn_style">
                <el-radio-button :value="0">不显示</el-radio-button>
                <el-radio-button :value="1">样式一</el-radio-button>
                <el-radio-button :value="2">样式二</el-radio-button>
                <el-radio-button :value="3">样式三</el-radio-button>
                <el-radio-button :value="4">样式四</el-radio-button>
                <el-radio-button :value="5">样式五</el-radio-button>
                <el-radio-button :value="6">样式六</el-radio-button>
                <el-radio-button :value="7">样式七</el-radio-button>
                <el-radio-button :value="8">样式八</el-radio-button>
            </el-radio-group>
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
    <div class="dec-edit-group">
        <div class="dec-edit-group-title">
            <div class="label">圆角</div>
        </div>
        <div class="dec-edit-group-con">
            <div class="dec-range-group">
                <el-slider v-model="frame.box_radius" show-input :show-input-controls="false" size="small"
                    input-size="default" :max="30" />
            </div>
        </div>
    </div>
    <div class="dec-edit-group">
        <div class="dec-edit-group-title">
            <div class="label">内边距</div>
        </div>
        <div class="dec-edit-group-con">
            <div class="dec-range-group">
                <el-slider v-model="frame.inner_padding" show-input :show-input-controls="false" size="small"
                    input-size="default" :max="30" />
            </div>
        </div>
    </div>
    <div class="dec-edit-group">
        <div class="dec-edit-group-title">
            <div class="label">左右边距</div>
        </div>
        <div class="dec-edit-group-con">
            <div class="dec-range-group">
                <el-slider v-model="frame.box_padding" show-input :show-input-controls="false" size="small"
                    input-size="default" :max="30" />
            </div>
        </div>
    </div>
    <div class="dec-edit-group">
        <div class="dec-edit-group-title">
            <div class="label">上边距</div>
        </div>
        <div class="dec-edit-group-con">
            <div class="dec-range-group">
                <el-slider v-model="frame.box_padding_top" show-input :show-input-controls="false" size="small"
                    input-size="default" :max="30" />
            </div>
        </div>
    </div>
    <div class="dec-edit-group">
        <div class="dec-edit-group-title">
            <div class="label">下边距</div>
        </div>
        <div class="dec-edit-group-con">
            <div class="dec-range-group">
                <el-slider v-model="frame.box_padding_bottom" show-input :show-input-controls="false" size="small"
                    input-size="default" :max="30" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { SelectColor } from "@/components/select";
import CommonProductEdit from "./CommonProductEdit.vue";
import { ref, onMounted, computed, ComputedRef } from "vue";
import { ModuleActivityType, ModuleType } from "@/types/decorate/decorate.d";
import { mergeDefaultModule, defaultFrame } from "@/views/decorate/decorate/src/modules/";
const frame = defineModel<ModuleActivityType & ModuleType>("modelValue", { default: () => ({}) });
const props = defineProps({
    type: {
        type: String,
        default: ''
    }
})
const selectLabel = ref<any>({
    style: {
        1: "一行一个",
        2: "一行两个",
        5: "详细列表",
        6: "横向滑动",
    },
    goods_style: {
        1: "标准",
        2: "投影",
        3: "描边",
        4: "透明底",
    },
    goods_radio_style: {
        1: "直角",
        2: "圆角",
    },
    text_align: {
        1: "左对齐",
        2: "居中对齐",
    },
    text_weight: {
        1: "常规体",
        2: "加粗体",
    },
    goods_name_row: {
        1: "1行",
        2: "2行",
    },
    goods_name_padding: {
        1: "有边距",
        0: "无边距",
    },
    show_name: {
        1: "显示",
        0: "不显示",
    },
    show_brief: {
        1: "显示",
        0: "不显示",
    },
    show_price: {
        1: "显示",
        0: "不显示",
    },
    buy_btn_style: {
        0: "不显示",
        1: "样式一",
        2: "显示",
        3: "显示",
        4: "显示",
        5: "显示",
        6: "显示",
        7: "显示",
        8: "显示",
    },
});
</script>
