<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="notice-warp">
                <p>操作会按照后台app/admin/controller/example/example.php等基本文件进行创建，您可以自行修改example对应的控制器、模型、服务、验证器等基本文件代码</p>
                <p>提示：所生成的任何文件如果在所在目录下已存在相同名称的文件，操作会失败！</p>
            </div>
            <div class="lyecs-form-table">
                <el-form v-if="!loading" ref="formRef" :model="formState" label-width="150">
                    <el-form-item prop="catalog" label="目录名" :rules="[{ required: true, message: '目录不能为空!' }]">
                        <el-input v-model="formState.catalog" />
                        <div class="extra">必须英文，小驼峰，如：product</div>
                    </el-form-item>
                    <el-form-item prop="talbe_name" label="库表名" :rules="[{ required: true, message: '目录不能为空!' }]">
                        <el-input v-model="formState.talbe_name" />
                        <div class="extra">如：brand</div>
                    </el-form-item>
                    <el-form-item prop="name" label="中文名称" :rules="[{ required: true, message: '目录不能为空!' }]">
                        <el-input v-model="formState.name" />
                        <div class="extra">如：品牌</div>
                    </el-form-item>
                    <el-form-item prop="brand_name" label="主键字段名" :rules="[{ required: true, message: '目录不能为空!' }]">
                        <el-input v-model="formState.brand_name" />
                        <div class="extra">如：brand_id</div>
                    </el-form-item>
                    <el-form-item prop="brand_name" label="名称字段名" :rules="[{ required: true, message: '目录不能为空!' }]">
                        <el-input v-model="formState.brand_name" />
                        <div class="extra">如：brand_name</div>
                    </el-form-item>
                    <el-form-item label="">
                        <div v-if="formState.catalog && formState.talbe_name">
                            <p>将生成控制器文件：app/admin/controller/{{ formState.catalog }}/{{ capitalize(formState.talbe_name) }}.php</p>
                            <p>将生成模型层文件：app/model/{{ formState.catalog }}/{{ capitalize(formState.talbe_name) }}.php</p>
                            <p>将生成服务层文件：app/service/{{ formState.catalog }}/{{ capitalize(formState.talbe_name) }}Service.php</p>
                            <p>将生成验证器文件：app/validate/{{ formState.catalog }}/{{ capitalize(formState.talbe_name) }}Validate.php</p>
                        </div>
                    </el-form-item>
                    <el-form-item :wrapper-col="{ offset: 4, span: 16 }">
                        <a-button ref="submitBtn" class="form-submit-btn" type="primary" @click="onSubmit">提 交</a-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, shallowRef, onMounted } from "vue"
import request from '@/utils/request'
import { capitalize } from '@/utils/util'
import { message } from "ant-design-vue";
import { } from './type.d';
const formRef = shallowRef();  //表单Ref
const formState = ref(<any>{});  //表单数据
const loading = ref(false);
// 表单通过验证后提交
const onSubmit = () => {
    formRef.value.validate((valid: boolean) => {
        if (valid) {
            request({
                url: '//',
                method: 'post',
                data: {
                    id: id.value,
                    ...formState.value
                }
            }).then((result) => {
                emit("submitCallback", result);
                message.success(result.message)
            }).catch((error) => {
                message.error(error.message)
            }).finally(() => {
                setTimeout(() => { emit('update:confirmLoading', false) }, 600);
            });
        }
    })
}

</script>