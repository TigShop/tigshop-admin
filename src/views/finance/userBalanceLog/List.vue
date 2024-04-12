<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-table-list-warp">
                <div class="list-table-tool lyecs-search-warp">
                    <el-form :model="filterParams">
                        <div class="list-table-tool-row">
                            <div class="list-table-tool-col">
                                <el-space>
                                    <el-input v-model="filterParams.keyword" name="keyword" placeholder="输入账户变动原因">
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
                        <el-table :data="filterState" :loading="loading" :total="total" row-key="log_id">
                            <el-table-column label="账户变动时间" prop="change_time" width="160"></el-table-column>
                            <el-table-column label="会员用户名" prop="username" width="120">
                                <template #default="{ row }">
                                    <DialogForm :params="{ act: 'edit', id: row.user_id }" isDrawer
                                                path="user/user/AccountLog"
                                                :title="'会员'+row.username+'的账目明细'" width="800px"
                                                @okCallback="loadFilter">
                                        <a class="btn-link">{{ row.username }}</a>
                                    </DialogForm>
                                </template>
                            </el-table-column>
                            <el-table-column label="账户变动原因" prop="change_desc"></el-table-column>
                            <el-table-column label="变动资金账户" width="250">
                                <template #default="{ row }">
                                    <span v-if="row.change_type===1" style="color:#0000FF">+{{ row.balance }}</span>
                                    <span v-else-if="row.change_type===2" style="color:#FF0000">-{{ row.balance }}</span>
                                    <span v-else>{{ row.balance }}</span>
                                    <span v-if="row.after_balance" style="color:#999;font-size:12px">（变更后金额:{{ row.after_balance}}）</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="冻结资金账户" width="250">
                                <template #default="{ row }">
                                    <span v-if="row.change_type===1" style="color:#0000FF">+{{ row.frozen_balance }}</span>
                                    <span v-else-if="row.change_type===2" style="color:#FF0000">-{{ row.frozen_balance }}</span>
                                    <span v-else>{{ row.frozen_balance }}</span>
                                    <span v-if="row.after_frozen_balance" style="color:#999;font-size:12px">（变更后金额:{{ row.after_frozen_balance}}）</span>
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
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import '@/style/css/list.less'
import {onMounted, reactive, ref} from 'vue';
import {Pagination} from '@/components/list';
import {message} from 'ant-design-vue'
import {useConfigStore} from "@/store/config";
import {UserBalanceLogFilterParams, UserBalanceLogFilterState} from '@/types/finance/userBalanceLog';
import {getUserBalanceLogList} from "@/api/finance/userBalanceLog";
import {DialogForm} from "@/components/dialog";

const config:any = useConfigStore();
// 基本参数定义
const filterState = ref(<UserBalanceLogFilterState[]>[]);
const loading = ref<boolean>(true);
const total = ref<number>(0);
const selectedIds = ref<number[]>([]);
const advancedSearch = ref<boolean>(false);
const filterParams = reactive<UserBalanceLogFilterParams>({   //初使化用于查询的参数
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
        const result = await getUserBalanceLogList({...filterParams});
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


</script>
