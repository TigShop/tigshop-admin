<template>
    <a-config-provider :theme="{
        token: {
            fontSize: 12,
            borderRadius: 2,
            colorPrimary: '#1890ff',
            wireframe: true,
        },
    }" :locale="zhCnAnt" :dropdown-match-select-width="false">
        <el-config-provider :locale="zhLocale">
            <RouterView />
        </el-config-provider>
    </a-config-provider>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import zhCnAnt from 'ant-design-vue/es/locale/zh_CN';
import zhLocale from 'element-plus/dist/locale/zh-cn.mjs';

</script>
<style lang="less" scoped></style>
