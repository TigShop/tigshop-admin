<template>

    <el-select
      style="width: 100%"
      v-model="userId"
      :loading="loading"
      :remote-method="loadFilter"
      filterable
      :multiple="props.multiple"
      placeholder="请输入会员名称"
      remote
      remote-show-suffix
      reserve-keyword>
        <el-option
          v-for="item in options"
          :key="item.user_id"
          :label="item.username"
          :value="item.user_id"
        />
    </el-select>
    <template v-if="showTips">
        <div class="extra">注意：搜索结果只显示前20条记录，如果没有找到相应会员，请更精确地查找；</div>
        <div class="extra">另外，如果该会员是从论坛注册的且没有在商城登录过，也无法找到，需要先在商城登录。</div>
    </template>
</template>
<script lang="ts" setup>
import {computed, reactive, ref} from 'vue';
import {getUserList} from "@/api/user/user";
import {message} from "ant-design-vue";
import {UserFilterParams} from "@/types/user/user";

const props = defineProps({
    user_id: {type: Number},
    user_name: {type: String, default: ''},
    showTips: {type: Boolean, default: false},
    multiple: {type: Boolean, default: true},
    //multiple 是否多选，可直接写在父组件
})
const loading = ref<boolean>(true);
const filterParams = reactive<UserFilterParams>({   //初使化用于查询的参数
    page: 1,
    size: 20,
});
const emit = defineEmits(['update:user_id'])
const userId = computed({
    get: () => props.user_id,
    set: (newValue) => emit('update:user_id', newValue)
});

const options: any = ref([])
const loadFilter = async (query?: number | string) => {
    loading.value = true;
    if (isNaN(Number(query))) {
        filterParams.username =String(query)
    } else {
        filterParams.user_id = Number(query)
    }
    try {
        const result = await getUserList({...filterParams});
        options.value = result.filter_result;
    } catch (error:any) {
        message.error(error.message);
    } finally {
        loading.value = false;
    }
}
</script>
<style lang="less" scoped>

</style>
