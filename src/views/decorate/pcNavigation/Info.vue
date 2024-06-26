<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-form-table">
                <el-form v-if="!loading" ref="formRef" :model="formState" label-width="auto">
                    <el-form-item :rules="[{ required: true, message: '名称不能为空!' }]" label="名称" prop="title">
                        <el-input v-model="formState.title" />
                    </el-form-item>
                    <el-form-item label="链接地址" prop="link">
                        <SelectLink v-model="formState.link"></SelectLink>
                    </el-form-item>
                    <el-form-item  label="ICO编码" prop="icon">
                        <SelectIco v-model="formState.icon"></SelectIco>
                        <div class="extra">请先在LYECS设置中的"接口设置"中设置"ico图标库地址"</div>
                    </el-form-item>
                    <el-form-item v-if="type===2" label="上级导航" prop="parent_id">
                        <el-select style="width: 100%" v-model="formState.parent_id">
                            <el-option label="顶级导航" :value="0" :key="0"></el-option>
                            <el-option v-for="item in options" :label="item.title" :value="item.id" :key="item.id"></el-option>
                        </el-select>
                        <div class="extra">请选择相对应位置的导航，如果父导航为中间导航，那该导航必须同样设置为中间导航才会生效；</div>
                        <div class="extra">默认不选则表示为顶级导航</div>
                    </el-form-item>
                    <el-form-item label="位置" prop="type_name">
                        <el-input disabled v-model="formState.type_name" />
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
                    <el-form-item label="是否新窗口" prop="is_blank">
                        <el-radio-group v-model="formState.is_blank">
                            <el-radio :value="1">是</el-radio>
                            <el-radio :value="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item v-show="!props.isDialog" :wrapper-col="{ offset: 4, span: 16 }">
                        <el-button ref="submitBtn" class="form-submit-btn" type="primary" @click="onSubmit">提交</el-button>
                    </el-form-item>
                </el-form>
                <a-spin :spinning="loading" style="width: 100%; margin-top: 100px" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, shallowRef } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { PcNavigationFormState } from "@/types/decorate/pcNavigation";
import { getParentNav, getPcNavigation, updatePcNavigation } from "@/api/decorate/pcNavigation";
import { SelectLink } from "@/components/select";
import SelectIco from "@/components/select/src/SelectIco.vue";
// 父组件回调
const emit = defineEmits(["submitCallback", "update:confirmLoading", "close"]);

const props = defineProps({
    id: {
        type: Number,
        default: 0
    },
    type: {
        type: Number,
        default: 0
    },
    type_name: {
        type: String,
        default: ""
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
const operation = action.value === "add" ? "create" : "update";
const formRef = shallowRef();
const formState = ref<PcNavigationFormState>({
    type: props.type,
    is_show:1,
    is_blank:0
});
const fetchPcNavigation = async () => {
    try {
        const result = await getPcNavigation(action.value, { id: id.value });
        Object.assign(formState.value, result.item);
        if (operation === "create") {
            formState.value.type = props.type;
            formState.value.type_name = props.type_name;
        }
        getOptions(formState.value.type);
    } catch (error: any) {
        message.error(error.message);
        emit("close");
    } finally {
        loading.value = false;
    }
};
const options: any = ref([]);
const getOptions = async (value: number) => {
    const result = await getParentNav({ type: value });
    options.value.push(...result.filter_result);
};

onMounted(() => {
    if (action.value === "detail") {
        // 获取详情数据
        fetchPcNavigation();
    } else {
        loading.value = false;
    }
});

// 表单通过验证后提交
const onSubmit = async () => {
    try {
        await formRef.value.validate();
        emit("update:confirmLoading", true);
        const result = await updatePcNavigation(operation, { id: id.value, ...formState.value });
        emit("submitCallback", result);
        message.success(result.message);
    } catch (error: any) {
        message.error(error.message);
    } finally {
        emit("update:confirmLoading", false);
    }
};
// 表单提交
const onFormSubmit = () => {
    onSubmit();
};

defineExpose({ onFormSubmit });
</script>
