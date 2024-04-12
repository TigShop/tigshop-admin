<template>
    <div class="pagination">
        <el-pagination
            class="pagination"
            @size-change="sizeChange"
            @current-change="pageChange"
            :current-page="page"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="size"
            :background="props.background"
            :layout="props.layout"
            :total="total">
            <template #default> 第{{ (page - 1) * size + 1 }}-{{ page * size }} 条 / 总共 {{ total }} 条 </template>
        </el-pagination>
    </div>
</template>
<script setup lang="ts">
// 不使用a-switch，增加表格渲染速度
import { ref } from "vue";
const props = defineProps({
    page: {
        type: Number,
        default: 1,
    },
    size: {
        type: Number,
        default: 10,
    },
    total: {
        type: Number,
        default: 10,
    },
    layout: {
        type: String,
        default: "slot ,prev, pager, next, sizes",
    },
    background: {
        type: Boolean,
        default: true,
    },
});
const emit = defineEmits(["update:page", "update:size", "callback"]);
// 修改页面显示数量
const sizeChange = (value: number) => {
    emit("update:size", value);
    emit("callback", value);
};
// 翻页
const pageChange = (value: number) => {
    emit("update:page", value);
    emit("callback", value);
};
</script>
<style lang="less" scoped>
.pagination {
    :deep(.el-select) {
        min-width: 100px !important;
        width: 100px !important;
    }
}
</style>
