<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-form-table">
                <el-form v-if="!loading" ref="formRef" :model="formState" label-width="auto">
                    <el-form-item :rules="[{ required: true, message: '地区名称不能为空!' }]" label="地区名称" prop="region_name">
                        <el-input v-model="formState.region_name"/>
                    </el-form-item>
                    <el-form-item label="上级地区" prop="parent_name">
                        <el-input disabled v-model="formState.parent_name"/>
                    </el-form-item>
                    <el-form-item label="是否热门" prop="is_hot">
                        <el-radio-group v-model="formState.is_hot" style="width: 100%">
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
import type {RegionFormState} from '@/types/setting/region';
import {getRegion, getRegionList, updateRegion} from "@/api/setting/region";
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
    isDialog: Boolean,
    region_id:{
        type: Number,
        default: 0
    }
});
const loading = ref<boolean>(true);
const query = useRouter().currentRoute.value.query;
const action = ref<string>(props.isDialog ? props.act : String(query.act));
const id = ref<number>(props.isDialog ? props.id : Number(query.id));

const operation = action.value === 'add' ? 'create' : 'update';
const formRef = shallowRef();
const formState = ref<RegionFormState>({
    is_hot:0
});
const fetchRegion = async () => {
    try {
        const result = await getRegion(action.value, {id: id.value});
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
const fetchRegionList = async () => {
    try {
        const result = await getRegionList({region_id: props.region_id});
        if(result.filter_result&&result.filter_result.length>0){
            formState.value.parent_id = result.filter_result[0].region_id
            formState.value.parent_name = result.filter_result[0].region_name
        }else{
            formState.value.parent_id = 0
            formState.value.parent_name = '顶级地区'
        }
    } catch (error:any) {
        message.error(error.message);
    }
}

onMounted(() => {
    if (action.value === "detail") {
        // 获取详情数据
        fetchRegion()
    } else {
        loading.value = false;
    }
    fetchRegionList()
});
// 表单通过验证后提交
const onSubmit = async () => {
    try {
        await formRef.value.validate();
        emit('update:confirmLoading', true);
        const result = await updateRegion(operation, {id: id.value, ...formState.value});
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
