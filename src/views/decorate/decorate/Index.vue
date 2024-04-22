<template>
    <div class="decorate-page" :class="{ 'decorate-page-pc': props.decorateType === 2 }">
        <div class="decorate-topbar-warp">
            <div class="decorate-topbar-con">
                <div class="topbar-left">
                    <div class="topbar-logo"></div>
                    <div class="topbar-now-txt cursor-pointer" @click="onLogout()">
                        <i class="iconfont-admin icon-tuichu" style="margin-right: 8px"></i>退出编辑
                    </div>
                    <div class="topbar-now-txt"><span class="tit">正在装修：</span>{{ decorateTitle }}</div>
                </div>
                <el-space class="topbar-right">
                    <el-button class="btn" text @click="onPreview()">预览</el-button>
                    <el-button class="btn" text @click="onSavetoDraft()">存至草稿</el-button>
                    <el-button class="ml10" @click="onPublish()" type="primary">保存并发布</el-button>
                </el-space>
            </div>
        </div>

        <ToolBar v-model:modules="modules" v-if="props.decorateType === 1"></ToolBar>
        <PcToolBar v-model:modules="modules" v-if="props.decorateType === 2"></PcToolBar>
        <perfect-scrollbar class="decorate-page-wrap">
            <Alert v-if="hasDraftData" class="decorate-page-alert" message="该页面有一条草稿记录，您可以还原草稿继续编辑。" type="warning" show-icon closable>
                <template #action>
                    <el-button @click="continueEditDraft">继续编辑</el-button>
                </template>
            </Alert>
            <div
                class="decorate-page-window"
                :style="
                    'background-position: top center;' + format.background_color + format.background_image + format.background_repeat + format.background_size
                ">
                <div class="theme-modules-warp">
                    <div
                        @click="onEditPage"
                        :class="'list-item modules-item modules-item-topbar' + (editVisiable === 'page' ? ' module-item-active' : '')"
                        draggable="false">
                        <Page v-model:module="modules.pageModule"></Page>
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
                        @add="onAdd"
                        :group="{ name: 'advanced', pull: false, put: true }"
                        style="min-height: 700px">
                        <template #item="{ element, index }">
                            <div
                                :class="
                                    'list-item modules-item ' +
                                    (element.draggable ? 'modules-drag-item ' : '') +
                                    (!element.is_show ? 'modules-item-hide ' : '') +
                                    ' modules-item-' +
                                    element.type +
                                    (index === editModuleIndex && editVisiable === 'list' ? ' module-item-active' : '')
                                "
                                draggable="false"
                                @click="onEditComponent(index)">
                                <Modules
                                    v-if="element.type"
                                    v-model:module="element.module"
                                    v-model:moduleType="element.type"
                                    :moduleIndex="element.module_index"
                                    :decorateId="id"></Modules>
                                <div class="module-label">
                                    <div class="label-name">{{ element.label }}</div>
                                </div>
                                <div class="module-operate" v-if="index === editModuleIndex && editVisiable == 'list'">
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
            <editComponent
                v-if="editModuleIndex !== null && editVisiable == 'list' && modules.moduleList[editModuleIndex]"
                v-model:module="modules.moduleList[editModuleIndex].module"></editComponent>
            <PageEdit v-if="editVisiable === 'page'" v-model:module="modules.pageModule"></PageEdit>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, defineAsyncComponent, onMounted, shallowRef, computed } from "vue";
import { useRouter } from "vue-router";
import request from "@/utils/request";
import { loadDraftData, saveDraft } from "@/api/decorate/decorate";
import ToolBar from "./src/ToolBar.vue";
import PcToolBar from "./src/PcToolBar.vue";
import Modules from "./src/Modules.vue";
import Page from "./src/modules/Page.vue";
import PageEdit from "./src/modulesEdit/PageEdit.vue";
import draggable from "vuedraggable";
import { message, Alert } from "ant-design-vue";
import { cloneDeep } from "lodash";
import { toPascalCase } from "@/utils/util";
import { urlWapFormat, urlFormat } from "@/utils/format";
import { ModulesType, EditResult } from "@/types/decorate/decorate.d";
import "./src/css/decorate.less";
import "./src/css/module.less";
const props = defineProps({
    decorateType: {
        type: Number,
        default: 1,
    },
});
const query = useRouter().currentRoute.value.query;
const id = ref<number>(Number(query.id));
const decorateTitle = ref<string>("");
const hasDraftData = ref(false);
const modules = ref<ModulesType>({
    // 页面模块
    pageModule: {
        type: "page",
        module: {},
        background_repeat: "",
        background_size: "",
        style: 0,
    },
    // 模块列
    moduleList: [],
});
// 编辑状态 list|page
const editVisiable = ref<string>("");
// 动态编辑组件
const editComponent = shallowRef();
// 当前编辑的组件index
const editModuleIndex = ref<number | null>(null);
onMounted(() => {
    // 获取详情数据
    request<EditResult>({
        url: "decorate/edit/",
        method: "get",
        params: {
            id: id.value,
            decorate_type: props.decorateType,
        },
    }).then((result) => {
        modules.value.moduleList = result.item.data.moduleList ?? [];
        decorateTitle.value = result.item.decorate_title ?? "";
        Object.assign(modules.value.pageModule, result.item.data.pageModule || {});
        hasDraftData.value = result.has_draft_data;
    });
});
// 组件编辑
const _import = (path: string) => defineAsyncComponent(() => import(`./src/modulesEdit/${path}.vue`));
const onEditComponent = (index: number) => {
    editModuleIndex.value = index;
    modules.value.moduleList = modules.value.moduleList.map((item) => ({ ...item }));
    editComponent.value = _import(toPascalCase(modules.value.moduleList[index].type) + "Edit");
    editVisiable.value = "list";
};
// 页面编辑
const onEditPage = () => {
    editVisiable.value = "page";
    modules.value.moduleList = modules.value.moduleList.map((item) => ({ ...item }));
};
// 上移
const onModuleUp = (index: number) => {
    if (index == 0) return;
    modules.value.moduleList.splice(index - 1, 0, modules.value.moduleList.splice(index, 1)[0]);
    editModuleIndex.value = index - 1;
};
// 下移
const onModuleDown = (index: number) => {
    if (index + 1 == modules.value.moduleList.length) return;
    modules.value.moduleList.splice(index + 1, 0, modules.value.moduleList.splice(index, 1)[0]);
    editModuleIndex.value = index + 1;
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
    editModuleIndex.value = index + 1;
};
// 删除
const onModuleDel = (index: number) => {
    modules.value.moduleList.splice(index, 1);
};

const onEnd = (e) => {
    console.log(e);
    editModuleIndex.value = e.newIndex;
};
const onAdd = (e: any) => {
    onEditComponent(e.newIndex);
};
const onSavetoDraft = async () => {
    try {
        const result = await saveDraft({
            id: id.value,
            data: modules.value,
        });
        message.success(result.message);
        hasDraftData.value = false;
    } catch (error: any) {
        message.error(error.message);
    } finally {
    }
};
const onPublish = async () => {
    request({
        url: "decorate/publish/",
        method: "post",
        data: {
            id: id.value,
            data: modules.value,
        },
    })
        .then((result) => {
            message.success(result.message);
            hasDraftData.value = false;
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
        5: "no-repeat",
    };
    const backgroundSize: any = {
        1: "100% auto",
        2: "auto 100%",
        3: "100% 100%",
        4: "100% auto",
    };
    return {
        background_color: modules.value.pageModule.background_color ? "background-color:" + modules.value.pageModule.background_color + ";" : "",
        background_image: modules.value.pageModule.background_image ? "background-image: url(" + modules.value.pageModule.background_image + ");" : "",
        background_repeat: "background-repeat:" + backgroundRepeat[modules.value.pageModule.background_repeat] + ";",
        background_size: "background-size:" + backgroundSize[modules.value.pageModule.background_size] + ";",
    };
});
const continueEditDraft = async () => {
    try {
        const result = await loadDraftData(id.value);
        modules.value.moduleList.length = 0;
        modules.value.moduleList = result.data.moduleList ?? [];
        modules.value.pageModule = result.data.pageModule ?? [];
        hasDraftData.value = false;
        editVisiable.value = "";
        editModuleIndex.value = null;
    } catch (error: any) {
        message.error(error.message);
    } finally {
    }
};
const onPreview = async () => {
    try {
        // 先发布
        const result = await saveDraft({
            id: id.value,
            data: modules.value,
        });

        message.success(result.message);
        hasDraftData.value = false;
        // 1秒后执行
        setTimeout(() => {
            if (props.decorateType == 1) {
                window.open(urlWapFormat("/?preview_id=" + id.value));
            } else if (props.decorateType == 2) {
                window.open(urlFormat("/?preview_id=" + id.value));
            }
        }, 800);
    } catch (error: any) {
        message.error(error.message);
    } finally {
    }
};
const onLogout = () => {
    if (props.decorateType == 1) {
        window.location.href = "/decorate/mobile_decorate/list/";
    } else {
        window.location.href = "/decorate/pc_decorate/list/";
    }
};
</script>
<style lang="less" scoped>
.decorate-page-alert {
    margin: 30px auto;
    max-width: 500px;
    font-size: 14px;
}
</style>
