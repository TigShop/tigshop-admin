<template>
    <div class="container">
        <div class="content_wrapper">
            <div class="lyecs-form-table">
                <el-form v-if="!loading" ref="formRef" :model="formState" label-width="auto" name="form_in_modal">
                    <el-tabs v-model="activeKey" class="lyecs-tabs" tab-position="top">
                        <el-tab-pane label="基本信息" lazy name="base">
                            <el-form-item :rules="[{ required: true }]" label="商品类型" prop="product_type">
                                <RadioType
                                    v-model:modelValue="formState.product_type"
                                    :radioList="[
                                        { key: 1, title: '普通商品' },
                                        { key: 2, title: '虚拟商品' },
                                    ]"></RadioType>
                            </el-form-item>
                            <el-form-item :rules="[{ required: true, message: '商品名称不能为空' }]" label="商品名称" prop="product_name">
                                <el-input v-model="formState.product_name" description="请输入您的姓名" />
                            </el-form-item>
                            <el-form-item label="商品相册" prop="img_list">
                                <FormAddGallery v-if="!loading" v-model:photos="formState.img_list" :isMultiple="true"> </FormAddGallery>
                                <div class="extra">提示：您可以通过拖拽来调整相册图片顺序，第一张图将作为商品主图展示</div>
                            </el-form-item>
                            <el-form-item label="商品库存" prop="product_stock">
                                <el-input v-model="formState.product_stock" description="请输入商品库存" />
                                <div class="extra">提示：库存在商品存在货品时编辑无效，库存数值取决于其规格库存数量</div>
                            </el-form-item>
                            <el-form-item :rules="[{ required: true, message: '请选择商品分类!' }]" label="商品分类" prop="category_id">
                                <SelectCategory
                                    v-if="!loading"
                                    v-model:category_id="formState.category_id"
                                    :multiple="false"
                                    style="width: 100%"></SelectCategory>
                            </el-form-item>
                            <el-form-item extra="" label="商品描述" prop="product_brief">
                                <el-input v-model="formState.product_brief" rows="2" type="textarea"></el-input>
                                <div class="extra">该描述一般会高亮出现在商品名称后面</div>
                            </el-form-item>
                            <el-form-item label="商品售价" prop="product_price">
                                <el-input v-model="formState.product_price" />
                            </el-form-item>
                            <el-form-item extra="不填则根据设置的比例自动计算" label="市场价" prop="market_price">
                                <el-input v-model="formState.market_price" />
                                <div class="extra">不填则根据设置的比例自动计算</div>
                            </el-form-item>
                            <el-form-item label="商品货号" prop="product_sn">
                                <el-input v-model="formState.product_sn" />
                                <div class="extra">如果您不输入商品货号，系统将自动生成一个唯一的货号</div>
                            </el-form-item>
                            <el-form-item label="条形编码" prop="product_tsn">
                                <el-input v-model="formState.product_tsn" />
                            </el-form-item>
                            <el-form-item label="商品品牌" prop="brand_id">
                                <SelectBrand v-if="!loading" v-model="formState.brand_id" style="width: 100%"></SelectBrand>
                            </el-form-item>
                            <el-form-item label="供应商" prop="suppliers_id">
                                <el-select v-model="formState.suppliers_id" placeholder="请选择" style="width: 100%">
                                    <el-option label="请选择" :value="0" ></el-option>
                                    <el-option
                                        v-for="item in formState.suppliers_list"
                                        :key="item.suppliers_id"
                                        :label="item.suppliers_name"
                                        :value="item.suppliers_id" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="运费模板" prop="shipping_tpl_id">
                                <el-select v-model="formState.shipping_tpl_id" placeholder="请选择" style="width: 100%">
                                    <el-option label="请选择" :value="0" ></el-option>
                                    <el-option
                                        v-for="item in formState.shipping_tpl_list"
                                        :key="item.shipping_tpl_id"
                                        :label="item.shipping_tpl_name"
                                        :value="item.shipping_tpl_id" />
                                </el-select>
                                <div class="extra">不选择则时，该商品运费按默认运费模板计算。当前默认运费模板：默认模板</div>
                            </el-form-item>
                            <el-form-item label="是否包邮" prop="free_shipping">
                                <el-radio-group style="width: 100%" v-model="formState.free_shipping">
                                    <el-radio :value="1">是</el-radio>
                                    <el-radio :value="0">否</el-radio>
                                </el-radio-group>
                                <div class="extra">勾选“是”表示此商品不会产生运费花销，勾选“否”表示按照正常运费计算。</div>
                            </el-form-item>
                            <el-form-item label="最大秒杀库存" prop="seckill_max_num">
                                <el-input v-model="formState.seckill_max_num"></el-input>
                                <div class="extra">已售百分比=当前商品库存/秒杀最大库存数</div>
                            </el-form-item>
                            <el-form-item label="是否上架" prop="product_status">
                                <el-radio-group style="width: 100%" v-model="formState.product_status">
                                    <el-radio :value="1">是</el-radio>
                                    <el-radio :value="0">否</el-radio>
                                </el-radio-group>
                                <div class="extra">上架则允许销售（未审核的商品无法手动上架）</div>
                            </el-form-item>
                        </el-tab-pane>
                        <el-tab-pane label="促销优惠" lazy name="activity">
                            <el-form-item label="限购数量" prop="limit_number">
                                <el-input v-model="formState.limit_number" />
                                <div class="extra">不填则不限购，LYECS设置中心可设置限购数量</div>
                            </el-form-item>
                            <el-form-item label="加入推荐">
                                <Checkbox v-model="formState.is_best">
                                    <template #default> 精品</template>
                                </Checkbox>
                                <Checkbox v-model="formState.is_new">
                                    <template #default> 新品</template>
                                </Checkbox>
                                <Checkbox v-model="formState.is_hot">
                                    <template #default> 热销</template>
                                </Checkbox>
                            </el-form-item>
                            <el-form-item prop="promote_price">
                                <template #label>
                                    <Checkbox v-model="formState.is_promote">
                                        <template #default> 促销价</template>
                                    </Checkbox>
                                </template>
                                <el-input v-model="formState.promote_price"></el-input>
                            </el-form-item>
                            <el-form-item v-if="formState.is_promote" label="促销时间" prop="promote_date" style="width:600px;">
                                <!-- <el-date-picker
                                    v-model="promoteDate"
                                    :shortcuts="shortcuts"
                                    end-placeholder="结束时间"
                                    range-separator="-"
                                    start-placeholder="开始时间"
                                    type="datetimerange" /> -->
                                <SelectTimeInterval
                                    type="datetime"
                                    v-model:start-date="formState.promote_start_date"
                                    v-model:end-date="formState.promote_end_date"
                                    value-format="YYYY-MM-DD HH:mm:ss"
                                ></SelectTimeInterval>
                                <div class="extra">需先钩选促销价</div>
                            </el-form-item>
                            <!-- <el-form-item label="阶梯价格" prop="volume_list">
                                <DynamicList
                                    v-model:modelValue="formState.volume_list"
                                    :minWidth="340"
                                    :templateList="['number', 'price']"
                                    buttonName="添加阶梯价格"
                                    extra="购买数量达到优惠数量时享受的优惠价格">
                                    <template #dynamicSlot="item">
                                        <div style="margin-bottom: 8px; display: flex; align-items: center; width: 100%; font-size: 12px">
                                            <div>达到数量：</div>
                                            <el-input v-model="(item.item as any).number" style="flex: 1; margin-right: 8px"></el-input>
                                            <span>价格为：</span>
                                            <el-input v-model="(item.item as any).price" style="flex: 1"></el-input>
                                        </div>
                                    </template>
                                </DynamicList>
                            </el-form-item> -->
<!--                            <el-form-item label="会员价格" prop="rank">-->
<!--                                <div class="rank">-->
<!--                                    <el-space v-for="(rank, index) in formState.user_rank_list" :key="index">-->
<!--                                        <el-space class="mb10">-->
<!--                                            <div style="min-width: 100px; text-align: right">{{ rank.rank_name }}：</div>-->
<!--                                            <el-input v-model="rank.price" style="width: 100px"></el-input>-->
<!--                                        </el-space>-->
<!--                                    </el-space>-->
<!--                                </div>-->
<!--                                <div class="extra">会员价格为空时表示会员按正常价格购买，会员价格不与促销价、一口价、阶梯价等活动叠加</div>-->
<!--                            </el-form-item>-->
                            <el-form-item label="消费积分" prop="give_integral">
                                <el-input v-model="formState.give_integral" />
                                <div class="extra">购买该商品时赠送消费积分数,-1表示按商品价格赠送</div>
                            </el-form-item>
                            <el-form-item label="等级积分" prop="rank_integral">
                                <el-input v-model="formState.rank_integral" />
                                <div class="extra">购买该商品时赠送等级积分数,-1表示按商品价格赠送</div>
                            </el-form-item>
                            <el-form-item label="积分兑换" prop="integral">
                                <el-input v-model="formState.integral" />
                                <div class="extra">(此处需填写金额)购买该商品时最多可以使用积分的金额</div>
                            </el-form-item>
                        </el-tab-pane>
                        <el-tab-pane label="商品描述" lazy name="desc">
                            <el-form-item label="商品视频" prop="product_video">
                                <el-input v-model="formState.product_video" class="InputBox" placeholder="请填写完整视频源播放地址" />
                                <div class="extra">
                                    如果设置，商品详情页的相册位置将会加载该视频，进入时默认会自动播放<br />建议使用淘宝视频（http://video.taobao.com，需开通店铺）或者OSS（阿里云或腾讯云等）上传
                                </div>
                            </el-form-item>
                            <ProductDesc v-model:descArr="formState.product_desc_arr"></ProductDesc>
                        </el-tab-pane>
                        <el-tab-pane label="属性规格" lazy name="attr">
                            <ProductAttr
                                v-model:attrChanged="formState.attr_changed"
                                v-model:attrList="formState.attr_list"
                                v-model:productList="formState.product_list"
                                :attrTplList="attrTplList"></ProductAttr>
                        </el-tab-pane>
                        <el-tab-pane label="其他信息" lazy name="other">
                            <el-form-item label="显示销量" prop="virtual_sales">
                                <el-input v-model="formState.virtual_sales" class="InputBox"></el-input>
                                <div class="extra">显示销量会随下单而增加，但不是真实销售数据</div>
                            </el-form-item>
<!--                            <el-form-item label="商品标签" prop="comment_tag">-->
<!--                                <el-input v-model="formState.comment_tag" class="InputBox"></el-input>-->
<!--                                <div class="extra">如果有设置标签，商品列表页面会高亮显示该标签，如“热销”，尽量不要超过三个字</div>-->
<!--                            </el-form-item>-->
                            <el-form-item label="SEO标题" prop="seo_product_title">
                                <el-input v-model="formState.seo_product_title" class="InputBox"></el-input>
                                <div class="extra">如果不填，则该商品详情页的标题则为默认标题；如果该项不为空，则标题显示此项的内容。</div>
                            </el-form-item>
                            <el-form-item label="商品重量" prop="product_weight">
                                <el-input v-model="formState.product_weight" class="InputBox">
                                    <template #append>Kg</template>
                                </el-input>
                            </el-form-item>
<!--                            <el-form-item label="库存警告" prop="warn_number">-->
<!--                                <el-input v-model="formState.warn_number" class="InputBox"></el-input>-->
<!--                            </el-form-item>-->
                            <el-form-item label="SEO关键词" prop="formState.keywords">
                                <el-input v-model="formState.keywords" class="InputBox" />
                                <div class="extra">用空格分隔</div>
                            </el-form-item>
                            <el-form-item label="商品介绍" prop="product_info">
                                <el-input v-model="formState.product_info" cols="40" rows="2" type="textarea"></el-input>
                                <div class="extra">可不填</div>
                            </el-form-item>
                            <el-form-item label="商家备注" prop="remark">
                                <el-input v-model="formState.remark" cols="40" rows="2" type="textarea"></el-input>
                                <div class="extra">只有商家可见</div>
                            </el-form-item>
<!--                            <el-form-item label="温馨提示" prop="product_care">-->
<!--                                <el-input v-model="formState.product_care" class="InputBox" />-->
<!--                                <div class="extra">如果不填，则该商品详情页则没有温馨提示内容。</div>-->
<!--                            </el-form-item>-->
                            <el-form-item label="服务说明" prop="product_service_ids">
                                <Checkbox v-model="item.check" v-for="(item, index) in formState.service_list" :key="index">
                                    <template #default>{{ item["product_service_name"] }}</template>
                                </Checkbox>
                            </el-form-item>
                            <el-form-item label="货到付款" prop="is_support_cod">
                                <el-radio-group style="width: 100%" v-model="formState.is_support_cod">
                                    <el-radio :value="1">是</el-radio>
                                    <el-radio :value="0">否</el-radio>
                                </el-radio-group>
                                <div class="extra">勾选“是”表示该商品可以使用货到付款</div>
                            </el-form-item>
                            <el-form-item label="货到付款" prop="is_support_return">
                                <el-radio-group style="width: 100%" v-model="formState.is_support_return">
                                    <el-radio :value="1">是</el-radio>
                                    <el-radio :value="0">否</el-radio>
                                </el-radio-group>
                                <div class="extra">勾选“是”表示该商品可以7天无理由退货</div>
                            </el-form-item>
                        </el-tab-pane>
                        <el-tab-pane label="配件相关" lazy name="related">
                            <el-form-item label="相关商品" prop="product_related">
                                <SelectProduct :max="10" v-if="!loading" v-model:ids="formState.product_related"></SelectProduct>
                                <div class="extra">最多添加10个商品，仅用于在商品详情页展示</div>
                            </el-form-item>
                            <el-form-item label="关联文章" prop="product_article_list">
                                <SelectArticle :max="10" v-if="!loading" v-model:modelValue="formState.product_article_list"></SelectArticle>
                                <div class="extra">最多添加10篇文章</div>
                            </el-form-item>
                        </el-tab-pane>
                    </el-tabs>
                    <el-form-item v-show="!isDialog" :wrapper-col="{ offset: 4, span: 16 }">
                        <el-button ref="submitBtn" class="form-submit-btn" type="primary" @click="onSubmit()">提交 </el-button>
                    </el-form-item>
                </el-form>
                <a-spin :spinning="loading" style="width: 100%; margin-top: 100px" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref, shallowRef } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { FormAddGallery } from "@/components/gallery";
import { ProductFormState, ServiceList } from "@/types/product/product.d";
import { getProduct, updateProduct } from "@/api/product/product";
import { Checkbox, RadioType } from "@/components/radio";
import { SelectArticle, SelectBrand, SelectCategory, SelectGoods, SelectProduct } from "@/components/select";
import { DynamicList } from "@/components/list";
import ProductDesc from "@/views/product/product/src/ProductDesc.vue";
import ProductAttr from "@/views/product/product/src/ProductAttr.vue";
import dayjs from "dayjs";
import { SelectTimeInterval } from "@/components/select";
import { getDays } from "@/utils/util";
import { formattedDate } from "@/utils/time";

const emit = defineEmits(["submitCallback", "update:confirmLoading", "close"]);

const props = defineProps({
    id: {
        type: Number,
        default: 0,
    },
    act: {
        type: String,
        default: "",
    },
    isDialog: Boolean,
});
const activeKey = ref("base");
const loading = ref<boolean>(true);
const query = useRouter().currentRoute.value.query;
const action = ref<string>(props.isDialog ? props.act : String(query.act));
const id = ref<number>(props.isDialog ? props.id : Number(query.id));
const operation = action.value === "add" ? "insert" : "update";
const formRef = shallowRef();
const formState = ref<ProductFormState>({
    product_desc_arr: [],
    product_related: [],
    service_list:[]
});

onMounted(() => {
    // console.log(formState);
    // 获取详情数据
    fetchProduct();
});
// 属性模板
const attrTplList = ref<Object[]>([]);
// 会员等级
const userRankList = ref<Object[]>([]);

const fetchProduct = async () => {
    try {
        const result = await getProduct(action.value, { id: id.value });
        if (result.item.product_related == null) {
            result.item.product_related = [];
        }
        Object.assign(formState.value, result.item, result);
        attrTplList.value = result.attr_tpl_list;
        userRankList.value = result.user_rank_list;
        formState.value.service_list = result.service_list.map((item: ServiceList) => {
            return {
                ...item,
                check: formState.value.product_service_ids?.includes(item.product_service_id) ? 1 : 0,
            };
        });
    } catch (error: any) {
        message.error(error.message);
        emit("close");
    } finally {
        loading.value = false;
    }
};
// 表单通过验证后提交
const onSubmit = async () => {
    await formRef.value.validate();
    try {
        emit("update:confirmLoading", true);
        const selectedIds = formState.value.service_list.filter(item => item.check === 1).map(item => item.product_service_id);
        formState.value.product_service_ids = selectedIds;
        const result = await updateProduct(operation, { ...formState.value });
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
<style lang="less" scoped>
.content_wrapper {
    padding: 10px 28px;
}
.rank {
    display: flex;
    width: 100%;
    flex-wrap: wrap; /* 允许项目换行 */
    justify-content: flex-start; /* 项目在主轴上的对齐方式 */
}
</style>
