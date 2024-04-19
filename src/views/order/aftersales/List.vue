<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-table-list-warp">
                <div class="list-table-tool lyecs-search-warp">
                    <el-form :model="filterParams">
                        <div class="list-table-tool-row">
                            <div class="list-table-tool-col">
                                <el-space>
                                    申请类型：
                                    <el-select v-model="filterParams.aftersale_type" clearable>
                                        <el-option v-for="(item,index) in type_list" :value="index" :label="item"/>
                                    </el-select>
                                    退换货状态：
                                    <el-select v-model="filterParams.status" clearable>
                                        <el-option v-for="(item,index) in status_list" :value="index" :label="item"/>
                                    </el-select>
                                    <el-input v-model="filterParams.keyword" class="width240" name="keyword" placeholder="订单号/姓名">
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
                        <table class="custom-table">
                            <thead>
                                <tr>
                                    <th>
                                        <SortButton
                                            v-model:sortField="filterParams.sort_field"
                                            v-model:sortOrder="filterParams.sort_order"
                                            sortName="order_id"
                                            text="退换货商品"
                                            @loadData="loadFilter()"></SortButton>
                                    </th>
                                    <th>售后原因</th>
                                    <th>服务类型</th>
                                    <th>售后状态</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                        </table>
                        <table v-for="item in filterState" class="custom-table">
                            <thead>
                                <tr class="data-tr">
                                    <th colspan="4">
                                        <span class="check-box">售后编号：{{ item.aftersales_sn }}</span>
                                        <el-divider direction="vertical" />
                                        <span class="check-box">申请时间：{{ item.add_time }}</span>
                                        <el-divider direction="vertical" v-if="item.shipping_time" />
                                        <span class="check-box" v-if="item.user_name">发货时间：{{ item.shipping_time }}</span>
                                        <el-divider direction="vertical" v-if="item.user_name" />
                                        <span class="check-box" v-if="item.user_name">申请人：{{ item.user_name }}</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(product, index) in item.aftersales_items">
                                    <td>
                                        <div class="displayRow">
                                            <ProductCard
                                                :pic_thumb="product.pic_thumb"
                                                :product_id="product.product_id"
                                                :product_name="product.product_name"
                                                >
                                            </ProductCard>
                                            <div class="displayColumn textR whiteSN widthAuto">
                                                <div>{{ priceFormat(product.price) }}</div>
                                                <div>× {{ product.quantity }}<span class="red ml10">(退货数量：{{ product.number }})</span></div>
                                                <div></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td v-if="index == 0" :rowspan="item.aftersales_items.length">
                                        <p>{{ item.aftersale_reason || '-' }}</p>
                                    </td>
                                    <td v-if="index == 0" :rowspan="item.aftersales_items.length">
                                        <span>
                                            {{ item.aftersales_type_name }}
                                        </span>
                                    </td>
                                    <td v-if="index == 0" :rowspan="item.aftersales_items.length">
                                        <span
                                            :class="{
                                                orange: item.status === 0,
                                                black: item.status === 1 || item.status === 2 || item.status === 4,
                                                gray: item.status === 3,
                                                green: item.status === 5,
                                            }">
                                            {{ item.status_name }}
                                        </span>
                                    </td>
                                    <td v-if="index == 0" :rowspan="item.aftersales_items.length">
                                        <DialogForm v-if="item.status === 6 || item.status === 7" :params="{ act: 'edit', id: item.aftersale_id }" isDrawer
                                                    path="order/aftersales/Info"
                                                    :title="'售后详情 ' + item.aftersales_sn" width="800px"
                                                    @okCallback="loadFilter" :showClose="false" :showOnOk="false">
                                            <el-button bg class="buttonColor" size="small" text type="primary"> 售后详情 </el-button>
                                        </DialogForm>

                                        <DialogForm v-else :params="{ act: 'edit', id: item.aftersale_id }" isDrawer
                                                    path="order/aftersales/Info"
                                                    :title="'处理售后申请 ' + item.aftersales_sn" width="800px"
                                                    @okCallback="loadFilter" :showClose="false" :showOnOk="false">
                                            <el-button bg class="buttonColor mr10" size="small" text type="danger"> 处理退款 </el-button>
                                        </DialogForm>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div v-if="loading || total == 0" class="empty-warp">
                            <div v-if="!loading" class="empty-bg">暂无数据</div>
                        </div>
                    </a-spin>
                    <div v-if="total > 0" class="pagination-con">
                        <Pagination v-model:page="filterParams.page" v-model:size="filterParams.size" :total="total"
                                    @callback="loadFilter"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import '@/style/css/list.less'
import SortButton from "../../../components/list/src/SortButton.vue";
import {DialogForm} from '@/components/dialog'
import {PopForm} from '@/components/pop-form'
import {onMounted, reactive, ref} from 'vue';
import {DeleteRecord, Pagination, ProductCard, Switch} from '@/components/list';
import {Image} from '@/components/image';
import {message} from 'ant-design-vue'
import {useConfigStore} from "@/store/config";
import {AftersalesFilterParams, AftersalesFilterState} from '@/types/order/aftersales';
import {batchSubmit, getAftersalesList, updateAftersalesField} from "@/api/order/aftersales";
import { priceFormat } from "@/utils/format";

const config:any = useConfigStore();
// 基本参数定义
const filterState = ref(<AftersalesFilterState[]>[]);
const loading = ref<boolean>(true);
const total = ref<number>(0);
const filterParams = reactive<AftersalesFilterParams>({   //初始化用于查询的参数
    page: 1,
    size: config.get('page_size'),
    sort_field: '',
    sort_order: '',
    keyword: '',
});
const status_list = ref<any>({})
const type_list = ref<any>({})
// 获取列表的查询结果
const loadFilter = async () => {
    loading.value = true;
    try {
        const result = await getAftersalesList({...filterParams});
        filterState.value = result.filter_result;
        status_list.value = result.status_list;
        type_list.value = result.type_list;
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


</script>
<style lang="less" scoped>
.table-container {
    .custom-table {
        width: 100%;
        margin-bottom: 20px;
        background-color: #f5f6fa;
        border: 1px solid #f0f0f0;
        border-collapse: collapse;

        height: 60px;

        thead,
        tbody {
            tr {
                height: 45px;
                border-top: 1px solid #f0f0f0; // 垂直分割线
                border-right: 1px solid #f0f0f0; // 垂直分割线
            }

            th,
            td {
                padding: 15px 12px;
                vertical-align: middle;
                border-bottom: 1px solid #f0f0f0; // 水平分割线

                &:first-child {
                    width: 30%; // 多选按钮的宽度
                    min-width: 230px;
                    border-left: 1px solid #f0f0f0; // 左侧分割线
                }

                &:nth-child(2) {
                    min-width: 150px; // “”列宽度
                    width: 15%; // 多选按钮的宽度
                }

                &:nth-child(3) {
                    min-width: 150px; // “”列宽度
                    width: 10%; // 多选按钮的宽度
                }

                &:nth-child(4) {
                    min-width: 140px; // “”列宽度
                    width: 15%; // 多选按钮的宽度
                }

                &:nth-child(5) {
                    min-width: 110px; // “”列宽度
                    width: 10%; // 多选按钮的宽度
                }

                &:nth-child(6) {
                    min-width: 140px; // “”列宽度
                    width: 15%; // 多选按钮的宽度
                }
            }

            .data-tr {
                height: 45px;

                th {
                    font-weight: normal;
                }
            }

            td {
                background-color: white;
                border-right: 1px solid #f0f0f0; // 垂直分割线
            }
        }

        .check-box {
            vertical-align: middle;
        }

        .mr10 {
            margin-right: 10px;
        }

        .ml10 {
            margin-left: 10px;
        }

        .ml5 {
            margin-left: 5px;
        }

        .textR {
            text-align: right;
        }

        .textL {
            text-align: left;
        }

        .buttonColor {
            background-color: rgba(32, 96, 224, 0.03);
        }

        .displayRow {
            display: flex;
            flex-direction: row;
            gap: 8px;
        }

        .displayColumn {
            display: flex;
            flex-direction: column;
        }

        .orderImage {
            min-width: 50px;
            min-height: 50px;
            max-width: 50px;
            max-height: 50px;
            border: 1px solid #eee;
        }

        .productName {
            line-height: 1;
            word-wrap: break-word;
            font-size: 12px;
            color: #333333;
        }

        .whiteSN {
            white-space: nowrap;
        }

        .widthAuto {
            width: auto;
        }

        .buttonStyle {
            display: flex;
            flex-direction: row-reverse;
            flex-wrap: nowrap;
            /* 不允许换行 */
            gap: 8px;
        }
    }

    .fz12 {
        font-size: 12px;
    }

    .fz14 {
        font-size: 14px;
    }

    .black {
        color: #333333;
    }

    .orange {
        color: #ed6a0c;
    }

    .gray {
        color: #999999;
    }
}
</style>