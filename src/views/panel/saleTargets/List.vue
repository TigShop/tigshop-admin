<template>
    <div class="container">
        <div class="content_wrapper">
            <a-spin :spinning="loading">
                <div class="card-menu">
                    <div class="card-menu-item">
                        <div class="card-menu-item-title">订单总数</div>
                        <div class="card-menu-item-value">{{ filterState?.order_num }}</div>
                    </div>
                    <div class="card-menu-item">
                        <div class="card-menu-item-title">订单商品总数</div>
                        <div class="card-menu-item-value">{{ filterState?.order_product_num }}</div>
                    </div>
                    <div class="card-menu-item">
                        <div class="card-menu-item-title">订单总金额</div>
                        <div class="card-menu-item-value">{{ filterState?.order_total_amount }}</div>
                    </div>
                    <div class="card-menu-item">
                        <div class="card-menu-item-title">会员总数</div>
                        <div class="card-menu-item-value">{{ filterState?.user_num }}</div>
                    </div>
                    <div class="card-menu-item">
                        <div class="card-menu-item-title">消费会员总数</div>
                        <div class="card-menu-item-value">{{ filterState?.consumer_membership_num }}</div>
                    </div>
                    <div class="card-menu-item">
                        <div class="card-menu-item-title">人均消费数</div>
                        <div class="card-menu-item-value">{{ filterState?.capita_consumption }}</div>
                    </div>
                    <div class="card-menu-item">
                        <div class="card-menu-item-title">访问数</div>
                        <div class="card-menu-item-value">{{ filterState?.click_count }}</div>
                    </div>
                    <div class="card-menu-item">
                        <div class="card-menu-item-title">访问转化率</div>
                        <div class="card-menu-item-value">{{ filterState?.click_rate }}%</div>
                    </div>
                    <div class="card-menu-item">
                        <div class="card-menu-item-title">订单转化率</div>
                        <div class="card-menu-item-value">{{ filterState?.order_rate }}%</div>
                    </div>
                    <div class="card-menu-item">
                        <div class="card-menu-item-title">消费会员比率</div>
                        <div class="card-menu-item-value">{{ filterState?.consumer_membership_rate }}%</div>
                    </div>
                    <div class="card-menu-item">
                        <div class="card-menu-item-title">购买率</div>
                        <div class="card-menu-item-value">{{ filterState?.purchase_rate }}%</div>
                    </div>
                </div>
            </a-spin>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { getQuotaSales } from "@/api/panel/saleTargets";
import { FilterResult } from "@/types/panel/saleTargets.d";

const loading = ref(false);
const filterState = ref<FilterResult>({
    order_num: "0",
    order_product_num: "0",
    order_total_amount: "0",
    user_num: "0",
    consumer_membership_num: "0",
    capita_consumption: "0",
    click_count: "0",
    click_rate: "0",
    order_rate: "0",
    consumer_membership_rate: "0",
    purchase_rate: "0"
});

const getData = async () => {
    loading.value = true;
    try {
        const result = await getQuotaSales();
        if (result.errcode === 0) {
            filterState.value = result.filter_result;
        }
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    getData();
});
</script>

<style lang="less" scoped>
.card-menu {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 17px 28px;

    .card-menu-item {
        padding: 15px 20px 20px 20px;
        background-color: #f7f8fa;
        border-radius: 10px;

        .card-menu-item-title {
            font-size: 14px;
            color: #777;
        }
        .card-menu-item-value {
            font-size: 24px;
            color: #555;
            display: block;
            font-weight: bold;
            padding: 10px 0;
        }
    }
}
</style>
