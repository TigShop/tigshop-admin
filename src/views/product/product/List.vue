<template>
    <div class="container">
        <div class="content_wrapper">
            <el-tabs v-model="activeKey" class="lyecs-tabs" tab-position="top" @tab-change="onTabChange">
                <el-tab-pane :name="1" label="出售中的商品"></el-tab-pane>
                <el-tab-pane :name="2" label="自营商品"></el-tab-pane>
                <el-tab-pane :name="3" label="店铺商品"></el-tab-pane>
                <el-tab-pane :name="4" label="已下架商品"></el-tab-pane>
                <!-- <el-tab-pane :label="'待审核商品(' + waitingCheckedCount + ')'" :name="5"></el-tab-pane> -->
                <!-- <el-tab-pane :name="6" label="审核失败商品"></el-tab-pane> -->
                <el-tab-pane :name="7" label="商品回收站"></el-tab-pane>
            </el-tabs>
            <div class="lyecs-table-list-warp">
                <div class="list-table-tool lyecs-search-warp">
                    <el-form :model="filterParams" name="form">
                        <div class="list-table-tool-row">
                            <div class="list-table-tool-col">
                                <el-space>
                                    <DialogForm
                                        :params="{ act: 'add' }"
                                        isDrawer
                                        path="product/product/Info"
                                        title="添加商品"
                                        width="800px"
                                        @okCallback="loadFilter">
                                        <el-button type="primary">添加商品</el-button>
                                    </DialogForm>
                                    <el-input v-model="filterParams.keyword" name="keyword" placeholder="输入商品名称/货号">
                                        <template #append>
                                            <el-button @click="onSearchSubmit"><span class="iconfont icon-chakan1"></span></el-button>
                                        </template>
                                    </el-input>
                                    <a
                                        :class="'advanced-search-btn ml18 ' + (advancedSearch ? 'active' : '')"
                                        href="javascript:;"
                                        @click="advancedSearch = !advancedSearch"
                                        >高级搜索<i class="iconfont icon-xia"></i
                                    ></a>
                                </el-space>
                            </div>
                            <div class="list-table-tool-col"></div>
                        </div>
                        <div v-if="advancedSearch" class="advanced-search-warp list-table-tool-row">
                            <div class="simple-form-warp">
                                <div class="simple-form-field">
                                    <div class="form-group">
                                        <label class="control-label"><span>店铺：</span></label>
                                        <div class="control-container">
                                            <SelectStore v-model="filterParams.store_id"></SelectStore>
                                        </div>
                                    </div>
                                </div>
                                <div class="simple-form-field">
                                    <div class="form-group">
                                        <label class="control-label"><span>分类：</span></label>
                                        <div class="control-container">
                                            <SelectCategory v-model:category_id="filterParams.category_id"></SelectCategory>
                                        </div>
                                    </div>
                                </div>
                                <div class="simple-form-field">
                                    <div class="form-group">
                                        <label class="control-label"><span>品牌：</span></label>
                                        <div class="control-container">
                                            <SelectBrand v-model:brand_id="filterParams.brand_id"></SelectBrand>
                                        </div>
                                    </div>
                                </div>
                                <div class="simple-form-field">
                                    <div class="form-group">
                                        <label class="control-label"><span>类型：</span></label>
                                        <div class="control-container">
                                            <el-select v-model="filterParams.intro_type" clearable>
                                                <!-- <el-option label="所有类型" value=""/> -->
                                                <el-option label="精品" value="is_best" />
                                                <el-option label="热销" value="is_hot" />
                                                <el-option label="新品" value="is_new" />
                                                <el-option label="秒杀" value="is_promote" />
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
                        <el-table :data="filterState" :total="total" row-key="product_id" @selection-change="onSelectChange" @sort-change="onSortChange">
                            <el-table-column type="selection" width="32" />
                            <el-table-column label="商品名称" prop="product_id" sortable="custom" :min-width="320">
                                <template #default="{ row }">
                                    <div class="flex">
                                        <div v-if="row.pic_thumb" class="span-pic">
                                            <a :href="urlFormat({ path: 'product', id: row.product_id })" target="_blank"
                                                ><img :src="imageFormat(row.pic_thumb)" height="50" width="50"
                                            /></a>
                                        </div>
                                        <div class="span-product-con">
                                            <div class="span-product-name">
                                                <PopForm
                                                    :max="100"
                                                    v-model:org-value="row.product_name"
                                                    :params="{ id: row.product_id, field: 'product_name' }"
                                                    :requestApi="updateProductFiled"
                                                    label="商品名称"
                                                    type="textarea">
                                                    <div>{{ row.product_name }}</div>
                                                </PopForm>
                                            </div>
                                            <p v-if="row.brand_name" class="span-product-brand">
                                                <span class="span-tit">商品：</span><span class="span-con">{{ row.brand_name }}</span>
                                            </p>
                                            <p v-if="row.store_title" class="span-product-brand">
                                                <span class="span-tit">店铺：</span><span class="span-con green">{{ row.store_title }}</span>
                                            </p>
                                            <p v-if="row.suppliers_name" class="span-product-brand">
                                                <span class="span-tit">供应商：</span><span class="span-con green">{{ row.suppliers_name }}</span>
                                            </p>
                                            <p v-if="row.type === 2"><span class="span-con green">【虚拟商品】</span></p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column :width="200" label="商品信息">
                                <template #default="{ row }">
                                    <span class="span-tit">货号：</span>
                                    <div class="span-con">
                                        <PopForm
                                            v-model:org-value="row.product_sn"
                                            :params="{ id: row.product_id, field: 'product_sn' }"
                                            :requestApi="updateProductFiled"
                                            label="货号"
                                            :max="20">
                                            <div>{{ row.product_sn || "--" }}</div>
                                        </PopForm>
                                    </div>
                                    <br />
                                    <span class="span-tit">售价：</span>
                                    <div class="span-con">
                                        <PopForm
                                            extra="请输入商品价格"
                                            v-model:org-value="row.product_price"
                                            :params="{ id: row.product_id, field: 'product_price' }"
                                            :requestApi="updateProductFiled"
                                            label="售价">
                                            <div>{{ row.product_price || 0.0 }}</div>
                                        </PopForm>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column v-if="activeKey != 7" :width="200" label="商品状态">
                                <template #default="{ row }">
                                    <div class="status-switch">
                                        <div v-if="row.check_status == 1">
                                            <span class="span-tit">上架：</span>
                                            <Switch
                                                v-model:checked="row.product_status"
                                                :params="{ id: row.product_id, field: 'product_status' }"
                                                :requestApi="updateProductFiled" />
                                        </div>
                                        <div>
                                            <span class="span-tit">精品：</span>
                                            <Switch
                                                v-model:checked="row.is_best"
                                                :params="{ id: row.product_id, field: 'is_best' }"
                                                :requestApi="updateProductFiled" />
                                        </div>
                                        <div>
                                            <span class="span-tit">新品：</span>
                                            <Switch
                                                v-model:checked="row.is_new"
                                                :params="{ id: row.product_id, field: 'is_new' }"
                                                :requestApi="updateProductFiled" />
                                        </div>
                                        <div>
                                            <span class="span-tit">热销：</span>
                                            <Switch
                                                v-model:checked="row.is_hot"
                                                :params="{ id: row.product_id, field: 'is_hot' }"
                                                :requestApi="updateProductFiled" />
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column v-if="activeKey === 5 || activeKey === 6" :width="100" label="审核状态">
                                <template #default="{ row }">
                                    <span v-if="row.check_status === 2" class="span-tit">审核状态：</span>
                                    <span v-if="row.check_status === 2" class="red tips-hover" title="{$goods.check_reason}"
                                        >审核失败 <i class="ico-font">&#xe611;</i></span
                                    ><br />
                                    <span v-if="row.check_status === 0" class="span-tit">审核状态：</span>
                                    <span v-if="row.check_status === 0" class="tips-hover" title="{$goods.check_reason}">审核中...</span><br />
                                </template>
                            </el-table-column>
                            <el-table-column v-if="activeKey != 7" :width="100" label="库存" prop="product_stock" sortable="custom">
                                <template #default="{ row }">
                                    <a v-if="row.product_exist">{{ row.product_stock }}</a>
                                    <div v-else>
                                        <PopForm
                                            v-model:org-value="row.product_stock"
                                            :params="{ id: row.product_id, field: 'product_stock' }"
                                            :requestApi="updateProductFiled"
                                            label="库存"
                                            type="textarea">
                                            <div>{{ row.product_stock }}</div>
                                        </PopForm>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column v-if="activeKey != 7" :width="100" label="排序" prop="sort_order" sortable="custom">
                                <template #default="{ row }">
                                    <PopForm
                                        v-model:org-value="row.sort_order"
                                        :params="{ id: row.product_id, field: 'sort_order' }"
                                        :requestApi="updateProductFiled"
                                        label="排序"
                                        type="input">
                                        <div>{{ row.sort_order }}</div>
                                    </PopForm>
                                </template>
                            </el-table-column>
                            <el-table-column :width="140" fixed="right" label="操作">
                                <template #default="{ row }">
                                    <el-space :size="0">
                                        <DialogForm
                                            v-if="activeKey != 7"
                                            :params="{ act: 'edit', id: row.product_id }"
                                            dialogClass="noPadding"
                                            isDrawer
                                            path="product/product/Info"
                                            title="编辑商品"
                                            width="800px"
                                            @okCallback="loadFilter">
                                            <a class="btn-link">编辑</a>
                                        </DialogForm>
                                        <el-divider v-if="activeKey != 7" direction="vertical" />
                                        <a v-if="activeKey != 7" class="btn-link" :href="urlFormat({ path: 'product', id: row.product_id })" target="_blank"
                                            >查看</a
                                        >
                                        <el-divider v-if="activeKey != 7" direction="vertical" />
                                        <DeleteRecord
                                            v-if="activeKey === 7"
                                            :params="{ id: row.product_id, is_delete: 0 }"
                                            :requestApi="delProduct"
                                            @afterDelete="loadFilter">
                                            删除
                                        </DeleteRecord>
                                        <el-divider v-if="activeKey === 7" direction="vertical" />

                                        <el-dropdown trigger="click">
                                            <span class="iconfont-admin icon-gengduo btn-link"></span>
                                            <template #dropdown>
                                                <el-dropdown-menu>
                                                    <el-dropdown-item v-if="activeKey != 7">
                                                        <DeleteRecord
                                                            :params="{ id: row.product_id, is_delete: 1 }"
                                                            :requestApi="recycleProduct"
                                                            @afterDelete="loadFilter">
                                                            移入回收站
                                                        </DeleteRecord>
                                                    </el-dropdown-item>
                                                    <el-dropdown-item v-if="activeKey === 7">
                                                        <DeleteRecord
                                                            :params="{ id: row.product_id, field: 'is_delete' }"
                                                            :requestApi="updateProductFiled"
                                                            @afterDelete="loadFilter">
                                                            还原
                                                        </DeleteRecord>
                                                    </el-dropdown-item>
                                                </el-dropdown-menu>
                                            </template>
                                        </el-dropdown>
                                    </el-space>
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
                        <Pagination v-model:page="filterParams.page" v-model:size="filterParams.size" :total="total" @callback="loadFilter" />
                    </div>
                </div>
                <div v-if="selectedIds.length > 0" class="selected-action-warp">
                    <div class="selected-action">
                        <el-space>
                            <span
                                >已选择：<b>{{ selectedIds.length }}</b> 项</span
                            >
                            <el-popconfirm title="您确认要批量删除所选数据吗？" @confirm="onBatchSubmit('del')">
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
import "@/style/css/list.less";
import { DialogForm } from "@/components/dialog";
import { PopForm } from "@/components/pop-form";
import { onMounted, reactive, ref } from "vue";
import { DeleteRecord, Pagination, Switch } from "@/components/list";
import { message } from "ant-design-vue";
import { useConfigStore } from "@/store/config";
import { ProductFilterParams, ProductFilterState } from "@/types/product/product";
import { batchSubmit, delProduct, recycleProduct, getProductList, updateProductFiled } from "@/api/product/product";
import { SelectBrand, SelectCategory, SelectStore } from "@/components/select";
import { imageFormat, urlFormat } from "@/utils/format";

const config: any = useConfigStore();
// 基本参数定义
const filterState = ref<ProductFilterState[]>([]);
const loading = ref<boolean>(true);
const total = ref<number>(0);
const waitingCheckedCount = ref<number>(0);
const selectedIds = ref<number[]>([]);
const advancedSearch = ref<boolean>(false);
const filterParams = reactive<ProductFilterParams>({
    page: 1,
    size: config.pageSize,
    sort_field: "",
    sort_order: "",
    keyword: "",
    intro_type: "",
    is_delete: 0,
});

const activeKey = ref<number>(1);
const onTabChange = (val: number) => {
    activeKey.value = val;
    filterParams.product_status = val >= 1 && val <= 3 ? 1 : val >= 4 && val <= 6 ? 0 : undefined;
    filterParams.check_status = val >= 1 && val <= 4 ? 1 : val === 5 ? 0 : val === 6 ? 2 : undefined;
    filterParams.store_id = val === 2 ? 0 : val === 3 ? -1 : undefined;
    filterParams.is_delete = val === 7 ? 1 : 0;
    Object.keys(filterParams).forEach((key) => {
        if ((filterParams as any)[key] === undefined) delete (filterParams as any)[key];
    });
    loadFilter();
};

// 获取列表的查询结果
const loadFilter = async () => {
    loading.value = true;
    try {
        if (activeKey.value === 1) {
            filterParams.product_status = 1;
            filterParams.check_status = 1;
        }
        const result = await getProductList({ ...filterParams });
        filterState.value = result.filter_result;
        total.value = result.total;
        waitingCheckedCount.value = result.waiting_checked_count;
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
// 修改排序
const onSortChange = ({ prop, order }: { prop: string; order?: string }) => {
    filterParams.sort_field = prop;
    filterParams.sort_order = order == "ascending" ? "asc" : order == "descending" ? "desc" : "";
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
    selectedIds.value = e.map((item: any) => item.product_id);
};
</script>
<style lang="less" scoped>
.status-switch {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 150px;
}

.status-switch > div {
    word-break: keep-all;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
}
</style>
