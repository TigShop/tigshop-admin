<template>
    <el-select
        v-model="brand_id"
        :allowClear="true"
        :fieldNames="fieldNames"
        :filter-option="filterOption"
        clearable
        filterable
        placeholder="选择品牌"
        popper-class="brand-select"
        show-search
        @change="onChange"
        @visible-change="loadBrand">
        <template #default>
            <div class="option">
                <div v-if="firstWordList" class="all_brand">
                    <ul>
                        <li :class="firstWord == '全部' ? 'current' : ''">
                            <a @click="changeBrandWord($event, '全部')">全部</a>
                        </li>
                        <li v-for="(item, key) in firstWordList" :class="firstWord == item ? 'current' : ''">
                            <a @click="changeBrandWord($event, item)">{{ item }}</a>
                        </li>
                    </ul>
                    <el-divider style="margin: 4px 0 12px" />
                </div>
                <div class="right">
                    <div class="scroll-container">
                        <el-option v-for="item in options" :key="item.brand_id" :label="item.brand_name" :value="item.brand_id">
                            {{ item.brand_name }}
                        </el-option>
                    </div>
                </div>
            </div>
        </template>
        <template #empty>
            <a-spin :spinning="!loaded" size="small" style="width: 100%; padding-top: 150px" />
        </template>
    </el-select>
</template>
<script lang="ts" setup>
import { onMounted, ref, defineModel } from "vue";
import { message } from "ant-design-vue";
import { getBrandSearch } from "@/api/product/brand";
import { BrandFilterState } from "@/types/product/brand";
// 传值
const props = defineProps({
    //multiple 是否多选，可直接写在父组件
    firstWordList: {type: Array as propType<string[]>, default: () => []},
    brandList: {type: Array as propType<BrandFilterState[]>, default: () => []},
    allBrandList: {type: Array as propType<BrandFilterState[]>, default: () => []},
});
const brand_id = defineModel<any>("brand_id");
const brand_form = defineModel<any>("brand_form");
const fieldNames = { label: "brand_name", value: "brand_id" };
const filterOption = (input: string, option: any) => {
    return option.brand_name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
const onChange = (e: any) => {
    options.value.map((subArray: any) => {
        if (subArray.brand_id == e) {
            brand_form.value = subArray;
        }
    });
    brand_id.value = e;
    firstWord.value = "全部";
};
onMounted(() => {
    if(props.brandList && props.firstWordList && props.allBrandList){
        options.value = props.brandList;
        firstWordList.value = props.firstWordList;
        allBrandList.value = props.allBrandList;
    }else{
        loadBrand();
    }
});

const loaded = ref(false);
const firstWord = ref("全部");
//首字母列表
const firstWordList = ref<string[]>([]);
// 实际数据
const options = ref<BrandFilterState[]>([]);
// 全部品牌
const allBrandList = ref<BrandFilterState[]>([]);
const loadBrand = async () => {
    try {
        const result = await getBrandSearch();
        firstWordList.value = result.firstword_list;
        options.value = result.brand_list;
        allBrandList.value = result.brand_list;
    } catch (error: any) {
        message.error(error.message);
    } finally {
        loaded.value = true;
    }
};

const changeBrandWord = (e: any, keywords: string) => {
    console.log(keywords);
    firstWord.value = keywords;
    if (keywords == "全部") {
        options.value = allBrandList.value;
        return;
    }
    options.value = allBrandList.value.filter((item) => {
        return item.first_word == keywords;
    });
};
</script>

<style lang="less" scoped>
.option {
    display: flex;
    overflow: hidden;
    /* 确保所有溢出都在子元素中处理 */
    max-height: 590px !important;
    height: 320px;

    .all_brand {
        width: 50px;
        overflow: hidden;
        border-right: 1px solid #eee;
    }

    .right {
        overflow: auto;
        flex: 1;
    }
}

.all_brand ul {
    width: 80px;
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
    justify-content: left;
    padding-top: 5px;
}

.all_brand ul li {
    width: 50px;
    box-sizing: border-box;
    padding: 0 5px;
}

.all_brand li a {
    width: 100%;
    padding: 3px 0;
    text-align: center;
    display: inline-block;
    border-radius: 3px;
    line-height: 20px;
    color: #666;
}

.all_brand li.current a {
    color: var(--tig-primary);
}

.all_brand li a:hover {
    background: #f4f4f4;
}
</style>
