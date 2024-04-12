<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-form-table">
                <el-form v-if="!loading" ref="formRef" :model="formState" label-width="auto">
                    <el-form-item label="供应商状态" prop="is_check">
                        <el-radio-group v-model="formState.is_check">
                            <el-radio-button :value="0">停用</el-radio-button>
                            <el-radio-button :value="1">启用</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true, message: '供应商名称不能为空!' }]" label="供应商名称" prop="suppliers_name">
                        <el-input v-model="formState.suppliers_name"/>
                    </el-form-item>
                    <el-form-item label="供应商备注" prop="suppliers_desc">
                        <el-input v-model="formState.suppliers_desc" row="2" type="textarea"/>
                    </el-form-item>
                    <el-form-item label="负责人姓名" prop="contact_name">
                        <el-input v-model="formState.contact_name"/>
                    </el-form-item>
                    <el-form-item label="负责人联系方式" prop="contact_phone">
                        <el-input v-model="formState.contact_phone"/>
                    </el-form-item>
                    <el-form-item label="供应商所在区域" prop="regions">
                        <SelectRegion v-if="!loading" v-model="formState.regions" style="width: 100%"></SelectRegion>
                    </el-form-item>
                    <el-form-item label="供应商地址" prop="contact_address">
                        <el-input v-model="formState.contact_address"/>
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
import {SuppliersFormState} from '@/types/authority/suppliers';
import {getSuppliers, updateSuppliers} from "@/api/authority/suppliers";
import {SelectRegion} from "@/components/select";
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
const formState = ref<SuppliersFormState>({});
const fetchSuppliers = async () => {
    try {
        const result = await getSuppliers(action.value, {id: id.value});
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
    fetchSuppliers();
});

// 表单通过验证后提交
const onSubmit = async () => {
    try {
        await formRef.value.validate();
        emit('update:confirmLoading', true);
        const result = await updateSuppliers(operation, {id: id.value, ...formState.value});
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

defineExpose({onFormSubmit});
</script>
