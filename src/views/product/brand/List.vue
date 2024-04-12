<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-table-list-warp">
                <div class="list-table-tool lyecs-search-warp">
                    <el-form :model="filterParams">
                        <div class="list-table-tool-row">
                            <div class="list-table-tool-col">
                                <el-space>
                                    <DialogForm :params="{ act: 'add' }" isDrawer path="product/brand/Info"
                                                title="添加品牌" width="600px"
                                                @okCallback="loadFilter">
                                        <el-button type="primary">添加品牌</el-button>
                                    </DialogForm>
                                    <el-input v-model="filterParams.keyword" name="keyword" placeholder="输入品牌名称">
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
                            <div class="list-table-tool-col">
                                <el-button :loading="false" @click="onUpdateFirstWorld">批量更新品牌首字母
                                </el-button>
                            </div>
                        </div>
                        <div v-if="advancedSearch" class="advanced-search-warp list-table-tool-row">
                            <div class="simple-form-warp">
                                <div class="simple-form-field">
                                    <div class="form-group">
                                        <label class="control-label"><span>是否显示：</span></label>
                                        <div class="control-container">
                                            <el-select v-model="filterParams.is_show" clearable>
                                                <!-- <el-option :value="-1" label="请选择..."/> -->
                                                <el-option :value="0" label="不显示"/>
                                                <el-option :value="1" label="显示"/>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                                <div class="simple-form-field">
                                    <div class="form-group">
                                        <label class="control-label"><span>是否热门：</span></label>
                                        <div class="control-container">
                                            <el-select v-model="filterParams.brand_is_hot" clearable>
                                                <!-- <el-option :value="-1" label="请选择..."/> -->
                                                <el-option :value="0" label="否"/>
                                                <el-option :value="1" label="是"/>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                                <div class="simple-form-field">
                                    <div class="form-group">
                                        <label class="control-label"><span>首字母：</span></label>
                                        <div class="control-container">
                                            <el-input v-model="filterParams.first_word"/>
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
                        <el-table :data="filterState" :loading="loading" :total="total" row-key="brand_id"
                                  @selection-change="onSelectChange" @sort-change="onSortChange">
                            <el-table-column type="selection" width="32"/>
                            <el-table-column :width="200" label="品牌名称" prop="brand_id" sortable="custom">
                                <template #default="{ row }">
                                    <div style="position: relative;">
                                        <PopForm v-model:org-value="row.brand_name" :max="30" :params="{ id: row.brand_id, field: 'brand_name' }"
                                                 :requestApi="updateBrandField"
                                                 label="品牌名称" type="textarea">
                                            <div>{{ row.brand_name }}</div>
                                        </PopForm>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="品牌缩略图">
                                <template #default="{ row }">
                                    <Image :src="row.brand_logo" fit="contain" style="height: 25px;width: 60px;"/>
                                </template>
                            </el-table-column>
                            <el-table-column label="首字母">
                                <template #default="{ row }">
                                    <PopForm v-model:org-value="row.first_word" :len="1"
                                             :params="{ id: row.brand_id, field: 'first_word' }"
                                             :requestApi="updateBrandField"
                                             label="首字母" type="input">
                                        <div>{{ row.first_word || '-' }}</div>
                                    </PopForm>
                                </template>
                            </el-table-column>
                            <el-table-column label="是否热销">
                                <template #default="{ row }">
                                    <Switch v-model:checked="row.brand_is_hot" :params="{ id: row.brand_id, field: 'brand_is_hot' }" :requestApi="updateBrandField"/>
                                </template>
                            </el-table-column>
                            <el-table-column label="是否显示" prop="is_show" sortable="custom">
                                <template #default="{ row }">
                                    <Switch v-model:checked="row.is_show"
                                            :params="{ id: row.brand_id, field: 'is_show' }"
                                            :requestApi="updateBrandField"/>
                                </template>
                            </el-table-column>
                            <el-table-column label="排序" prop="sort_order" sortable="custom">
                                <template #default="{ row }">
                                    <PopForm v-model:org-value="row.sort_order"
                                             :params="{ id: row.brand_id, field: 'sort_order' }"
                                             :requestApi="updateBrandField"
                                             extra="默认值为50，数值越小，排序越靠前"
                                             label="排序" type="input">
                                        <div>{{ row.sort_order }}</div>
                                    </PopForm>
                                </template>
                            </el-table-column>
                            <el-table-column :width="150" fixed="right" label="操作">
                                <template #default="{ row }">
                                    <DialogForm :params="{ act: 'edit', id: row.brand_id }" isDrawer
                                                path="product/brand/Info"
                                                title="编辑品牌" width="600px"
                                                @okCallback="loadFilter">
                                        <a class="btn-link">编辑</a>
                                    </DialogForm>
                                    <el-divider direction="vertical"/>
                                    <DeleteRecord :params="{ id: row.brand_id }" :requestApi="delBrand"
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
import {BrandFilterParams, BrandFilterState} from '@/types/product/brand';
import {batchSubmit, delBrand, getBrandList, updateBrandField, updateFirstWorld} from "@/api/product/brand";

const config:any = useConfigStore();
// 基本参数定义
const filterState = ref(<BrandFilterState[]>[]);
const loading = ref<boolean>(true);
const total = ref<number>(0);
const selectedIds = ref<number[]>([]);
const advancedSearch = ref<boolean>(false);
const filterParams = reactive<BrandFilterParams>({   //初使化用于查询的参数
    page: 1,
    size: config.get('page_size'),
    sort_field: '',
    sort_order: '',
    keyword: '',
    first_word: ''
});
// 获取列表的查询结果
const loadFilter = async () => {
    loading.value = true;
    try {
        const result = await getBrandList({...filterParams});
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
const onSelectChange = (e:BrandFilterState[]) => {
    selectedIds.value = e.map((item) => item.brand_id);
};

// 更新首字母
const onUpdateFirstWorld = async () => {
    try {
        const result = await updateFirstWorld();
        message.success(result.message);
        loadFilter();
    } catch (error:any) {
        message.error(error.message);
    }
}

</script>
