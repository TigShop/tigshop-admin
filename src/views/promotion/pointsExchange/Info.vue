<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-form-table">
                <el-form v-if="!loading" ref="formRef" :model="formState" label-width="auto">
                    <el-form-item prop="product_id" label="选择商品">
                        <SelectProduct :isMultiple="false" v-model:ids="formState.product_id"></SelectProduct>
                    </el-form-item>
                    <el-form-item prop="exchange_integral" label="兑换积分" :rules="[{ required: true, message: '兑换积分不能为空!' }]">
                        <el-input type="number" v-model="formState.exchange_integral" />
                    </el-form-item>
                    <el-form-item prop="points_deducted_amount" label="减免金额" :rules="[{ required: true, message: '减免金额不能为空!' }]">
                        <el-input type="number" v-model="formState.points_deducted_amount" />
                    </el-form-item>
                    <el-form-item prop="is_enabled" label="兑换">
                        <el-radio-group v-model="formState.is_enabled">
                            <el-radio :value="1">是</el-radio>
                            <el-radio :value="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item prop="is_hot" label="是否热销">
                        <el-radio-group v-model="formState.is_hot">
                            <el-radio :value="1">是</el-radio>
                            <el-radio :value="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item v-show="!props.isDialog" :wrapper-col="{ offset: 4, span: 16 }">
                        <el-button ref="submitBtn" class="form-submit-btn" type="primary" @click="onSubmit">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, shallowRef, onMounted } from "vue"
import { useRouter } from 'vue-router'
import { message } from "ant-design-vue";
import { PointsExchangeFormState } from '@/types/promotion/pointsExchange.d';
import { getPointsExchange, updatePointsExchange } from "@/api/promotion/pointsExchange";
import { SelectProduct } from '@/components/select'
const emit = defineEmits(["submitCallback", "update:confirmLoading", "close"]);

const props = defineProps({
    id: {
        type: Number,
        default: 0
    },
    act: {
        type: String,
        default: ""
    },
    isDialog: Boolean
});
const loading = ref<boolean>(true);
const query = useRouter().currentRoute.value.query;
const action = ref<string>(props.isDialog ? props.act : String(query.act));
const id = ref<number>(props.isDialog ? props.id : Number(query.id));
const operation = action.value === 'add' ? 'create' : 'update';
const formRef = shallowRef();
const formState = ref<PointsExchangeFormState>({
    product_id:'',
    is_enabled: 1,
    is_hot: 0
});

onMounted(() => {
    if (action.value === "detail") {
        // 获取详情数据
        fetchPointsExchange();
    } else {
        loading.value = false;
    }
});
const fetchPointsExchange = async () => {
    try {
        const result = await getPointsExchange(action.value, { id: id.value });
        if(result.item.product_id){
            result.item.product_id = [result.item.product_id]
        }
        Object.assign(
            formState.value,
            result.item
        )
    } catch (error: any) {
        message.error(error.message);
        emit('close');
    } finally {
        loading.value = false;
    }
};


// 表单通过验证后提交
const onSubmit = async () => {
    try {
        
        await formRef.value.validate();
        emit('update:confirmLoading', true);
        let params = JSON.parse(JSON.stringify(formState.value))
        if(params.product_id){
            params.product_id = params.product_id[0]
        }else{
            message.error('请选择商品!');
            return
        }
        const result = await updatePointsExchange(operation, { id: id.value, ...params });
        emit('submitCallback', result);
        message.success(result.message);
    } catch (error: any) {
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