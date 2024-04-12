<template>
    <el-select v-model="selectedCompanyId" class="full-width" filterable>
        <el-option :value="0" label="请选择..."></el-option>
        <el-option
          v-for="company in logisticsCompanies"
          :key="company.logistics_id"
          :label="company.logistics_name"
          :value="company.logistics_id"
        />
    </el-select>
</template>

<script lang="ts" setup>
import {computed, onMounted, ref} from "vue";
import {message} from "ant-design-vue";
import {getLogisticsCompanyAll} from "@/api/setting/logisticsCompany";
import {LogisticsCompanyFilterState} from "@/types/setting/logisticsCompany";

const props = defineProps({
    id: {type: Number, default: null},
})
const emit = defineEmits(['update:id']);
const selectedCompanyId = computed({
    get: () => props.id,
    set: (newValue) => emit('update:id', newValue)
});

const logisticsCompanies = ref<LogisticsCompanyFilterState[]>();
onMounted(async () => {
    try {
        const result = await getLogisticsCompanyAll({paging: false});
        console.log(result);
        logisticsCompanies.value = result.filter_result;
    } catch (error:any) {
        message.error(error.message);
    }
});
</script>

<style lang="less" scoped>
.full-width {
    width: 100%;
}
</style>
