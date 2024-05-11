<template>
    <div class="lyecs-product-select-group">
        <el-space>
            <DialogForm
                :params="{ selected_ids: ids, isMultiple: props.isMultiple }"
                isDrawer
                path="product/product/src/SelectProduct"
                title="选择商品"
                width="600px"
                @okCallback="onOk">
                <el-button :disabled="max > 0 && ids?.length >= max" type="primary">选择商品</el-button>
            </DialogForm>
            <span v-if="isMultiple && ids?.length > 0" class="ml10"
                >已选择 <b>{{ ids?.length }}</b> 个商品</span
            >
            <el-button v-if="isMultiple && ids?.length > 0" @click="clear">清空</el-button>
        </el-space>
        <div v-if="productList.length > 0 && !loading" class="lyecs-product-selected-con">
            <div class="product-selected-list">
                <div class="product-selected-list-tr product-selected-list-th">
                    <div class="col col1">商品编号</div>
                    <div class="col col2">商品信息</div>
                    <div class="col col3">操作</div>
                </div>
                <template v-for="(item, key) in productList" :key="key">
                    <div class="product-selected-list-tr">
                        <div class="col col1">{{ item.product_sn }}</div>
                        <div class="col col2 product-info">
                            <img :src="imageFormat(item.pic_thumb)" height="50" width="50" />
                            <span>{{ item.product_name }}</span>
                        </div>
                        <div class="col col3">
                            <a class="del-btn" @click="del(key)">删除</a>
                        </div>
                    </div>
                </template>
            </div>
            <div v-if="total > 0" class="pagination-con">
                <Pagination
                    v-model:page="filterParams.page"
                    v-model:size="filterParams.size"
                    :total="total"
                    @callback="loadList"
                    layout="slot ,prev, pager, next"
                    :background="false" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref, defineModel } from "vue";
import { DialogForm } from "@/components/dialog";
import { imageFormat } from "@/utils/format";
import { getProductList } from "@/api/product/product";
import { message } from "ant-design-vue";
import { ProductFilterParams, type ProductFilterState } from "@/types/product/product";
import { useConfigStore } from "@/store/config";
import { Pagination } from "@/components/list";
// 传值
const props = defineProps({
    // 传入需要显示的商品list
    max: { type: Number, default: -1 },
    // 单选还是多选
    isMultiple: {
        type: Boolean,
        default: true,
    },
});

const ids = defineModel<number[]>("ids", { type: Array, default: [] });

onMounted(async () => {
    if (ids.value && ids.value.length > 0) {
        await loadList(ids.value);
    }
});
// 商品列表
const productList = ref<ProductFilterState[]>([]);
const total = ref(0);

const config = useConfigStore();
const loading = ref<boolean>(true);
const filterParams = reactive<ProductFilterParams>({
    page: 1,
    size: config.get("page_size"),
    sort_field: "",
    sort_order: "",
    keyword: "",
});
const loadList = async (id: number[]) => {
    loading.value = true;
    try {
        const result = await getProductList({ ids: id, ...filterParams });
        productList.value = result.filter_result;
        total.value = result.total;
    } catch (error: any) {
        message.error(error.message);
    } finally {
        loading.value = false;
    }
};
const onOk = (e: number[]) => {
    let _list = ids.value;
    if (props.isMultiple == false) {
        _list = [];
    }
    for (let index in e) {
        _list.push(e[index]);
    }
    ids.value = _list;
    loadList(_list);
};
// 清空
const clear = () => {
    productList.value = [];
    ids.value = [];
};
// 删除
const del = (key: number) => {
    let del_product_id = productList.value[key].product_id;
    ids.value = ids.value.filter(num => num !== del_product_id);
    productList.value.splice(<any>key, 1);
};
defineExpose({
    ids,
    productList,
});
</script>

<style lang="less" scoped>
.all_brand {
    padding: 8px;
}

.all_brand ul {
    display: flex;
    flex-wrap: wrap;
    width: 290px;
}

.all_brand li a {
    padding: 2px 7px;
    display: inline-block;
    border-radius: 3px;
    line-height: 20px;
}

.all_brand li a:hover {
    background: #f4f4f4;
}

/*商品选择器*/
.lyecs-product-select-group {
    margin-bottom: 0;
    width: 100%;
}

.lyecs-product-select-group .lyecs-product-selected-con {
    max-width: 710px;
    position: relative;
    padding-top: 50px;
    margin-top: 10px;
}

.lyecs-product-select-group .clear-btn {
    margin-left: 20px;
}

.lyecs-product-select-group .desc {
    margin-left: 20px;
    color: #999;
}

.lyecs-product-select-group .product-selected-list {
    margin-bottom: 20px;
    max-height: 550px;
    overflow-y: auto;
    min-width: 400px;
}

.lyecs-product-select-group .product-selected-list-tr {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    border-bottom: 1px solid #f0f0f0;
}

.lyecs-product-select-group .product-selected-list-th {
    color: #333;
    font-weight: bold;
    position: absolute;
    top: 0;
    width: 100%;
    background: #fff;
    height: 50px;
}

.lyecs-product-select-group .product-selected-list-tr .col {
    padding: 10px;
}

.lyecs-product-select-group .product-selected-list-tr .col1 {
    width: 100px;
}

.lyecs-product-select-group .product-selected-list-tr .col2 {
    flex: 1;
}

.lyecs-product-select-group .product-selected-list-tr .col3 {
    width: 80px;
}

.lyecs-product-select-group .product-selected-list-tr .product-info {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
}

.lyecs-product-select-group .product-selected-list-tr .product-info img {
    margin-right: 10px;
}
</style>
