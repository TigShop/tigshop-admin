<template>
    <div @click="switchChange" :class="'table-switch table-switch-' + (checked ? 'on' : 'off')">
        <i></i>
    </div>
</template>
<script setup lang="ts">
// 不使用a-switch，增加表格渲染速度
import { toRefs } from "vue"
import request from '@/utils/request'
import { message } from 'ant-design-vue'
const props = defineProps({
    requestApi: {
        type: Function,
        default: request
    },
    params: {
        type: Object,
        default: {} as any
    },
    checked: { type: [Boolean, Number], default: Number },
})
const emit = defineEmits(['update:checked', 'callback'])
const { checked } = toRefs(props)
const switchChange = () => {
    console.log(checked)
    props.requestApi({ ...props.params, val: checked.value ? 0 : 1 })
        .then((result: any) => {
            emit('update:checked', checked.value ? 0 : 1)
            emit('callback')
            message.success(result.message || '操作成功')
        }).catch((error:any) => {
            message.error(error.message)
        });
}
</script>