<template>
    <div class="lyecs-goods-select-group">
        <el-space>
            <DialogForm isDrawer @okCallback="onOk" title="选择商品" width="600px" path="product/product/src/SelectProduct" :params="{ selected_ids: ids, isMultiple: props.isMultiple }">
                <el-button type="primary">选择商品</el-button>
            </DialogForm>
            <span v-if="isMultiple && gifts.length > 0" class="ml10">已选择 <b>{{ gifts.length }}</b> 个商品</span>
            <el-button v-if="isMultiple && gifts.length > 0" @click="clear">清空</el-button>
        </el-space>
        <div class="lyecs-goods-selected-con" v-if="goodsList.length > 0">
            <div class="goods-selected-list">
                <div class="goods-selected-list-tr goods-selected-list-th">
                    <div class="col col1">商品编号</div>
                    <div class="col col2">商品信息</div>
                    <div class="col col2">商品数量</div>
                    <div class="col col3">操作</div>
                </div>
                <template v-for="(item, key) in goodsList">
                    <div class="goods-selected-list-tr">
                        <div class="col col1">{{ item.product_sn }}</div>
                        <div class="col col2 goods-info">
                            <img width="50" height="50" :src="item.pic_thumb">
                            <span>{{ item.product_name }}</span>
                        </div>
                        <div class="col col2 goods-info">
                            <el-input-number size="small" v-model="item.num" :min="1" :max="10" @change="changeNum(item)" />
                        </div>
                        <div class="col col3">
                            <a class="del-btn" @click="del(key)">删除</a>
                        </div>
                    </div>
                </template>
            </div>
            <div class="pagination-con" v-if="gifts.length > 0" style="justify-content: right;">
                <el-pagination size="small" @current-change="pageChange" :current-page="page" :page-size="size"
                    layout="slot ,prev, pager, next" :total="gifts.length">
                    <template #default>
                        第{{ (page - 1) * size + 1 }}-{{ page * size }} 条 / 总共 {{ gifts.length }} 条
                    </template>
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, toRefs, onMounted, reactive } from "vue"
import request from '@/utils/request'
import { DialogForm } from '@/components/dialog'
interface GiftsForm {
    product_id?: number,
    num?: number
}
// 传值
const props = defineProps({
    // 默认数组[{product_id:1,num:1}, {product_id:2,num:2},...]
    gifts: {
        type: Array<GiftsForm>,
        default: []
    },
    // 单选还是多选
    isMultiple: {
        type: Boolean,
        default: true
    }
})
const ids = ref<any>([])
const gifts = ref(props.gifts)
const emit = defineEmits(['update:gifts'])

onMounted(async () => {
    emit('update:gifts', gifts)
    if (gifts.value) {
        gifts.value.map(item => {
            ids.value.push(item.product_id)
        })
        loadList()
    }
});
interface productForm {
    product_sn?: string,
    pic_thumb?: string,
    product_name?: string,
    product_id?: number;
    num?: number;
}
// 商品列表
const goodsList = ref<productForm[]>([]);
const total = ref(0);
const size = ref(6)
const page = ref(1)
// 给父组件传值
function loadList() {
    if (gifts.value.length > 0) {
        request({
            url: 'product/product/list',
            method: 'get',
            params: {
                ids: ids.value,
                size: size.value,
                page: page.value
            }
        }).then((result: any) => {
            if(ids.value){
                result.filter_result = assignNumsToArr2(props.gifts, result.filter_result)
            }else{
                result.filter_result.map((item: { num: number }) =>{
                    item.num = 1
                })
            }
            goodsList.value = result.filter_result;
            total.value = result.total
        })
    } else {
        goodsList.value = [];
        total.value = 0
    }

}
function assignNumsToArr2(arr:any, arr2:any) {
    for (let obj of arr2) {  
        const foundObj = arr.find((aObj:any) => aObj.product_id == obj.product_id);  
        if (foundObj) {  
            obj.num = foundObj.num;  
        }  
    } 
    return arr2;  
}
const pageChange = (curPage: number, pageSize: any) => {
    page.value = curPage
    loadList()
}
const onOk = (e: { [x: string]: any; }) => {
    let _list = [];
    if (props.isMultiple == false) {
        gifts.value = [];
    }
    for (let index in e) {
        let item = { product_id: e[index], num: 1 }
        gifts.value.push(item)
        ids.value.push(e[index])
    }
    total.value = gifts.value.length
    emit('update:gifts', gifts)
    loadList();
}
// 清空
const clear = () => {
    goodsList.value = []
    gifts.value = [];
    ids.value = [];
}
// 删除
const del = (key: any) => {
    gifts.value.splice(<any>key, 1)
    ids.value.splice(<any>key, 1)
    goodsList.value.splice(<any>key, 1)
}
// 修改数量
const changeNum = (item:productForm) => {
    gifts.value.map(info => {
        if (info.product_id === item.product_id) {
            info.num = item.num
        }
    })
    emit('update:gifts', gifts)
}
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
.lyecs-goods-select-group {
    margin-bottom: 0;
    width: 100%;
}

.lyecs-goods-select-group .lyecs-goods-selected-con {
    max-width: 710px;
    position: relative;
    padding-top: 50px;
    margin-top: 10px;
}

.lyecs-goods-select-group .clear-btn {
    margin-left: 20px;
}

.lyecs-goods-select-group .desc {
    margin-left: 20px;
    color: #999;
}

.lyecs-goods-select-group .goods-selected-list {
    margin-bottom: 20px;
    max-height: 550px;
    overflow-y: auto;
    min-width: 400px
}

.lyecs-goods-select-group .goods-selected-list-tr {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    border-bottom: 1px solid #f0f0f0;
}

.lyecs-goods-select-group .goods-selected-list-th {
    color: #333;
    font-weight: bold;
    position: absolute;
    top: 0;
    width: 100%;
    background: #fff;
    height: 50px;
}

.lyecs-goods-select-group .goods-selected-list-tr .col {
    padding: 10px;
}


.lyecs-goods-select-group .goods-selected-list-tr .col1 {
    width: 100px;
}

.lyecs-goods-select-group .goods-selected-list-tr .col2 {
    flex: 1;
}

.lyecs-goods-select-group .goods-selected-list-tr .col3 {
    width: 80px;
}

.lyecs-goods-select-group .goods-selected-list-tr .goods-info {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
}

.lyecs-goods-select-group .goods-selected-list-tr .goods-info img {
    margin-right: 10px;
}
</style>
