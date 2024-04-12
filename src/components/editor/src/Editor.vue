<template>
    <div style="border: 1px solid #eee">
        <Toolbar style="border-bottom: 1px solid #eee" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
        <Editor :style="'height: ' + height + '; overflow-y: hidden;'" @onChange="onChange" v-model="html" :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" />
    </div>
    <DialogForm type="gallery" ref="galleryDialog" class="item-bg" @okCallback="onEdit" :params="{ isMultiple: true }">
    </DialogForm>
</template>
<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { ref, onMounted, onBeforeUnmount, shallowRef, toRefs } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { DialogForm } from '@/components/dialog'
import { imageFormat } from "@/utils/format";
const props = defineProps({
    html: String,
    height: {
        type: String,
        default: '500px'
    }
})
const html = ref(props.html)
const galleryDialog = shallowRef()
const emit = defineEmits(['update:html'])
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
// 内容 HTML
const mode = 'default'
onMounted(() => {
    emit('update:html', html)
})
const fn = ref();
const toolbarConfig = {
    excludeKeys: ['fullScreen'], //排除的按钮
}
const editorConfig = {
    placeholder: '请输入内容...',
    MENU_CONF: {
        uploadImage: {
            // 自定义选择图片
            customBrowseAndUpload(insertFn:any) {
                galleryDialog.value.show()
                fn.value = insertFn;
            }
        }
    }

}
const onChange = (editor:any) => {
}
const onEdit = (result:any) => {
    for (let idx in result) {
        fn.value(imageFormat(result[idx].pic_url), '', '')
    }

}
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor:any) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}


</script>
