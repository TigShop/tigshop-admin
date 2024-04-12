<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-table-list-warp">
                <div class="list-table-tool lyecs-search-warp">
                    <el-form :model="filterParams">
                        <div class="list-table-tool-row">
                            <div class="list-table-tool-col">
                                <el-space>
                                    <div class="simple-form-field">
                                        <div class="form-group">
                                            <div class="control-container">
                                                <!-- <el-date-picker
                                                  v-model="filterParams.search_date"
                                                  end-placeholder="结束时间"
                                                  range-separator="-"
                                                  start-placeholder="开始时间"
                                                  style="width: 240px"
                                                  type="daterange"
                                                  value-format="YYYY-MM-DD"
                                                /> -->
                                                <SelectTimeInterval v-model:end-date="filterParams.search_end_date" v-model:start-date="filterParams.search_start_date" :clearable="false" type="date" value-format="YYYY-MM-DD"></SelectTimeInterval>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="simple-form-field">
                                        <el-button type="primary" @click="onSearchSubmit">搜索</el-button>
                                    </div>
                                </el-space>

                            </div>
                        </div>
                    </el-form>
                </div>
                <div class="table-container">
                    <a-spin :spinning="loading">
                        <table>
                            <tr>
                                <td class="classheader" colspan="4">会员账户信息</td>
                            </tr>
                            <tr class="normalcell">
                                <td>会员充值总额</td>
                                <td>{{priceFormat(filterState.voucher_amount)}}</td>
                                <td>提现金额</td>
                                <td>{{ priceFormat(filterState.to_cash_amount)}}</td>
                            </tr>
                            <tr class="normalcell">
                                <td>会员余额变化金额</td>
                                <td>{{ priceFormat(filterState.balance) }}</td>
                                <td>会员交结变化金额</td>
                                <td>{{ priceFormat(filterState.frozen_money) }}</td>
                            </tr>
                            <tr>
                                <td class="classheader" colspan="4">余额使用信息</td>
                            </tr>
                            <tr class="normalcell">
                                <td>交易使用余额</td>
                                <td>{{ priceFormat(filterState.surplus) }}</td>
                                <td>积分使用余额</td>
                                <td>{{ priceFormat(filterState.use_points) }}</td>
                            </tr>
                        </table>
                    </a-spin>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import '@/style/css/list.less'
import {onMounted, reactive, ref} from 'vue';
import {message} from 'ant-design-vue'
import {useConfigStore} from "@/store/config";
import type {AccountPanelFilterParams, AccountPanelFilterState} from '@/types/finance/accountPanel.d';
import {getAccountPanelList} from "@/api/finance/accountPanel";
import dayjs from "dayjs";
import {priceFormat} from "@/utils/format";
import { SelectTimeInterval } from "@/components/select";
import { getDays } from "@/utils/util";
import { formattedDate } from "@/utils/time";

const config:any = useConfigStore();
// product_start_date: formattedDate(new Date()),
//     product_end_date: formattedDate(getDays(30, "add")),
// 基本参数定义
const filterState = ref<AccountPanelFilterState>({
    voucher_amount: 0,
    to_cash_amount: 0,
    balance: 0,
    frozen_money: 0,
    surplus: 0,
    use_points: 0,
});
const loading = ref<boolean>(true);
const total = ref<number>(0);
const selectedIds = ref<number[]>([]);
const advancedSearch = ref<boolean>(false);
const filterParams = reactive<AccountPanelFilterParams>({   //初使化用于查询的参数
    page: 1,
    size: config.get('page_size'),
    sort_field: '',
    sort_order: '',
    // search_date: [
    //     dayjs(new Date()).subtract(7, 'day').format('YYYY-MM-DD'), dayjs(new Date()).format('YYYY-MM-DD')
    // ],
    search_start_date:formattedDate(getDays(7, "sub"), "YYYY-MM-DD"),
    search_end_date:formattedDate(new Date(), "YYYY-MM-DD")
});
// 获取列表的查询结果
const loadFilter = async () => {
    loading.value = true;
    try {
        const result = await getAccountPanelList({...filterParams});
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


</script>
<style lang="less" scoped>
table {
    border-collapse: collapse;
    width: 100%;
}
td, th {
    border-bottom: 1px solid #f0f0f0;
    line-height: 5;
    padding: 0 10px;
}
.classheader {
    background-color: #F5F6FA;
    text-align: center;
    font-weight: 600;
}
.normalcell {
    background-color: white;

}
</style>
