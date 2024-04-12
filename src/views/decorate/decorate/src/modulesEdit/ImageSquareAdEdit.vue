<template>
    <perfect-scrollbar class="decorate-edit-con">
        <div class="dec-edit-title">
            <h3>模块图片广告</h3>
        </div>
        <div class="dec-edit-group dec-edit-group-block">
            <div class="dec-edit-group-title">
                <div class="label">选择模板</div>
                <div class="value">{{ selectLabel.pic_type[module.pic_type] }}</div>
            </div>
            <div class="dec-edit-group-con">
                <el-radio-group class="dec-radio-group" v-model="module.pic_type" @change="onPicTypeChange">
                    <el-tooltip effect="light" placement="bottom" content="一行两个" :show-after="100">
                        <el-radio-button :value="1"><i class="ico-decorate icon-dec-cuberow"></i></el-radio-button>
                    </el-tooltip>
                    <el-tooltip effect="light" placement="bottom" content="一行三个" :show-after="100">
                        <el-radio-button :value="2"><i class="ico-decorate icon-dec-cuberow2"></i></el-radio-button>
                    </el-tooltip>
                    <el-tooltip effect="light" placement="bottom" content="一行四个" :show-after="100">
                        <el-radio-button :value="3"><i class="ico-decorate icon-dec-cuberow1"></i></el-radio-button>
                    </el-tooltip>
                    <el-tooltip effect="light" placement="bottom" content="左二右二" :show-after="100">
                        <el-radio-button :value="4"><i class="ico-decorate icon-dec-cube"></i></el-radio-button>
                    </el-tooltip>
                    <el-tooltip effect="light" placement="bottom" content="左一右二" :show-after="100">
                        <el-radio-button :value="5"><i class="ico-decorate icon-dec-cubeto"></i></el-radio-button>
                    </el-tooltip>
                    <el-tooltip effect="light" placement="bottom" content="左一右三" :show-after="100">
                        <el-radio-button :value="6"><i class="ico-decorate icon-dec-cubeto1"></i></el-radio-button>
                    </el-tooltip>
                    <el-tooltip effect="light" placement="bottom" content="上一下二" :show-after="100">
                        <el-radio-button :value="7"><i class="ico-decorate icon-dec-cube-upto"></i></el-radio-button>
                    </el-tooltip>
                </el-radio-group>
            </div>
        </div>
        <div class="dec-divider-line"></div>
        <div class="dec-edit-group dec-edit-group-block">
            <div class="dec-edit-group-title">
                <div class="title">选择布局</div>
            </div>
            <div class="dec-edit-group-con">
                <div class="dec-square-group">
                    <div class="dec-square-item dec-square-item-empty" v-if="module.pic_type == 1 || module.pic_type == 2 || module.pic_type == 3">
                        <div class="square-item-row">
                            <div 
                                class="square-item-box" 
                                v-for="(item,index) in module.pic_list" 
                                :class="{'selected': pic_index == index}" 
                                @click="onPicChange(item,index)"
                            ><img v-if="item.pic_thumb" :src="imageFormat(item.pic_thumb || '')"></div>
                        </div>
                    </div>
                    <div class="dec-square-item dec-square-item-4 dec-square-item-empty" v-if="module.pic_type == 4 && module.pic_list.length == 4">
                        <div class="square-item-row">
                            <div class="square-item-col">
                                <div class="square-item-box" :class="{'selected': pic_index == 0}" @click="onPicChange(module.pic_list[0].pic_thumb,0)"><img v-if="module.pic_list[0].pic_thumb" :src="imageFormat(module.pic_list[0].pic_thumb || '')"></div>
                                <div class="square-item-box" :class="{'selected': pic_index == 1}" @click="onPicChange(module.pic_list[1].pic_thumb,1)"><img v-if="module.pic_list[1].pic_thumb" :src="imageFormat(module.pic_list[1].pic_thumb || '')"></div>
                            </div>
                            <div class="square-item-col">
                                <div class="square-item-box" :class="{'selected': pic_index == 2}" @click="onPicChange(module.pic_list[2].pic_thumb,2)"><img v-if="module.pic_list[2].pic_thumb" :src="imageFormat(module.pic_list[2].pic_thumb || '')"></div>
                                <div class="square-item-box" :class="{'selected': pic_index == 3}" @click="onPicChange(module.pic_list[3].pic_thumb,3)"><img v-if="module.pic_list[3].pic_thumb" :src="imageFormat(module.pic_list[3].pic_thumb || '')"></div>
                            </div>
                        </div>
                    </div>
                    <div class="dec-square-item dec-square-item-5 dec-square-item-empty" v-if="module.pic_type == 5 && module.pic_list.length == 3">
                        <div class="square-item-row">
                            <div class="square-item-col">
                                <div class="square-item-box square-item-box-col" :class="{'selected': pic_index == 0}" @click="onPicChange(module.pic_list[0].pic_thumb,0)"><img v-if="module.pic_list[0].pic_thumb" :src="imageFormat(module.pic_list[0].pic_thumb || '')"></div>
                            </div>
                            <div class="square-item-col">
                                <div class="square-item-box" :class="{'selected': pic_index == 1}" @click="onPicChange(module.pic_list[1].pic_thumb,1)"><img v-if="module.pic_list[1].pic_thumb" :src="imageFormat(module.pic_list[1].pic_thumb || '')"></div>
                                <div class="square-item-box" :class="{'selected': pic_index == 2}" @click="onPicChange(module.pic_list[2].pic_thumb,2)"><img v-if="module.pic_list[2].pic_thumb" :src="imageFormat(module.pic_list[2].pic_thumb || '')"></div>
                            </div>
                        </div>
                    </div>
                    <div class="dec-square-item dec-square-item-empty" v-if="module.pic_type == 7 && module.pic_list.length == 3">
                        <div class="square-item-col">
                            <div class="square-item-row">
                                <div class="square-item-box" :class="{'selected': pic_index == 0}" @click="onPicChange(module.pic_list[0].pic_thumb,0)"><img v-if="module.pic_list[0].pic_thumb" :src="imageFormat(module.pic_list[0].pic_thumb || '')"></div>
                            </div>
                            <div class="square-item-row">
                                <div class="square-item-box" :class="{'selected': pic_index == 1}" @click="onPicChange(module.pic_list[1].pic_thumb,1)"><img v-if="module.pic_list[1].pic_thumb" :src="imageFormat(module.pic_list[1].pic_thumb || '')"></div>
                                <div class="square-item-box" :class="{'selected': pic_index == 2}" @click="onPicChange(module.pic_list[2].pic_thumb,2)"><img v-if="module.pic_list[2].pic_thumb" :src="imageFormat(module.pic_list[2].pic_thumb || '')"></div>
                            </div>
                        </div>
                    </div>
                    <div class="dec-square-item dec-square-item-7 dec-square-item-empty" v-if="module.pic_type == 6 && module.pic_list.length == 4">
                        <div class="square-item-row">
                            <div class="square-item-col">
                                <div class="square-item-box square-item-box-col" :class="{'selected': pic_index == 0}" @click="onPicChange(module.pic_list[0].pic_thumb,0)"><img v-if="module.pic_list[0].pic_thumb" :src="imageFormat(module.pic_list[0].pic_thumb || '')"></div>
                            </div>
                            <div class="square-item-col">
                                <div class="square-item-col">
                                    <div class="square-item-row">
                                        <div class="square-item-box" :class="{'selected': pic_index == 1}" @click="onPicChange(module.pic_list[1].pic_thumb,1)"><img v-if="module.pic_list[1].pic_thumb" :src="imageFormat(module.pic_list[1].pic_thumb || '')"></div>
                                    </div>
                                    <div class="square-item-row">
                                        <div class="square-item-box" :class="{'selected': pic_index == 2}" @click="onPicChange(module.pic_list[2].pic_thumb,2)"><img v-if="module.pic_list[2].pic_thumb" :src="imageFormat(module.pic_list[2].pic_thumb || '')"></div>
                                        <div class="square-item-box" :class="{'selected': pic_index == 3}" @click="onPicChange(module.pic_list[3].pic_thumb,3)"><img v-if="module.pic_list[3].pic_thumb" :src="imageFormat(module.pic_list[3].pic_thumb || '')"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="dec-divider-line"></div>
        <div class="dec-edit-group dec-edit-group-block">
            <div class="dec-edit-group-title">
                <div class="title">添加图片</div>
            </div>
            <div class="dec-edit-group-con" v-if="module.pic_list?.length > 1">
                <PicList :isMultiple="false" v-model:photo="module.pic_list[pic_index]"></PicList>
            </div>
        </div>
        <div class="dec-divider-line"></div>
        <div class="dec-edit-group">
            <div class="dec-edit-group-title">
                <div class="label">图片边距</div>
            </div>
            <div class="dec-edit-group-con">
                <div class="dec-range-group">
                    <el-slider v-model="module.img_padding" show-input :show-input-controls="false" size="small" input-size="default" :max="30" />
                </div>
            </div>
        </div>
        <CommonFrameEdit v-model="module.frame"></CommonFrameEdit>
        <CommonTitleEdit v-model="module.title"></CommonTitleEdit>
    </perfect-scrollbar>
</template>
<script lang="ts" setup>
import { SelectColor } from "@/components/select";
import { imageFormat } from "@/utils/format";
import { PicList, PicSelect } from "@/components/decorate";
import { ref, defineModel, reactive, onMounted, watch } from "vue";
import CommonTitleEdit from "./src/CommonTitleEdit.vue";
import CommonFrameEdit from "./src/CommonFrameEdit.vue";
import { ModuleType, ModuleImageType, ModulePicListType } from "@/types/decorate/decorate.d";
const selectLabel = ref<any>({
    pic_type: {
        1: "一行两个",
        2: "一行三个",
        3: "一行四个",
        4: "左二右二",
        5: "左一右二",
        6: "左一右三",
        7: "上一下二",
    },
    pic_page_type: {
        1: "样式一",
        2: "样式二",
        3: "样式三 "
    }
});
const module = defineModel<ModuleType & ModuleImageType>("module", { default: () => ({}) });
console.log(module.value);
const pic_index =  ref<number>(0);
onMounted(() => {
    if(module.value.pic_list?.length < 1){
        onPicTypeChange(1)
    }
})
const onPicTypeChange = (e:any) => {
    pic_index.value = 0;
    let obj = {
        pic_id: 0,
        pic_thumb: "",
        pic_url: "",
        pic_name: ""
    };
    const lengthMap:any = {  
        1: 2,  
        2: 3, 5: 3, 7: 3,  
        3: 4, 4: 4, 6: 4  
    };
    let length:number = lengthMap[e] || 2;
    let now:number = module.value.pic_list.length;
    if(length >= now){
        module.value.pic_list.push(...Array.from({length: length - now}, () => obj))
    }else{
        console.log(now-1, (now - length))
        module.value.pic_list.splice(-(now - length))
    }
}
const onPicChange = (item:any, index:number) => {
    pic_index.value = index;
}
</script>
