<template>
    <div class="theme-toolbar">
        <div class="theme-menu-con show">
            <div class="theme-con-box" data-id="1">
                <div class="inside">
                    <p class="desc">选择所需模块，并拖动至相应位置</p>
                    <p class="desc">注意：浏览器仅支持chrome、safari</p>
                    <!-- {if $is_mobile} -->
                    <p v-if="false" class="red">* 如果不编辑手机版，则默认自动匹配<br />pc版的设置生成手机版</p>
                    <div class="blank" style="height: 30px"></div>
                    <div class="modules-wrap modules-wrap-current">
                        <div class="modules-head J_ModuleListHead">
                            <span>基础模块</span>
                            <b class="dropdown-icon iconfont icon-xia"></b>
                        </div>
                        <draggable
                            class="module-list"
                            item-key="type"
                            :list="toolList"
                            ghost-class="sortable-ghost"
                            chosen-class="toolChosenClass"
                            animation="300"
                            @start=""
                            @end=""
                            :sort="false"
                            :group="{ name: 'advanced', pull: 'clone', put: false }"
                            :clone="clone">
                            <template #item="{ element, index }">
                                <div class="list-item tool-list-item" @click="onAdd(index)">
                                    <span v-if="element.content" class="pic" v-html="element.content"> </span>
                                    <span v-if="element.label" class="content">{{ element.label }}</span>
                                </div>
                            </template>
                        </draggable>
                    </div>
                    <div class="modules-wrap modules-wrap-current">
                        <div class="modules-head J_ModuleListHead">
                            <span>其它模块</span>
                            <b class="dropdown-icon iconfont icon-xia"></b>
                        </div>
                        <draggable
                            class="module-list"
                            item-key="type"
                            :list="otherList"
                            ghost-class="sortable-ghost"
                            chosen-class="toolChosenClass"
                            animation="300"
                            @start=""
                            @end=""
                            :sort="false"
                            :group="{ name: 'advanced', pull: 'clone', put: false }"
                            :clone="clone">
                            <template #item="{ element, index }">
                                <div class="list-item tool-list-item" @click="onAdd(index)">
                                    <span v-if="element.content" class="pic" v-html="element.content"> </span>
                                    <span v-if="element.label" class="content">{{ element.label }}</span>
                                </div>
                            </template>
                        </draggable>
                    </div>
                    <div style="height: 50px"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, defineAsyncComponent, onMounted, shallowRef } from "vue";
import draggable from "vuedraggable";
import request from "@/utils/request";
import { cloneDeep } from "lodash";
const props = defineProps({
    modules: {
        type: Object,
        default: () => ({}),
    },
});
const modules = ref(props.modules);
const toolList = ref([
    { type: "image_ad", label: "图片广告", content: '<i class="ico-decorate icon-dec-lunbotu1"></i>', module: {}, is_show: true },
    { type: "image_square_ad", label: "模块图片", content: '<i class="ico-decorate icon-dec-layoutForm"></i>', module: {}, is_show: true },
    { type: "image_hotarea", label: "热图绘制", content: '<i class="ico-decorate icon-dec-fuzhufenge-1"></i>', module: {}, is_show: true },
    { type: "product", label: "商品", content: '<i class="ico-decorate icon-dec-shangpin"></i>', module: {}, is_show: true },
    { type: "white_line", label: "分割线", content: '<i class="ico-decorate icon-dec-fengexian"></i>', module: {}, is_show: true },
    { type: "white_blank", label: "空白辅助", content: '<i class="ico-decorate icon-dec-kongbaifenge"></i>', module: {}, is_show: true },
    { type: "image_nav", label: "图文导航", content: '<i class="ico-decorate icon-dec-tuwendaohang2"></i>', module: {}, is_show: true },
    { type: "title_ad", label: "文本标题", content: '<i class="ico-decorate icon-dec-biaotiwenben1"></i>', module: {}, is_show: true },
    { type: "notice", label: "公告", content: '<i class="ico-decorate icon-dec-winfo-icon-gonggao"></i>', module: {}, is_show: true },
    { type: "search_bar", label: "商品搜索", content: '<i class="ico-decorate icon-dec-sousuokuang"></i>', module: {}, is_show: true },
    // { type: "store_info", label: "店铺信息", content: '<i class="ico-decorate icon-dec-dianpu"></i>', module: {}, is_show: true },
    { type: "cat_nav", label: "分类导航", content: '<i class="ico-decorate icon-dec-biaoge"></i>', module: {}, is_show: true },
]);
const otherList = ref([
    { type: "coupon", label: "优惠券", content: '<i class="ico-decorate icon-dec-youhuiquan-xianjinquan"></i>', module: {}, is_show: true },
    { type: "seckill", label: "秒杀", content: '<i class="ico-decorate icon-dec-pintuan"></i>', module: {}, is_show: true },
    // { type: "pin", label: "拼团", content: '<i class="ico-decorate icon-dec-pintuan"></i>', module: {}, is_show: true },
    // { type: "bargain", label: "砍价", content: '<i class="ico-decorate icon-dec-kanjia"></i>', module: {}, is_show: true },
    // { type: "live", label: "直播", content: '<i class="ico-decorate icon-dec-shipinzhibo"></i>', module: {}, is_show: true }
]);
const clone = (obj: any) => {
    let newObj = cloneDeep(obj);
    // 增加唯一键值
    newObj.module_index = Date.now();
    // 删除没用的值
    delete newObj.content;
    return newObj;
};
const onAdd = (index: number) => {
    const addItem = cloneDeep(toolList.value[index]);
    modules.value.moduleList.push(addItem);
};
</script>
