<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-table-list-warp">
                <div class="list-table-tool lyecs-search-warp">
                    <div class="notice-warp">
                        <p> 提示：特殊会员组不会随会员等级积分的变化而变化。</p>
                    </div>
                    <el-form :model="filterParams">
                        <div class="list-table-tool-row">
                            <div class="list-table-tool-col">
                                <el-space>
                                    <DialogForm :params="{ act: 'add' }" isDrawer path="user/userRank/Info"
                                                title="添加会员等级" width="600px"
                                                @okCallback="loadFilter">
                                        <el-button type="primary">添加会员等级</el-button>
                                    </DialogForm>
                                    <el-input v-model="filterParams.keyword" name="keyword" placeholder="输入等级名称">
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
                            <el-table-column :width="200" label="等级名称" prop="rank_name">
                                <template #default="{ row }">
                                    <div style="position: relative;">
                                        <PopForm v-model:org-value="row.rank_name" :max="10" :params="{ id: row.rank_id, field: 'rank_name' }"
                                                 :requestApi="updateUserRankField"
                                                 label="等级名称" type="textarea">
                                            <div>{{ row.rank_name }}</div>
                                        </PopForm>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="等级标志">
                                <template #default="{ row }">
                                    <Image :src="row.rank_ico" fit="contain" style="height: 25px;width: 60px;"/>
                                </template>
                            </el-table-column>
                            <el-table-column label="积分下限">
                                <template #default="{ row }">
                                    <PopForm v-model:org-value="row.min_growth_points" :len="1"
                                             :params="{ id: row.rank_id, field: 'min_growth_points' }"
                                             :requestApi="updateUserRankField"
                                             label="积分下限" type="input">
                                        <div>{{ row.min_growth_points || '-' }}</div>
                                    </PopForm>
                                </template>
                            </el-table-column>
                            <el-table-column label="积分上限">
                                <template #default="{ row }">
                                    <PopForm v-model:org-value="row.max_growth_points" :len="1"
                                             :params="{ id: row.rank_id, field: 'max_growth_points' }"
                                             :requestApi="updateUserRankField"
                                             label="积分上限" type="input">
                                        <div>{{ row.max_growth_points || '-' }}</div>
                                    </PopForm>
                                </template>
                            </el-table-column>
                            <el-table-column label="折扣(%)">
                                <template #default="{ row }">
                                    <PopForm v-model:org-value="row.discount" :len="1"
                                             :params="{ id: row.rank_id, field: 'discount' }"
                                             :requestApi="updateUserRankField"
                                             label="折扣(%)" type="input">
                                        <div>{{ row.discount || '-' }}</div>
                                    </PopForm>
                                </template>
                            </el-table-column>
                            <el-table-column label="等级类型" prop="rank_type_name"> </el-table-column>
                            <el-table-column label="显示价格" prop="show_price">
                                <template #default="{ row }">
                                    <Switch v-model:checked="row.show_price"
                                            :params="{ id: row.rank_id, field: 'show_price' }"
                                            :requestApi="updateUserRankField"/>
                                </template>
                            </el-table-column>
                            <el-table-column :width="150" fixed="right" label="操作">
                                <template #default="{ row }">
                                    <DialogForm :params="{ act: 'edit', id: row.rank_id }" isDrawer
                                                path="user/userRank/Info"
                                                title="编辑会员等级" width="600px"
                                                @okCallback="loadFilter">
                                        <a class="btn-link">编辑</a>
                                    </DialogForm>
                                    <el-divider direction="vertical"/>
                                    <DeleteRecord :params="{ id: row.rank_id }" :requestApi="delUserRank"
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
import {UserRankFilterParams, UserRankFilterState} from '@/types/user/userRank.d';
import {batchSubmit, delUserRank, getUserRankList, updateUserRankField} from "@/api/user/userRank";

const config:any = useConfigStore();
// 基本参数定义
const filterState = ref(<UserRankFilterState[]>[]);
const loading = ref<boolean>(true);
const total = ref<number>(0);
const selectedIds = ref<number[]>([]);
const advancedSearch = ref<boolean>(false);
const filterParams = reactive<UserRankFilterParams>({   //初使化用于查询的参数
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
        const result = await getUserRankList({...filterParams});
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
const onSelectChange = (e: UserRankFilterState[]) => {
    selectedIds.value = e.map((item:any) => item.rank_id);
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
