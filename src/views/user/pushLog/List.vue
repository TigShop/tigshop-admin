<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-table-list-warp">
                <div class="list-table-tool lyecs-search-warp">
                    <el-form :model="filterParams">
                        <div class="list-table-tool-row">
                            <div class="list-table-tool-col">
                                <el-space>
                                    <DialogForm :params="{ act: 'add' }" isDrawer path="user/pushLog/Info"
                                                title="添加推送" width="600px"
                                                @okCallback="loadFilter">
                                        <el-button type="primary">添加推送</el-button>
                                    </DialogForm>
                                    <el-input v-model="filterParams.keyword" name="keyword" placeholder="输入标题">
                                        <template #append>
                                            <el-button @click="onSearchSubmit"><span class="iconfont icon-chakan1"></span>
                                            </el-button>
                                        </template>
                                    </el-input>
                                </el-space>
                            </div>
                        </div>
                    </el-form>
                </div>
                <div class="table-container">
                    <a-spin :spinning="loading">
                        <el-table :data="filterState" :loading="loading" :total="total" row-key="message_log_id"
                                  @selection-change="onSelectChange" @sort-change="onSortChange">
                            <el-table-column type="selection" width="32"/>
                            <el-table-column label="标题" prop="message_title"></el-table-column>
                            <el-table-column label="内容" prop="message_content"></el-table-column>
                            <el-table-column label="链接" prop="message_link"></el-table-column>
                            <el-table-column :width="100" label="发送类型" prop="send_type_name"></el-table-column>
                            <el-table-column :width="100" label="发送状态" prop="brand_id">
                                <template #default="{ row }">
                                    <span :style="{ color: row.is_recall === 0 ? 'green' : 'red' }">{{ row.status_name }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column :width="160" label="发送日期" prop="send_time"></el-table-column>
                            <el-table-column :width="100" fixed="right" label="操作">
                                <template #default="{ row }">
                                    <DeleteRecord :params="{ id: row.brand_id }" :requestApi="recallPushLog"
                                                  @afterDelete="loadFilter">撤回
                                    </DeleteRecord>
                                    <el-divider direction="vertical"/>
                                    <DeleteRecord :params="{ id: row.brand_id }" :requestApi="delPushLog"
                                                  @afterDelete="loadFilter">删除
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
                        <Pagination v-model:page="filterParams.page" v-model:size="filterParams.size" :total="total"
                                    @callback="loadFilter"/>
                    </div>
                </div>
                <div v-if="selectedIds.length > 0" class="selected-action-warp">
                    <div class="selected-action">
                        <el-space>
                            <span>已选择：<b>{{ selectedIds.length }}</b> 项</span>
                            <el-popconfirm title="您确认要批量撤回所选数据吗？"
                                           @confirm="onBatchSubmit('recall')">
                                <template #reference>
                                    <el-button>批量撤回</el-button>
                                </template>
                            </el-popconfirm>
                            <el-popconfirm title="您确认要批量删除所选数据吗？"
                                           @confirm="onBatchSubmit('del')">
                                <template #reference>
                                    <el-button>批量删除</el-button>
                                </template>
                            </el-popconfirm>
                        </el-space>
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
import {DeleteRecord, Pagination} from '@/components/list';
import {message} from 'ant-design-vue'
import {useConfigStore} from "@/store/config";
import {PushLogFilterParams, PushLogFilterState} from '@/types/user/pushLog';
import {batchSubmit, delPushLog, getPushLogList, recallPushLog} from "@/api/user/pushLog";

const config = useConfigStore();
// 基本参数定义
const filterState = ref<PushLogFilterState[]>([]);
const loading = ref<boolean>(true);
const total = ref<number>(0);
const selectedIds = ref<number[]>([]);
const advancedSearch = ref<boolean>(false);
const filterParams = reactive<PushLogFilterParams>({   //初使化用于查询的参数
    page: 1,
    size: config.get('page_size'),
    sort_field: '',
    sort_order: '',
    keyword: '',
});
// 获取列表的查询结果
const loadFilter = async () => {
    loading.value = true;
    try {
        const result = await getPushLogList({...filterParams});
        filterState.value = result.filter_result;
        total.value = result.total;
    } catch (error: any) {
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
    } catch (error: any) {
        message.error(error.message);
    }
};
// 多选操作
const onSelectChange = (e: PushLogFilterState[]) => {
    selectedIds.value = e.map((item) => item.brand_id);
};

// 更新首字母
// const onUpdateFirstWorld = async () => {
//     try {
//         const result = await updateFirstWorld();
//         message.success(result.message);
//         loadFilter();
//     } catch (error) {
//         message.error(error.message);
//     }
// }

</script>
