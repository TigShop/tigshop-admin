<template>
    <perfect-scrollbar class="decorate-edit-con">
        <div class="dec-edit-title">
            <h3>小程序直播</h3>
        </div>
        <CommonFrameEdit v-model="module.frame" type="live"></CommonFrameEdit>
        <CommonTitleEdit v-model="module.title"></CommonTitleEdit>
    </perfect-scrollbar>
</template>
<script lang="ts" setup>
import CommonFrameEdit from "./src/CommonFrameEdit.vue";
import CommonTitleEdit from "./src/CommonTitleEdit.vue";
import { ModuleType } from "@/types/decorate/decorate.d";
import { defineModel } from "vue";
const module = defineModel<ModuleType>("module", { default: () => ({}) });
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
</style>
