<template>
    <el-select
      v-model="storeId"
      :loading="loading"
      :remote-method="loadFilter"
      filterable
      :multiple="props.multiple"
      placeholder="请输入店铺名称"
      remote
      clearable
      remote-show-suffix
      reserve-keyword
      @change="onChange">
        <el-option
          v-for="item in options"
          :key="item.store_id"
          :label="item.store_title"
          :value="item.store_id"
        />
    </el-select>
</template>
<script lang="ts" setup>
import {computed, onMounted, reactive, ref} from 'vue';
import {getStoreList} from "@/api/store/store";
import {message} from "ant-design-vue";
import type {StoreFilterParams} from "@/types/store/store.d";

const props = defineProps({
    modelValue: {type: [Number,String]},
    multiple:{
        type:Boolean,
        default:false
    }
    //multiple 是否多选，可直接写在父组件
})
const loading = ref<boolean>(true);
const filterParams = reactive<StoreFilterParams>({   //初使化用于查询的参数
    page: 1,
    size: 20,
});
const emit = defineEmits(['update:modelValue'])
const storeId = ref(props.modelValue)
const onChange = (e:any) => {
    emit('update:modelValue', e)
}
onMounted(()=>{
    loadFilter()
})

const options: any = ref([])
const loadFilter = async (query?: number | string) => {
    loading.value = true;
    if (isNaN(Number(query))) {
        filterParams.store_title =String(query)
    } else {
        filterParams.store_id = Number(query)
    }
    try {
        const result = await getStoreList({...filterParams});
        options.value = result.filter_result;
    } catch (error:any) {
        message.error(error.message);
    } finally {
        loading.value = false;
    }
}
</script>
<style lang="less" scoped>

</style>
