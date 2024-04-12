<template>
    <DialogForm :params="{ act: 'edit', id: 1 }" isDrawer path="link/LinkSelect" style="width: 100%;" title="选择链接" width="700px" @okCallback="onSelect">
        <div class="input-with-clear">
            <el-input v-model="linkName" :readonly="true" class="tig-link-select-input" clearable placeholder="请选择链接地址" type="text" :validate-event="false"></el-input>
            <span class="el-icon-circle-close input-clear-icon" @click.stop="clear">
                &#10754;
            </span>
        </div>

    </DialogForm>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue"
import { DialogForm } from '@/components/dialog'
import type { LinkType } from "@/types/decorate/decorate"
const linkData = defineModel<LinkType>('modelValue')
const linkName = computed(() => {
    return linkData.value?.label ? linkData.value?.label + '|' + linkData.value?.name : '';
})
const onSelect = (e:LinkType) => {
    linkData.value = e
}
const clear = () => {
    linkData.value = {}
}
</script>

<style lang="less" scoped>
.input-with-clear {
    position: relative;
    width: 100%;
    display: inline-block;
}

.input-clear-icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%) scale(1.2);
    cursor: pointer;
    color: #c0c4cc;
}

.input-clear-icon:hover {
    color: #909399;
}
</style>
