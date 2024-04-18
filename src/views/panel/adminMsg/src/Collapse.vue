<template>
    <div class="collapse" :class="show ? 'show' : 'hide'">
        <div class="cell" :class="item.is_readed == 0 ? 'unread' : ''" @click="expand(item)">
            <div class="left">
                <div class="badge"></div>
                <div class="text">
                    {{ item.title }}
                </div>
            </div>
            <div class="right">
                <div class="time">
                    {{ item.send_time }}
                </div>
                <div class="icon">
                    <i class="nav-icon iconfont icon-xiala"></i>
                </div>
            </div>
        </div>
        <div class="content_box" :class="show ? 'show' : 'hide'">
            <div style="margin: 10px">
                <div v-if="item.order_id && item.items.length > 0 && !item.content">
                    <div class="item">
                        <div class="product_info" v-for="info in item.items">
                            <div class="info">
                                <Image width="60" :src="imageFormat(info.pic_thumb)" fit="contain" />
                                <p>{{ info.product_name }}</p>
                            </div>
                            <div class="txt">
                                <p>¥{{ info.price }}</p>
                                <p>x {{ info.quantity }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="money_box">
                        <div>
                            订单金额：¥{{ item.order.total_amount }} <span>(含运费：{{ item.order.shipping_fee }})</span>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="item" v-html="item.content"></div>
                    <div class="more" @click="toPage(item.msg_link)">
                        <span>查看详情</span>
                        <i class="nav-icon iconfont icon-youjiantou"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Image } from "@/components/image";
import { imageFormat } from "@/utils/format";
import { reactive, ref, onMounted } from "vue";
import { getAdminMsgSetReaded } from "@/api/panel/adminMsg";
const props = defineProps({
    item: { type: Object, default: {} },
});
const emit = defineEmits(["setReadedCallback"]);
const show = ref(false);
const isUnread = ref(true);
const expand = async (item: any) => {
    if (!item.is_readed) {
        const result = await getAdminMsgSetReaded({ msg_id: item.msg_id });
        emit("setReadedCallback", true);
    }
    show.value = !show.value;
    isUnread.value = false;
};
const toPage = (url: any) => {
    show.value = !show.value;
    isUnread.value = false;
};
</script>

<style lang="less" scoped>
.collapse {
    .cell {
        border: 1px solid rgba(0, 0, 0, 0.15);
        margin-top: 10px;
        position: relative;
        background: rgba(0, 0, 0, 0.04);
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;

        .left {
            display: flex;
            align-items: center;
            .badge {
                background: rgba(0, 0, 0, 0);
                width: 5px;
                height: 5px;
                border-radius: 100px;
                margin: 0 8px;
            }
            .text {
                width: 410px;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: normal;
            }
        }
        .right {
            display: flex;
            align-items: center;
            .time {
                font-size: 12px;
                color: rgba(0, 0, 0, 0.45);
            }
            .icon {
                i {
                    display: inline-block;
                    color: #bbb;
                    font-size: 22px;
                    margin-right: 10px;
                }
            }
        }
    }
    .unread {
        background: #fff;
        .left {
            .badge {
                background-color: #fa4350;
            }
        }
    }
    .content_box {
        max-height: 0;
        overflow: hidden;
        transition: all 0.4s;
        line-height: 22px;
        border: 1px solid rgba(0, 0, 0, 0);
        border-top: none;
        .more {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            cursor: pointer;
            color: var(--tig-primary);
            i {
                font-size: 12px;
            }
        }
        .product_info {
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #eee;
            &:last-child {
                border: none;
            }
            .info {
                display: flex;
                p {
                    margin-top: 10px;
                    margin-left: 5px;
                }
            }
            .txt {
                text-align: end;
            }
        }
        .money_box {
            font-size: 13px;
            text-align: end;
            span {
                color: #999;
            }
        }
    }
}
.show {
    .cell {
        background: rgba(0, 0, 0, 0.04);
        .left {
            .badge {
                background: rgba(0, 0, 0, 0);
            }
        }
        .right {
            .icon {
                i {
                    transform: rotate(-180deg);
                    transition: transform ease 0.4s;
                }
            }
        }
    }
    .content_box {
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-top: none;
        max-height: 1000px;
    }
}
.hide {
    .cell {
        .right {
            .icon {
                i {
                    transform: rotate(0deg);
                    transition: transform ease 0.4s;
                }
            }
        }
    }
}
</style>
