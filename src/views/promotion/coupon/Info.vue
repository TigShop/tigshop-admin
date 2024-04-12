<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-form-table">
                <el-form v-if="!loading" ref="formRef" :rules="rules" :model="formState" label-width="auto">
                    <el-form-item v-if="formState.is_new_user != 0" prop="coupon_type" label="优惠券类型">
                        <RadioType
                            v-model:modelValue="formState.coupon_type"
                            :radioList="[
                                { key: 1, title: '满减券', desc: '例：满100减20' },
                                { key: 2, title: '折扣券', desc: '例：满100打8折' },
                            ]">
                        </RadioType>
                    </el-form-item>
                    <el-form-item prop="coupon_name" label="优惠券名称">
                        <el-input type="text" maxlength="60" v-model="formState.coupon_name" />
                    </el-form-item>
                    <el-form-item prop="coupon_desc" label="优惠券描述">
                        <el-input type="text" maxlength="60" v-model="formState.coupon_desc" />
                    </el-form-item>
                    <el-form-item v-if="formState.coupon_type != 2" prop="coupon_money" label="优惠券金额">
                        <el-input type="text" maxlength="60" v-model="formState.coupon_money" />
                        <div class="extra">此类型的优惠券可以抵销的金额</div>
                    </el-form-item>
                    <el-form-item v-if="formState.coupon_type != 1" prop="coupon_discount" label="优惠券折扣">
                        <el-input type="text" maxlength="60" v-model="formState.coupon_discount">
                            <template #append>折</template>
                        </el-input>
                        <div class="extra">此类型的优惠券可以抵销的折扣</div>
                    </el-form-item>
                    <el-form-item prop="min_order_amount" label="最小订单金额">
                        <el-input type="text" maxlength="60" v-model="formState.min_order_amount" />
                        <div class="extra">只有订单总金额达到这个数才能使用这种优惠券，为0则表示无门槛</div>
                    </el-form-item>
                    <el-form-item v-if="formState.is_new_user" prop="limit_user_level" label="允许领取客户等级">
                        <div v-if="formState.is_new_user == 1">新人专享</div>
                        <div v-else>
                            <el-checkbox-group v-model:modelValue="formState.limit_user_rank">
                                <el-checkbox v-for="rank in rankList" :label="rank.rank_id" :key="rank.rank_id">{{ rank.rank_name }}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </el-form-item>
                    <el-form-item prop="send_date" label="发放日期">
                        <div>
                            <SelectTimeInterval
                                v-model:end-date="formState.send_end_date"
                                v-model:start-date="formState.send_start_date"
                                :clearable="false"
                                type="datetime"
                                value-format="YYYY-MM-DD HH:mm:ss"></SelectTimeInterval>
                        </div>
                    </el-form-item>
                    <el-form-item prop="use_date" label="使用日期">
                        <div>
                            <SelectTimeInterval
                                v-model:end-date="formState.use_end_date"
                                v-model:start-date="formState.use_start_date"
                                :clearable="false"
                                type="datetime"
                                value-format="YYYY-MM-DD HH:mm:ss"></SelectTimeInterval>
                        </div>
                    </el-form-item>
                    <el-form-item prop="send_range_data" label="使用范围">
                        <SelectGoodsRange
                            v-model:rangeIds="formState.send_range_data"
                            v-model:rangeType="formState.send_range"
                            :justProudct="true"
                            :disabled="formState.is_global == 1" />
                    </el-form-item>
                    <el-form-item prop="is_global" label="全场通用券">
                        <div>
                            <el-radio-group v-model="formState.is_global" @change="onChangeIsGlobal">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                            <div class="extra">通用券能跨店铺使用，不可叠加（一个订单只能使用一张通用券），不限制商品范围，如为“否”则只能自营商品中使用</div>
                        </div>
                    </el-form-item>
                    <el-form-item prop="is_show" label="首页推荐">
                        <div>
                            <el-radio-group v-model="formState.is_show">
                                <el-radio :value="1">是</el-radio>
                                <el-radio :value="0">否</el-radio>
                            </el-radio-group>
                            <div class="extra">显示在首页优惠券推荐模块中</div>
                        </div>
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
import RadioType from "@/components/radio/src/RadioType.vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import type { CouponFormState, CouponRankList } from "@/types/promotion/coupon.d";
import { getCoupon, updateCoupon } from "@/api/promotion/coupon";
import type { FormInstance, FormRules } from "element-plus";
import { SelectGoodsRange } from "@/components/select";
import { AnyCnameRecord } from "dns";
import { SelectTimeInterval } from "@/components/select";
import { getDays } from "@/utils/util";
import { formattedDate } from "@/utils/time";
const emit = defineEmits(["submitCallback", "update:confirmLoading", "close"]);

const rankList = ref<CouponRankList[]>([]); // 允许领取客户等级列表
const props = defineProps({
    id: {
        type: Number,
        default: 0,
    },
    coupon_type: {
        type: Number,
        default: 0,
    },
    is_new_user: {
        type: Number,
        default: 0,
    },
    act: {
        type: String,
        default: "",
    },
    isDialog: {
        type: Boolean,
        default: false,
    },
});
const loading = ref<boolean>(true);
const query = useRouter().currentRoute.value.query;
const action = ref<string>(props.isDialog ? props.act : String(query.act));
const id = ref<number>(props.isDialog ? props.id : Number(query.id));
const coupon_type = ref<number>(props.isDialog ? props.coupon_type : Number(query.coupon_type));
const is_new_user = ref<number>(props.isDialog ? props.is_new_user : Number(query.is_new_user));
const operation = action.value === "add" ? "insert" : "update";
const formRef = shallowRef();
const formState = ref<CouponFormState>({
    send_range: 0,
    send_range_data: [],
    is_global: 0,
    is_show: 1,
    coupon_type: coupon_type.value || 1,
    is_new_user: is_new_user.value || 0,
    send_date: [],
    use_date: [],
    limit_user_rank: []
});
const orderAdmountType = ref(1);

onMounted(() => {
    // 获取详情数据
    fetchCoupon();
});
const fetchCoupon = async () => {
    try {
        const result = await getCoupon(action.value, {
            id: id.value,
            coupon_type: coupon_type.value,
            is_new_user: is_new_user.value,
        });
        Object.assign(formState.value, result.item);
        rankList.value = result.rank_list;
    } catch (error: any) {
        message.error(error.message);
        emit("close");
    } finally {
        loading.value = false;
    }
};

const onChangeIsGlobal = (value: number) => {
    if (value == 1) {
        formState.value.send_range = 0;
    }
};
// 表单通过验证后提交
const onSubmit = async () => {
    try {
        await formRef.value.validate();
        emit("update:confirmLoading", true);
        const result = await updateCoupon(operation, { id: id.value, ...formState.value });
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
const validateSendDate = (rule: any, value: any, callback: any) => {
    if (!formState.value.send_start_date || !formState.value.send_end_date) {
        callback(new Error("发放日期不能为空"));
        return;
    } else {
        callback();
    }
};
const validateUseDate = (rule: any, value: any, callback: any) => {
    if (!formState.value.use_start_date || !formState.value.use_end_date) {
        callback(new Error("使用日期不能为空"));
        return;
    } else {
        callback();
    }
};
interface RuleForm {
    coupon_name: string;
    coupon_money: number;
    min_order_amount: number;
    coupon_discount: number;
    send_date: string;
    use_date: string;
}
const rules = reactive<FormRules<RuleForm>>({
    coupon_name: [{ required: true, message: "请输入优惠券名称！", trigger: "blur" }],
    coupon_money: [{ required: true, message: "请输入优惠券金额！", trigger: "blur" }],
    coupon_discount: [{ required: true, message: "请输入优惠券折扣！", trigger: "blur" }],
    min_order_amount: [{ required: true, message: "请输入订单满金额！", trigger: "blur" }],
    send_date: [{ required: true, validator: validateSendDate, trigger: "blur" }],
    use_date: [{ required: true, validator: validateUseDate, trigger: "blur" }],
});
defineExpose({ onFormSubmit });
</script>
