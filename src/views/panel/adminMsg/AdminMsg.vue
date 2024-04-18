<template>
    <div class="message_center">
        <div class="tab_box">
            <div class="tab" v-for="(item, index) in msgList" :class="msgIndex == index ? 'current' : ''" @click="msgChange(index)">
                <p>{{ item.cat_name }}</p>
                <p class="num" v-if="item.unread_count > 0">{{ item.unread_count }}</p>
            </div>
        </div>
        <div class="tab_box">
            <div class="tab" v-for="(item, index) in childList" :class="childIndex == index ? 'current' : ''" @click="childChange(index)">
                <p>{{ item.name }}</p>
                <p class="num" v-if="item.unread_count > 0">{{ item.unread_count }}</p>
            </div>
        </div>
        <div class="list_box">
            <div class="item" v-if="filterState.length > 0">
                <Collapse v-for="item in filterState" :item="item" @setReadedCallback="loadFilter"></Collapse>
            </div>
            <div class="table-empty" v-else>
                <img src="/src/style/images/common/empty-bg.png" alt="" />
                <p>当前暂无任何消息哟</p>
            </div>
        </div>
        <div class="btn">
            <el-button @click="setAllReaded">全部已读</el-button>
        </div>
        <div v-if="filterState.length > 0 && total > 0" class="pagination-con">
            <Pagination v-model:page="filterParams.page" v-model:size="filterParams.size" :total="total" @callback="loadFilter" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { useConfigStore } from "@/store/config";
import { Pagination } from "@/components/list";
import { message } from "ant-design-vue";
import Collapse from "./src/Collapse.vue";
import type { AdminMsgFilterParams, AdminMsgFilterState, AdminMsgMsgTypeFilterState } from "@/types/panel/adminMsg";
import { getAdminMsgList, getAdminMsgSetAllReaded } from "@/api/panel/adminMsg";

const config = useConfigStore();
const msgList = ref<AdminMsgMsgTypeFilterState[]>([]);
interface childFrom {
    msg_type: number;
    name: string;
    unread_count: number;
}
const childList = ref<childFrom[]>([]);
const msgIndex = ref(0);
const childIndex = ref(0);
const loading = ref<boolean>(true);
const filterParams = reactive<AdminMsgFilterParams>({
    //初使化用于查询的参数
    page: 1,
    size: config.get("page_size"),
    sort_field: "",
    sort_order: "",
    keyword: "",
    msg_type: 11,
});
const filterState = ref(<AdminMsgFilterState[]>[]);
const total = ref<number>(0);
// 获取列表的查询结果
const loadFilter = async () => {
    loading.value = true;
    try {
        const result = await getAdminMsgList({ ...filterParams });
        filterState.value = result.filter_result;
        msgList.value = result.msg_type_arr;
        childList.value = toArray(msgList.value[msgIndex.value].child);
        total.value = result.total;
    } catch (error: any) {
        message.error(error.message);
    } finally {
        loading.value = false;
    }
};
onMounted(() => {
    loadFilter();
});
const setAllReaded = async () => {
    await getAdminMsgSetAllReaded();
    loadFilter();
};
const msgChange = (index: number) => {
    msgIndex.value = index;
    childIndex.value = 0;
    filterState.value.length = 0;
    filterParams.msg_type = toArray(msgList.value[msgIndex.value].child)[0].msg_type;
    loadFilter();
};
const childChange = (index: number) => {
    childIndex.value = index;
    filterState.value.length = 0;
    filterParams.msg_type = toArray(msgList.value[msgIndex.value].child)[index].msg_type;
    loadFilter();
};
const toArray = (arr: any) => {
    if (typeof arr == "object") {
        var newArr = [];

        for (let i in arr) {
            newArr.push(arr[i]);
        }
        return newArr;
    } else {
        return arr;
    }
};
</script>

<style lang="less" scoped>
.message_center {
    position: relative;
    display: flex;

    .tab_box {
        height: 418px;
        width: 150px;
        padding: 20px 10px;
        border-right: 1px solid #eee;

        .tab {
            padding: 7px 20px;
            line-height: 20px;
            border-radius: 4px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;

            &:hover {
                color: var(--tig-primary);
            }

            .num {
                padding: 0 6px;
                height: 14px;
                line-height: 14px;
                color: #fff;
                font-weight: 400;
                background: #fa4350;
                border-radius: 7px;
                font-size: 12px;
            }
        }

        .current {
            background: rgba(61, 127, 255, 0.06);
            color: var(--tig-primary);
        }
    }

    .list_box {
        flex: 1;
        padding: 10px 20px;
        .item {
            height: 370px;
            overflow: auto;
            &::-webkit-scrollbar-thumb {
                border-radius: 8px;
                box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                background: #666666;
            }
        }
        .table-empty {
            width: 100%;
            text-align: center;
            font-size: 14px;
            padding: 100px 0 50px;
            color: #999;

            img {
                width: 160px;
            }
        }
    }
    .pagination-con {
        position: absolute;
        right: 20px;
        bottom: 10px;
    }
    .btn {
        position: absolute;
        left: 20px;
        bottom: 20px;
    }
}
</style>
<!-- 
    <div class="message_center">
        <div class="tab_box" v-for="item in msgList">
            <div class="tab">
                {{ item.name }}
            </div>
        </div>
        <div class="tab_box" v-for="item in childList">
            <div class="tab">
                {{ item.name }}
            </div>
        </div>
        <div class="list_box" style="height: 418px;">
            <div class="demo-collapse">
                <div class="table-empty">
                    <img src="/src/style/images/common/empty-bg.png" alt="">
                    <p>当前暂无任何消息哟</p>
                </div> 
            </div>
        </div>
    </div>
 -->
