<template>
    <div class="lyecs-popedit">
        <slot></slot>
        <span class="lyecs-popedit-btn iconfont icon-bianji1" ref="buttonRef" @click="editBtn"></span>
        <!-- v-if="loaded" 用于优化表格中的加载性能 -->
        <div v-if="loaded" style="position:relative">
            <el-popover ref="popoverRef" :virtual-ref="buttonRef" trigger="click" placement="bottom-start" :hide-after="0" v-model:visible="visible" @confirm="onConfirm"
                @cancel="onCancel" :teleported="true" width="360px">
                <template #reference>
                    <div style="position: absolute;left:-32px;width:50px;height:5px;visibility: hidden;"></div>
                </template>
                <template #default>
                    <div class="popForm-con" style="width:100%;padding:8px 6px 5px;box-sizing: border-box;">
                        <el-form ref="formRef" :model="formState" layout="horizontal" name="form_in_modal" :wrapper-col="{ span: 38 }" :label-wrap="false">
                            <el-form-item name="paramName" :label="label" :rules="rules" :extra="extra" :max="max">
                                <el-input :type="type" v-model="formState.paramName" />
                                <div class="extra" v-if="extra">{{ extra }}</div>
                            </el-form-item>
                        </el-form>
                        <div class="flex" style="justify-content: right;">
                            <a-button size="small" style="margin-right: 10px;" @click="visible = false">取消</a-button>
                            <a-button size="small" type="primary" @click="onConfirm" :loading="loading">确认</a-button>
                        </div>
                    </div>
                </template>
            </el-popover>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, unref } from "vue"
import request from '@/utils/request'
import { message } from "ant-design-vue";
import { ClickOutside as vClickOutside } from 'element-plus'
const props = defineProps({
    orgValue: [String, Number],  //父组件使用v-model双向绑定
    url: String,
    label: { type: String, default: '编辑项' },
    extra: String,
    max: { type: Number, default: 0 },
    min: { type: Number, default: 0 },
    len: { type: Number, default: 0 },
    required: { type: Boolean, default: true },
    type: { type: String, default: 'input' },
})
const rules = ref<any>([])

rules.value.push({
    required: props.required
})
const extra = ref(props.extra);
if (props.max > 0) {
    rules.value.push({
        max: props.max
    })
    if (!extra.value) {
        extra.value = '请输入不超' + props.max + '个字符的' + props.label;
    }
}
if (props.min > 0) {
    rules.value.push({
        min: props.min
    })
    if (!extra.value) {
        extra.value = '请输入不少于' + props.min + '个字符的' + props.label;
    }
}
if (props.len > 0) {
    rules.value.push({
        len: props.len
    })
    if (!extra.value) {
        extra.value = '请输入' + props.len + '个字符的' + props.label;
    }
}


const visible = ref<Boolean>(false);
const loaded = ref<Boolean>(false);
const type = ref(props.type)
const formRef = ref();  //表单Ref
let formState = reactive<any>({  //表单数据
    paramName: props.orgValue
});
const emit = defineEmits(['update:orgValue'])
const loading = ref<Boolean>(false);

// 
const onConfirm = () => {
    return new Promise((resolve, reject) => {
        formRef.value.validate().then(() => {
            loading.value = true
            request({
                url: props.url,
                method: 'post',
                data: { val: formState.paramName }
            }).then((result: any) => {
                loading.value = false
                if (result.errcode > 0) {
                    message.error(result.message)
                    reject();
                } else {
                    emit('update:orgValue', formState.paramName)
                    message.success(result.message)
                    visible.value = false
                    resolve(true);  //相当于给show赋值false
                }
            })
        }).catch((info:any) => {
            reject();
        });
    });
}
const buttonRef = ref()
const popoverRef = ref()
const onClickOutside = () => {
    visible.value = false
}
const editBtn = () => {
    loaded.value = true;
    visible.value = true
}

const show = (e:any) => {
    visible.value = true;
}
const onCancel = () => {
    // 还原表单的值
    formState.paramName = props.orgValue
    // 清除验证信息
    formRef.value.clearValidate()
}

defineExpose({
    show,
    // close
});

</script>

<style lang="less" scoped>
.popForm-con {
    width: 370px;
    position: relative;
}

.lyecs-popedit {
    display: flex;
    position: relative;
    align-items: center;
}

.lyecs-popedit .lyecs-popedit-btn {
    cursor: pointer;
    color: #999;
    font-size: 16px;
    padding-left: 2px;
    line-height: 1;
}
</style>
