<template>
    <link :href="icoDefinedCss" rel="stylesheet"/>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-table-list-warp">
                <div class="list-table-tool lyecs-search-warp">
                    <div class="list-table-tips">
                        <div>分类编号对应了系统一些内置分类</div>
                        <div> 帮助中心：[bzzx] &nbsp;&nbsp;&nbsp;&nbsp;客服中心：[kfzx] &nbsp;&nbsp;&nbsp;&nbsp;热门问题：[rmwt] &nbsp;&nbsp;&nbsp;&nbsp;客服中心：[kfzx]
                            &nbsp;&nbsp;&nbsp;&nbsp;本站公告：[bzgg] &nbsp;&nbsp;&nbsp;&nbsp;资讯中心：[zxzx]&nbsp;&nbsp;&nbsp;&nbsp;卖家中心：[mjzx]
                        </div>
                    </div>
                    <el-form :model="filterParams" name="form">
                        <div class="list-table-tool-row">
                            <div class="list-table-tool-col">
                                <el-space>
                                    <el-button v-if="filterParams.parent_id > 0" @click="backToParentCat"><i class="iconfont icon-fanhui"
                                                                                                             style="font-size:14px;padding-right: 5px;"></i> 返回上一级
                                    </el-button>
                                    <DialogForm :params="{ act: 'add', parentId: filterParams.parent_id }" isDrawer path="content/articleCategory/Info" title="添加文章分类" width="600px"
                                                @okCallback="loadFilter">
                                        <el-button type="primary">添加文章分类</el-button>
                                    </DialogForm>
                                </el-space>
                            </div>
                        </div>
                    </el-form>
                </div>
                <div class="table-container">
                    <a-spin :spinning="loading">
                        <el-table @sort-change="onSortChange" :data="filterState" :expand-row-keys="articleCategoryIds" :indent="30" :load="loadData" :total="total" :tree-props="{ children: 'children', hasChildren: 'has_children' }" lazy
                                  row-key="article_category_id" @selection-change="onSelectChange" @expand-change="handleExpandChange" ref="tableRef">
                            <el-table-column type="selection" width="32"/>
                            <el-table-column :width="200" label="文章分类名称">
                                <template #default="{ row }" row-key="article_category_id">
                                    <el-space style="height: 30px;">
                                        <div style="position: relative;">
                                            <PopForm v-model:org-value="row.article_category_name" :params="{ id: row.article_category_id, field: 'article_category_name' }" :requestApi="updateArticleCategoryFiled" label="权限名称"
                                                     type="textarea">
                                                <a v-if="row.has_children" @click="childCat(row.article_category_id)">{{ row.article_category_name }}</a>
                                                <span v-else>{{ row.article_category_name }}</span>
                                            </PopForm>
                                        </div>
                                    </el-space>
                                </template>
                            </el-table-column>
                            <el-table-column label="分类编号">
                                <template #default="{ row }">
                                    <PopForm v-model:org-value="row.category_sn" :params="{ id: row.article_category_id, field: 'category_sn' }" :requestApi="updateArticleCategoryFiled" label="分类编号"
                                             type="textarea">
                                        <div>{{ row.category_sn || '-' }}</div>
                                    </PopForm>
                                </template>
                            </el-table-column>
                            <el-table-column key="sort_order" sortable="custom" label="排序">
                                <template #default="{ row }">
                                    <PopForm v-model:org-value="row.sort_order" :params="{ id: row.article_category_id, field: 'sort_order' }" :requestApi="updateArticleCategoryFiled" label="排序"
                                             type="input">
                                        <div>{{ row.sort_order }}</div>
                                    </PopForm>
                                </template>
                            </el-table-column>
                            <el-table-column :width="220" fixed="right" label="操作">
                                <template #default="{ row }">
                                    <DialogForm :params="{ act: 'detail', id: row.article_category_id, parentId: row.parent_id }" :data="{ parentId: row.parent_id }" isDrawer path="content/articleCategory/Info" title="编辑分类" width="600px"
                                                @okCallback="updateChildFilter">
                                        <a class="btn-link">编辑</a>
                                    </DialogForm>
                                    <el-divider direction="vertical"/>
                                    <DialogForm :params="{ act: 'add', parentId: row.article_category_id }" :data="{parentId: row.parent_id || row.article_category_id}" isDrawer path="content/articleCategory/Info" title="编辑分类" width="600px"
                                                @okCallback="updateChildFilter">
                                        <a class="btn-link">添加子分类</a>
                                    </DialogForm>
                                    <el-divider direction="vertical"/>
                                    <DeleteRecord v-if="row.parent_id" :params="{ id: row.article_category_id }" :requestApi="delArticleCategory" @afterDelete="updateChildFilter({}, {parentId: row.parent_id})">删除</DeleteRecord>
                                    <DeleteRecord v-if="!row.parent_id" :params="{ id: row.article_category_id }" :requestApi="delArticleCategory" @afterDelete="loadFilter">删除</DeleteRecord>
                                    <!-- <DeleteRecord :params="{ id: row.article_category_id }" :requestApi="delArticleCategory" @afterDelete="updateChildFilter(row.parent_id)">删除</DeleteRecord> -->
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
                        <Pagination v-model:page="filterParams.page" v-model:size="filterParams.size" :total="total" @callback="loadFilter"/>
                    </div>

                </div>
                <div v-if="selectedIds.length > 0" class="selected-action-warp">
                    <div class="selected-action">
                        <el-space>
                            <span>已选择：<b>{{ selectedIds.length }}</b> 项</span>
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
import '@/style/css/list.less'
import {DialogForm} from '@/components/dialog'
import {onMounted, reactive, ref} from 'vue';
import {DeleteRecord, Pagination, Switch} from '@/components/list';
import {message} from 'ant-design-vue'
import {useConfigStore} from "@/store/config";
import {PopForm} from '@/components/pop-form'
import {useRoute, useRouter} from 'vue-router';
import {useAppStore} from "@/store/app";
import {ArticleCategoryFilterParams, ArticleCategoryFilterState} from "@/types/content/articleCategory";
import {batchSubmit, delArticleCategory, getArticleCategoryList, updateArticleCategoryFiled} from "@/api/content/articleCategory";

//获取来自路由的参数
const {currentRoute} = useRouter();

const appStore = useAppStore();
const config:any = useConfigStore();
const icoDefinedCss = ref(config.icoDefinedCss)

// 基本参数定义
const filterState = ref<ArticleCategoryFilterState[]>([]);
const loading = ref<boolean>(true);
const total = ref<number>(0);
const selectedIds = ref<number[]>([]);
const articleCategoryIds = ref([])
const filterParams = reactive<ArticleCategoryFilterParams>({
    page: 1,
    size: config.get('page_size'),
    sort_field: '',
    sort_order: '',
    keyword: '',
    parent_id: 0,
});
const parentId = ref<Array<number>>([0])
const parentName = ref<string>()
const route = useRoute()
onMounted(() => {
    const query = <any>currentRoute.value.query;
    if (query.id > 0) {
        filterParams.parent_id = query.id
    }
    route.meta.title = ''
    loadFilter()
})


// 获取列表的查询结果
const loadFilter = async () => {
    loading.value = true;
    try {
        const result = await getArticleCategoryList({...filterParams});
        filterState.value = result.filter_result;
        total.value = result.total;
        parentName.value = result.parent_name
        if (!result.parent_name) {
            appStore.setHeaderTitle('文章分类列表')
        } else {
            appStore.setHeaderTitle('文章分类列表 - ' + result.parent_name)
        }
    } catch (error: any) {
        message.error(error.message);
    } finally {
        loading.value = false;
    }
}
const tableTreeRefreshTool = reactive<any>({})
const loadData = async (tree:any, treeNode:any, resolve:any) => {
	// 保存父级id，在你需要刷新子级数据的地方可以用到
	// currentParentId.value = tree.article_category_id
    // 在之前声明的全局变量中，增加一个key为 本条数据的id，id可替换为你数据中的任意唯一值
    tableTreeRefreshTool[tree.article_category_id] = {}
    // 重要！保存resolve方法，以便后续使用
    tableTreeRefreshTool[tree.article_category_id].resolve = resolve
    // 记录展开次数，具体作用后续介绍
    tableTreeRefreshTool[tree.article_category_id].expandCount = 0
    // 请求api接口获取数据
    const result = await getArticleCategoryList({
        page: 1,
        parent_id: tree.article_category_id,
        size: 1000,
    });
    // 调用resolve方法，渲染子级数据
    resolve(result.filter_result)
}
const handleExpandChange = async (row:any, expanded:any) => {
    // 获取到之前保存的全局变量
    const curr = tableTreeRefreshTool[row.article_category_id]
    // 展开次数 +1
    curr.expandCount++
    // 如果是展开状态，且展开次数大于1，且上一次的状态为折叠，则请求api数据，更新子菜单
    if (expanded && curr.expandCount > 1 && !curr.prevStatus) {
        // api请求
        const result = await getArticleCategoryList({
            page: 1,
            parent_id: row.article_category_id,
            size: 1000,
        });
        // 调用resolve方法，渲染子级数据
        curr.resolve(result.filter_result)
    }
    // 保存本次的展开或折叠状态，用于下次判断
    curr.prevStatus = expanded
}
const tableRef = ref<any>(null); // 用于引用表格组件
// 更新当前层级的所有子级
const updateChildFilter = async (res:any,data:any) => {
    const curr = tableTreeRefreshTool[data.parentId]
    // console.log(curr)
    console.log(tableRef.value)
    if (curr) {
        const result = await getArticleCategoryList({
            page: 1,
            parent_id: data.parentId,
            size: 1000,
        })
        //通过ref获取table的子节点数
        if (tableRef.value.store.states.lazyTreeNodeMap.value[data.parentId].length > 1) {
            //说明该节点下有多个子节点
            tableRef.value.store.states.lazyTreeNodeMap[data.parentId] = [];
        } else {
            //说明该节点只有一个节点
            tableRef.value.store.states.lazyTreeNodeMap.value[data.parentId] =[]
        }
        curr.resolve(result.filter_result);
    }else{
        loadFilter()
    }
}
// const loadChildren = async (row: any, resolve: any) => {
//     // 保存resolve操作，用于以后的更新
//     const item = findItemById(filterState.value, row.article_category_id);
//     item.resolve = resolve
//     try {
//         const result = await getArticleCategoryList({
//             page: 1,
//             parent_id: row.article_category_id,
//             size: 1000,
//         });
//         row.children = result.filter_result
//         resolve(result.filter_result);
//     } catch (error: any) {
//         message.error(error.message);
//     }

// }
// // 更新当前层级的所有子级
// const updateChildFilter = async (parentId = 0) => {
//     const row = findItemById(filterState.value, parentId);
//     try {
//         const result = await getArticleCategoryList({
//             page: 1,
//             parent_id: parentId,
//             size: 1000,
//         });
//         row.resolve(result.filter_result);
//     } catch (error: any) {
//         message.error(error.message);
//     }
// }
// // 获取分类数组对应ID的元素
// const findItemById = (items: any[], id: number): any => {
//     for (const item of items) {
//         if (item.article_category_id === id) {
//             return item;
//         } else if (item.children) {
//             const found = findItemById(item.children, id);
//             if (found) {
//                 return found;
//             }
//         }
//     }
//     return null;
// };


const childCat = (id: number) => {
    parentId.value.push(id)
    filterParams.parent_id = id
    loadFilter();
}
const backToParentCat = () => {
    parentId.value.pop();
    filterParams.parent_id = parentId.value[parentId.value.length - 1]
    loadFilter();
}

// 批量操作
const onBatchSubmit = async (action: string) => {
    try {
        const result = await batchSubmit(action, {ids: selectedIds.value});
        message.success(result.message);
        await loadFilter();
    } catch (error: any) {
        message.error(error.message);
    }
};
// 修改排序
const onSortChange = ({prop, order}: { prop: string; order?: string }) => {
    filterParams.sort_field = prop;
    filterParams.sort_order = order == 'ascending' ? 'asc' : order == 'descending' ? 'desc' : '';
    loadFilter();
};

const onSelectChange = (e:ArticleCategoryFilterState[]) => {
    selectedIds.value = e.map((item) => item.article_category_id);
}
</script>
<style lang="less" scoped>
.list-table-tips {
    background-color: #eef2ff;
    height: auto;
    border-radius: 8px;
    padding: 16px;
    line-height: 2;
    margin-bottom: 20px
}
</style>
<style lang="less">
.el-table__expand-icon {
    top: 2px;
    margin-right: 18px !important
}

// :deep(.table-container) .el-table__expand-icon {
//     display: none;
// }
.el-table__expand-icon--expanded {
    transform: none
}

.el-table__expand-icon svg {
    display: none;
}

.el-table__expand-icon .el-icon {
    color: inherit;
    text-decoration: none;
    outline: none;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
    float: left;
    box-sizing: border-box;
    width: 17px;
    height: 17px;
    padding: 0;
    line-height: 17px;
    background: #ffffff;
    border: 1px solid #f0f0f0;
    border-radius: 6px;
    transform: scale(0.9411764705882353);
    user-select: none;
}

.el-table__expand-icon .el-icon.is-loading {
    animation: none
}

.el-table__expand-icon .el-icon::before,
.el-table__expand-icon .el-icon::after {
    position: absolute;
    background: currentcolor;
    transition: transform 0.3s ease-out;
    content: "";
}

.el-table__expand-icon .el-icon::before {
    top: 7px;
    inset-inline-end: 3px;
    inset-inline-start: 3px;
    height: 1px;
}

.el-table__expand-icon .el-icon::after {
    top: 3px;
    bottom: 3px;
    inset-inline-start: 7px;
    width: 1px;
    transform: rotate(90deg);
}

.el-table__expand-icon .el-icon::after {
    position: absolute;
    background: currentcolor;
    transition: transform 0.3s ease-out;
    content: "";
}

.el-table__expand-icon .el-icon::before {
    transform: rotate(-180deg);
}

.el-table__expand-icon .el-icon::after {
    transform: rotate(0deg);
}

.el-table__expand-icon--expanded .el-icon::before {
    transform: rotate(0);
}

.el-table__expand-icon--expanded .el-icon::after {
    transform: rotate(90deg);
}
</style>
