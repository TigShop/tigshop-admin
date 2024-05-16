<template>
    <div class="radio-style">
        <div v-for="item in radioList" :key="item['key']" :class="{ selected: modelValue == item['key'] }" class="item-radio" @click="checkRadio(item)">
            <div v-if="modelValue == item['key']" :class="[{ triangleHeight: item['desc'] }, { triangle2: !item['desc'] }]" class="triangle"></div>
            <div class="title">{{ item["title"] }}</div>
            <div class="desc">{{ item["desc"] ? item["desc"] : "" }}</div>
        </div>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps({
    modelValue: {
        type: Number,
        default: ""
    },
    radioList: {
        type: Array as any,
        default: []
    }
});
const emit = defineEmits(["update:modelValue"]);
const checkRadio = (value: any) => {
    emit("update:modelValue", value.key);
};
</script>
<style lang="less" scoped>
.radio-style {
    display: flex;
    gap: 8px;
    flex-direction: row;
    flex-wrap: wrap;

    .selected {
        border: 1px solid var(--el-color-primary) !important;
        background: #fff;
        position: relative;
        cursor: default;

        .title {
            color: var(--el-color-primary) !important;
        }
    }

    .triangle {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 0;
        height: 0;
        border-left: 20px solid transparent;
        /* 调整这里的值以控制三角形的大小 */
        border-bottom: 20px solid var(--el-color-primary);
        /* 调整这里的值以控制三角形的大小和颜色 */
        border-bottom-right-radius: 0px;
    }

    .triangle::after {
        content: "\2713";
        /* Unicode字符，代表一个对号 */
        position: absolute;
        right: 1px;
        /* 调整对号的位置，以适应三角形 */
        color: #fff;
        /* 对号的颜色 */
        z-index: 2;
        /* 确保在三角形之上 */
        top: 2px;
        font-size: 16px;
    }

    .triangle2::after {
        content: "\2713";
        /* Unicode字符，代表一个对号 */
        position: absolute;
        right: 1px;
        /* 调整对号的位置，以适应三角形 */
        color: #fff;
        /* 对号的颜色 */
        z-index: 2;
        /* 确保在三角形之上 */
        top: -2px;
        font-size: 12px;
    }

    .triangleHeight {
        border-left: 30px solid transparent !important;
        /* 调整这里的值以控制三角形的大小 */
        border-bottom: 30px solid var(--el-color-primary) !important;
        /* 调整这里的值以控制三角形的大小和颜色 */
    }

    .item-radio {
        width: 160px;
        box-sizing: border-box;
        border: 1px solid #dcdfe6;
        border-radius: 2px;
        display: inline-block;
        cursor: pointer;
        text-align: center;
        padding: 8px 16px 8px 8px;

        .title {
            font-weight: 500;
            color: #323233;
            font-size: 14px;
            line-height: 22px;
        }

        .desc {
            color: #979797;
            font-size: 12px;
            font-weight: 400;
            line-height: 18px;
        }
    }
}
</style>
