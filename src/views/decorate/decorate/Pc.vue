<template>
    <div class="decorate-page decorate-page-pc">
        <div class="decorate-topbar-warp">
            <div class="decorate-topbar-con">
                <div class="topbar-left">
                    <div class="topbar-logo"></div>
                    <div class="topbar-now-txt">当前页面：首页装修 -</div>
                </div>
                <el-space class="topbar-right">
                    <el-button>另存为新模板</el-button>
                    <el-button>模板库</el-button>
                    <el-button>预览</el-button>
                    <el-button @click="onSave()">存至草稿</el-button>
                    <el-button @click="onSave()" type="primary">保存并发布</el-button>
                </el-space>
            </div>
        </div>
        <PcToolBar v-model:modules="modules"></PcToolBar>
        <perfect-scrollbar class="decorate-page-wrap">
            <div class="decorate-page-window" :style="'background-position: top center;' + format.background_color + format.background_image + format.background_repeat + format.background_size">
                <div class="theme-modules-warp">
                    <div @click="onEditPage" :class="'list-item modules-item modules-item-topbar' + (modules.pageModule.active ? ' module-item-active' : '')" draggable="false">
                        <PcPageHeader v-model:module="modules.pageModule"></PcPageHeader>
                    </div>
                    <draggable
                        class="gallery-list-ul"
                        item-key="module_index"
                        :list="modules.moduleList"
                        ghost-class="sortable-ghost"
                        chosen-class="chosenClass"
                        animation="300"
                        @start=""
                        @end="onEnd"
                        :group="{ name: 'advanced', pull: false, put: true }"
                        style="min-height: 700px"
                    >
                        <template #item="{ element, index }">
                            <div
                                :class="
                                    'list-item modules-item ' +
                                    (element.draggable ? 'modules-drag-item ' : '') +
                                    (!element.is_show ? 'modules-item-hide ' : '') +
                                    ' modules-item-' +
                                    element.type +
                                    (element.active ? ' module-item-active' : '')
                                "
                                draggable="false"
                                @click="onEditComponent(index)"
                            >
                                <Modules v-if="element.type" v-model:module="element.module" :moduleType="element.type"></Modules>
                                <div class="module-label">
                                    <div class="label-name">{{ element.label }}</div>
                                </div>
                                <div class="module-operate" v-if="element.active == true && editVisiable == 'list'">
                                    <div class="module-operate-item" @click.stop="onModuleUp(index)">
                                        <i class="ico-decorate icon-dec-shangyi"></i>
                                        <div class="opt-tip">上移</div>
                                    </div>
                                    <div class="module-operate-item" @click.stop="onModuleDown(index)">
                                        <i class="ico-decorate icon-dec-xiayi"></i>
                                        <div class="opt-tip">下移</div>
                                    </div>
                                    <div class="module-operate-item" @click.stop="onModuleShow(index)">
                                        <i :class="'ico-decorate ' + (element.is_show ? 'icon-dec-mimaxianshi' : 'icon-dec-mimayincang')"></i>
                                        <div class="opt-tip">显示</div>
                                    </div>
                                    <div class="module-operate-item" @click.stop="onModuleCopy(index)">
                                        <i class="ico-decorate icon-dec-fuzhi1"></i>
                                        <div class="opt-tip">复制</div>
                                    </div>
                                    <div class="module-operate-item" @click.stop="onModuleDel(index)">
                                        <i class="ico-decorate icon-dec-shanchu"></i>
                                        <div class="opt-tip">删除</div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </draggable>
                </div>
            </div>
            <div class="decorate-page-config-warp">
                <div class="decorate-page-config-con">
                    <div class="page-config-item" @click="onEditPage"><i class="ico-decorate icon-dec-yemianshezhi"></i><span>页面设置</span></div>
                </div>
            </div>
        </perfect-scrollbar>
        <div class="decorate-edit-wrap">
            <editComponent v-if="editVisiable == 'list' && modules.moduleList[editModuleIndex]" v-model:module="modules.moduleList[editModuleIndex].module"></editComponent>
            <PcPageHeaderEdit v-if="editVisiable == 'page'" v-model:module="modules.pageModule"></PcPageHeaderEdit>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, defineAsyncComponent, onMounted, shallowRef, computed } from "vue";
import { useRouter } from "vue-router";
import request from "@/utils/request";
import PcToolBar from "./src/PcToolBar.vue";
import Modules from "./src/Modules.vue";
import PcPageHeader from "./src/modules/PcPageHeader.vue";
import PcPageHeaderEdit from "./src/modulesEdit/PcPageHeaderEdit.vue";
import draggable from "vuedraggable";
import { message } from "ant-design-vue";
import { cloneDeep } from "lodash";
import { toPascalCase } from "@/utils/util";
import { ModulesType, EditResult } from "@/types/decorate/decorate.d";
import "./src/css/decorate.less";
import "./src/css/module.less";
const query = useRouter().currentRoute.value.query;
const id = ref<number>(Number(query.id));
const modules = ref<ModulesType>({
    // 页面模块
    pageModule: {
        type: "page",
        module: {},
        background_repeat: "",
        background_size: "",
        style: 0
    },
    // 模块列
    moduleList: []
});
// 编辑状态 list|page
const editVisiable = ref<string>("");
// 动态编辑组件
const editComponent = shallowRef();
// 当前编辑的组件index
const editModuleIndex = ref<number>(0);
onMounted(() => {
    // 获取详情数据
    request<EditResult>({
        url: "decorate/edit/",
        method: "get",
        params: {
            id: id.value
        }
    }).then((result) => {
        modules.value.moduleList = result.item.data.moduleList || [];
        Object.assign(modules.value.pageModule, result.item.data.pageModule || {});
    });
});
// 组件编辑
const _import = (path: string) => defineAsyncComponent(() => import(`./src/modulesEdit/${path}.vue`));
const onEditComponent = (index: number) => {
    editModuleIndex.value = index;
    modules.value.moduleList = modules.value.moduleList.map((item) => ({ ...item, active: false }));
    modules.value.moduleList[index].active = true;
    editComponent.value = _import(toPascalCase(modules.value.moduleList[index].type) + "Edit");
    editVisiable.value = "list";
    modules.value.pageModule.active = false;
};
// 页面编辑
const onEditPage = () => {
    editVisiable.value = "page";
    modules.value.moduleList = modules.value.moduleList.map((item) => ({ ...item, active: false }));
    modules.value.pageModule.active = true;
};
// 上移
const onModuleUp = (index: number) => {
    if (index == 0) return;
    modules.value.moduleList.splice(index - 1, 0, modules.value.moduleList.splice(index, 1)[0]);
};
// 下移
const onModuleDown = (index: number) => {
    if (index + 1 == modules.value.moduleList.length) return;
    modules.value.moduleList.splice(index + 1, 0, modules.value.moduleList.splice(index, 1)[0]);
};
// 显示/隐藏
const onModuleShow = (index: number) => {
    modules.value.moduleList[index].is_show = modules.value.moduleList[index].is_show == true ? false : true;
};
// 复制
const onModuleCopy = (index: number) => {
    const copiedItem = cloneDeep({ ...modules.value.moduleList[index] });
    copiedItem.module_index = Date.now();
    // 在目标元素后面插入复制的元素
    modules.value.moduleList.splice(index + 1, 0, copiedItem);
};
// 删除
const onModuleDel = (index: number) => {
    modules.value.moduleList.splice(index, 1);
};

const onEnd = () => {
    console.log(modules.value);
};
const onSave = () => {
    console.log(modules.value);
    // return;
    request({
        url: "decorate/save/",
        method: "post",
        data: {
            id: id.value,
            data: modules.value
        }
    })
        .then((result) => {
            message.success(result.message);
        })
        .catch((error) => {
            message.error(error.message);
        });
};
const format = computed(() => {
    const backgroundRepeat: any = {
        1: "no-repeat",
        2: "repeat",
        3: "repeat-y",
        4: "repeat-x",
        5: "no-repeat"
    };
    const backgroundSize: any = {
        1: "100% auto",
        2: "auto 100%",
        3: "100% 100%",
        4: "100% auto"
    };
    return {
        background_color: modules.value.pageModule.background_color ? "background-color:" + modules.value.pageModule.background_color + ";" : "",
        background_image: modules.value.pageModule.background_image ? "background-image: url(" + modules.value.pageModule.background_image + ");" : "",
        background_repeat: "background-repeat:" + backgroundRepeat[modules.value.pageModule.background_repeat] + ";",
        background_size: "background-size:" + backgroundSize[modules.value.pageModule.background_size] + ";"
    };
});
</script>
<style lang="less" scoped>
.modules-item-pc_cat_product_normal {
    width: 50%;
}
</style>
