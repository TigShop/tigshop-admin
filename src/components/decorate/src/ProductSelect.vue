<template>
    <div>
        <draggable
            class="dec-goods-group-list"
            item-key="prodcut_id"
            :list="productList"
            ghost-class="ghost"
            chosen-class="chosenClass"
            animation="300"
            @start=""
            @end="">
            <template #item="{ element, index }">
                <div class="dec-goods-group-item dec-tip dec-goods-group-item-goods">
                    <div class="dec-goods-group-item-con">
                        <div class="item-goods-con">
                            <a :href="urlFormat({ path: 'product', id: element.product_id })" target="_blank" :title="element.product_name"
                                ><img class="item-goods-img" :src="imageFormat(element.pic_thumb)"
                            /></a>
                        </div>
                        <div class="del-item" @click="del(index)"><i class="ico-decorate icon-dec-cha"></i></div>
                    </div>
                </div>
            </template>
            <template #footer>
                <DialogForm
                    isDrawer
                    @okCallback="onAdd"
                    title="选择商品"
                    width="600px"
                    path="product/product/src/SelectProduct"
                    :params="{ selected_ids: ids, isMultiple: props.isMultiple }">
                    <div class="dec-goods-group-item dec-goods-group-add dec-tip" data-title="添加商品">
                        <div class="dec-goods-group-item-con">
                            <div class="item-goods-con">
                                <a href="javascript:;"><i class="ico-decorate icon-dec-jia"></i></a>
                            </div>
                        </div>
                    </div>
                </DialogForm>
            </template>
        </draggable>
    </div>
</template>
<script setup lang="ts">
import { computed, ref, toRefs, onMounted } from "vue";
import type { Ref } from "vue";
import { DialogForm } from "@/components/dialog";
import draggable from "vuedraggable";
import { Image } from "@/components/image";
import { SelectLink } from "@/components/select";
import { imageFormat, urlFormat } from "@/utils/format";
import request from "@/utils/request";
const dom: Ref<HTMLDivElement> = ref(null) as any;

interface productList {
    product_id?: number;
    pic_thumb?: string;
}
const props = defineProps({
    ids: { type: Array, default: [] },
    productList: {
        type: Array,
        default: [],
    },
    isMultiple: {
        type: Boolean,
        default: false,
    },
});
// 动态解析props
const { isMultiple } = toRefs(props);
const productList = ref(<productList[]>props.productList);

const ids = defineModel<number[]>("ids") as Ref<number[]>;
const emit = defineEmits(["update:ids"]);
// const ids = computed(() => {
//     return productList.value.map(item => item.product_id);
// })

onMounted(async () => {
    if (ids.value) {
        loadList();
    }
});
const total = ref(0);
// 给父组件传值
function loadList() {
    if (ids.value.length > 0) {
        request({
            url: "product/list/",
            method: "get",
            params: {
                ids: ids.value,
                size: 100,
                page: 1,
            },
        }).then((result: any) => {
            productList.value = result.filter_result;
            total.value = result.total;
        });
    } else {
        productList.value = [];
        total.value = 0;
    }
}

const onEdit = (result: any, data: any) => {
    // Object.assign(photos.value[data.index], result[0])
};
const onAdd = (e: any) => {
    console.log(e);
    let _list = [];
    if (props.isMultiple == false) {
        ids.value = [];
    }
    for (let index in e) {
        ids.value.push(e[index]);
    }
    total.value = ids.value.length;
    loadList();
};
// 清空
const clear = () => {
    productList.value = [];
    ids.value = [];
};
// 删除
const del = (key: number) => {
    ids.value.splice(<any>key, 1);
    productList.value.splice(<any>key, 1);
};
</script>

<style lang="less" scoped></style>
