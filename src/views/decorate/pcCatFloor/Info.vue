<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-form-table">
                <el-form v-if="!loading" ref="formRef" :model="formState" label-width="auto">
                    <el-form-item label="添加分类" prop="brand_name">
                        <DynamicList v-model:modelValue="formState.category_list" :templateList="['category_id', 'category_name']" :templateListType="['number', 'string']"
                            buttonName="增加" buttonType="primary" style="width: 100%">
                            <template #dynamicSlot="{ item }">
                                <div class="dynamic-div">
                                    <SelectCategory v-if="!loading" v-model:category_id="(item as CategoryListItem).category_id" :multiple="false" style="width: 100%"></SelectCategory>
                                    <span>重命名：</span>
                                    <el-input v-model="(item as CategoryListItem).category_name"></el-input>
                                </div>
                            </template>
                        </DynamicList>
                        <div class="extra">提示：只能设置为一级或二级分类，且必须含有一个一级分类，如果存在二级分类，则必须存在该二级分类上一级分类；</div>
                        <div class="extra">重命名为空则显示原分类名称，重命名的作用为方便排列</div>
                        <div class="extra">设置规则如下：</div>
                        <div class="extra">1、如果添加的分类为一级分类A、B、C，则抽屉一级会显示：A/B/C三个链接，二级为A、B、C下的所有二级分类</div>
                        <div class="extra">2、如果添加的分类为一级分类A和A下面的二级分类a1、a2，则，会显示A/a1/a2三个链接，二级为A下的所有二级分类（包含了a1、a2）</div>
                        <div class="extra">3、如果重命名为“-”符号，则不会显示</div>
                    </el-form-item>
                    <el-form-item label="热门品牌" prop="brand_list">
                        <DynamicList v-model:modelValue="formState.brand_list" :templateList="['brand_id']" :templateListType="['number']" buttonName="增加" buttonType="primary"
                            style="width: 100%">
                            <template #dynamicSlot="{ item }">
                                <div class="dynamic-div">
                                    <SelectBrand v-model="(item as CategoryListItem).brand_id" style="width: 100%"></SelectBrand>
                                </div>
                            </template>
                        </DynamicList>
                    </el-form-item>
                    <el-form-item label="ICO编码" prop="floor_ico_font">
                        <SelectIco v-model="formState.floor_ico_font"></SelectIco>
                        <div class="extra">请先在LYECS设置中的"接口设置"中设置"ico图标库地址"</div>
                    </el-form-item>
                    <el-form-item label="排序" prop="sort_order">
                        <el-input v-model="formState.sort_order" />
                    </el-form-item>
                    <el-form-item label="是否显示" prop="is_show">
                        <el-radio-group v-model="formState.is_show">
                            <el-radio :value="1">是</el-radio>
                            <el-radio :value="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item v-show="!props.isDialog" :wrapper-col="{ offset: 4, span: 16 }">
                        <el-button ref="submitBtn" class="form-submit-btn" type="primary" @click="onSubmit">提交</el-button>
                    </el-form-item>
                </el-form>
                <a-spin :spinning="loading" style="width:100%;margin-top:100px" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, shallowRef } from "vue"
import { useRouter } from 'vue-router'
import { message } from "ant-design-vue";
import type { CategoryListItem, PcCatFloorFormState } from '@/types/decorate/pcCatFloor.d';
import { getPcCatFloor, updatePcCatFloor } from "@/api/decorate/pcCatFloor";
import DynamicList from "@/components/list/src/DynamicList.vue";
import { SelectBrand, SelectCategory } from "@/components/select";
import SelectIco from "@/components/select/src/SelectIco.vue";
// 父组件回调
const emit = defineEmits(["submitCallback", "update:confirmLoading", "close"]);

const props = defineProps({
    id: {
        type: Number,
        default: 0 // 如果在您的应用中 0 有特殊意义，请选择一个合适的默认值
    },
    act: {
        type: String,
        default: '' // 默认为空字符串
    },
    isDialog: {
        type: Boolean,
        default: false // 默认为 false
    }
});

const loading = ref<boolean>(true);
const query = useRouter().currentRoute.value.query;
const action = ref<string>(props.isDialog ? props.act : String(query.act));
const id = ref<number>(props.isDialog ? props.id : Number(query.id));
const operation = action.value === 'add' ? 'create' : 'update';
const formRef = shallowRef();
const formState = ref<PcCatFloorFormState>({
    is_show:1,
    sort_order:50
});
const fetchPcCatFloor = async () => {
    try {
        const result = await getPcCatFloor(action.value, { id: id.value });
        Object.assign(
            formState.value,
            result.item
        )
        if (result.item.category_ids && result.item.category_names && result.item.category_ids?.length === result.item.category_names?.length) {
            formState.value.category_list = result.item.category_ids.map((id, index) => {
                return {
                    category_id: Number(id),
                    category_name: result.item.category_names?.[index] || ''
                };
            });
            formState.value.brand_list = result.item.brand_ids?.map((id, index) => {
                return {
                    brand_id: Number(id),
                };
            });
        }
    } catch (error: any) {
        message.error(error.message);
        emit('close');
    } finally {
        loading.value = false;
    }
};


onMounted(() => {
    if (action.value === "detail") {
        // 获取详情数据
        fetchPcCatFloor();
    } else {
        loading.value = false;
    }
});

// 表单通过验证后提交
const onSubmit = async () => {
    await formRef.value.validate();
    try {
        emit('update:confirmLoading', true);
        processCategoryList();
        processBrandList();
        const result = await updatePcCatFloor(operation, { id: id.value, ...formState.value });
        emit('submitCallback', result);
        message.success(result.message);
    } catch (error: any) {
        message.error(error.message);
    } finally {
        emit('update:confirmLoading', false);
    }
};

function processCategoryList() {
    formState.value.category_ids = formState.value.category_ids || [];
    formState.value.category_names = formState.value.category_names || [];
    formState.value.category_ids.length = 0;
    formState.value.category_names.length = 0;
    formState.value.category_list?.forEach((item: CategoryListItem) => {
        if (typeof item.category_id === 'number' && typeof item.category_name === 'string') {
            formState.value.category_ids?.push(item.category_id);
            formState.value.category_names?.push(item.category_name);
        }
    });
}

// 分离处理 brand_list 的逻辑
function processBrandList() {
    formState.value.brand_ids = formState.value.brand_ids || [];
    formState.value.brand_ids.length = 0;
    formState.value.brand_list?.forEach((item: CategoryListItem) => {
        if (typeof item.brand_id === 'number') {
            formState.value.brand_ids?.push(item.brand_id)
        }
    });
}

// 表单提交
const onFormSubmit = () => {
    onSubmit()
};

defineExpose({ onFormSubmit });
</script>
