<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-form-table">
                <div class="notice-warp">
                    <p> 可通过定时执行任务（比如宝塔），访问页面：http://域名/crontab.html</p>
                </div>
                <div class="table-container">
                    <a-spin :spinning="loading">
                        <el-table :data="filterState" :loading="loading" :total="total" row-key="cron_id"
                                  @selection-change="onSelectChange" @sort-change="onSortChange">
                            <el-table-column label="计划任务名称" prop="cron_name" width="180"></el-table-column>
                            <el-table-column label="计划任务描述" prop="cron_desc"></el-table-column>
                            <el-table-column label="上次执行时间" prop="last_runtime" :width="160"></el-table-column>
                            <el-table-column label="下次执行时间" prop="next_runtime" :width="160"></el-table-column>
                            <el-table-column label="开启" prop="is_enabled" :width="100">
                                <template #default="{ row }">
                                    <Switch v-model:checked="row.is_enabled" :params="{ id: row.cron_id, field: 'is_enabled' }" :requestApi="updateCronsFiled"/>
                                </template>
                            </el-table-column>
                            <el-table-column :width="100" fixed="right" label="操作">
                                <template #default="{ row }">
                                    <DialogForm :params="{ act: 'edit', id: row.cron_id }" isDrawer path="setting/crons/Info"
                                                title="编辑计划任务" width="600px"
                                                @okCallback="loadFilter">
                                        <a class="btn-link">编辑</a>
                                    </DialogForm>
                                    <el-divider direction="vertical"/>
                                    <DeleteRecord :params="{ id: row.cron_id }" :requestApi="delBrand"
                                                  @afterDelete="loadFilter">执行
                                    </DeleteRecord>
                                </template>
                            </el-table-column>
                            <template #empty>
                                <div class="empty-warp">
                                    <div v-if="!loading" class="empty-bg">暂无数据</div>
                                </div>
                            </template>
                        </el-table>
                    </a-spin>
                    <div v-if="total > 0" class="pagination-con">
                        <Pagination v-model:page="filterParams.page" v-model:size="filterParams.size" :total="total" @callback="loadFilter"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import '@/style/css/list.less'
import {DialogForm} from '@/components/dialog'
import {onMounted, reactive, ref} from 'vue';
import {DeleteRecord, Pagination, Switch} from '@/components/list';
import {message} from 'ant-design-vue'
import {useConfigStore} from "@/store/config";
import type {CronsFilterParams, CronsFilterState} from '@/types/setting/crons';
import {batchSubmit, getCronsList, updateCronsFiled} from "@/api/setting/crons";
import {delBrand} from "@/api/product/brand";
import type {RegionFilterState} from "@/types/setting/region";

const config:any = useConfigStore();
// 基本参数定义
const filterState = ref<CronsFilterState[]>();
const loading = ref<boolean>(true);
const total = ref<number>(0);
const selectedIds = ref<number[]>([]);
const advancedSearch = ref<boolean>(false);
const filterParams = reactive<CronsFilterParams>({
    page: 1,
    size: config.get('page_size'),
    sort_field: '',
    sort_order: '',
});

// 获取列表的查询结果
const loadFilter = async () => {
    loading.value = true;
    try {
        const result = await getCronsList({...filterParams});
        filterState.value = result.filter_result;
        total.value = result.total;
    } catch (error:any) {
        message.error(error.message);
    } finally {
        loading.value = false;
    }
}
onMounted(() => {
    loadFilter();
});

// 参数查询
const onSearchSubmit = () => {
    loadFilter()
};
// 修改排序
const onSortChange = ({prop, order}: { prop: string; order?: string }) => {
    filterParams.sort_field = prop;
    filterParams.sort_order = order == 'ascending' ? 'asc' : order == 'descending' ? 'desc' : '';
    loadFilter();
};

// 批量操作
const onBatchSubmit = async (action: string) => {
    try {
        const result = await batchSubmit(action, {ids: selectedIds.value});
        message.success(result.message);
        loadFilter();
    } catch (error:any) {
        message.error(error.message);
    }
};
// 多选操作
const onSelectChange = (e:CronsFilterState[]) => {
    selectedIds.value = e.map((item) => item.cron_id);
};
</script>
<style lang="less" scoped>
.notice-warp {
    background-color: #eef2ff;
    border-radius: 9px;
    padding: 15px;
    margin-bottom: 20px;
    line-height: 24px;
}
</style>
