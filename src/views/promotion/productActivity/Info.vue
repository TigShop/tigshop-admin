<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-form-table">
                <el-form v-if="!loading" ref="formRef" :rules="rules" :model="formState" label-width="auto">
                    <el-form-item prop="promotion_name" label="活动名称">
                        <el-input type="text" maxlength="60" v-model="formState.promotion_name" />
                    </el-form-item>
                    <el-form-item prop="min_order_amount" label="金额下限">
                        <el-input type="number" maxlength="60" v-model="formState.min_order_amount" />
                    </el-form-item>
                    <el-form-item prop="max_order_amount" label="金额上限">
                        <el-input type="number" maxlength="60" v-model="formState.max_order_amount" />
                        <div class="extra">0表示没有上限</div>
                    </el-form-item>
                    <el-form-item prop="product_time" label="活动日期">
                        <SelectTimeInterval
                            v-model:end-date="formState.product_end_date"
                            v-model:start-date="formState.product_start_date"
                            :clearable="false"
                            type="datetime"
                            value-format="YYYY-MM-DD HH:mm:ss"></SelectTimeInterval>
                        <div class="extra">只有当前时间介于起始日期和截止日期之间时，此活动才可以生效</div>
                    </el-form-item>
                    <el-form-item prop="user_rank_list" label="享受优惠的会员等级">
                        <div>
                            <el-checkbox-group v-model:modelValue="formState.limit_user_rank">
                                <el-checkbox v-for="rank in rankList" :label="rank.rank_id" :key="rank.rank_id">{{ rank.rank_name }}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </el-form-item>
                    <el-form-item prop="range_data" label="使用范围">
                        <SelectGoodsRange v-model:rangeType="formState.range" v-model:rangeIds="formState.range_data"></SelectGoodsRange>
                    </el-form-item>
                    <el-form-item v-if="promotion_type == 1" prop="promotion_type_data" label="优惠方式(减免)">
                        <el-input type="text" maxlength="60" v-model="formState.promotion_type_data" />
                        <div class="extra">请输入现金减免的金额</div>
                    </el-form-item>
                    <el-form-item v-if="promotion_type == 2" prop="promotion_type_data" label="优惠方式(折扣)">
                        <div style="width: 100%">
                            <el-input type="text" maxlength="60" :max="100" :min="0" v-model="formState.promotion_type_data" style="max-width: 120px">
                                <template #suffix>%</template>
                            </el-input>
                        </div>
                        <div class="extra">请输入折扣（1－99），如：打9折，就输入90</div>
                    </el-form-item>
                    <el-form-item v-if="promotion_type == 0" prop="gift" label="选择赠品">
                        <SelectGift v-if="!loading" v-model:gifts="formState.promotion_type_data"></SelectGift>
                    </el-form-item>
                    <el-form-item v-show="!props.isDialog" :wrapper-col="{ offset: 4, span: 16 }">
                        <el-button ref="submitBtn" class="form-submit-btn" type="primary" @click="onSubmit()">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, shallowRef, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { ProductActivityFormState, RankList } from "@/types/promotion/productActivity.d";
import { getProductActivity, updateProductActivity, getProductActivityConfig } from "@/api/promotion/productActivity";
import type { FormRules } from "element-plus";
import { SelectGoodsRange, SelectGift } from "@/components/select";
import { SelectTimeInterval } from "@/components/select";
import { getDays } from "@/utils/util";
import { formattedDate } from "@/utils/time";
const emit = defineEmits(["submitCallback", "update:confirmLoading", "close"]);
interface RuleForm {
    promotion_name: string;
    min_order_amount: number;
    max_order_amount: number;
    product_time: string[];
}
const validateTime = (rule: any, value: any, callback: any) => {
    if (!formState.value.product_start_date || !formState.value.product_end_date) {
        callback(new Error("活动日期不能为空"));
        return;
    } else {
        callback();
    }
};
const rules = reactive<FormRules<RuleForm>>({
    promotion_name: [{ required: true, message: "请输入活动名称！", trigger: "blur" }],
    min_order_amount: [{ required: true, message: "请输入优惠券金额！", trigger: "blur" }],
    max_order_amount: [{ required: true, message: "请输入订单满金额！", trigger: "blur" }],
    product_time: [{ required: true, validator: validateTime, trigger: "blur" }],
});
const rankList = ref<RankList[]>([]); // 允许领取客户等级列表
const props = defineProps({
    id: {
        type: Number,
        default: 0,
    },
    promotion_type: {
        type: Number,
        default: 0,
    },
    act: {
        type: String,
        default: "",
    },
    isDialog: Boolean,
});
const loading = ref<boolean>(true);
const query = useRouter().currentRoute.value.query;
const action = ref<string>(props.isDialog ? props.act : String(query.act));
const id = ref<number>(props.isDialog ? props.id : Number(query.id));
const promotion_type = ref<number>(props.isDialog ? props.promotion_type : Number(query.coupon_type) || 0);
const operation = action.value === "add" ? "create" : "update";
const formRef = shallowRef();
const formState = ref<ProductActivityFormState>({
    max_order_amount: 0,
    promotion_type: promotion_type.value || 0,
    promotion_type_data: promotion_type.value == 0 ? [] : 0
});

onMounted(() => {
    if (action.value === "detail") {
        // 获取详情数据
        fetchProductActivity();
    } else {
        loading.value = false;
    }
    fetchProductActivityConfig()
});

const fetchProductActivity = async () => {
    try {
        const result = await getProductActivity(action.value, {
            id: id.value,
            promotion_type: promotion_type.value,
        });
        if (result.item.promotion_type > -1) {
            promotion_type.value = result.item.promotion_type;
        }
        Object.assign(formState.value, result.item);
    } catch (error: any) {
        message.error(error.message);
        emit("close");
    } finally {
        loading.value = false;
    }
};
const fetchProductActivityConfig = async () => {
    try {
        const result = await getProductActivityConfig();
        let obj = { rank_id: 0, rank_name: "非会员" };
        result.rank_list.unshift(obj);
        rankList.value = result.rank_list;
    } catch (error: any) {
        message.error(error.message);
    } finally {
        loading.value = false;
    }
};

// 表单通过验证后提交
const onSubmit = async () => {
    await formRef.value.validate();
    try {
        emit("update:confirmLoading", true);
        const result = await updateProductActivity(operation, { id: id.value, ...formState.value });
        emit("submitCallback", result);
        message.success(result.message);
    } catch (error: any) {
        message.error(error.message);
    } finally {
        emit("update:confirmLoading", false);
    }
};
// 表单提交
const onFormSubmit = () => {
    onSubmit();
};

defineExpose({ onFormSubmit });
</script>
