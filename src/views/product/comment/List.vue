<template>
    <div class="container">
        <div class="content_wrapper">
            <el-tabs v-model="activeKey" class="lyecs-tabs" tab-position="top" @tab-change="onTabChange">
                <el-tab-pane :name="-1" label="全部评价"></el-tab-pane>
                <el-tab-pane :name="1" label="有晒单"></el-tab-pane>
                <el-tab-pane :name="0" label="无晒单"></el-tab-pane>
            </el-tabs>
            <div v-if="activeKey!=null" class="container">
                <div class="lyecs-table-list-warp">
                    <div class="list-table-tool lyecs-search-warp">
                        <el-form :model="filterParams">
                            <div class="list-table-tool-row">
                                <div class="list-table-tool-col">
                                    <el-space>
                                        <DialogForm :params="{ act: 'add' }" isDrawer path="product/comment/Info" title="添加用户评论" width="600px"
                                                    @okCallback="loadFilter">
                                            <el-button type="primary">添加用户评论</el-button>
                                        </DialogForm>
                                        <el-input v-model="filterParams.keyword" name="keyword" placeholder="输入内容">
                                            <template #append>
                                                <el-button @click="onSearchSubmit"><span class="iconfont icon-chakan1"></span></el-button>
                                            </template>
                                        </el-input>
                                    </el-space>
                                </div>
                            </div>
                        </el-form>
                    </div>
                    <div class="table-container">
                        <a-spin :spinning="loading">
                            <el-table :data="filterState" :loading="loading" :total="total" row-key="comment_id"
                                      @selection-change="onSelectChange" @sort-change="onSortChange">
                                <el-table-column type="selection" width="32"/>
                                <el-table-column :width="150" label="用户名称" prop="username" sortable="custom">
                                    <template #default="{ row }">
                                        <div class="display-col">
                                            <div v-if="row.avatar" class="image">
                                                <Image :src="imageFormat(row.avatar)" class="image-style" fit="contain"/>
                                            </div>
                                            <el-tooltip
                                                class="box-item"
                                                effect="light"
                                                :content="row.username"
                                                placement="bottom"
                                            >
                                                <div class="text">
                                                    {{ row.username }}
                                                </div>
                                                <!-- <el-button>bottom</el-button> -->
                                            </el-tooltip>
                                            
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column :width="260" label="评论对象">
                                    <template #default="{ row }">
                                        <div class="display-col">
                                            <div class="image_comment">
                                                <Image :src="imageFormat(row.pic_thumb)" class="image-style" fit="contain"/>
                                            </div>
                                            <div class="text_comment multiline_hiding">
                                                <a :href="row.product_id"> {{ row.product_name }} </a>
                                            </div>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column :width="260" label="内容" prop="content">
                                    <template #default="{ row }">
                                        <div class="text_comment">
                                            {{ row.content }}
                                        </div>
                                        <div v-if="row.show_pics" class="image">
                                            <Image v-for="item in row.show_pics" :src="imageFormat(item.pic_thumb)" width="50" style="margin-right: 5px;margin-top: 5px;" fit="contain"/>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="评论等级" prop="comment_rank" sortable="custom">
                                    <template #default="{ row }">
                                        <PopForm v-model:org-value="row.comment_rank" :params="{ id: row.comment_id, field: 'comment_rank' }" :minNum="1" :maxNum="5" :requestApi="updateCommentFiled"
                                                 label="评论等级">
                                            <div>{{ row.comment_rank }}星</div>
                                        </PopForm>
                                    </template>
                                </el-table-column>
                                <el-table-column label="评论日期" prop="add_time" sortable="custom"></el-table-column>
                                <el-table-column label="是否置顶" prop="is_top" sortable="custom">
                                    <template #default="{ row }">
                                        <Switch v-model:checked="row.is_top" :params="{ id: row.comment_id, field: 'is_top' }" :requestApi="updateCommentFiled"/>
                                    </template>
                                </el-table-column>
                                <el-table-column label="是否推荐" prop="is_recommend" sortable="custom">
                                    <template #default="{ row }">
                                        <Switch v-model:checked="row.is_recommend" :params="{ id: row.comment_id, field: 'is_recommend' }" :requestApi="updateCommentFiled"/>
                                    </template>
                                </el-table-column>
                                <el-table-column label="排序" prop="sort_order" sortable="custom">
                                    <template #default="{ row }">
                                        <PopForm v-model:org-value="row.sort_order" :params="{ id: row.comment_id, field: 'sort_order' }" :requestApi="updateCommentFiled"
                                                 label="排序">
                                            <div>{{ row.sort_order }}</div>
                                        </PopForm>
                                    </template>
                                </el-table-column>
                                <el-table-column fixed="right" label="操作">
                                    <template #default="{ row }">
                                        <DialogForm :params="{ act: 'edit', id: row.comment_id }" isDrawer path="product/comment/Info"
                                                    title="编辑用户评论" width="700px"
                                                    @okCallback="loadFilter">
                                            <a class="btn-link">编辑</a>
                                        </DialogForm>
                                        <el-divider direction="vertical"/>
                                        <DeleteRecord :params="{ id: row.comment_id }" :requestApi="delComment" @afterDelete="loadFilter">删除</DeleteRecord>
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
import {CommentFilterParams, CommentFilterState} from '@/types/product/comment';
import {batchSubmit, delComment, getCommentList, updateCommentFiled} from "@/api/product/comment";
import {imageFormat} from "@/utils/format";

const config:any = useConfigStore();
// 基本参数定义
const filterState = ref<CommentFilterState[]>();
const loading = ref<boolean>(true);
const total = ref<number>(0);
const selectedIds = ref<number[]>([]);
const advancedSearch = ref<boolean>(false);
const filterParams = reactive<CommentFilterParams>({
    page: 1,
    size: config.get('page_size'),
    sort_field: '',
    sort_order: '',
    keyword: '',
    is_showed : -1
});

const activeKey = ref<number>(-1)
const onTabChange = (val: number) => {
    filterParams.is_showed = val
    loadFilter()
}

// 获取列表的查询结果
const loadFilter = async () => {
    loading.value = true;
    try {
        const result = await getCommentList({...filterParams});
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
const onSelectChange = (e:Object[]) => {
    selectedIds.value = e.map((item:any) => item.comment_id);
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

.display-col {
    display: flex;
    align-items: center; /* 垂直居中 */
    gap: 8px;

    .image {
        width: 30px;
        height: 30px;

        .image-style {
            width: 100%;
            height: 100%;
            object-fit: cover; /* 保持图片比例 */
        }
    }

    .image_comment {
        min-width: 50px;
        min-height: 50px;
        max-width: 50px;
        max-height: 50px;

        .image-style {
            width: 100%;
            height: 100%;
            object-fit: cover; /* 保持图片比例 */
        }
    }

    .text {
        flex-grow: 1; /* 占据剩余空间 */
        white-space: nowrap; /* 不换行 */
        overflow: hidden; /* 隐藏超出部分 */
        text-overflow: ellipsis; /* 超出显示省略号 */
        margin-left: 8px; /* 与左侧图片的间距 */
    }

    .text_comment {
        flex-grow: 1; /* 占据剩余空间 */

    }
}

.multiline_hiding {
    height: 3.6em; /* 基于字体大小的高度, 3行文本高度 */
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* 限制在3行 */
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    line-height: 1.2em; /* 调整这个值以匹配你的字体大小 */
}
</style>
