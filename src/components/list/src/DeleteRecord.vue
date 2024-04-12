<template>
    <a class="btn-link" @click="delRecord">
        <slot></slot>
    </a>
</template>
<script setup lang="ts">
// 不使用a-switch，增加表格渲染速度
import request from '@/utils/request'
import { message, Modal } from 'ant-design-vue'
const props = defineProps({
    requestApi: {
        type: Function,
        default: () =>{}
    },
    params: {
        type: Object,
        default: {} as any
    },
})
const emit = defineEmits(['afterDelete'])
//  删除项
const delRecord = () => {
    Modal.confirm({
        title: '您确认要删除该数据吗？',
        okType: 'danger',
        maskClosable: true,
        async onOk() {
            await props.requestApi(props.params).then((result: any) => {
                if (result.errcode > 0) {
                    message.error(result.message)
                } else {
                    message.success(result.message)
                    emit('afterDelete', true)
                }
            })
        },
    });
}
</script>