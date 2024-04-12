<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-table-list-warp">
                <div class="list-table-tool lyecs-search-warp">
                    <el-form :model="filterParams">
                        <div class="list-table-tool-row">
                            <div class="list-table-tool-col">
                                <el-space>
                                    <DialogForm :params="{ act: 'add' }" isDrawer path="user/user/Info"
                                                title="添加会员" width="600px"
                                                @okCallback="loadFilter">
                                        <el-button type="primary">添加会员</el-button>
                                    </DialogForm>
                                    <el-input v-model="filterParams.keyword" name="keyword" placeholder="输入会员名称/手机号/邮箱">
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
                                        <label class="control-label"><span>用户筛选：</span></label>
                                        <div class="control-container">
                                            <el-select v-model="filterParams.from_tag">
                                                <el-option :value="0" label="请选择..."/>
                                                <el-option :value="1" label="微信公众号"/>
                                                <el-option :value="2" label="微信小程序"/>
                                                <el-option :value="3" label="H5"/>
                                                <el-option :value="4" label="PC"/>
                                                <el-option :value="5" label="APP"/>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                                <div class="simple-form-field">
                                    <div class="form-group">
                                        <label class="control-label"><span>会员等级：</span></label>
                                        <div class="control-container">
                                            <SelectRankList v-model="filterParams.rank_id"></SelectRankList>
                                        </div>
                                    </div>
                                </div>
                                <div class="simple-form-field">
                                    <div class="form-group">
                                        <label class="control-label"><span>可用余额大于：</span></label>
                                        <div class="control-container">
                                            <el-input v-model="filterParams.balance"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="simple-form-field">
                                    <div class="form-group">
                                        <label class="control-label"><span>积分大于：</span></label>
                                        <div class="control-container">
                                            <el-input v-model="filterParams.points_gt"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="simple-form-field">
                                    <div class="form-group">
                                        <label class="control-label"><span>积分小于：</span></label>
                                        <div class="control-container">
                                            <el-input v-model="filterParams.points_lt"/>
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
                        <el-table :data="filterState" :loading="loading" :total="total" row-key="user_id"
                                  @selection-change="onSelectChange" @sort-change="onSortChange">
                            <el-table-column type="selection" width="32"/>
                            <el-table-column :width="200" label="会员名称" prop="username" sortable="custom">
                                <template #default="{ row }">
                                    <div class="avatar-info">
                                        <el-avatar :size="30" :src="imageFormat(row.avatar)"/>
                                        <div class="info">
                                            <ul>
                                                <li>{{ row.username }}</li>
                                                <li>{{ row.mobile != row.username ? row.mobile : '' }}</li>
                                                <li>
                                                    <Tag :color="(row.from_tag===2||row.from_tag===5)?'#31c19e':'#1890FF'" :text="row.from_tag_name" :transparent="false" style="margin-left: 0"></Tag>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column :width="140" label="会员等级" prop="rank_name">
                                <template #default="{ row }">
                                    <div class="rank-container">
                                        <img :src="imageFormat(row.rank_ico)" alt="rank icon" class="image"/>
                                        <div class="text">{{ row.rank_name }}</div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="余额" prop="balance" sortable="custom">
                                <template #default="{ row }">
                                    <ul>
                                        <li>{{ row.balance }}</li>
                                        <li v-if="row.frozen_balance>0" style="color: #999999">(冻结：{{ row.frozen_balance }})</li>
                                    </ul>
                                </template>
                            </el-table-column>
                            <el-table-column label="消费积分" prop="points" sortable="custom"></el-table-column>
                            <el-table-column label="累计消费次数" prop="order_count" sortable="custom"></el-table-column>
                            <el-table-column label="累计消费金额" prop="order_amount" sortable="custom"></el-table-column>
                            <el-table-column :width="160" label="注册日期" prop="reg_time" sortable="custom"></el-table-column>
                            <el-table-column :width="250" fixed="right" label="操作">
                                <template #default="{ row }">
                                    <DialogForm :params="{ act: 'edit', id: row.user_id }" isDrawer
                                                path="user/user/Detail"
                                                title="会员管理" width="800px"
                                                @okCallback="loadFilter" @callback="loadFilter">
                                        <a class="btn-link">查看</a>
                                    </DialogForm>
                                    <el-divider direction="vertical"/>
                                    <DialogForm :params="{ act: 'user', id: row.user_id }" :showOnOk="false"
                                                isDrawer
                                                path="order/order/List" :title="row.username+' - 查看订单'" width="1200px">
                                        <a class="btn-link">查看订单</a>
                                    </DialogForm>
                                    <el-divider direction="vertical"/>
                                    <DialogForm :params="{ id: row.user_id }" isDrawer
                                                path="user/user/AccountLog"
                                                :title="'会员'+row.username+'的账目明细'" width="800px"
                                                @okCallback="loadFilter">
                                        <a class="btn-link">账目明细</a>
                                    </DialogForm>
                                    <el-divider direction="vertical"/>
                                    <DeleteRecord :params="{ id: row.brand_id }" :requestApi="delUser"
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
import {onMounted, reactive, ref} from 'vue';
import {DeleteRecord, Pagination} from '@/components/list';
import {message} from 'ant-design-vue'
import {useConfigStore} from "@/store/config";
import {UserFilterParams, UserFilterState} from '@/types/user/user.d';
import {batchSubmit, delUser, getUserList} from "@/api/user/user";
import {SelectRankList} from "@/components/select";
import {imageFormat} from "@/utils/format";
import {Tag} from "@/components/form";

const config:any = useConfigStore();
// 基本参数定义
const filterState = ref(<UserFilterState[]>[]);
const loading = ref<boolean>(true);
const total = ref<number>(0);
const selectedIds = ref<number[]>([]);
const advancedSearch = ref<boolean>(false);
const filterParams = reactive<UserFilterParams>({   //初使化用于查询的参数
    page: 1,
    size: config.get('page_size'),
    sort_field: '',
    sort_order: '',
    keyword: '',
    from_tag: 0,
    rank_id: 0,
});
// 获取列表的查询结果
const loadFilter = async () => {
    loading.value = true;
    try {
        const result = await getUserList({...filterParams});
        filterState.value = result.filter_result;
        total.value = result.total;
    } catch (error:any) {
        message.error(error.message);
    } finally {
        loading.value = false
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
const onSelectChange = (e: UserFilterState[]) => {
    selectedIds.value = e.map((item) => item.user_id);
};


</script>
<style lang="less" scoped>
.avatar-info {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 0 8px;
    align-items: center;

    .info {
        margin-left: 16px;
        display: flex;
        flex-direction: column;
    }
}

.rank-container {
    display: flex;
    align-items: center; /* 垂直居中 */

    .image {
        width: 18px;
        height: auto;
    }

    .text {
        margin-left: 3px;
    }
}


</style>
