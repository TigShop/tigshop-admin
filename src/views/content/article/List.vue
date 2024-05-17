<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-table-list-warp">
                <div class="list-table-tool lyecs-search-warp">
                    <el-form :model="filterParams">
                        <div class="list-table-tool-row">
                            <div class="list-table-tool-col">
                                <el-space>
                                    <DialogForm isDrawer @okCallback="loadFilter" title="添加文章" width="600px" path="content/article/Info" :params="{ act: 'add' }">
                                        <el-button type="primary">添加文章</el-button>
                                    </DialogForm>
                                    <el-input name="keyword" v-model="filterParams.keyword" placeholder="输入文章名称">
                                        <template #append>
                                            <el-button @click="onSearchSubmit"><span class="iconfont icon-chakan1"></span></el-button>
                                        </template>
                                    </el-input>
                                    <a :class="'advanced-search-btn ml18 ' + (advancedSearch ? 'active' : '')" @click="advancedSearch = !advancedSearch">高级搜索<i
                                            class="iconfont icon-xia"></i></a>
                                </el-space>
                            </div>
                        </div>
                        <div class="advanced-search-warp list-table-tool-row" v-if="advancedSearch">
                            <div class="simple-form-warp">
                              <div class="simple-form-field">
                                <div class="form-group">
                                  <label class="control-label"><span>全部分类：</span></label>
                                  <div class="control-container">
                                      <SelectArticleCategory v-model="filterParams.article_category_id"></SelectArticleCategory></div>
                                </div>
                              </div>
                                <div class="simple-form-field">
                                    <div class="form-group">
                                        <label class="control-label"><span>是否显示：</span></label>
                                        <div class="control-container">
                                            <el-select v-model="filterParams.is_show">
                                                <el-option :value="-1" label="请选择..." />
                                                <el-option :value="0" label="不显示" />
                                                <el-option :value="1" label="显示" />
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                                <div class="simple-form-field">
                                    <div class="form-group">
                                        <label class="control-label"><span>是否热门：</span></label>
                                        <div class="control-container">
                                            <el-select :fit-input-width="false" v-model="filterParams.is_hot">
                                                <el-option :value="-1" label="请选择..." />
                                                <el-option :value="0" label="不热门" />
                                                <el-option :value="1" label="热门" />
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
                        <el-table :data="filterState" row-key="article_id" @selection-change="onSelectChange" :total="total" @sort-change="onSortChange" :loading="loading">
                            <el-table-column type="selection" width="32" />
                            <el-table-column label="文章标题" prop="article_id" sortable="custom" :width="300">
                                <template #default="{ row }">
                                    <div style="position: relative;">
                                        <PopForm label="文章标题" type="textarea" :requestApi="updateArticleFiled" v-model:org-value="row.article_title"
                                                 :params="{ id: row.article_id, field: 'article_title' }" :max="50">
                                            <div>{{ row.article_title }}</div>
                                        </PopForm>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="文章编号">
                                <template #default="{ row }">
                                    <PopForm label="文章编号" type="input" :requestApi="updateArticleFiled" v-model:org-value="row.article_sn"
                                             :params="{ id: row.article_id, field: 'article_sn' }" :max="10">
                                        <div>{{ row.article_sn || '-' }}</div>
                                    </PopForm>
                                </template>
                            </el-table-column>
                            <el-table-column label="文章分类" prop="article_category_name"></el-table-column>
                            <el-table-column  label="文章类型" prop="article_type_text"> </el-table-column>
                          <el-table-column width="90"  label="文章重要性">
                            <template #default="{ row }">
                              {{ row.article_type==='0'?'普通':'置顶' }}
                            </template>
                          </el-table-column>
                            <el-table-column width="160" label="发布时间">
                                <template #default="{ row }">
                                    {{ row.add_time }}
                                </template>
                            </el-table-column>
                            <el-table-column label="是否热门" prop="is_hot" sortable="custom" :width="120">
                                <template #default="{ row }">
                                    <Switch v-model:checked="row.is_hot" :requestApi="updateArticleFiled" :params="{ id: row.article_id, field: 'is_hot' }" />
                                </template>
                            </el-table-column>
                            <el-table-column label="是否显示" prop="is_show" sortable="custom" :width="120">
                                <template #default="{ row }">
                                    <Switch v-model:checked="row.is_show" :requestApi="updateArticleFiled" :params="{ id: row.article_id, field: 'is_show' }" />
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" fixed="right" :width="150">
                                <template #default="{ row }">
                                    <DialogForm isDrawer @okCallback="loadFilter" title="编辑文章" width="600px" path="content/article/Info" :params="{ act: 'detail', id: row.article_id }">
                                        <a class="btn-link">编辑</a>
                                    </DialogForm>
                                    <el-divider direction="vertical" />
                                  <a class="btn-link">查看</a>
                                  <el-divider direction="vertical" />
                                    <DeleteRecord @afterDelete="loadFilter" :requestApi="delArticle" :params="{ id: row.article_id }">删除</DeleteRecord>
                                </template>
                            </el-table-column>
                            <template #empty>
                                <div class="empty-warp">
                                    <div v-if="!loading" class="empty-bg">暂无数据</div>
                                </div>
                            </template>
                        </el-table>
                    </a-spin>
                    <div class="pagination-con" v-if="total > 0">
                        <Pagination v-model:page="filterParams.page" v-model:size="filterParams.size" :total="total" @callback="loadFilter" />
                    </div>
                </div>
                <div class="selected-action-warp" v-if="selectedIds.length > 0">
                    <div class="selected-action">
                        <el-space>
                            <span>已选择：<b>{{ selectedIds.length }}</b> 项</span>
                            <el-popconfirm title="您确认要批量删除所选数据吗？" @confirm="onBatchSubmit('del')">
                                <template #reference><el-button>批量删除</el-button></template>
                            </el-popconfirm>
                            <el-popconfirm title="您确认要批量显示所选数据吗？" @confirm="onBatchSubmit('show')">
                                <template #reference><el-button>批量显示</el-button></template>
                            </el-popconfirm>
                            <el-popconfirm title="您确认要批量隐藏所选数据吗？" @confirm="onBatchSubmit('hide')">
                                <template #reference><el-button>批量隐藏</el-button></template>
                            </el-popconfirm>
                          <DialogForm isDrawer @okCallback="loadFilter" title="批量转移分类" width="600px" path="content/article/Move"
                                      :params="{ids: selectedIds }">
                           <el-button>批量转移分类</el-button>
                          </DialogForm>
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
import { message } from 'ant-design-vue'
import { useConfigStore } from "@/store/config";
import { ArticleFilterState, ArticleFilterParams } from '@/types/content/article.d';
import { getArticleList, batchSubmit, updateArticleFiled, delArticle } from "@/api/content/article";
import SelectArticleCategory from "@/components/select/src/SelectArticleCategory.vue";
const config:any = useConfigStore();
// 基本参数定义
const filterState = ref<ArticleFilterState[]>();
const loading = ref<boolean>(true);
const total = ref<number>(0);
const selectedIds = ref<number[]>([]);
const advancedSearch = ref<boolean>(false);
const filterParams = reactive<ArticleFilterParams>({
    page: 1,
    size: config.get('page_size'),
    sort_field: '',
    sort_order: '',
    keyword: '',
    article_category_id: [],
    is_show: -1,
    is_hot: -1,

});
// 获取列表的查询结果
const loadFilter = async () => {
    loading.value = true;
    try {
        const result = await getArticleList({ ...filterParams });
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
const onSelectChange = (e:ArticleFilterState[]) => {
    selectedIds.value = e.map((item) => item.article_id);
};
</script>
