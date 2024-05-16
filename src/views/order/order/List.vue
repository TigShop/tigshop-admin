<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-table-list-warp">
                <div class="list-table-tool lyecs-search-warp">
                    <el-form :model="filterParams">
                        <div class="list-table-tool-row">
                            <div class="list-table-tool-col">
                                <el-space>
                                    <el-input v-model="filterParams.keyword" style="width: 280px" name="keyword" placeholder="订单号/收货人姓名/订单ID">
                                        <template #append>
                                            <el-button @click="onSearchSubmit"><span class="iconfont icon-chakan1"></span></el-button>
                                        </template>
                                    </el-input>
                                    <div class="tabs flex">
                                        <div
                                            class="item"
                                            v-for="item in orderStatusList"
                                            :class="filterParams.order_status == item.value ? 'active' : ''"
                                            @click="onTabChange(item.value)"
                                        >
                                            {{ item.label }}
                                        </div>
                                    </div>
                                    <a :class="'advanced-search-btn ml18 ' + (advancedSearch ? 'active' : '')" @click="advancedSearch = !advancedSearch"
                                        >高级搜索<i class="iconfont icon-xia"></i
                                    ></a>
                                </el-space>
                            </div>
                        </div>
                        <div v-if="advancedSearch" class="advanced-search-warp list-table-tool-row">
                            <div class="simple-form-warp">
                                <div class="simple-form-field">
                                    <div class="form-group">
                                        <label class="control-label"><span>选择店铺：</span></label>
                                        <div class="control-container">
                                            <SelectStore v-model:modelValue="filterParams.store_id"></SelectStore>
                                        </div>
                                    </div>
                                </div>
                                <div class="simple-form-field">
                                    <div class="form-group">
                                        <label class="control-label"><span>支付状态：</span></label>
                                        <div class="control-container">
                                            <el-select v-model="filterParams.pay_status" clearable>
                                                <el-option v-for="item in payStatusList" :label="item.label" :value="item.value"></el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                                <div class="simple-form-field">
                                    <div class="form-group">
                                        <label class="control-label"><span>发货状态：</span></label>
                                        <div class="control-container">
                                            <el-select v-model="filterParams.shipping_status" clearable>
                                                <el-option v-for="item in shippingStatusList" :label="item.label" :value="item.value"></el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                                <div class="simple-form-field">
                                    <div class="form-group">
                                        <label class="control-label"><span> 详细地址：</span></label>
                                        <div class="control-container">
                                            <el-input v-model:value="filterParams.address" />
                                        </div>
                                    </div>
                                </div>
                                <div class="simple-form-field">
                                    <div class="form-group">
                                        <label class="control-label"><span>Email：</span></label>
                                        <div class="control-container">
                                            <el-input v-model:value="filterParams.email" />
                                        </div>
                                    </div>
                                </div>

                                <div class="simple-form-field">
                                    <div class="form-group">
                                        <label class="control-label"><span>手机号：</span></label>
                                        <div class="control-container">
                                            <el-input v-model:value="filterParams.mobile" />
                                        </div>
                                    </div>
                                </div>
                                <div class="simple-form-field">
                                    <div class="form-group">
                                        <label class="control-label"><span>配送物流：</span></label>
                                        <div class="control-container">
                                            <SelectLogisticsCompany v-model:id="filterParams.logistics_id"></SelectLogisticsCompany>
                                        </div>
                                    </div>
                                </div>
                                <div class="simple-form-field">
                                    <div class="form-group">
                                        <label class="control-label"><span>下单时间：</span></label>
                                        <div class="control-container">
                                            <SelectTimeInterval
                                                v-model:end-date="filterParams.add_end_time"
                                                v-model:start-date="filterParams.add_start_time"
                                                :clearable="false"
                                                type="date"
                                                value-format="YYYY-MM-DD"
                                            ></SelectTimeInterval>
                                            <!-- <el-date-picker v-model="filterParams.add_time" class="width240" end-placeholder="结束时间" range-separator="-" start-placeholder="起始时间"
                                                            type="daterange"/> -->
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
                        <table class="custom-table">
                            <thead>
                                <tr>
                                    <th>
                                        <el-checkbox
                                            v-model="selectAll"
                                            :indeterminate="isIndeterminate"
                                            class="check-box mr10"
                                            @change="onSelectChangeAll"
                                        ></el-checkbox>
                                        <SortButton
                                            v-model:sortField="filterParams.sort_field"
                                            v-model:sortOrder="filterParams.sort_order"
                                            sortName="order_id"
                                            text="订单信息(下单时间排序)"
                                            @loadData="onSearchSubmit()"
                                        ></SortButton>
                                    </th>
                                    <th>
                                        <SortButton
                                            v-model:sortField="filterParams.sort_field"
                                            v-model:sortOrder="filterParams.sort_order"
                                            sortName="total_amount"
                                            text="订单金额"
                                            @loadData="onSearchSubmit()"
                                        ></SortButton>
                                    </th>
                                    <th>收货人信息</th>
                                    <th>物流/支付信息</th>
                                    <th>订单状态</th>
                                    <th class="textR">操作</th>
                                </tr>
                            </thead>
                        </table>
                        <table v-for="item in filterState" class="custom-table">
                            <thead>
                                <tr class="data-tr">
                                    <th colspan="5">
                                        <el-checkbox v-model="item.checkBox" class="check-box mr10" @change="onSelectChange(item)"></el-checkbox>
                                        <span class="check-box">订单编号：{{ item.order_sn }}</span>
                                        <el-divider direction="vertical" />
                                        <span class="check-box">下单时间：{{ item.add_time }}</span>
                                        <!--                                    <el-tooltip :content="'操作人：' + item.op_admin_name" effect="light" placement="top">-->
                                        <!--                                        <el-tag class="ml10" disable-transitions effect="plain" size="small">代下单</el-tag>-->
                                        <!--                                    </el-tooltip>-->
                                        <el-tooltip
                                            v-if="item.parent_order_id > 0"
                                            :content="'该订单已拆分，点击可查看父订单' + ''"
                                            effect="light"
                                            placement="top"
                                        >
                                            <Tag text="子订单"></Tag>
                                        </el-tooltip>
                                        <el-tooltip v-if="item.store_id > 0" :content="'订单来自店铺：' + item.store_title" effect="light" placement="top">
                                            <Tag :transparent="false" text="店铺"></Tag>
                                        </el-tooltip>
                                        <el-tooltip v-if="item.order_source" :content="'订单来自' + item.order_source + '下单'" effect="light" placement="top">
                                            <Tag :text="item.order_source" :transparent="true" style="text-transform: uppercase"></Tag>
                                        </el-tooltip>
                                        <!--<el-tag class="ml10" disable-transitions effect="plain" size="small">-->
                                        <!--团购订单-->
                                        <!--</el-tag>-->
                                        <Tag v-if="filterParams.is_exchange_order" :transparent="true" color="red" text="积分兑换"></Tag>
                                    </th>
                                    <th class="textR">
                                        <DialogForm
                                            :params="{ act: 'detail', id: item.order_id }"
                                            :showClose="false"
                                            :showOnOk="false"
                                            :title="'订单详情 ' + item.order_sn"
                                            isDrawer
                                            path="order/order/Info"
                                            width="880px"
                                            @callback="loadFilter"
                                        >
                                            <el-button bg class="buttonColor mr10" size="small" text type="primary"> 查看详情 </el-button>
                                        </DialogForm>
                                        <DialogForm
                                            :params="{ act: 'detail', id: item.order_id, valueName: 'admin_note' }"
                                            isDrawer
                                            path="order/order/src/EditRemark"
                                            title="编辑备注"
                                            width="600px"
                                            @okCallback="loadFilter"
                                        >
                                            <el-button bg class="buttonColor" size="small" text type="primary"> 备注 </el-button>
                                        </DialogForm>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(product, index) in item.items">
                                    <td>
                                        <div class="displayRow">
                                            <ProductCard
                                                :pic_thumb="product.pic_thumb"
                                                :product_id="product.product_id"
                                                :product_name="product.product_name"
                                                :product_type="product.product_type"
                                                :url="product.url"
                                            ></ProductCard>
                                            <div class="displayColumn textR whiteSN widthAuto">
                                                <div>{{ priceFormat(product.price) }}</div>
                                                <div>× {{ product.quantity }}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td v-if="index == 0" :rowspan="item.items.length">
                                        <div class="displayColumn textR fz14">
                                            <div>{{ priceFormat(item.total_amount) }}</div>
                                            <div class="gray fz12">(含运费：{{ item.shipping_fee }})</div>
                                            <div v-if="item.store_id > 0" class="fz12">
                                                <div>
                                                    <p>
                                                        佣金：<a
                                                            :href="'store_commission_log.html?act=list&store_id=' + item.store_id"
                                                            class="green"
                                                            target="_blank"
                                                            >已结算</a
                                                        >
                                                    </p>
                                                </div>
                                                <div>
                                                    <p>佣金：<span class="gray">未结算</span></p>
                                                </div>
                                            </div>
                                            <div>
                                                <DialogForm
                                                    v-if="item.status === 6 || item.status === 7"
                                                    :params="{ act: 'detail', id: item.aftersale_id }"
                                                    isDrawer
                                                    path="order/aftersales/Info"
                                                    :title="'售后详情 ' + item.aftersales_sn"
                                                    width="800px"
                                                    @okCallback="loadFilter"
                                                    :showClose="false"
                                                    :showOnOk="false"
                                                >
                                                    <el-button bg class="buttonColor" size="small" text type="primary"> 售后详情 </el-button>
                                                </DialogForm>
                                                <!-- <el-button size="small" text type="primary"> 售后详情 </el-button> -->
                                            </div>
                                        </div>
                                    </td>
                                    <td v-if="index == 0" :rowspan="item.items.length">
                                        <div class="displayColumn fz12 textL">
                                            <div class="gray">
                                                会员名：
                                                <DialogForm
                                                    :params="{ act: 'detail', id: item.user_id }"
                                                    isDrawer
                                                    path="order/order/src/Users"
                                                    title="用户信息"
                                                    width="600px"
                                                    @okCallback="loadFilter"
                                                    :showOnOk="false"
                                                >
                                                    <a>{{ item.username }}</a>
                                                </DialogForm>
                                            </div>
                                            <div class="gray">
                                                收货人：
                                                <span class="black">
                                                    {{ item.consignee }}
                                                    <span class="ml5">{{ item.mobile }}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td v-if="index == 0" :rowspan="item.items.length">
                                        <div class="displayColumn fz12 textL">
                                            <div>
                                                <span>{{ item.pay_type === 0 ? "在线支付" : item.pay_type === 1 ? "货到付款" : "线下支付" }}</span>
                                            </div>
                                            <div v-if="item.logistics_name">
                                                {{ item.shipping_type_name }}
                                                <span class="gray">{{ "" + item.logistics_name + "" }}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td v-if="index == 0" :rowspan="item.items.length">
                                        <span
                                            :class="{
                                                orange: item.order_status === 0,
                                                black: item.order_status === 1 || item.order_status === 2 || item.order_status === 4,
                                                gray: item.order_status === 3,
                                                green: item.order_status === 5
                                            }"
                                        >
                                            {{ item.order_status_name }}
                                        </span>
                                    </td>
                                    <td v-if="index == 0" :rowspan="item.items.length">
                                        <div class="buttonStyle">
                                            <DialogForm
                                                v-if="item.available_actions.cancel_order"
                                                :params="{ act: 'cancel_order', id: item.order_id }"
                                                isDrawer
                                                path="order/order/src/Operation"
                                                title="取消订单"
                                                width="600px"
                                                @okCallback="loadFilter">
                                                <el-button bg class="buttonColor" size="small" text type="primary"> 取消订单 </el-button>
                                            </DialogForm>
                                            <el-button v-if="item.available_actions.del_order" bg size="small" text type="primary" @click="onDelClick(item.order_id)"> 删除订单 </el-button>
                                            <!-- <el-button v-if="item.is_del === 1" bg size="small" text type="primary"> 还原 </el-button> -->
                                            <!--<el-button bg size="small" text type="primary">-->
                                            <!--处理退款-->
                                            <!--</el-button>-->

                                            <DialogForm
                                                :params="{ act: 'detail', id: item.order_id }"
                                                :title="'订单发货 ' + item.order_sn"
                                                isDrawer
                                                path="order/order/src/ToShip"
                                                width="900px"
                                                @okCallback="loadFilter"
                                                v-if="item.available_actions.deliver"
                                            >
                                                <el-button bg size="small" text type="danger"> 去发货 </el-button>
                                            </DialogForm>
                                            <el-button v-if="item.available_actions.confirm_receipt" bg size="small" text type="danger" @click="onReceiptClick(item.order_id)"> 确认收货 </el-button>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-if="item.admin_note">
                                    <td colspan="6">
                                        <span class="orange">商家备注：</span>{{ item.admin_note }}
                                        <DialogForm
                                            :params="{ act: 'detail', id: item.order_id, valueName: 'admin_note' }"
                                            isDrawer
                                            path="order/order/src/EditRemark"
                                            title="编辑备注"
                                            width="600px"
                                            @okCallback="loadFilter"
                                        >
                                            <el-button bg class="buttonColor" size="small" text type="primary"> 修改 </el-button>
                                        </DialogForm>
                                    </td>
                                </tr>
                                <!-- 可以添加更多的行 -->
                            </tbody>
                        </table>
                        <div v-if="loading || total == 0" class="empty-warp">
                            <div v-if="!loading" class="empty-bg">暂无数据</div>
                        </div>
                    </a-spin>
                </div>

                <div v-if="total > 0" class="pagination-con">
                    <Pagination v-model:page="filterParams.page" v-model:size="filterParams.size" :total="total" @callback="loadFilter" />
                </div>
                <div v-if="selectedIds.length > 0" class="selected-action-warp">
                    <div class="selected-action">
                        <el-space>
                            <span
                                >已选择：<b>{{ selectedIds.length }}</b> 项</span
                            >
                        </el-space>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import "@/style/css/list.less";
import { computed, onMounted, reactive, ref } from "vue";
import { Pagination, ProductCard } from "@/components/list";
import { message, Modal } from "ant-design-vue";
import { useConfigStore } from "@/store/config";
import { OrderFilterParams, OrderFilterState } from "@/types/order/order.d";
import { batchSubmit, getOrderList, operationOrder } from "@/api/order/order";
import { SelectStore, SelectLogisticsCompany } from "@/components/select";
import { DialogForm } from "@/components/dialog";
import SortButton from "../../../components/list/src/SortButton.vue";
import dayjs from "dayjs";
import { priceFormat } from "@/utils/format";
import { useRoute, useRouter } from "vue-router";
import { Tag } from "@/components/form";
import { SelectTimeInterval } from "@/components/select";

const config: any = useConfigStore();
// 基本参数定义
const orderStatusList = reactive([
    { value: -1, label: "全部" },
    { value: 0, label: "待支付" },
    { value: 1, label: "待发货" },
    { value: 2, label: "已发货" },
    { value: 3, label: "已取消" },
    { value: 4, label: "无效" },
    { value: 5, label: "已完成" },
    { value: -2, label: "已删除" }
]);

const shippingStatusList = reactive([
    // {value: -1, label: '请选择'},
    { value: 0, label: "待发货" },
    { value: 1, label: "已发货" },
    { value: 2, label: "已收货" },
    { value: 3, label: "配送中" },
    { value: 4, label: "配送失败" }
]);

const payStatusList = reactive([
    // {value: -1, label: '请选择'},
    { value: 0, label: "未付款" },
    { value: 1, label: "支付中" },
    { value: 2, label: "已付款" },
    { value: 3, label: "退款中" },
    { value: 4, label: "已退款" }
]);

const onTabChange = (value: number) => {
    filterParams.order_status = value;
    loadFilter();
};

const filterState = ref<OrderFilterState[]>([]);
const loading = ref<boolean>(true);
const total = ref<number>(0);
const selectedIds = ref<number[]>([]);
const selectAll = ref<boolean>(false);

const advancedSearch = ref<boolean>(false);
const filterParams = reactive<OrderFilterParams>({
    page: 1,
    size: config.get("page_size"),
    sort_field: "order_id",
    sort_order: "desc",
    keyword: "",
    order_status: -1,
    // pay_status: -1,
    // shipping_status: -1,
    address: "",
    email: "",
    mobile: "",
    add_time: [],
    add_end_time: "",
    add_start_time: ""
});
// dayjs(new Date()).subtract(7, 'day').format('YYYY-MM-DD'), dayjs(new Date()).format('YYYY-MM-DD')
// 获取列表的查询结果
const loadFilter = async () => {
    loading.value = true;
    try {
        console.log(filterParams);
        const result = await getOrderList({ ...filterParams });
        const newArr = result.filter_result.map((item) => ({
            ...item, // 保留原始数据项的属性
            checkBox: false // 添加 check 属性并设置为 false
        }));
        filterState.value = newArr;
        total.value = result.total;
    } catch (error: any) {
        message.error(error.message);
    } finally {
        loading.value = false;
    }
};
const props = defineProps({
    id: {
        type: Number,
        default: 0
    },
    act: {
        type: String,
        default: ""
    },
    isDialog: Boolean
});
const route = useRoute();
const query = useRouter().currentRoute.value.query;
const action = ref<string>(props.isDialog ? props.act : String(query.act));
const id = ref<number>(props.isDialog ? props.id : Number(query.id));
onMounted(() => {
    if (route.meta.queryParam === "is_exchange_order") {
        filterParams.is_exchange_order = 1;
    }
    if (action.value) {
        filterParams.user_id = id.value;
    }
    loadFilter();
});

// 参数查询
const onSearchSubmit = () => {
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
const onDelClick = (id:any) => {
    Modal.confirm({
        title: "确认删除订单吗？",
        content: "被删除的订单可以通过筛选查找并恢复",
        onOk: async () => {
            try {
                const result = await operationOrder("del_order", { id: id });
                message.success(result.message);
                loadFilter();
            } catch (error: any) {
                message.error(error.message);
            } finally {
                loading.value = false;
            }
        },
    });
};
const onReceiptClick = (id:any) => {
    Modal.confirm({
        title: "确认订单已收货吗？",
        onOk: async () => {
            try {
                const result = await operationOrder("confirm_receipt", { id: id });
                message.success(result.message);
                loadFilter();
            } catch (error: any) {
                message.error(error.message);
            } finally {
                loading.value = false;
            }
        },
    });
};

// 多选操作
const isIndeterminate = computed(() => {
    selectAll.value = selectedIds.value.length > 0 && selectedIds.value?.length === filterState.value?.length;
    return selectedIds.value.length > 0 && selectedIds.value.length < filterState.value.length;
});
const onSelectChangeAll = (val: boolean) => {
    if (val) {
        selectedIds.value.length = 0;
        filterState.value?.forEach((item: any) => {
            item.checkBox = true;
            selectedIds.value.push(item.order_id);
        });
    } else {
        filterState.value?.forEach((item) => {
            item.checkBox = false;
            selectedIds.value.length = 0;
        });
    }
};
const onSelectChange = (e: any) => {
    if (e.checkBox) {
        if (selectedIds.value.indexOf(e.order_id) === -1) {
            selectedIds.value.push(e.order_id);
        }
    } else {
        let index = selectedIds.value.indexOf(e.order_id);
        if (index !== -1) {
            selectedIds.value.splice(index, 1);
        }
    }
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
                    width: 25%; // 多选按钮的宽度
                    min-width: 230px;
                    border-left: 1px solid #f0f0f0; // 左侧分割线
                }

                &:nth-child(2) {
                    min-width: 90px; // “”列宽度
                    width: 10%; // 多选按钮的宽度
                }

                &:nth-child(3) {
                    min-width: 230px; // “”列宽度
                    width: 25%; // 多选按钮的宽度
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
.tabs {
    .item {
        width: 55px;
        text-align: center;
        height: 25px;
        line-height: 25px;
        color: #333;
        margin: 0 5px;
        font-size: 14px;
        border-radius: 2px;
        border: 1px solid #fff;
        cursor: pointer;
        &:hover {
            color: #1890ff;
        }
    }
    .active {
        color: #1890ff;
        background-color: rgba(61, 127, 255, 0.06);
        border: 1px solid #1890ff;
    }
}

@media only screen and (max-width: 767px) {
    .tabs {
        flex-wrap: wrap;
        gap: 10px !important;
        .item {
            margin: 0 !important;
        }
    }
    .table-container {
        overflow-x: auto;
        .table-container-con {
            min-width: 800px;
        }
    }
}
</style>
