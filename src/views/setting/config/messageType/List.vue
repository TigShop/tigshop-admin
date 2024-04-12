<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-form-table">
                <div class="notice-warp">
                    <strong> 模板行业选择</strong>
                    <p> 主营行业：IT科技 -> 互联网 -> 电子商务</p>
                    <p> 副营行业：IT科技 -> 互联网 -> 电子商务</p>
                    <strong> 生成小程序消息模板</strong>
                    <p> 微信小程序后台选择服务栏目后会自动生成，点击会自动删除原有的小程序模并生成新的模板！</p>
                    <strong> 同步小程序消息模板</strong>
                    <p> 请先点击生成小程序模板，小程序后台已自动添加模板。点击同步则会将生成的模板导入到数据库。检查消息模板ID与小程序后台模板ID是否一致即可！</p>
                    <p class="red"> 备注：此功能仅针对支持小程序订阅消息的消息类型！</p>
                </div>
                <el-tabs v-model="activeKey" class="lyecs-tabs" tab-position="top" @tab-change="onTabChange">
                    <el-tab-pane label="发送给用户" :name="1"></el-tab-pane>
                    <el-tab-pane label="发送给商家" :name="2"></el-tab-pane>
                    <div>
                        <el-space>
                            <el-button type="primary" @click="generate()">生成小程序消息模板</el-button>
                            <el-button color="#31c19e" style="color: white" @click="synchronization()">同步小程序消息模板</el-button>
                            <el-input v-model="filterParams.keyword" placeholder="输入关键字">
                                <template #append>
                                    <el-button @click="onSearchSubmit"><span class="iconfont icon-chakan1"></span></el-button>
                                </template>
                            </el-input>
                        </el-space>
                    </div>
                </el-tabs>
                <div class="table-container">
                    <a-spin :spinning="loading">
                        <el-table :data="filterState" :loading="loading" :total="total" row-key="message_id"
                                  @selection-change="onSelectChange" @sort-change="onSortChange">
                            <el-table-column label="消息类型" prop="name">
                                <template #default="{row}">
                                    <PopForm v-model:org-value="row.name" :params="{ id: row.message_id, field: 'name' }" :requestApi="updateMessageTypeFiled" label="消息类型"
                                             type="input">
                                        <div>{{ row.name }}</div>
                                    </PopForm>
                                </template>
                            </el-table-column>
                            <el-table-column label="消息描述" prop="describe"></el-table-column>
                            <el-table-column label="站内信" width="100">
                                <template #default="{ row }">
                                    <Switch v-if="row.is_message>-1" v-model:checked="row.is_message" :params="{ id: row.message_id, field: 'is_message' }" :requestApi="updateMessageTypeFiled"/>
                                </template>
                            </el-table-column>
                            <el-table-column label="短信" width="100">
                                <template #default="{ row }">
                                    <Switch v-if="row.is_msg>-1" v-model:checked="row.is_msg" :params="{ id: row.message_id, field: 'is_msg' }" :requestApi="updateMessageTypeFiled"/>
                                </template>
                            </el-table-column>
                            <el-table-column label="公众号" width="100">
                                <template #default="{ row }">
                                    <Switch v-if="row.is_wechat>-1" v-model:checked="row.is_wechat" :params="{ id: row.message_id, field: 'is_wechat' }" :requestApi="updateMessageTypeFiled"/>
                                </template>
                            </el-table-column>
                            <el-table-column label="小程序" width="100">
                                <template #default="{ row }">
                                    <Switch v-if="row.is_mini_program>-1" v-model:checked="row.is_mini_program" :params="{ id: row.message_id, field: 'is_mini_program' }" :requestApi="updateMessageTypeFiled"/>
                                </template>
                            </el-table-column>
                            <!-- <el-table-column label="APP" width="100">
                                <template #default="{ row }">
                                    <Switch v-if="row.is_app>-1" v-model:checked="row.is_app" :params="{ id: row.message_id, field: 'is_app' }" :requestApi="updateMessageTypeFiled"/>
                                </template>
                            </el-table-column>
                            <el-table-column label="钉钉" width="100">
                                <template #default="{ row }">
                                    <Switch v-if="row.is_ding>-1" v-model:checked="row.is_ding" :params="{ id: row.message_id, field: 'is_ding' }" :requestApi="updateMessageTypeFiled"/>
                                </template>
                            </el-table-column> -->
                            <el-table-column :width="100" fixed="right" label="操作">
                                <template #default="{ row }">
                                    <DialogForm :params="{ act: 'edit', id: row.message_id }" isDrawer path="setting/config/messageType/Info"
                                                title="编辑消息设置" width="700px"
                                                @okCallback="loadFilter">
                                        <a class="btn-link">编辑</a>
                                    </DialogForm>
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
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import '@/style/css/list.less'
import {DialogForm} from '@/components/dialog'
import {onMounted, reactive, ref} from 'vue';
import {Pagination, Switch} from '@/components/list';
import {message, Modal} from 'ant-design-vue'
import {useConfigStore} from "@/store/config";
import type {MessageTypeFilterParams, MessageTypeFilterState} from '@/types/setting/messageType.d';
import {batchSubmit, getMessageTypeList, miniProgramMessageTemplate, miniProgramMessageTemplateSync, updateMessageTypeFiled} from "@/api/setting/messageType";
import {PopForm} from "@/components/pop-form";
import type {LogisticsCompanyFilterState} from "@/types/setting/logisticsCompany";


const config:any = useConfigStore();
// 基本参数定义
const filterState = ref<MessageTypeFilterState[]>([]);
const loading = ref<boolean>(true);
const total = ref<number>(0);
const selectedIds = ref<number[]>([]);
const advancedSearch = ref<boolean>(false);
const filterParams = reactive<MessageTypeFilterParams>({
    page: 1,
    size: config.get('page_size'),
    sort_field: '',
    sort_order: '',
    keyword: '',
    send_type: 1
});

const activeKey = ref<number>(1)
const onTabChange = (val: number) => {
    console.log(val);
    filterParams.send_type = val
    loadFilter()
}

// 获取列表的查询结果
const loadFilter = async () => {
    loading.value = true;
    try {
        const result = await getMessageTypeList({...filterParams});
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

const generate = async () => {
    Modal.confirm({
        title: '您确认要生成小程序消息模板吗？',
        onOk: async () => {
            const result = await miniProgramMessageTemplate();
            message.success(result.message);
            loadFilter();
        }
    });
}

const synchronization = async () => {
    Modal.confirm({
        title: '您确认要同步小程序消息模板吗？',
        onOk: async () => {
            const result = await miniProgramMessageTemplateSync();
            message.success(result.message);
            loadFilter();
        }
    });

}

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
const onSelectChange = (e:MessageTypeFilterState[]) => {
    selectedIds.value = e.map((item) => item.message_id);
};
</script>
<style lang="less" scoped>
.notice-warp {
    background-color: #eef2ff;
    border-radius: 9px;
    padding: 15px;
    margin-bottom: 20px;
    line-height: 24px;
}
</style>
