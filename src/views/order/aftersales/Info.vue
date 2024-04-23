<template>
    <div class="container" v-loading="loading">
        <div class="content_wrapper" v-if="!loading">
            <div class="lyecs-form-table">
                <el-table :data="formState.aftersales_items" style="width: 100%;margin-bottom: 20px;" border>
                    <el-table-column label="商品信息" width="400">
                        <template #default="{row}">
                            <div class="flex">
                                <ProductCard
                                    :pic_thumb="row.pic_thumb"
                                    :product_id="row.product_id"
                                    :product_name="row.product_name"
                                    >
                                </ProductCard>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品价格" align="center">
                        <template #default="{row}">
                            <div>{{ priceFormat(row.price) }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="quantity" label="商品数量" align="center" />
                    <el-table-column prop="number" label="退货数量" align="center" />
                </el-table>
                <div class="container-card">
                    <div class="title flex flex-justify-between">
                        <p>售后明细</p>
                        <div class="btn flex" v-if="type != 2">
                            <div v-if="formState.aftersale_type == 1 && formState.status == 1">
                                <DialogForm
                                    :params="{ status: 2, formData:formState }"
                                    isDrawer
                                    path="order/aftersales/Handle"
                                    title="处理售后"
                                    width="600px"
                                    :showClose="false" 
                                    :showOnOk="false"
                                    @okCallback="fetchBrand">
                                    <el-button type="primary" style="margin-right: 10px;"> 同意并发送退货地址 </el-button>
                                </DialogForm>
                                <DialogForm
                                    :params="{ status: 3, formData:formState }"
                                    isDrawer
                                    path="order/aftersales/Handle"
                                    title="处理售后"
                                    width="600px"
                                    :showClose="false" 
                                    :showOnOk="false"
                                    @okCallback="fetchBrand">
                                    <el-button> 拒绝退货退款 </el-button>
                                </DialogForm>
                            </div>
                            <div v-if="formState.aftersale_type == 5 && formState.status == 1">
                                <DialogForm
                                    :params="{ status: 2, formData:formState }"
                                    isDrawer
                                    path="order/aftersales/Handle"
                                    title="处理售后"
                                    width="600px"
                                    :showClose="false" 
                                    :showOnOk="false"
                                    @okCallback="fetchBrand">
                                    <el-button type="primary" style="margin-right: 10px;"> 同意仅退款 </el-button>
                                </DialogForm>
                                <DialogForm
                                    :params="{ status: 3, formData:formState }"
                                    isDrawer
                                    path="order/aftersales/Handle"
                                    title="处理售后"
                                    width="600px"
                                    :showClose="false" 
                                    :showOnOk="false"
                                    @okCallback="fetchBrand">
                                    <el-button> 拒绝仅退款 </el-button>
                                </DialogForm>
                            </div>
                            <div v-if="formState.aftersale_type == 1 && formState.status == 4">
                                <el-popconfirm
                                    width="220"
                                    confirm-button-text="确认"
                                    cancel-button-text="取消"
                                    title="确认已收到货?"
                                    @confirm="confirmReceipt"
                                >
                                    <template #reference>
                                        <el-button type="primary"> 确认收货 </el-button>
                                    </template>
                                </el-popconfirm>
                            </div>
                        </div>
                    </div>
                    <div class="info-card">
                        <div class="card-title">
                            <ul>
                                <li class="card-li">
                                    <div>售后方式：</div>
                                    <div class="li-info red">{{ formState.aftersales_type_name }}</div>
                                </li>
                                <li class="card-li">
                                    <div>售后状态：</div>
                                    <div class="li-info">{{ formState.status_name }}</div>
                                </li>
                                <li class="card-li">
                                    <div>申请时间：</div>
                                    <div class="li-info">{{ formState.add_time ? formState.add_time : "--" }}</div>
                                </li>
                                <!-- <li class="card-li">
                                    联系方式：<span class="li-info">{{ formState.logistics_name ? formState.logistics_name : "--" }}</span>
                                </li> -->
                                <li class="card-li">
                                    <div>退款原因：</div>
                                    <div class="li-info">{{ formState.aftersale_reason}}</div>
                                </li>
                                <li class="card-li">
                                    <div>退款说明：</div>
                                    <div class="li-info">
                                        {{ formState.description ? formState.description : "--" }}
                                    </div>
                                </li>
                                
                            </ul>
                        </div>
                        <div class="card-title">
                            <ul>
                                <li class="card-li">
                                    <div>退款金额：</div>
                                    <div class="li-info">{{ priceFormat(formState.refund_amount)  || "0" }}</div>
                                </li>
                                <li class="card-li">
                                    <div>物流公司：</div>
                                    <div class="li-info">{{ formState.logistics_name || "--" }}</div>
                                </li>
                                <li class="card-li">
                                    <div>物流单号：</div>
                                    <div class="li-info">{{ formState.tracking_no || "--" }}</div>
                                </li>
                                <li class="card-li" v-if="formState.aftersales_items">
                                    订单编号：<span class="li-info">{{ formState.aftersales_items[0].order_sn }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="negotiation-box">
                    <div class="negotiation-title flex flex-justify-between">
                        <div>
                            协商记录
                        </div>
                        <div class="btn" v-if="formState.status == 1 && type != 2">
                            <el-button bg size="small" text type="primary" :disabled="isMsg" @click="isMsg = true"> 点击发表留言 </el-button>
                        </div>
                    </div>
                    <el-form :model="messageForm" label-width="auto" style="margin-top: 20px;" v-if="isMsg">
                        <el-form-item label="留言内容：" prop="log_info">
                            <el-input
                                v-model="messageForm.log_info"
                                :rows="4"
                                type="textarea"
                                maxlength="300"
                                show-word-limit
                                placeholder="你可以在这里给买家留言, 为了保证你的权益, 请尽可能详细的上传留言资料"
                            />
                        </el-form-item>
                        <el-form-item label="上传凭证：" prop="return_pic">
                            <FormAddGallery v-if="!loading" v-model:photos="messageForm.return_pic" :isMultiple="true"> </FormAddGallery>
                        </el-form-item>
                        <el-form-item>
                            <div class="btn-box">
                                <el-button type="primary" @click="postMessage(formState.aftersale_id)">发表留言</el-button>
                                <el-button @click="isMsg = false">取消</el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                    <div class="negotiation-content">
                        <Timeline>
                            <TimelineItem v-for="(item, index) in formState.aftersales_log">
                                <template #dot>
                                    <div class="logo" v-if="item.user_name">买</div>
                                    <div class="logo-b" v-if="item.admin_name">商</div>
                                </template>
                                <div class="info-box">
                                    <div class="tit">
                                        <div class="txt" v-if="(index+1) == formState.aftersales_log?.length">
                                            {{ item.log_info }}
                                        </div>
                                        <div class="txt" v-else>
                                            <span v-if="item.user_name">买家</span>
                                            <span v-if="item.admin_name">商家</span> 留言
                                        </div>
                                        <div class="time">
                                            {{ item.add_time }}
                                        </div>
                                    </div>
                                    <div class="detail">
                                        <div class="content" v-if="(index+1) != formState.aftersales_log?.length">
                                            {{ item.log_info }}
                                        </div>
                                        <div class="card-li" v-if="(index+1) == formState.aftersales_log?.length">
                                            <span>售后方式：</span>
                                            <span class="li-info">
                                                {{formState.aftersales_type_name}}
                                            </span>
                                        </div>
                                        <div class="card-li"  v-if="(index+1) == formState.aftersales_log?.length">
                                            <span>退款原因：</span>
                                            <span class="li-info">
                                                {{formState.aftersale_reason}}
                                            </span>
                                        </div>
                                        <div class="card-li" v-if="(index+1) == formState.aftersales_log?.length">
                                            <span>退款说明：</span>
                                            <span class="li-info">
                                                {{formState.description}}
                                            </span>
                                        </div>
                                        <div class="card-li" v-if="item.return_pic">
                                            <span>上传凭证：</span>
                                            <span class="li-info">
                                                <Image v-for="pic in item.return_pic" style="margin-right: 10px;" width="60" :src="imageFormat(pic.pic_thumb)" fit="contain"/>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </TimelineItem>
                        </Timeline>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {imageFormat} from "@/utils/format";
import {DialogForm} from '@/components/dialog'
import {Image} from "@/components/image";
import {onMounted, ref, shallowRef} from "vue"
import {useRouter} from 'vue-router'
import {message, Timeline, TimelineItem} from "ant-design-vue";
import {FormAddGallery} from '@/components/gallery'
import {FormState} from '@/types/order/aftersales';
import {getAftersales, updateAftersales, addMessage, updataConfirmReceipt } from "@/api/order/aftersales";
import {ProductCard} from '@/components/list';
import { priceFormat } from "@/utils/format";

// 父组件回调
const emit = defineEmits(["submitCallback", "update:confirmLoading", "close"]);

const props = defineProps({
    id: {
        type: Number,
        default: 0
    },
    act: {
        type: String,
        default: ""
    },
    type: {
        type: Number,
        default: 0
    },
    isDialog: Boolean
});
const loading = ref<boolean>(true);
const query = useRouter().currentRoute.value.query;
const action = ref<string>(props.isDialog ? props.act : String(query.act));
const id = ref<number>(props.isDialog ? props.id : Number(query.id));
const operation = action.value === 'add' ? 'insert' : 'update';
const formRef = shallowRef();
const formState = ref<FormState>({
    pic_thumb: "",
    number: 1
});
const isMsg = ref<boolean>(false)
const messageForm = ref<any>({
    log_info:"",
    return_pic:[]
})
const fetchBrand  = async () => {
    try {
        const result = await getAftersales(action.value, { id: id.value });
        Object.assign(
          formState.value,
          result.item
        )
        formState.value.aftersales_type_config = toArray(formState.value.aftersales_type_config)
        formState.value.status_config = toArray(formState.value.status_config)
        formState.value.modify_number = formState.value.number
        // emit('submitCallback')
    } catch (error:any) {
        message.error(error.message);
        emit('close');
    } finally {
        loading.value = false;
    }
};
const toArray = (arr:any) => {
  if (typeof arr == 'object') {
    var newArr = [];

    for (let i in arr) {
      newArr.push(arr[i]);
    }
    return newArr;
  } else {
    return arr;
  }
};
const onInput = (e:number) => {
    if(e > formState.value.number){
        formState.value.modify_number = formState.value.number
    }
    if(e < 1){
        formState.value.modify_number = 1
    }
}

const postMessage = async (id:any) => {
    if(messageForm.value.log_info == ""){
        message.error("请输入留言内容");
        return false
    }
    try {
        const result = await addMessage({ aftersale_id: id, ...messageForm.value });
        isMsg.value = false;
        let data = {
            log_info:"",
            return_pic:[]
        }
        messageForm.value = data;
        fetchBrand();
    } catch (error:any) {
        message.error(error.message);
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    // 获取详情数据
    fetchBrand();
});

// 确认收货
const confirmReceipt = async () => {
    try {
        const result = await updataConfirmReceipt({ id: id.value });
        message.success(result.message);
        // fetchBrand();
        emit('submitCallback')
    } catch (error:any) {
        message.error(error.message);
    }
};
// 表单提交
const onFormSubmit = () => {
    // onSubmit()
};

defineExpose({ onFormSubmit });
</script>
<style lang="less" scoped>
.container-card {
    border: 1px solid #ececec;
    /* 添加淡淡的边框 */
    box-shadow: 2px 2px 5px rgba(203, 193, 193, 0.2);
    border-radius: 2px;
    padding: 20px;
    background: #fff;
    margin-bottom: 20px;

    .border-bottom {
        border-bottom: 1px solid #ececec;
        padding-bottom: 16px;
        margin-bottom: 16px;
    }

    .button-card {
        margin-bottom: 12px;
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        /* 允许换行 */
        gap: 8px;
    }

    .babyBlue {
        background-color: rgba(61, 127, 255, 0.06);
        border-radius: 6px;
    }

    .pd20 {
        padding: 20px;
    }

    .orange {
        color: #ed6a0c;
    }

    .title {
        font-size: 16px;
        line-height: 25px;
        color: #323233;
        margin-bottom: 15px;
        font-weight: 700;
    }

    .info-card {
        display: flex;
        flex-direction: row;
        gap: 20px;
        white-space: nowrap;

        .card-title {
            flex: 1;
            display: flex;
            flex-direction: column;
            font-size: 14px;
            line-height: 30px;
            font-weight: 500;
            color: #646566;
        }

        .min-title {
            margin-bottom: 10px;
        }

        .card-li {
            display: flex;
            font-weight: normal;
            font-size: 12px;
            line-height: 28px;
        }

        .li-info {
            max-width: 300px;
            white-space: wrap;
            color: black;
        }
        .red{
            color: var(--tig-red-text-color);
        }
    }

    .total {
        margin: 24px 0;
        width: 100%;
        text-align: right;
    }
}
.negotiation-box{
    .negotiation-title{
        font-size: 16px;
        font-weight: 700;
        padding-bottom: 25px;
        border-bottom: 1px solid #ebedf0;
    }
    .btn-box{
        display: flex;
        justify-content: flex-end;
        width:100%;
    }
    .negotiation-content{
        .logo{
            width: 24px;
            height: 24px;
            line-height: 24px;
            display: inline-block;
            border-radius: 50%;
            background-color: #74829d;
            color: #fff;
            text-align: center;
        }
        .logo-b{
            width: 24px;
            height: 24px;
            line-height: 24px;
            display: inline-block;
            border-radius: 50%;
            background-color: #155bd4;
            color: #fff;
            text-align: center;
        }
        .info-box{
            background-color: #f7f8fa;
            padding: 16px;
            border-radius: 4px;
            margin-bottom: 16px;
            .tit{
                display: flex;
                align-items: center;
                justify-content: space-between;
                .txt{
                    color: #323233;
                    font-weight: 500;
                }
                .time{
                    color: #999;
                }
            }
            .detail{
                border-top: 1px solid #ebedf0;
                margin-top: 15px;
                padding-top: 5px;
                font-size: 12px;
                .content{
                    padding: 5px 0;
                }
                .card-li{
                    padding: 5px 0;
                    color: #646566;
                    display: flex;
                    .li-info{
                        color: #333;
                    }
                }
            }
        }
    }
}
</style>
