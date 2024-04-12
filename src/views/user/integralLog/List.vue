<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-table-list-warp">
                <div class="list-table-tool lyecs-search-warp">
                    <el-form :model="filterParams">
                        <div class="list-table-tool-row">
                            <div class="list-table-tool-col">
                                <el-space>
                                    <el-input v-model="filterParams.keyword" name="keyword" placeholder="输入会员名称/手机号/邮箱">
                                        <template #append>
                                            <el-button @click="onSearchSubmit"><span class="iconfont icon-chakan1"></span> </el-button>
                                        </template>
                                    </el-input>
                                </el-space>
                            </div>
                        </div>
                    </el-form>
                </div>
                <div class="table-container">
                    <a-spin :spinning="loading">
                        <el-table :data="filterState" :loading="loading" :total="total" row-key="brand_id">
                            <el-table-column label="操作发生时间" prop="change_time"></el-table-column>
                            <el-table-column label="会员名称" prop="brand_id">
                                <template #default="{ row }">
                                    <div style="position: relative">
                                        <div>{{ row.username }}</div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column :width="200" label="操作备注" prop="change_desc"></el-table-column>
                            <el-table-column label="积分">
                                <template #default="{ row }"> {{ row.change_type == 1 ? "＋" : "－" }} {{ row.points }} </template>
                            </el-table-column>
                            <template #empty>
                                <div class="empty-warp">
                                    <div v-if="!loading" class="empty-bg">暂无数据</div>
                                </div>
                            </template>
                        </el-table>
                    </a-spin>
                    <div v-if="total > 0" class="pagination-con">
                        <Pagination v-model:page="filterParams.page" v-model:size="filterParams.size" :total="total" @callback="loadFilter" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import "@/style/css/list.less";
import { onMounted, reactive, ref } from "vue";
import { Pagination } from "@/components/list";
import { message } from "ant-design-vue";
import { useConfigStore } from "@/store/config";
import { IntegralLogFilterParams, IntegralLogFilterState } from "@/types/user/integralLog";
import { getIntegralLogList } from "@/api/user/integralLog";

const config:any = useConfigStore();
// 基本参数定义
const filterState = ref(<IntegralLogFilterState[]>[]);
const loading = ref<boolean>(true);
const total = ref<number>(0);
const filterParams = reactive<IntegralLogFilterParams>({
    //初使化用于查询的参数
    page: 1,
    size: config.get("page_size"),
    sort_field: "",
    sort_order: "",
    keyword: ""
});
// 获取列表的查询结果
const loadFilter = async () => {
    loading.value = true;
    try {
        const result = await getIntegralLogList({ ...filterParams });
        filterState.value = result.filter_result;
        total.value = result.total;
    } catch (error: any) {
        message.error(error.message);
    } finally {
        loading.value = false;
    }
};
onMounted(() => {
    loadFilter();
});

// 参数查询
const onSearchSubmit = () => {
    loadFilter();
};
</script>
