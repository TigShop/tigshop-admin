<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-table-list-warp">
                <div class="list-table-tool lyecs-search-warp">
                    <el-form :model="filterParams">
                        <div class="list-table-tool-row">
                            <div class="list-table-tool-col">
                                <el-space>
                                    <el-button v-if="filterParams.parent_id > 0" @click="backToParentCat"><i class="iconfont icon-fanhui"
                                                                                                             style="font-size:14px;padding-right: 5px;"></i> 返回上一级
                                    </el-button>
                                    <DialogForm :params="{ act: 'add', region_id: filterParams.parent_id }" isDrawer path="setting/region/Info"
                                                title="添加地区" width="600px"
                                                @okCallback="loadFilter">
                                        <el-button type="primary">添加地区</el-button>
                                    </DialogForm>
                                </el-space>
                            </div>
                        </div>
                    </el-form>
                </div>
                <div class="table-container">
                    <a-spin :spinning="loading">
                        <el-table :data="filterState" :loading="loading" :total="total" row-key="region_id"
                                  @selection-change="onSelectChange" @sort-change="onSortChange">
                            <el-table-column type="selection" width="32"/>
                            <el-table-column :width="200" label="地区名称" prop="region_id" sortable="custom">
                                <template #default="{ row }">
                                    <div style="position: relative;">
                                        <PopForm v-model:org-value="row.region_name" :max="10" :params="{ id: row.region_id, field: 'region_name' }"
                                                 :requestApi="updateRegionField"
                                                 label="地区名称" type="textarea">
                                            <div>{{ row.region_name }}</div>
                                        </PopForm>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="首字母">
                                <template #default="{ row }">
                                    <PopForm v-model:org-value="row.first_word" :len="1"
                                             :params="{ id: row.region_id, field: 'first_word' }"
                                             :requestApi="updateRegionField"
                                             label="首字母" type="input">
                                        <div>{{ row.first_word || '-' }}</div>
                                    </PopForm>
                                </template>
                            </el-table-column>
                            <el-table-column label="是否热门">
                                <template #default="{ row }">
                                    <Switch v-model:checked="row.is_hot" :params="{ id: row.region_id, field: 'is_hot' }" :requestApi="updateRegionField"/>
                                </template>
                            </el-table-column>
                            <el-table-column :width="200" fixed="right" label="操作">
                                <template #default="{ row }">
                                    <a class="btn-link" @click="onSearchSubmit(row.parent_id,row.region_id,row.region_name)">子地区</a>
                                    <el-divider direction="vertical"/>
                                    <DialogForm :params="{ act: 'add', region_id: row.region_id }" isDrawer
                                                path="setting/region/Info"
                                                title="添加子地区" width="600"
                                                @okCallback="loadFilter">
                                        <a class="btn-link">添加子地区</a>
                                    </DialogForm>
                                    <el-divider direction="vertical"/>
                                    <DeleteRecord :params="{ id: row.region_id }" :requestApi="delRegion"
                                                  @afterDelete="loadFilter(row.parent_id)">删除
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
                                    @callback="onChangePage"/>
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
import {message} from 'ant-design-vue'
import {useConfigStore} from "@/store/config";
import type {RegionFilterParams, RegionFilterState} from '@/types/setting/region';
import {batchSubmit, delRegion, getRegionList, updateRegionField} from "@/api/setting/region";
import {useAppStore} from "@/store/app";
const appStore = useAppStore();
const config:any = useConfigStore();
// 基本参数定义
const filterState = ref(<RegionFilterState[]>[]);
const loading = ref<boolean>(true);
const total = ref<number>(0);
const selectedIds = ref<number[]>([]);
const advancedSearch = ref<boolean>(false);
const filterParams = reactive<RegionFilterParams>({   //初使化用于查询的参数
    page: 1,
    size: config.get('page_size'),
    sort_field: '',
    sort_order: '',
    keyword: '',
    parent_id: 0,
});
const parent_ids = ref<Array<number>>([])
const parent_names = ref<Array<string>>([])

const onChangePage = () => {
    loadFilter()
}
// 获取列表的查询结果
const loadFilter = async (parent_id?:number|object) => {
    loading.value = true;
    try {
        if (parent_id && typeof parent_id === 'number'){
            filterParams.parent_id = parent_id
        }
        const result = await getRegionList({...filterParams});
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

const region_name = ref<string>('')
const onSearchSubmit = (pid:number, id:number, name:string) => {
    parent_ids.value.push(pid)
    parent_names.value.push(name)
    filterParams.parent_id = id;
    region_name.value = name
    // if (region_name.value) {
    //     appStore.setHeaderTitle('地区列表')
    // } else {
    //     appStore.setHeaderTitle('地区列表 - ' +region_name.value)
    // }
    loadFilter()
};

const backToParentCat = () => {
    filterParams.parent_id = parent_ids.value[parent_ids.value.length - 1]
    region_name.value = parent_names.value[parent_names.value.length - 1]
    parent_ids.value.pop();
    parent_names.value.pop();
    // if (region_name.value) {
    //     appStore.setHeaderTitle('地区列表')
    // } else {
    //     appStore.setHeaderTitle('地区列表 - ' +region_name.value)
    // }
    loadFilter()
}
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
const onSelectChange = (e: RegionFilterState[]) => {
    selectedIds.value = e.map((item) => item.region_id);
};

</script>
