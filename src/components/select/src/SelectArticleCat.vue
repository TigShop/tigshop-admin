<template>
    <el-tree-select :style="{width: minWidth}" placeholder="请选择..." v-model="props.cat_id" :fit-input-width="false" :props="treeProps" :multiple="false" :data="articleCatList" check-strictly
        :render-after-expand="false" check-on-click-node />
</template>
<script setup lang="ts">
import { ref, toRefs, onMounted } from "vue"
import request from '@/utils/request'
// 传值
const props = defineProps({
    cat_id: { type: [Number, Array], default: null },
    multiple: { type: Boolean, default: false },
    minWidth: { type: String, default: '' },
})
const treeProps = { label: 'cat_name', value: 'cat_id', children: 'children' }
// 文章列表
const articleCatList = ref([
    { cat_name: '请选择...', cat_id: 0 }
]);
const total = ref(0);
const loaded = ref(false)
// 给父组件传值
const emit = defineEmits(['update:cat_id'])
onMounted(async () => {
    loadList();
});

function loadList() {
    if (loaded.value == false) {
        request({
            url: 'content/article_cat/list',
            method: 'post',
            data: {
                ids: props.cat_id,
            }
        }).then((result: any) => {
            articleCatList.value.push(...result.filter_result)
            total.value = result.total
        })
    } else {
        articleCatList.value = [];
        total.value = 0
    }

}
</script>

<style lang="less" scoped></style>
