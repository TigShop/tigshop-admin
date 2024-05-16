<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-form-table">
                <el-form v-if="!loading" ref="formRef" :model="formState" label-width="auto">
                    <el-form-item :rules="[{ required: true, message: '权限名称不能为空!' }]" label="权限名称" prop="authority_name">
                        <el-input v-model="formState.authority_name"/>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true, message: '唯一编号不能为空!' }, { validator: validateEnglish, trigger: 'blur' }]" label="唯一编号" prop="authority_sn">
                        <el-input v-model="formState.authority_sn"/>
                        <div class="extra">只能为英文字母，推荐小驼峰，非目录权限则以Manage结尾，如：productManage</div>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true, message: '路由地址不能为空!' }]" label="路由地址" prop="route_link">
                        <el-input v-model="formState.route_link"/>
                        <div class="extra">格式为 product/list/ 或 product/brand/list/</div>
                    </el-form-item>
                    <el-form-item label="上级分类" prop="parent_id">
                        <SelectAuthority v-if="!loading" v-model:authority_id="formState.parent_id" :multiple="false"
                                         style="width: 100%;" :disabled="action == 'add' && !parentId"></SelectAuthority>
                    </el-form-item>
                    <el-form-item v-if="formState.parent_id===0" label="ICO编码" prop="authority_ico">
                        <SelectIco v-model="formState.authority_ico"></SelectIco>
                        <div class="extra">请先在LYECS设置中的"接口设置"中设置"ico图标库地址"</div>
                    </el-form-item>
                    <el-form-item label="排序" prop="sort_order">
                        <el-input v-model="formState.sort_order"/>
                    </el-form-item>
                    <el-form-item label="是否显示" prop="is_show">
                        <el-radio-group v-model="formState.is_show">
                            <el-radio :value="1">是</el-radio>
                            <el-radio :value="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="细分权限">
                        <DynamicList v-model="formState.child_auth" :templateList="['auth_name', 'auth_sn']" buttonName="新增细分权限">
                            <template #dynamicSlot="item">
                                <el-space :size="16">
                                    <el-space :size="0">
                                        权限名称：
                                        <el-input v-model="item.item.auth_name" placeholder="权限名称" style="width:100px"/>
                                    </el-space>
                                    <el-space :size="0">
                                        权限编码：
                                        <el-input v-model="item.item.auth_sn" placeholder="权限编码" style="width:100px"/>
                                    </el-space>
                                </el-space>
                            </template>
                        </DynamicList>
                    </el-form-item>
                    <el-form-item v-show="!props.isDialog" :wrapper-col="{ offset: 4, span: 16 }">
                        <el-button ref="submitBtn" class="form-submit-btn" type="primary" @click="onSubmit">提交
                        </el-button>
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
import {SelectAuthority} from "@/components/select";
import {useAppStore} from "@/store/app";
import type {AuthorityFormState} from "@/types/authority/authority";
import {getAuthority, updateAuthority} from "@/api/authority/authority";
import {DynamicList} from "@/components/list";
import {ElCascader} from "element-plus";
import SelectIco from "@/components/select/src/SelectIco.vue";

const appStore = useAppStore();
// 父组件回调
const emit = defineEmits([
    "submitCallback",   //确认后回调
    "update:confirmLoading",    //确认按钮的loading状态
    "close"  //关闭弹窗
])
//获取来自父组件的参数
const props = defineProps({
    id: {
        type: Number,
        default: 0
    },
    parentId: {
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
const operation = action.value === 'add' ? 'create' : 'update';
const formRef = shallowRef();
const formState = ref<AuthorityFormState>({
    child_auth: []
});

const fetchAuthority = async () => {
    try {
        const result = await getAuthority(action.value, {id: id.value});
        Object.assign(
          formState.value,
          result.item,
        )
    } catch (error: any) {
        message.error(error.message);
        emit('close');
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    if (action.value === "detail") {
        // 获取详情数据
        fetchAuthority();
    } else {
        loading.value = false;
    }
    if (operation === 'create') {
        formState.value.parent_id = props.parentId
    }
});


// 表单通过验证后提交
const onSubmit = async () => {
    try {
        await formRef.value.validate();
        emit('update:confirmLoading', true);
        const result = await updateAuthority(operation, {id: id.value, ...formState.value});
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

const validateEnglish = (rule: any, value: any, callback: any) => {
    const regex = /^[a-zA-Z]+$/;
    if (!regex.test(value)) {
        callback(new Error('只能输入英文字母'));
    } else {
        callback();
    }
};

defineExpose({onFormSubmit});

</script>
<style lang="less" scoped>
.cascader {
    width: 100%;
}
</style>
