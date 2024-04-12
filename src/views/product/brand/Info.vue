<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-form-table">
                <el-form v-if="!loading" ref="formRef" :model="formState" label-width="auto">
                    <el-form-item :rules="[{ required: true, message: '品牌名称不能为空!' }]" label="品牌名称" prop="brand_name">
                        <el-input v-model="formState.brand_name"/>
                    </el-form-item>
                    <el-form-item label="品牌LOGO" prop="brand_logo">
                        <FormAddGallery v-model:photo="formState.brand_logo"></FormAddGallery>
                        <div class="extra">请统一上传比例为2:1的图片，宽200px，高100px（高清）</div>
                    </el-form-item>
                    <el-form-item label="品牌描述" prop="brand_desc">
                        <el-input v-model="formState.brand_desc" row="2" type="textarea"/>
                    </el-form-item>
                    <el-form-item label="排序" prop="sort_order">
                        <el-input v-model="formState.sort_order"/>
                    </el-form-item>
                    <el-form-item label="首字母" prop="first_word">
                        <el-input v-model="formState.first_word"/>
                        <div class="extra">如果不填则自动生成，不过有些多音字无法准确判断，如“重”字系统则无法确认是Z还是C</div>
                    </el-form-item>
                    <el-form-item label="是否显示" prop="is_show">
                        <el-radio-group v-model="formState.is_show">
                            <el-radio :value="1">是</el-radio>
                            <el-radio :value="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="是否热门品牌" prop="brand_is_hot">
                        <el-radio-group v-model="formState.brand_is_hot">
                            <el-radio :value="1">是</el-radio>
                            <el-radio :value="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item v-show="!props.isDialog" :wrapper-col="{ offset: 4, span: 16 }">
                        <el-button ref="submitBtn" class="form-submit-btn" type="primary" @click="onSubmit">提交</el-button>
                    </el-form-item>
                </el-form>
                <a-spin :spinning="loading" style="width:100%;margin-top:100px"/>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {onMounted, ref, shallowRef} from "vue"
import {useRouter} from 'vue-router'
import {message} from "ant-design-vue";
import {FormAddGallery} from '@/components/gallery'
import {BrandFormState} from '@/types/product/brand';
import {getBrand, updateBrand} from "@/api/product/brand";
// 父组件回调
const emit = defineEmits(["submitCallback", "update:confirmLoading", "close"]);

const props = defineProps({
    id: {
        type: Number,
        default: 0
    },
    act: {
        type: String,
        default: ''
    },
    isDialog: Boolean
});
const loading = ref<boolean>(true);
const query = useRouter().currentRoute.value.query;
const action = ref<string>(props.isDialog ? props.act : String(query.act));
const id = ref<number>(props.isDialog ? props.id : Number(query.id));
const operation = action.value === 'add' ? 'insert' : 'update';
const formRef = shallowRef();
const formState = ref<BrandFormState>({});
const fetchBrand  = async () => {
    try {
        const result = await getBrand(action.value, { id: id.value });
        Object.assign(
          formState.value,
          result.item
        )
    } catch (error:any) {
        message.error(error.message);
        emit('close');
    } finally {
        loading.value = false;
    }
};


onMounted(() => {
    // 获取详情数据
    fetchBrand();
});

// 表单通过验证后提交
const onSubmit = async () => {
    await formRef.value.validate();
    try {
        emit('update:confirmLoading', true);
        const result = await updateBrand(operation, { id: id.value, ...formState.value });
        emit('submitCallback', result);
        message.success(result.message);
    } catch (error:any) {
        message.error(error.message);
    } finally {
        emit('update:confirmLoading', false);
    }
};
// 表单提交
const onFormSubmit = () => {
    onSubmit()
};

defineExpose({ onFormSubmit });
</script>
