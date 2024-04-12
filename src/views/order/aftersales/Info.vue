<template>
    <div class="container">
        <div class="content_wrapper">
            <!-- <Image :src="imageFormat(pic_thumb)" fit="contain"/> -->
            <div class="lyecs-form-table">
                <el-form v-if="!loading" ref="formRef" :model="formState" label-width="auto">
                    <el-form-item label="商品" prop="order_id">
                        <Image :src="imageFormat(formState.pic_thumb)" fit="contain" width="80"/>
                    </el-form-item>
                    <el-form-item label="所属订单" prop="order_id">
                        <p>{{formState.order_sn}}</p>
                    </el-form-item>
                    <el-form-item label="退货信息" prop="product_name">
                        <p>{{formState.product_name}} {{formState.product_sn}}</p>
                    </el-form-item>
                    <el-form-item label="数量" prop="number">
                        <p>x{{formState.number}}</p>
                    </el-form-item>
                    <el-form-item label="买家问题描" prop="description">
                        <p>x{{formState.description}}</p>
                    </el-form-item>
                    <el-form-item label="服务类型" prop="aftersale_type">
                        <el-radio-group v-model="formState.aftersale_type">
                            <el-radio v-for="(item,index) in formState.aftersales_type_config" :label="index+1">{{ item }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="退款操作" prop="description">
                        <el-button>生成退款申请</el-button>
                    </el-form-item>
                    <el-form-item label="当前操作状态" prop="status">
                        <el-radio-group v-model="formState.status">
                            <el-radio v-for="(item,index) in formState.status_config" :label="index+1">{{ item }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="修改退货数量" prop="modify_number">
                        <el-input type="number" v-model="formState.modify_number" @input="onInput"/>
                    </el-form-item>
                    <el-form-item label="回寄物流公司" prop="logistics_name">
                        <el-input v-model="formState.logistics_name"/>
                    </el-form-item>
                    <el-form-item label="回寄物流公司" prop="tracking_no">
                        <el-input v-model="formState.tracking_no"/>
                    </el-form-item>
                    <el-form-item label="当前回复内容" prop="reply">
                        <el-input type="textarea" rows="3" v-model="formState.reply"/>
                    </el-form-item>
                </el-form>
                <el-table :data="formState.aftersales_log" style="width: 100%">
                    <el-table-column prop="admin_name" label="操作者" width="90" />
                    <el-table-column prop="add_time" label="操作时间" width="180" />
                    <el-table-column label="操作信息">
                        <template #default="scope">
                            <div>
                                <span>操作备注：{{ scope.row.log_info }}</span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {imageFormat} from "@/utils/format";
import {Image} from "@/components/image";
import {onMounted, ref, shallowRef} from "vue"
import {useRouter} from 'vue-router'
import {message} from "ant-design-vue";
import {FormAddGallery} from '@/components/gallery'
import {FormState} from '@/types/order/aftersales';
import {getAftersales, updateAftersales} from "@/api/order/aftersales";

// 父组件回调
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
const operation = action.value === 'add' ? 'insert' : 'update';
const formRef = shallowRef();
const formState = ref<FormState>({
    pic_thumb: "",
    number: 1
});
const fetchBrand  = async () => {
    try {
        const result = await getAftersales(action.value, { id: id.value });
        Object.assign(
          formState.value,
          result.item
        )
        formState.value.aftersales_type_config = toArray(formState.value.aftersales_type_config)
        formState.value.status_config = toArray(formState.value.status_config)
        formState.value.modify_number = formState.value.number
    } catch (error:any) {
        message.error(error.message);
        emit('close');
    } finally {
        loading.value = false;
    }
};
const toArray = (arr:any) => {
  if (typeof arr == 'object') {
    var newArr = [];

    for (let i in arr) {
      newArr.push(arr[i]);
    }
    return newArr;
  } else {
    return arr;
  }
};
const onInput = (e:number) => {
    if(e > formState.value.number){
        formState.value.modify_number = formState.value.number
    }
    if(e < 1){
        formState.value.modify_number = 1
    }
}

onMounted(() => {
    // 获取详情数据
    fetchBrand();
});

// 表单通过验证后提交
const onSubmit = async () => {
    try {
        await formRef.value.validate();
        emit('update:confirmLoading', true);
        const result = await updateAftersales(operation, { id: id.value, ...formState.value });
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
