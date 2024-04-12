<template>
    <div class="lyecs-product-select-group">
        <el-space>
            <DialogForm :params="{ selected_ids: productList, isMultiple: false }" isDrawer path="product/product/src/SelectProduct" title="选择商品" width="600px" @okCallback="onOk">
                <el-button :disabled="productList?.length>0" type="primary">选择商品</el-button>
            </DialogForm>
            <el-button v-if="productList?.length > 0" @click="clear">清空</el-button>
        </el-space>
        <div v-if="productList?.length > 0&&!loading" class="lyecs-product-selected-con">
            <div class="product-selected-list">
                <div class="product-selected-list-tr product-selected-list-th">
                    <div class="col col2">商品信息</div>
                    <div class="col col1">秒杀价</div>
                    <div class="col col1">秒杀库存</div>
                    <div class="col col3">操作</div>
                </div>
                <template v-for="(item, key) in productList">
                    <div class="product-selected-list-tr">
                        <div class="col col2 product-info">
                            <div style="display: flex">
                                <img :src="imageFormat(item.pic_thumb)" height="50" width="50">
                                <span style="line-height: 2">{{ item.product_name }}</span>
                            </div>
                            <ul>
                                <li v-for="it in item.sku_data">{{ it.name }}：{{ it.value }}</li>
                            </ul>
                        </div>
                        <div class="col col1">
                            <el-input v-model="item.seckill_price"></el-input>
                            <div class="extra">价格(元)：{{ item.sku_price }}</div>
                        </div>
                        <div class="col col1">
                            <el-input v-model="item.seckill_stock"></el-input>
                            <div class="extra">现有库存：{{ item.sku_stock }}</div>
                        </div>
                        <div class="col col3">
                            <el-button v-if="item.seconds_seckill" :type="item.tip_value=='取消参加'?'danger':'primary'" link @click="del(key)" @mouseout="item.tip_value='已参加'" @mouseover="item.tip_value='取消参加'">{{ item.tip_value }}</el-button>
                            <el-button v-else link type="primary" @click="del(key)">参加秒杀</el-button>
                        </div>
                    </div>
                </template>
                <div class="batch">
                    <span>批量设置：</span>
                    <div v-if="inventory&&price" @click="price = !price">秒杀价格</div>
                    <div v-else-if="!price" class="setting">
                        <el-input v-model="_price" placeholder="请输入秒杀价格"></el-input>
                        <el-button link type="primary" @click="saveBatch(1)">保存</el-button>
                        <el-button link type="primary" @click="price = !price">取消</el-button>
                    </div>
                    <div v-if="inventory&&price" @click="inventory = !inventory">秒杀库存</div>
                    <div v-else-if="!inventory" class="setting">
                        <el-input v-model="_inventory" placeholder="请输入秒杀库存"></el-input>
                        <el-button link type="primary" @click="saveBatch(2)">保存</el-button>
                        <el-button link type="primary" @click="inventory = !inventory">取消</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {defineModel, onMounted, ref} from "vue"
import {DialogForm} from '@/components/dialog'
import {imageFormat} from '@/utils/format'
import {getProduct} from "@/api/product/product";
import {message} from "ant-design-vue";
import {useConfigStore} from "@/store/config";
import type {SeckillProductState} from "@/types/promotion/seckill";
// 传值
const productList = defineModel<Array<SeckillProductState>>("productList", { default: () => ([]) });

const price = ref(true)
const inventory = ref(true)

const _price = ref<string>('')
const _inventory = ref<number>()
const saveBatch = (type: number) => {
    if (type === 1) {
        productList.value.forEach((item: any) => {
            if (item.seconds_seckill) {
                item.seckill_price = _price.value
            }
        })
        _price.value = ''
        price.value = !price.value
    } else {
        productList.value.forEach((item: any) => {
            if (item.seconds_seckill) {
                item.seckill_stock = _inventory.value
            }

        })
        _inventory.value = undefined
        inventory.value = !inventory.value
    }
}

const ids = defineModel<number[]>('ids', {type: Array, default: []});

onMounted(async () => {
    if (ids.value && ids.value.length > 0) {
        await loadList(ids.value)
    }
    if (productList.value != null) {
        loading.value = false
    }
});
const loading = ref<boolean>(true);
const loadList = async (id: number[]) => {
    loading.value = true;
    if (id.length === 1) {
        try {
            const result = await getProduct('edit', {id: id[0]});
            console.log(result.item.product_list);
            console.log(productList.value);
            result.item.product_list?.forEach((item: any) => {
                let temp:any = {}
                temp.seconds_seckill = true;
                temp.tip_value = '已参加';
                temp.pic_thumb = result.item.pic_thumb;
                temp.product_name = result.item.product_name;
                temp.sku_price = item.sku_price;
                temp.sku_stock = item.sku_stock;
                temp.sku_id = item.sku_id;
                temp.sku_data = item.sku_data;
                productList.value.push(temp)
            })
            console.log(productList.value);
        } catch (error: any) {
            message.error(error.message);
        } finally {
            loading.value = false;
        }
        console.log(loading.value);
    }

}
const onOk = (e: number[]) => {
    let _list = ids.value;
    _list = [];
    for (let index in e) {
        _list.push(e[index])
    }
    ids.value = _list
    loadList(_list)
}
// 清空
const clear = () => {
    productList.value = []
    ids.value = [];
}
// 删除
const del = (key: number) => {
    productList.value[key].seconds_seckill = !productList.value[key].seconds_seckill;
}
defineExpose({
    ids,
    productList
})
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

    .lyecs-product-selected-con {
        max-width: 710px;
        position: relative;
        padding-top: 50px;
        margin-top: 10px;
    }

    .clear-btn {
        margin-left: 20px;
    }

    .desc {
        margin-left: 20px;
        color: #999;
    }

    .product-selected-list {
        margin-bottom: 20px;
        max-height: 550px;
        overflow-y: auto;
        min-width: 400px;

        .product-selected-list-tr {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            border-bottom: 1px solid #f0f0f0;

            .col {
                padding: 10px;
            }

            .col1 {
                width: 100px;
            }

            .col2 {
                flex: 1;
            }

            .col3 {
                width: 80px;
            }

            .product-info {
                display: flex;
                flex-wrap: nowrap;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                &>ul{
                    width: 100%;
                    line-height: 1.5;
                }
            }

            .product-info img {
                margin-right: 10px;
            }

        }

        .product-selected-list-th {
            color: #333;
            font-weight: bold;
            position: absolute;
            top: 0;
            width: 100%;
            background: #fff;
            height: 50px;
        }

        .batch {
            display: flex;
            gap: 10px;
            margin-top: 20px;

            & > div {
                color: #155bd4;
                cursor: pointer;
            }

            .setting {
                display: flex;
                gap: 8px;
            }
        }
    }

}

</style>
