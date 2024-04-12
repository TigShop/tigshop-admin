<template>
    <el-cascader placement="right" style="width:100%" :props="cascaderProps" placeholder="请选择地区" :options="options" v-model="ids" clearable @change="onChange" @clear="onClear" />
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue"
import request from '@/utils/request'
import { useConfigStore } from "@/store/config";
import { useRegionStore } from "@/store/region";
import { getChildRegionList, getRegion, getRegionTreeList } from "@/api/setting/region";
import type {RegionFilterParams, RegionFilterResult, RegionFormResult} from '@/types/setting/region'
import { message } from "ant-design-vue";
const config = useConfigStore();
const region = useRegionStore();
// import 'element-plus/es/components/cascader/style/css'
// 传值
const props = defineProps({
    modelValue: { type: [Array], default: [] },
    checkStrictly: { type: Boolean, default: false }
})
let id = 0;
const cascaderProps = {
    checkStrictly: props.checkStrictly,
    label: 'region_name', value: 'region_id', children: 'children'
}
//选项卡
const options = ref([]);
const loaded = ref(false)
// 当前值
const ids = ref(props.modelValue)
// 给父组件传值
const emit = defineEmits(['update:modelValue'])
// 加载分类
onMounted(() => {
    loadRegion()
});
const loadRegion = () => {
    if (loaded.value) {
        return;
    }
    let id = 0;
    ids.value = props.modelValue || [];

    loaded.value = true
    try {
        // const result =   getRegionTreeList({});
        // result.then((e)=>{
        //     options.value = e.data
        // })
        options.value = (region as any).getRegionList();
    } catch (error:any) {
        message.error(error.message);
    } finally {
        loaded.value = false
    }
}
const onChange = (ids:any) => {
    emit('update:modelValue', ids)
}
const onClear = () => {
    ids.value = [];

}
</script>
<style lang="less" scoped>
.cascader {
    width: 100%;
}
</style>
