<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-form-table">
                <el-form v-if="!loading" ref="formRef" :model="formState" label-width="auto">
                    <el-form-item :rules="[{ required: true, message: '分类名称不能为空!' }]" label="模板名称" prop="shipping_tpl_name">
                        <el-input v-model="formState.shipping_tpl_name" />
                    </el-form-item>
                    <el-form-item label="发货时间" prop="shipping_time">
                        <el-select v-model="formState.shipping_time" placeholder="请选择.." style="width: 100%">
                            <el-option label="4小时内" value="4小时内"></el-option>
                            <el-option label="8小时内" value="8小时内"></el-option>
                            <el-option label="12小时内" value="12小时内"></el-option>
                            <el-option label="16小时内" value="16小时内"></el-option>
                            <el-option label="20小时内" value="20小时内"></el-option>
                            <el-option label="1天内" value="1天内"></el-option>
                            <el-option label="2天内" value="2天内"></el-option>
                            <el-option label="3天内" value="3天内"></el-option>
                            <el-option label="4天内" value="4天内"></el-option>
                            <el-option label="5天内" value="5天内"></el-option>
                            <el-option label="7天内" value="7天内"></el-option>
                            <el-option label="8天内" value="8天内"></el-option>
                            <el-option label="10天内" value="10天内"></el-option>
                            <el-option label="12天内" value="12天内"></el-option>
                            <el-option label="15天内" value="15天内"></el-option>
                            <el-option label="17天内" value="17天内"></el-option>
                            <el-option label="20天内" value="20天内"></el-option>
                            <el-option label="25天内" value="25天内"></el-option>
                            <el-option label="30天内" value="30天内"></el-option>
                            <el-option label="45天内" value="45天内"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否默认" prop="is_default">
                        <el-radio-group v-model="formState.is_default" style="width: 100%">
                            <el-radio :value="1">是</el-radio>
                            <el-radio :value="0">否</el-radio>
                        </el-radio-group>
                        <div class="extra">只能设置一个默认模板</div>
                    </el-form-item>
                    <el-form-item label="是否包邮" prop="is_free">
                        <el-radio-group v-model="formState.is_free">
                            <el-radio :value="1">是</el-radio>
                            <el-radio :value="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="计价方式" prop="pricing_type">
                        <el-radio-group v-model="formState.pricing_type" @change="checkType">
                            <el-radio :value="1" :disabled="action != 'add'">按件数</el-radio>
                            <el-radio :value="2" :disabled="action != 'add'">按重量</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="运送方式" prop="shipping_tpl_info">
                        <div v-for="(value, index) in formState.shipping_tpl_info" class="shipping-method-style">
                            <div class="flex">
                                <Checkbox v-model="value.is_checked">
                                    <template #default>
                                        {{ value.shipping_type_name }}
                                    </template>
                                </Checkbox>
                            </div>
                            <div v-if="value.is_checked > 0" class="table-style">
                                <div class="title-style">
                                    <span class="title">默认运费</span>
                                    <el-form-item :prop="'shipping_tpl_info[' + index + '].default_tpl_info.start_number'" :rules="[{ required: true, message: '' }]" class="hn">
                                        <el-input v-model="value.default_tpl_info.start_number" class="input-width"></el-input>
                                    </el-form-item>
                                    &nbsp;{{ formState.pricing_type == 1 ? '件' : 'kg' }}内&nbsp;
                                    <el-form-item :prop="'shipping_tpl_info[' + index + '].default_tpl_info.start_price'" :rules="[{ required: true, message: '' }]" class="hn">
                                        <el-input v-model="value.default_tpl_info.start_price" class="input-width"></el-input>
                                    </el-form-item>
                                    &nbsp;元，<span class="title">每增加</span>
                                    <el-form-item :prop="'shipping_tpl_info[' + index + '].default_tpl_info.add_number'" :rules="[{ required: true, message: '' }]" class="hn">
                                        <el-input v-model="value.default_tpl_info.add_number" class="input-width"></el-input>
                                    </el-form-item>
                                    &nbsp;{{ formState.pricing_type == 1 ? '件' : 'kg' }}，<span class="title">增加运费</span>
                                    <el-form-item :prop="'shipping_tpl_info[' + index + '].default_tpl_info.add_price'" :rules="[{ required: true, message: '' }]" class="hn">
                                        <el-input v-model="value.default_tpl_info.add_price" class="input-width"></el-input>
                                    </el-form-item>
                                    &nbsp;元，<span class="title">满</span>
                                    <el-input v-model="value.default_tpl_info.free_price" class="input-width"></el-input>
                                    &nbsp;元，<span class="title">免运费</span>
                                </div>
                                <el-table v-if="value.area_tpl_info.length > 0" :data="value.area_tpl_info" style="width: 100%;margin-top: 8px">
                                    <el-table-column label="运送到" prop="region_data">
                                        <template #default="scope">
                                            <div class="ysd">
                                                <div style="flex: 1">
                                                    <el-form-item :prop="'shipping_tpl_info.' + index + '.area_tpl_info[' + (scope.$index) + '].region_data.area_region_names'"
                                                        :rules="[{ required: true, message: '未添加地区' }]" class="hn">
                                                        <span class="shipping-region-list" :style="scope.row.region_data.area_region_names.length > 0 ? '' : 'color: red;'">
                                                            {{ scope.row.region_data.area_region_names.length > 0 ? scope.row.region_data.area_region_names.join('、') : '请添加地区' }}
                                                        </span>
                                                    </el-form-item>
                                                </div>
                                                <div>
                                                    <DialogForm :params="{ index: index, itemIndex: scope.$index, ids: scope.row.region_data.area_regions, other: value.area_tpl_info }"
                                                        path="setting/shippingTpl/SelectRegion" title="编辑地区" width="900px" @okCallback="changeRegion">
                                                        <a>编辑</a>
                                                    </DialogForm>
                                                </div>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label="formState.pricing_type == 1 ? '首件数(件)' : '首重量(kg)'" width="90">
                                        <template #default="scope">
                                            <el-form-item :prop="'shipping_tpl_info.' + index + '.area_tpl_info[' + (scope.$index) + '].start_number'" :rules="[{ required: true, message: '' }]"
                                                class="hn">
                                                <el-input v-model="scope.row.start_number" class="input-width"></el-input>
                                            </el-form-item>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="首费(元)" width="80">
                                        <template #default="scope">
                                            <el-form-item :prop="'shipping_tpl_info.' + index + '.area_tpl_info[' + (scope.$index) + '].start_price'" :rules="[{ required: true, message: '' }]"
                                                class="hn">
                                                <el-input v-model="scope.row.start_price" class="input-width"></el-input>
                                            </el-form-item>
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label="formState.pricing_type == 1 ? '续件数(件)' : '续重量(kg)'" width="90">
                                        <template #default="scope">
                                            <el-form-item :prop="'shipping_tpl_info.' + index + '.area_tpl_info[' + (scope.$index) + '].add_number'" :rules="[{ required: true, message: '' }]"
                                                class="hn">
                                                <el-input v-model="scope.row.add_number" class="input-width"></el-input>
                                            </el-form-item>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="续费(元)" width="80">
                                        <template #default="scope">
                                            <el-form-item :prop="'shipping_tpl_info.' + index + '.area_tpl_info[' + (scope.$index) + '].add_price'" :rules="[{ required: true, message: '' }]"
                                                class="hn">
                                                <el-input v-model="scope.row.add_price" class="input-width"></el-input>
                                            </el-form-item>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="满免(元)" width="80">
                                        <template #default="scope">
                                            <el-form-item :prop="'shipping_tpl_info.' + index + '.area_tpl_info[' + (scope.$index) + '].free_price'" class="hn">
                                                <el-input v-model="scope.row.free_price" class="input-width"></el-input>
                                            </el-form-item>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作" width="60">
                                        <template #default="scope">
                                            <el-button link type="primary" @click="deletingATemplate(index, scope.$index)">删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-button link type="primary" @click="addTemplate(value)">增加指定地区运费</el-button>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item v-show="!props.isDialog" :wrapper-col="{ offset: 4, span: 16 }">
                        <el-button ref="submitBtn" class="form-submit-btn" type="primary" @click="onSubmit">提交</el-button>
                    </el-form-item>
                </el-form>
                <a-spin :spinning="loading" style="width:100%;margin-top:100px" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, shallowRef } from "vue"
import { useRouter } from 'vue-router'
import { message, Cascader } from "ant-design-vue";
import { ShippingTplFormState, ShippingTplInfoItem } from '@/types/setting/shippingTpl';
import { getShippingTpl, updateShippingTpl } from "@/api/setting/shippingTpl";
import { DialogForm } from '@/components/dialog'
import { Checkbox } from "@/components/radio";
import { useRegionStore } from "@/store/region";

const region = useRegionStore();
const regionList = region.getRegionList();
// 父组件回调
const emit = defineEmits(["submitCallback", "update:confirmLoading", "close"]);
const props = defineProps({
    id: {
        type: Number,
        default: 0
    },
    act: {
        type: String,
        default: ''
    },
    isDialog: Boolean
});
const loading = ref<boolean>(true);
const query = useRouter().currentRoute.value.query;
const action = ref<string>(props.isDialog ? props.act : String(query.act));
const id = ref<number>(props.isDialog ? props.id : Number(query.id));
const operation = action.value === 'add' ? 'insert' : 'update';
const formRef = shallowRef();
const formState = ref<ShippingTplFormState>({
    shipping_tpl_info:[]
});
const fetchShippingTpl = async () => {
    try {
        const result = await getShippingTpl(action.value, { id: id.value });
        result.item.shipping_tpl_info.forEach(row => {
            if (!row.default_tpl_info) {
                row.default_tpl_info = getDefaultRegion(row.shipping_type_id, row.shipping_type_name, 1)
                row.area_tpl_info = [];
                row.is_checked = 0;
            } else {
                row.is_checked = 1;
            }
        });
        Object.assign(
            formState.value,
            result.item
        )
    } catch (error:any) {
        message.error(error.message);
        emit('close');
    } finally {
        loading.value = false;
    }
};

const checkType = (e:any) => {
    for (let i = 0; i < formState.value.shipping_tpl_info.length; i++) {
        // formState.value.shipping_tpl_info[i].splice(1); // Removes all items starting from index 1 (the 2nd item)
    }
}


const deletingATemplate = (outerIndex: number, innerIndex: number) => {
    if (formState.value.shipping_tpl_info && formState.value.shipping_tpl_info[outerIndex].area_tpl_info) {
        formState.value.shipping_tpl_info[outerIndex].area_tpl_info.splice(innerIndex, 1);
    }
}


const addTemplate = (value:any) => {
    console.log(value)
    value.area_tpl_info.push(getDefaultRegion(value.shipping_type_id, value.shipping_type_name, 0))
}

const changeRegion = (result:any) => {
    formState.value.shipping_tpl_info[result.index].area_tpl_info[result.itemIndex].region_data.area_region_names = result.regionNames
    formState.value.shipping_tpl_info[result.index].area_tpl_info[result.itemIndex].region_data.area_regions = result.regionIds

}
const getDefaultRegion = (shipping_type_id:any, shipping_type_name:any, is_default:any) => {
    return {
        "shipping_tpl_id": 0,
        "shipping_type_id": shipping_type_id,
        "is_default": is_default,
        "start_number": "",
        "start_price": "",
        "add_number": "",
        "add_price": "",
        "free_price": "",
        "region_data": {
            "area_regions": [],
            "area_region_names": [],
        },
        "shipping_type_name": shipping_type_name,
    }
}

onMounted(() => {
    // 获取详情数据
    fetchShippingTpl();
});
// 表单通过验证后提交
const onSubmit = async () => {
    await formRef.value.validate();
    try {
        emit('update:confirmLoading', true);
        const result = await updateShippingTpl(operation, { id: id.value, ...formState.value });
        emit('submitCallback', result);
        message.success(result.message);
    } catch (error:any) {
        message.error(error.message);
    } finally {
        emit('update:confirmLoading', false);
    }
};
// 表单提交
const onFormSubmit = () => {
    onSubmit()
};
defineExpose({ onFormSubmit });
</script>
<style lang="less" scoped>
.shipping-method-style {
    display: flex;
    width: 100%;
    margin-bottom: 8px;
    flex-direction: column;

    .table-style {
        border: 1px solid #ddd;
        padding: 5px;

        .title-style {
            background-color: #e8f2ff;
            padding: 6px 12px;
            color: #999;
            display: flex;
            align-items: center;

            .title {
                color: #000000d9;
                margin-right: 4px;
            }

            .input-width {
                width: 60px;
            }
        }
    }
}

.shipping-region-list {
    line-height: 24px;
}



.ysd {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
}
</style>
