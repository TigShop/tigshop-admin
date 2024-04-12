<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-table-list-warp">
                <div class="list-table-tool lyecs-search-warp">
                    <el-form :model="filterParams">
                        <div class="list-table-tool-row">
                            <div class="list-table-tool-col">
                                <el-space>
                                    <DialogForm :params="{ act: 'add' }" isDrawer path="finance/userRechargeOrder/Info"
                                                title="添加申请" width="600px"
                                                @okCallback="loadFilter">
                                        <el-button type="primary">添加申请</el-button>
                                    </DialogForm>
                                    <el-input v-model="filterParams.keyword" name="keyword" placeholder="输入会员名称">
                                        <template #append>
                                            <el-button @click="onSearchSubmit"><span class="iconfont icon-chakan1"></span>
                                            </el-button>
                                        </template>
                                    </el-input>
                                    <a :class="'advanced-search-btn ml18 ' + (advancedSearch ? 'active' : '')"
                                       @click="advancedSearch = !advancedSearch">高级搜索<i
                                      class="iconfont icon-xia"></i></a>
                                </el-space>
                            </div>
                        </div>
                        <div v-if="advancedSearch" class="advanced-search-warp list-table-tool-row">
                            <div class="simple-form-warp">
                                <div class="simple-form-field">
                                    <div class="form-group">
                                        <label class="control-label"><span>选择到款状态：</span></label>
                                        <div class="control-container">
                                            <el-select clearable placeholder="请选择状态" v-model="filterParams.status">
                                                <el-option :value="0" label="待确认"/>
                                                <el-option :value="1" label="已支付"/>
                                                <el-option :value="2" label="无效"/>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                                <div class="simple-form-field">
                                    <el-button type="primary" @click="onSearchSubmit">搜索</el-button>
                                </div>
                            </div>
                        </div>
                    </el-form>
                </div>
                <div class="table-container">
                    <a-spin :spinning="loading">
                        <el-table :data="filterState" :loading="loading" :total="total" row-key="order_id"
                                  @selection-change="onSelectChange" @sort-change="onSortChange">
                            <el-table-column type="selection" width="32"/>
                            <el-table-column label="会员名称" prop="username" ></el-table-column>
                            <el-table-column label="金额" prop="amount" >
                                <template #default="{ row }">
                                    {{ priceFormat(row.amount)}}
                                </template>
                            </el-table-column>
                            <el-table-column label="到款状态" >
                                <template #default="{ row }">
                                    {{ row.status_type }}
                                </template>
                            </el-table-column>
                            <el-table-column label="操作时间" prop="add_time" ></el-table-column>
                            <el-table-column :width="150" fixed="right" label="操作">
                                <template #default="{ row }">
                                    <DialogForm :params="{ act: 'edit', id: row.order_id }" isDrawer
                                                path="finance/userRechargeOrder/Info"
                                                title="查看申请" width="600px"
                                                @okCallback="loadFilter">
                                        <a class="btn-link">查看</a>
                                    </DialogForm>
                                    <el-divider direction="vertical"/>
                                    <DeleteRecord :params="{ id: row.order_id }" :requestApi="delUserRechargeOrder"
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
import {onMounted, reactive, ref} from 'vue';
import {DeleteRecord, Pagination} from '@/components/list';
import {message} from 'ant-design-vue'
import {useConfigStore} from "@/store/config";
import {UserRechargeOrderFilterParams, UserRechargeOrderFilterState} from '@/types/finance/userRechargeOrder';
import {getUserRechargeOrderList, batchSubmit, delUserRechargeOrder} from "@/api/finance/userRechargeOrder";
import {DialogForm} from "@/components/dialog";
import {priceFormat} from "@/utils/format";
import {delBrand} from "@/api/product/brand";

const config:any = useConfigStore();
// 基本参数定义
const filterState = ref(<UserRechargeOrderFilterState[]>[]);
const loading = ref<boolean>(true);
const total = ref<number>(0);
const selectedIds = ref<number[]>([]);
const advancedSearch = ref<boolean>(false);
const filterParams = reactive<UserRechargeOrderFilterParams>({   //初使化用于查询的参数
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
        const result = await getUserRechargeOrderList({...filterParams});
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
const onSelectChange = (e:UserRechargeOrderFilterState[]) => {
    selectedIds.value = e.map((item) => item.order_id);
};


</script>
