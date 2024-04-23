<template>
    <div>
        <div class="inp-box flex flex-align-center flex-wrap" v-if="types.length > 0" style="gap: 10px;margin-bottom:10px;">
            <div>批量填充：</div>
            <div v-for="(item, index) in types" :key="index">
                <el-input v-if="item.type == 'input'" v-model="formState[item.key]" :placeholder="item.lable" style="width: 130px;" />
                <el-select v-if="item.type == 'status'" v-model="formState[item.key]" style="width: 130px;" :placeholder="item.lable">
                    <el-option v-for="option in productStatusList" :label="option.label" :value="option.value" />
                </el-select>
                <!-- 运费模板 -->
                <el-select v-if="item.type == 'shipping_tpl'" v-model="formState[item.key]" style="width: 130px;" :placeholder="item.lable">
                    <el-option v-for="option in shippingTplList" :label="option.shipping_tpl_name" :value="option.shipping_tpl_id" />
                </el-select>
                <el-select v-if="item.type == 'select'" v-model="formState[item.key]" style="width: 130px;" :placeholder="item.lable">
                    <el-option v-for="option in selectList" :label="option.label" :value="option.value" />
                </el-select>
                <SelectCategory v-if="item.type == 'category'" v-model:category_id="formState[item.key]" :categoryList="categoryList"></SelectCategory>
                <SelectBrand v-if="item.type == 'brand'" v-model:brand_id="formState[item.key]" :firstWordList="firstWordList" :brandList="brandList" :allBrandList="allBrandList"></SelectBrand>
            </div>
            <el-button @click="onConfirm">批量填充</el-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue"
import { message,Popconfirm } from "ant-design-vue";
import { SelectBrand, SelectCategory, SelectStore } from "@/components/select";
import { CategoryFilterState } from "@/types/product/category";
import { BrandFilterState } from "@/types/product/brand";
const props = defineProps({
    // orgValue: [String, Number],  //父组件使用v-model双向绑定
    label: { type: String, default: '编辑项' },
    required: { type: Boolean, default: true },
    types: { type: Array, default: [] },
    productStatusList: { type: Array, default: [] },
    selectList: { type: Array, default: [] },
    categoryList: {type: Array as propType<CategoryFilterState[]>, default: () => []},
    firstWordList: {type: Array as propType<string[]>, default: () => []},
    brandList: {type: Array as propType<BrandFilterState[]>, default: () => []},
    allBrandList: {type: Array as propType<BrandFilterState[]>, default: () => []},
    shippingTplList: {type: Array as propType<any[]>, default: () => []},
})
const visible = ref<any>(false);
const loaded = ref<Boolean>(false);
const formRef = ref();  //表单Ref
let formState = reactive<any>({});
const emit = defineEmits(['callback'])
 
const onConfirm = () => {
    emit('callback', formState)
}

</script>

<style lang="less" scoped>
</style>
