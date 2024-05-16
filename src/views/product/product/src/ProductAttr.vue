<template>
    <el-form-item label="属性模板" prop="type">
        <el-space>
            <el-select v-model="attrTplId" placeholder="请选择" style="width: 100%" clearable>
                <el-option v-for="item in <any>props.attrTplList" :label="item.tpl_name" key="item.tpl_id" :value="item.tpl_id" />
            </el-select>
        </el-space>
        <el-button :disabled="!attrTplId" @click="importAttrTpl" style="margin-left: 10px">确认导入</el-button>
    </el-form-item>
    <el-form-item prop="brand_logo" label="商品属性">
        <div class="attr-list">
            <div class="attr-warp" v-for="(item, index) in attrList.normal">
                <div class="attr-warp-title">
                    <div class="title">
                        <div class="iconfont icon-cha1 btn-remove" @click="removeAttrList('normal', index)"></div>
                        {{ item.attr_name }}
                    </div>
                </div>
                <div class="attr-warp-box">
                    <el-space class="attr-row" v-for="(attr, idx) in item.attr_list">
                        <el-input v-model="attr.attr_value" placeholder="" style="width: 260px" />
                        <div v-if="0" class="iconfont icon-cha1 btn-remove" @click="removeAttr('normal', index, idx)"></div>
                    </el-space>
                </div>
            </div>
            <div class="add_newAttr">
                <el-button @click="addAttrList('normal')"><i class="btn-ico">+</i>添加商品属性</el-button>
            </div>
        </div>
    </el-form-item>
    <el-form-item label="商品规格">
        <div class="attr-list">
            <div class="attr-warp" v-for="(item, index) in attrList.spe">
                <div class="attr-warp-title">
                    <div class="title">
                        <div class="iconfont icon-cha1 btn-remove" @click="removeAttrList('spe', index)"></div>
                        {{ item.attr_name }}
                    </div>
                </div>
                <div class="attr-warp-box">
                    <el-space class="attr-row" v-for="(attr, idx) in item.attr_list" :size="16">
                        <el-input v-model="attr.attr_value" placeholder="" style="width: 180px" />
                        <el-space :size="0">
                            属性颜色：
                            <SelectColor v-model:color="attr.attr_color"></SelectColor>
                        </el-space>
                        <el-space class="pic-select-con" :size="0">
                            属性图：
                            <div class="pic-select">
                                <DialogForm type="gallery" class="" @okCallback="addPic" :data="{ type: 'spe', index: index, idx: idx }">
                                    <div class="pic-select-img">
                                        <img v-if="attr.attr_pic_thumb" :src="imageFormat(attr.attr_pic_thumb)" />
                                    </div>
                                </DialogForm>
                                <i @click="removePic('spe', index, idx)" v-if="attr.attr_pic_thumb" class="pic-select-del iconfont icon-cha"></i>
                            </div>
                        </el-space>
                        <div v-if="item.attr_list.length > 1" class="iconfont icon-cha1 btn-remove" @click="removeAttr('spe', index, idx)"></div>
                    </el-space>
                    <el-space class="attr-row">
                        <el-button @click="addAttr('spe', index)"><i class="btn-ico">+</i>增加新属性</el-button>
                    </el-space>
                </div>
            </div>
            <div class="add_newAttr">
                <el-button @click="addAttrList('spe')"><i class="btn-ico">+</i>添加商品规格</el-button>
            </div>
        </div>
    </el-form-item>
    <el-form-item label="附加规格">
        <div class="attr-list">
            <div class="attr-warp" v-for="(item, index) in attrList.extra">
                <div class="attr-warp-title">
                    <div class="title">
                        <div class="iconfont icon-cha1 btn-remove" @click="removeAttrList('extra', index)"></div>
                        {{ item.attr_name }}
                    </div>
                </div>
                <div class="attr-warp-box">
                    <el-space class="attr-row" v-for="(attr, idx) in item.attr_list" :size="16">
                        <el-input v-model="attr.attr_value" placeholder="" style="width: 180px" />
                        <el-space :size="0">
                            附加金额：
                            <el-input v-model="attr.attr_price" style="width: 100px" />
                        </el-space>
                        <div v-if="item.attr_list.length > 1" class="iconfont icon-cha1 btn-remove" @click="removeAttr('extra', index, idx)"></div>
                    </el-space>
                    <el-space class="attr-row">
                        <el-button @click="addAttr('extra', index)"><i class="btn-ico">+</i>增加新属性</el-button>
                    </el-space>
                </div>
            </div>
            <div class="add_newAttr">
                <el-button @click="addAttrList('extra')"><i class="btn-ico">+</i>添加商品规格</el-button>
            </div>
        </div>
    </el-form-item>
    <el-form-item label="规格库存" v-if="productForm.length > 0">
        <div class="lyecs-form-table">
            <div class="product-form">
                <div class="product-batch">
                    <el-space class="batch-update-area" style="">
                        <div class="nowarp">批量填充:</div>
                        <el-input v-model="batchInput.sku_stock" type="text" placeholder="库存" />
                        <el-input v-model="batchInput.sku_sn" type="text" placeholder="商品货号" />
                        <el-input v-model="batchInput.sku_tsn" type="text" placeholder="条形码" />
                        <el-input v-model="batchInput.sku_price" type="text" placeholder="价格" />
                        <el-button @click="onBatchClick">批量填充</el-button>
                    </el-space>
                </div>
                <div>
                    <table class="table-product" width="100%" cellspacing="1" cellpadding="3">
                        <tbody>
                            <tr>
                                <th class="attr-th" v-for="attr in productForm[0].attrs">{{ attr.attr_name }}</th>
                                <th><em class="red">*</em> 库存</th>
                                <th><em class="red">*</em> 商品货号</th>
                                <th>商品条形码</th>
                                <th>一口价 <i class="iconfont tips-hover" data-title="一口价会覆盖除属性价格外的所有价格，慎重设置">&#xe611;</i></th>
                            </tr>
                            <tr class="attr-tr" v-for="(item, key) in productList">
                                <td v-for="attr in productForm[key].attrs">{{ attr.attr_value }}</td>
                                <td><el-input type="text" v-model="item.sku_stock" /></td>
                                <td><el-input type="text" v-model="item.sku_sn" /></td>
                                <td><el-input type="text" v-model="item.sku_tsn" /></td>
                                <td><el-input type="text" v-model="item.sku_price" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </el-form-item>

    <Modal v-model:open="visible" title="添加属性类型" @ok="onOk(formRef)" :destroyOnClose="true">
        <el-form ref="formRef" label-width="auto" :model="newAttrState">
            <el-form-item prop="name" label="属性名称" :rules="[{ required: true, message: '属性名称不能为空!' }]">
                <el-input v-model="newAttrState.name" />
                <div class="extra">提示：添加新的商品规格属性类型，会清空规格库存中的所有设置</div>
            </el-form-item>
        </el-form>
    </Modal>
</template>

<script setup lang="ts">
// Author by 老杨
import { ref, onMounted, computed, watch } from "vue";
import { SelectColor } from "@/components/select";
import { Modal } from "ant-design-vue";
import { DialogForm } from "@/components/dialog";
import request from "@/utils/request";
import { imageFormat } from "@/utils/format";
const visible = ref(false);
const props = defineProps({
    attrList: { type: Object, default: { normal: [], spe: [], extra: [] } },
    productList: { type: [Object, Array], default: [] },
    attrChanged: { type: Boolean, default: false },
    attrTplList: {
        type: Array
    }
});

const emit = defineEmits(["update:productList", "update:attrList", "update:attrChanged"]);
const typeId = {
    normal: 0,
    spe: 1,
    extra: 2
};
const attrTplId = ref(null);

const batchInput = ref<any>({})
const attrList = ref<any>(props.attrList)
const productList = ref<any>(props.productList)
const newAttrState = ref({
    name: "",
    type: ""
});
let watchLoaded = false;
// 监听attrList值是否有变化，如果有，则会更新参数
watch(
    () => attrList.value,
    (newValue, oldValue) => {
        // 判断值是否有变化
        if (watchLoaded == true) {
            emit("update:attrChanged", true);
            // stopWatch()
        }
        productForm.value = getProductForm();
        watchLoaded = true;
    },
    { deep: true }
);
onMounted(() => {
    emit("update:productList", productList);
    emit("update:attrList", attrList);
});
// 添加属性项
const addAttr = (type: string, index: number) => {
    attrList.value[type][index].attr_list.push({
        attr_value: "",
        attr_type: (typeId as any)[type],
        attr_name: attrList.value[type][index].attr_name
    });
};
// 移除属性项
const removeAttr = (type: string, index: number, idx: number) => {
    attrList.value[type][index].attr_list.splice(idx, 1);
};
// 移除类型
const removeAttrList = (type: string, index: number) => {
    attrList.value[type].splice(index, 1);
};
// 新增类型
const addAttrList = (type: string) => {
    visible.value = true;
    newAttrState.value.name = "";
    newAttrState.value.type = type;
};
// 添加图片
const addPic = (result: any, data: any) => {
    attrList.value[data.type][data.index].attr_list[data.idx].attr_pic = result[0].pic_url;
    attrList.value[data.type][data.index].attr_list[data.idx].attr_pic_thumb = result[0].pic_thumb;
};
// 移除图片
const removePic = (type: string, index: number, idx: number) => {
    attrList.value[type][index].attr_list[idx].attr_pic = "";
};
//导入模板
const importAttrTpl = () => {
    Modal.confirm({
        title: "导入模板会清空并重置已设置的属性、规格、规格库存等设置，确认导入吗？",
        async onOk() {
            request({
                url: "product/product_attributes_tpl/edit?id=" + attrTplId.value,
                method: "get"
            }).then((result: any) => {
                let data = result.item.tpl_data;
                for (let type in data) {
                    attrList.value[type] = [];
                    for (let i in data[type]) {
                        attrList.value[type].push({
                            attr_name: data[type][i].attr_name,
                            attr_list: [
                                {
                                    attr_value: "",
                                    attr_type: (typeId as any)[type],
                                    attr_name: data[type][i].attr_name
                                }
                            ]
                        });
                    }
                }
            });
        }
    });
};
// 批量操作：
const onBatchClick = () => {
    let i = 1;
    for (let index in productList.value) {
        if (batchInput.value.sku_stock) productList.value[index].sku_stock = batchInput.value.sku_stock;
        if (batchInput.value.sku_sn) productList.value[index].sku_sn = batchInput.value.sku_sn + "-" + i;
        if (batchInput.value.sku_tsn) productList.value[index].sku_tsn = batchInput.value.sku_tsn + "-" + i;
        if (batchInput.value.sku_price) productList.value[index].sku_price = batchInput.value.sku_price;
        i++;
    }
};
// 添加属性名称
const formRef = ref();
const onOk = (e: any) => {
    e.validate((valid: any) => {
        if (valid) {
            let isDuplicated = attrList.value[newAttrState.value.type].find((obj: any) => obj.attr_name === newAttrState.value.name);
            if (isDuplicated) {
                Modal.error({
                    title: "属性名称“" + newAttrState.value.name + "”已存在"
                });
                return;
            }
            attrList.value[newAttrState.value.type].push({
                attr_name: newAttrState.value.name,
                attr_list: [
                    {
                        attr_type: (typeId as any)[newAttrState.value.type],
                        attr_name: newAttrState.value.name,
                        attr_value: ""
                    }
                ]
            });
            visible.value = false;
        }
    });
};
// 动态规格表单>
const productForm = ref<any>([]);
const getProductForm = () => {
    if (attrList.value["spe"].length == 0) {
        return [];
    }
    let list = getCombinations(attrList.value["spe"]);
    let res: any[] = [];
    for (let idx in list) {
        res[idx] = {
            attr_names: [],
            attr_values: [],
            attrs: []
        };
        let arr = [];
        for (let i in list[idx]) {
            if (list[idx][i].attr_name == "") {
                continue;
            }
            res[idx].attrs[i] = {
                attr_name: list[idx][i].attr_name,
                attr_value: list[idx][i].attr_value
            };
            arr.push(list[idx][i].attr_name + ":" + list[idx][i].attr_value);
            res[idx].attr_names.push(list[idx][i].attr_name);
            res[idx].attr_values.push(list[idx][i].attr_value);
            res[idx].sku_stock = res[idx].sku_stock || 0;
        }
        res[idx].sku_value = arr.join("|");
        // 匹配已存在的值
        const match = productList.value.find((item: any) => {
            return res[idx].sku_value == item.sku_value;
        });
        if (match) {
            res[idx].sku_stock = match.sku_stock;
            res[idx].sku_sn = match.sku_sn;
            res[idx].sku_tsn = match.sku_tsn;
            res[idx].sku_price = match.sku_price;
        }
    }
    // 用于匹配修改后的值
    productList.value = res;
    return res;
};
// const productForm = computed(() => {
//     if (attrList.value['spe'].length == 0) {
//         return [];
//     }
//     let list = getCombinations(attrList.value['spe'])
//     console.log(list)
//     let res:any[] = [];
//     for (let idx in list) {
//         res[idx] = {
//             attr_names: [],
//             attr_values: [],
//             attrs: []
//         }
//         let arr = [];
//         for (let i in list[idx]) {
//             if (list[idx][i].attr_name == '') {
//                 continue;
//             }
//             res[idx].attrs[i] = ({
//                 attr_name: list[idx][i].attr_name,
//                 attr_value: list[idx][i].attr_value,
//             })
//             arr.push(list[idx][i].attr_name + ':' + list[idx][i].attr_value)
//             res[idx].attr_names.push(list[idx][i].attr_name)
//             res[idx].attr_values.push(list[idx][i].attr_value)
//             res[idx].sku_stock = res[idx].sku_stock || 0;
//         }
//         res[idx].sku_value = arr.join('|');
//         // 匹配已存在的值
//         const match = productList.value.find((item:any) => {
//             return res[idx].sku_value == item.sku_value
//         });
//         if (match) {
//             res[idx].sku_stock = match.sku_stock
//             res[idx].sku_sn = match.sku_sn
//             res[idx].sku_tsn = match.sku_tsn
//             res[idx].sku_price = match.sku_price
//         }
//     }
//     // 用于匹配修改后的值
//     productList.value = res;
//     return res;
// })
function getCombinations(attrList: any[]): any[] {
    const combinations: any[] = [];

    if (attrList.length === 0) {
        combinations.push([]);
        return combinations;
    }

    const firstAttr = attrList[0];
    const remainingAttrs = attrList.slice(1);

    // 检查attr_list的长度是否为1，并且该元素的attr_name是否为空
    if (firstAttr.attr_list.length === 1 && firstAttr.attr_list[0].attr_name === "") {
        // 如果满足条件，将该元素添加到结果数组中
        combinations.push([firstAttr.attr_list[0]]);
    } else if (firstAttr.attr_list.length == 0) {
    } else {
        for (let i = 0; i < firstAttr.attr_list.length; i++) {
            if (firstAttr.attr_list[i].attr_name !== "") {
                const currentCombination = [firstAttr.attr_list[i]];
                const remainingCombinations = getCombinations(remainingAttrs);
                for (let j = 0; j < remainingCombinations.length; j++) {
                    combinations.push([...currentCombination, ...remainingCombinations[j]]);
                }
            }
        }
    }

    return combinations;
}
</script>

<style lang="less" scoped>
.product-form {
    background-color: #f8f8f8;
    border: 1px solid #eee;
    padding: 15px;
}
// .lyecs-form-table {
//     width: 564px;
//     overflow: hidden;
//     overflow-x: scroll;
// }
.lyecs-form-table table {
    border-width: 0;
    border-collapse: collapse;
    border-spacing: 0;
    line-height: 1.5em;
}

.table-product td,
.table-product th {
    border: 1px solid #d2d2d2 !important;
    line-height: 26px;
    padding: 5px 5px;
    text-align: center;
}

.table-product th {
    min-width: 80px;
}

.table-product td {
    background: #fff;
}

.table-product input {
    text-align: center;
    width: 100%;
    background-color: rgba(242, 242, 242, 0.54);
    border-width: 0 !important;
    box-shadow: none;
    height: 20px;
    border-radius: 3px;
    line-height: 20px;
    padding: 0;
}

.attr-row {
    display: flex;
    margin-bottom: 8px;
}

.attr-list {
    background-color: #f8f8f8;
    border: 1px solid #eee;
    padding: 15px;
    width: 100%;
}

.add_newAttr {
    display: flex;
}

.btn-ico {
    margin-right: 3px;
    font-weight: bold;
}

.attr-warp {
    height: 100%;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 5px;
    margin-bottom: 13px;
    clear: both;
    display: flex;
}

.attr-warp-title {
    text-align: right;
    width: 80px;
    position: relative;
    padding-left: 15px;
}

.attr-warp-title .title {
    position: relative;
    display: inline-block;
    line-height: 24px;
}

.attr-warp-box {
    padding-left: 10px;
    width: 100%;
}

.btn-remove {
    font-size: 10px;
    background: #f1f1f1;
    border-radius: 20px;
    height: 20px;
    width: 20px;
    text-align: center;
    line-height: 20px;
    color: #666;
    cursor: pointer;
    transition: all 0.2s;
}

.attr-warp-title .btn-remove {
    background-color: #616161;
    color: #fff;
    display: none;
    width: 12px;
    height: 12px;
    font-size: 6px;
    line-height: 12px;
    margin-right: 3px;
    position: absolute;
    left: -17px;
    top: 6px;
}

.attr-warp:hover .attr-warp-title .btn-remove {
    display: inline-block;
}

.attr-warp:hover .attr-warp-title .btn-remove:hover {
    background-color: var(--el-color-primary);
}

.pic-select-con :deep(.pic-select) {
    display: flex;
    align-items: center;
    padding-left: 0;
    position: relative;
}

.pic-select-con :deep(.pic-select-img) {
    height: 28px;
    width: 28px;
    padding-left: 0;
    border: 1px solid #ddd;
    background-color: #fff;
    border-radius: 2px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.pic-select-con :deep(.pic-select-img:after) {
    content: "\e637";
    font-family: "admin-iconfont";
    position: absolute;
    top: 0;
    line-height: 28px;
    width: 28px;
    left: 0;
    z-index: 1;
    text-align: center;
    color: #a6a5a5;
}

.pic-select-con :deep(.pic-select .pic-select-del) {
    position: absolute;
    cursor: pointer;
    right: -10px;
    top: -10px;
    color: #fff;
    background: #dbdbdb;
    border-radius: 50%;
    z-index: 2;
    width: 18px;
    height: 18px;
    text-align: center;
    line-height: 18px;
    font-size: 12px;
    display: none;
}

.pic-select-con :deep(.pic-select:hover .pic-select-del) {
    display: block;
    background: #333;
}

.pic-select-con :deep(.pic-select .pic-select-img img) {
    width: 28px;
    height: 28px;
    position: relative;
    z-index: 2;
}

.table-product :deep(.el-input__wrapper) {
    box-shadow: none;
}

.table-product :deep(.el-input__inner) {
    text-align: center !important;
}

.product-batch {
    margin-bottom: 10px;
}

@media only screen and (max-width: 767px) {
    .attr-warp-box .attr-row {
        flex-wrap: wrap;
        display: flex;
        gap: 10px !important;
    }
    .batch-update-area {
    }
    .product-batch {
        width: 100%;
        min-width: 570px;
    }
    .table-product {
        min-width: 570px;
    }
    .lyecs-form-table {
        width: 100%;
        .product-form {
            overflow-x: auto;
        }
    }
}
</style>
