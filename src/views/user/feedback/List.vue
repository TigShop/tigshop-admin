<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-table-list-warp">
                <div class="list-table-tool lyecs-search-warp">
                    <el-form :model="filterParams">
                        <div class="list-table-tool-row">
                            <div class="list-table-tool-col">
                                <el-space>
                                    <el-select v-model="filterParams.type">
                                        <el-option label="所有类型" :value="-1"/>
                                        <el-option label="建议" :value="0"/>
                                        <el-option label="投诉" :value="1"/>
                                        <el-option label="商品" :value="2"/>
                                        <el-option label="其他" :value="3"/>
                                        <el-option label="店铺投诉" :value="4"/>
                                        <el-option label="订单问题" :value="5"/>
                                    </el-select>
                                    <el-input v-model="filterParams.keyword" name="keyword" placeholder="输入留言内容">
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
                        <el-table :data="filterState" :loading="loading" :total="total" row-key="rank_id"
                                  @selection-change="onSelectChange" @sort-change="onSortChange">
                            <el-table-column type="selection" width="32"/>
                            <el-table-column :width="120" label="会员名称" prop="username"></el-table-column>
                            <el-table-column label="类型" prop="type_name">
                                <template #default="{ row }">
                                    <p>{{ row.type_name}}</p>
                                    <div style="color: #999;" v-if="row.store_id && row.order_info">
                                        {{ row.order_info.order_sn }}
                                    </div>
                                    <div style="color: #999;" v-if="row.store_id">
                                        {{ row.store.store_title }}
                                    </div>
                                    <div style="color: #999;" v-if="row.product_id">
                                        {{ row.product.product_name }}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="留言内容" prop="content">
                                <template #default="{ row }">
                                    {{ row.content}}
                                </template>
                            </el-table-column>
                            <el-table-column :width="160" label="留言时间" prop="add_time"></el-table-column>
                            <!-- <el-table-column :width="100" label="状态" prop="status_name"></el-table-column> -->
                            <el-table-column :width="80" label="回复" prop="status_name"></el-table-column>
                            <el-table-column :width="150" fixed="right" label="操作">
                                <template #default="{ row }">
                                    <DialogForm :params="{ act: 'detail', id: row.id }" isDrawer
                                                path="user/feedback/Info"
                                                title="编辑会员留言" width="600px"
                                                @okCallback="loadFilter">
                                        <a class="btn-link">编辑</a>
                                    </DialogForm>
                                    <el-divider direction="vertical"/>
                                    <DeleteRecord :params="{ id: row.id }" :requestApi="delFeedback"
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
                            <el-popconfirm title="您确认要批量删除所选数据吗？"
                                           @confirm="onBatchSubmit('del')">
                                <template #reference>
                                    <el-button>允许显示</el-button>
                                </template>
                            </el-popconfirm>
                            <el-popconfirm title="您确认要批量删除所选数据吗？"
                                           @confirm="onBatchSubmit('del')">
                                <template #reference>
                                    <el-button>禁止显示</el-button>
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
import {PopForm} from '@/components/pop-form'
import {onMounted, reactive, ref} from 'vue';
import {DeleteRecord, Pagination, Switch} from '@/components/list';
import {Image} from '@/components/image';
import {message} from 'ant-design-vue'
import {useConfigStore} from "@/store/config";
import {FeedbackFilterParams, FeedbackFilterState} from '@/types/user/feedback.d';
import {batchSubmit, delFeedback, getFeedbackList, updateFeedbackField} from "@/api/user/feedback";

const config:any = useConfigStore();
// 基本参数定义
const filterState = ref(<FeedbackFilterState[]>[]);
const loading = ref<boolean>(true);
const total = ref<number>(0);
const selectedIds = ref<number[]>([]);
const advancedSearch = ref<boolean>(false);
const filterParams = reactive<FeedbackFilterParams>({   //初使化用于查询的参数
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
        const result = await getFeedbackList({...filterParams});
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
        await loadFilter();
    } catch (error:any) {
        message.error(error.message);
    }
};
// 多选操作
const onSelectChange = (e: FeedbackFilterState[]) => {
    selectedIds.value = e.map((item:any) => item.id);
};


</script>
