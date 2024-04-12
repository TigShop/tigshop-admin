<template>
    <el-select v-model="rank_id">
        <el-option
          :key="0"
          label="请选择..."
          :value="0"
        />
        <el-option
          v-for="item in options"
          :key="item.rank_id"
          :label="item.rank_name"
          :value="item.rank_id"
        />
    </el-select>
</template>
<script lang="ts" setup>
import {getUserRankList} from "@/api/user/userRank";
import {message} from "ant-design-vue";
import {computed, onMounted, reactive, ref} from "vue";
import {UserRankFilterParams,UserRankFilterState} from "@/types/user/userRank";

const props = defineProps({
    modelValue: {type: Number},
})
const emit = defineEmits([
    "update:modelValue",
])
const rank_id = computed({
    get: () => {
        return props.modelValue
    },
    set: (newValue) => {
        emit('update:modelValue', newValue)
    }
})

const filterParams = reactive<UserRankFilterParams>({   //初使化用于查询的参数
    page: 1,
    size: 9999,
    sort_field: '',
    sort_order: '',
});
const options = ref<UserRankFilterState[]>([])
const loadFilter = async () => {
    try {
        const result = await getUserRankList({...filterParams});
        options.value = result.filter_result;

    } catch (error:any) {
        message.error(error.message);
    } finally {

    }
}
onMounted(() => {
    loadFilter();
});
</script>
<style lang="less" scoped>

</style>
