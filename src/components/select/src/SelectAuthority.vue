<template>
    <el-cascader class="cascader" :props="cascaderProps" :disabled="disabled" placeholder="顶级权限" :options="options" v-model="ids" clearable @change="onChange" @clear="onClear"
                 @visible-change="visibleChange" />
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue"
import request from '@/utils/request'

import { ElCascader } from 'element-plus'
import {batchSubmit, getAllAuthority} from "@/api/authority/authority";
import { AuthorityFormState } from '@/types/authority/authority';
import {message} from "ant-design-vue";
// import 'element-plus/es/components/cascader/style/css'
// 传值
const props = defineProps({
    authority_id: { type: [Number, Array], default: 0 },
    multiple: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
})
const cascaderProps = { label: 'authority_name', value: 'authority_id', children: 'children', multiple: props.multiple, checkStrictly: true }
//选项卡
const options = ref<AuthorityFormState[]>([]);
const loaded = ref(false)
// 当前值
const ids = ref()
// 手动控制显示和隐藏
const open = ref(false)
// 给父组件传值
const emit = defineEmits(['update:authority_id'])

// 加载分类
onMounted(() => {
    if (props.authority_id) {
        loadCategory()
    }
});
const loadCategory = async () => {
    if (loaded.value) {
        return;
    }
    loaded.value = true
    try {
        const result = await getAllAuthority();
        options.value = result.item
        ids.value = props.authority_id
    } catch (error:any) {
        message.error(error.message);
    }
}
// 监听变化
const onChange = (ids:any) => {
    if (props.multiple == true) {
        const newArray: number[] = ids.map((subArray:any) => subArray[subArray.length - 1]);
        emit('update:authority_id', newArray)
    } else {
        emit('update:authority_id', ids ? ids[ids.length - 1] : 0)
    }
}
const visibleChange = (e:any) => {
    if (e) {
        loadCategory()
    }
}
const onClear = () => {
    if (props.multiple == true) {
        ids.value = [];
    } else {
        ids.value = 0;
    }

}
// 处理分类数组
function dealCatArr(arr:any) {
    arr = arr.flat();
    arr = buildTree(arr, 0)
    arr = processArray(arr)
    return arr
}
// 定义一个递归函数，用于处理多维数组并返回新的数组
function processArray(arr: any[]): any[] {
    return arr.map((item) => {
        if (Array.isArray(item) || typeof item === 'object') {
            if (item.children) {
                item.children = processArray(item.children);
            }
            item.isLeaf = false; // 修改为新的值
        }
        return item;
    });
}
function buildTree(categories:any, parent_id = 0) {
    const tree = [];
    for (const authority of categories) {
        if (authority.parent_id === parent_id) {
            const children = buildTree(categories, authority.authority_id);
            if (children.length) {
                authority.children = children;
            }
            tree.push(authority);
        }
    }
    return tree;
}
</script>
<style lang="less" scoped></style>
