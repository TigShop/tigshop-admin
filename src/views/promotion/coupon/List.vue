<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="bonus-wrap">
                <p class="subtitle">按使用场景快速创建</p>
                <div class="card-wrap">
                    <div class="card-wrap__container">
                        <div class="item-bg coupon-cards-item">
                            <div>
                                <div class="title">满减券</div>
                                <div class="desc">
                                    <p>例：满100元减20元<br>便于合理控制活动成本</p>
                                </div>
                            </div>
                            <DialogForm isDrawer @okCallback="loadFilter" title="添加满减券" width="800px"
                                path="promotion/coupon/Info" :params="{ act: 'add', coupon_type: 1 }">
                                <el-button type="primary">立即新建</el-button>
                            </DialogForm>
                        </div>
                        <div class="item-bg coupon-cards-item">
                            <div>
                                <div class="title">折扣券</div>
                                <div class="desc">
                                    <p>例：满100元打9折<br>提高店铺销量和客单价</p>
                                </div>
                            </div>
                            <DialogForm isDrawer @okCallback="loadFilter" title="添加折扣券" width="800px"
                                path="promotion/coupon/Info" :params="{ act: 'add', coupon_type: 2 }">
                                <el-button type="primary">立即新建</el-button>
                            </DialogForm>
                        </div>
                        <div class="item-bg coupon-cards-item item-bg2">
                            <div>
                                <div class="title">新人专享券</div>
                                <div class="desc">
                                    <p>仅店铺新客可领，提高新客<br>首单转化</p>
                                </div>
                            </div>
                            <DialogForm isDrawer @okCallback="loadFilter" title="添加新人专享券" width="800px"
                                path="promotion/coupon/Info" :params="{ act: 'add', is_new_user: 1 }">
                                <el-button type="primary">立即新建</el-button>
                            </DialogForm>
                        </div>
                        <div class="item-bg coupon-cards-item item-bg2">
                            <div>
                                <div class="title">会员专享券</div>
                                <div class="desc">
                                    <p>限会员可领的优惠券，丰富会<br>员权益，凸显会员身份价值</p>
                                </div>
                            </div>
                            <DialogForm isDrawer @okCallback="loadFilter" title="添加会员专享券" width="800px"
                                path="promotion/coupon/Info" :params="{ act: 'add', is_new_user: 2 }">
                                <el-button type="primary">立即新建</el-button>
                            </DialogForm>
                        </div>
                    </div>
                </div>
            </div>
            <div class="lyecs-table-list-warp">
                <div class="list-table-tool lyecs-search-warp">
                    <!-- <div class="lyecs-nav-scroll">
                        <el-tabs v-model:modelValue="filterParams.store_id" tab-position="top" @tab-change="tabChange">
                            <el-tab-pane label="自营" :name="0"></el-tab-pane>
                            <el-tab-pane label="店铺" :name="-1"></el-tab-pane>
                        </el-tabs>
                    </div> -->
                    <el-form :model="filterParams">
                        <div class="list-table-tool-row">
                            <div class="list-table-tool-col">
                                <el-space v-if="filterParams.store_id == -1">
                                    <div class="form-group">
                                        <div class="control-container">
                                            <SelectStore v-model:store_id="filterParams.store_id"></SelectStore>
                                        </div>
                                    </div>
                                </el-space>
                                <el-space>
                                    <el-input name="keyword" v-model="filterParams.keyword" placeholder="输入优惠券名称">
                                        <template #append>
                                            <el-button @click="onSearchSubmit"><span
                                                    class="iconfont icon-chakan1"></span></el-button>
                                        </template>
                                    </el-input>
                                </el-space>
                            </div>
                        </div>
                    </el-form>
                </div>
                <div class="table-container">
                    <a-spin :spinning="loading">
                        <el-table :data="filterState" row-key="coupon_id" @selection-change="onSelectChange" :total="total"
                            @sort-change="onSortChange" :loading="loading">
                            <el-table-column type="selection" width="32" />
                            <el-table-column label="优惠券名称" prop="coupon_id" :width="200">
                                <template #default="{ row }">
                                    <div style="position: relative;">
                                        <PopForm label="优惠券名称" type="textarea" :requestApi="updateCouponFiled"
                                            v-model:org-value="row.coupon_name"
                                            :params="{ id: row.coupon_id, field: 'coupon_name' }">
                                            <div>{{ row.coupon_name }}</div>
                                        </PopForm>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="发放类型">
                                <template #default="{ row }">
                                    {{ row.coupon_type == 1 ? '满减券' : '折扣券' }}
                                    <span v-if="row.is_new_user == 1" class="green">(新人专享)</span>
                                    <span v-if="row.limit_user_rank.length" class="green">(会员专享)</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="优惠券金额(折扣)" prop="coupon_money" sortable="custom">
                                <template #default="{ row }">
                                    <PopForm v-if="row.coupon_type == 1" label="优惠券金额" type="input" :requestApi="updateCouponFiled"
                                        v-model:org-value="row.coupon_money"
                                        :params="{ id: row.coupon_id, field: 'coupon_money' }">
                                        <div>{{ row.coupon_money || '0' }}</div>
                                    </PopForm>
                                    <PopForm v-if="row.coupon_type == 2" label="优惠券折扣" type="input" :requestApi="updateCouponFiled"
                                        v-model:org-value="row.coupon_discount"
                                        :params="{ id: row.coupon_id, field: 'coupon_discount' }">
                                        <div>{{ row.coupon_discount || '0' }}折</div>
                                    </PopForm>
                                </template>
                            </el-table-column>
                            <el-table-column label="订单金额限制" prop="min_order_amount" sortable="custom">
                                <template #default="{ row }">
                                    <PopForm label="订单金额限制" type="input" :requestApi="updateCouponFiled"
                                        v-model:org-value="row.min_order_amount"
                                        :params="{ id: row.coupon_id, field: 'min_order_amount' }">
                                        <div>{{ row.min_order_amount || '0' }}</div>
                                    </PopForm>
                                </template>
                            </el-table-column>
                            <el-table-column label="首页显示" prop="is_show" sortable="custom">
                                <template #default="{ row }">
                                    <Switch v-model:checked="row.is_show" :requestApi="updateCouponFiled"
                                        :params="{ id: row.coupon_id, field: 'is_show' }" />
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" fixed="right">
                                <template #default="{ row }">
                                    <DialogForm isDrawer @okCallback="loadFilter" title="编辑优惠券" width="800px"
                                        path="promotion/coupon/Info" :params="{ act: 'detail', id: row.coupon_id }">
                                        <a class="btn-link">编辑</a>
                                    </DialogForm>
                                    <el-divider direction="vertical" />
                                    <DeleteRecord @afterDelete="loadFilter" :requestApi="delCoupon" :params="{ id: row.coupon_id }">删除</DeleteRecord>
                                </template>
                            </el-table-column>
                            <!-- <el-table-column label="操作" fixed="right" :width="150">
                                <template #default="{ row }">
                                    <DialogForm isDrawer @okCallback="loadFilter" title="编辑示例模板" width="800px" path="product/example/Info"
                                        :params="{ act: 'edit', id: row.example_id }">
                                        <a class="btn-link">编辑</a>
                                    </DialogForm>
                                    <el-divider direction="vertical" />
                                    <DeleteRecord @afterDelete="loadFilter" :requestApi="delCoupon" :params="{ id: row.example_id }">删除</DeleteRecord>
                                </template>
                            </el-table-column> -->
                            <template #empty>
                                <div class="empty-warp">
                                    <div v-if="!loading" class="empty-bg">暂无数据</div>
                                </div>
                            </template>
                        </el-table>
                    </a-spin>
                    <div class="pagination-con" v-if="total > 0">
                        <Pagination v-model:page="filterParams.page" v-model:size="filterParams.size" :total="total"
                            @callback="loadFilter" />
                    </div>
                </div>
                <div class="selected-action-warp" v-if="selectedIds.length > 0">
                    <div class="selected-action">
                        <el-space>
                            <span>已选择：<b>{{ selectedIds.length }}</b> 项</span>
                            <el-popconfirm title="您确认要批量删除所选数据吗？" @confirm="onBatchSubmit('del')">
                                <template #reference><el-button>批量删除</el-button></template>
                            </el-popconfirm>
                        </el-space>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import '@/style/css/list.less'
import { DialogForm } from '@/components/dialog'
import { PopForm } from '@/components/pop-form'
import { ref, reactive, onMounted } from 'vue';
import { DeleteRecord, Switch, Pagination } from '@/components/list';
import { Image } from '@/components/image';
import { message } from 'ant-design-vue'
import { useConfigStore } from "@/store/config";
import { CouponFilterState, CouponFilterParams } from '@/types/promotion/coupon.d';
import { getCouponList, batchSubmit, updateCouponFiled, delCoupon } from "@/api/promotion/coupon";
import { SelectStore } from '@/components/select'
const config:any = useConfigStore();
// 基本参数定义
const filterState = ref<CouponFilterState[]>();
const loading = ref<boolean>(true);
const total = ref<number>(0);
const selectedIds = ref<number[]>([]);
const filterParams = reactive<CouponFilterParams>({
    page: 1,
    size: config.get('page_size'),
    sort_field: '',
    sort_order: '',
    keyword: '',
    is_show: -1,
    store_id: 0
});
//切换自营和店铺
// const tabChange = (tab) => {
//     loadFilter()
// }
// 获取列表的查询结果
const loadFilter = async () => {
    loading.value = true;
    try {
        const result = await getCouponList({ ...filterParams });
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
const onSortChange = ({ prop, order }: { prop: string; order?: string }) => {
    filterParams.sort_field = prop;
    filterParams.sort_order = order == 'ascending' ? 'asc' : order == 'descending' ? 'desc' : '';
    loadFilter();
};

// 批量操作
const onBatchSubmit = async (action: string) => {
    try {
        const result = await batchSubmit(action, { ids: selectedIds.value });
        message.success(result.message);
        loadFilter();
    } catch (error: any) {
        message.error(error.message);
    }
};
// 多选操作
const onSelectChange = (e: any) => {
    selectedIds.value = e.map((item: any) => item.coupon_id);
};
</script>
<style>
/*优惠券列表类型选择*/
.bonus-wrap .card-wrap {
    display: -ms-flexbox;
    display: flex;
    margin-bottom: 24px;
    -ms-flex-pack: start;
    justify-content: flex-start;
    overflow: hidden;
    z-index: -1
}

.bonus-wrap .card-wrap__container {
    transition: transform .6s ease-in-out;
    display: -ms-flexbox;
    display: flex
}

.bonus-wrap .item-bg {
    position: relative;
    white-space: nowrap;
    padding: 20px 27px 17px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    background: rgba(51, 136, 255, .07);
    margin-right: 15px;
    text-align: center;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: justify;
    justify-content: space-between
}

.bonus-wrap .coupon-cards-item {
    min-width: 166px;
    width: 170px
}

.bonus-wrap .coupon-cards-item .title {
    font-size: 16px;
    color: #333
}

.bonus-wrap .coupon-cards-item .desc {
    padding-top: 10px;
    line-height: 18px;
    font-size: 12px;
    color: #666
}

.bonus-wrap .coupon-cards-item button {
    margin-top: 15px;
    padding: 0 16px;
}

.bonus-wrap .subtitle {
    font-weight: 500;
    font-size: 14px;
    color: #323233;
    line-height: 20px;
    margin-bottom: 16px
}

.bonus-wrap .item-bg2 {
    background: #fff;
    border: 1px solid #ebedf0;
    box-sizing: border-box;
    width: 223px !important
}
</style>
