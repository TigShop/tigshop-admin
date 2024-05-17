<template>
    <div style="width: 100%">
        <div class="gallery-list-warp">
            <div class="dec-pic-group">
                <div class="dec-pic-group-list">
                    <draggable
                        class="gallery-list-ul"
                        item-key=""
                        :list="<any>photos"
                        ghost-class="ghost"
                        chosen-class="chosenClass"
                        animation="300"
                        @start=""
                        @end="">
                        <template #item="{ element, index }">
                            <div class="dec-pic-group-item">
                                <div class="dec-pic-group-item-con">
                                    <div class="item-image">
                                        <div class="item-image-con">
                                            <img class="item-image-src" v-if="element.pic_active_thumb" :src="imageFormat(element.pic_active_thumb)" />
                                            <DialogForm
                                                type="gallery"
                                                class=""
                                                @okCallback="onEditActive"
                                                :params="{ isMultiple: false }"
                                                :data="{ index: index }">
                                                <span class="change-image">更换图片</span>
                                            </DialogForm>
                                            <div class="item-text">选中</div>
                                        </div>
                                        <div class="item-image-con">
                                            <img class="item-image-src" v-if="element.pic_thumb" :src="imageFormat(element.pic_thumb)" />
                                            <DialogForm type="gallery" class="" @okCallback="onEdit" :params="{ isMultiple: false }" :data="{ index: index }">
                                                <span class="change-image">更换图片</span>
                                            </DialogForm>
                                            <div class="item-text">未选中</div>
                                        </div>
                                    </div>
                                    <div class="item-info">
                                        <div class="item-info-item item-info-title">
                                            <span class="lable">标题</span>
                                            <el-input placeholder="建议10个字以内，可不填" v-model="element.pic_title"></el-input>
                                        </div>
                                        <div class="item-info-item item-info-link">
                                            <span class="lable">链接</span>
                                            <div class="lyecs-link-select">
                                                <SelectLink v-model="element.pic_link"></SelectLink>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="isMultiple == true" class="del-item" @click="removePic(index)"><i class="ico-decorate icon-dec-cha"></i></div>
                                </div>
                            </div>
                        </template>
                    </draggable>
                </div>
                <div class="dec-pic-add-con" v-if="photos.length < 6">
                    <a class="dec-pic-add-btn" @click="onAdd"><i class="ico-decorate icon-dec-jia"></i>添加导航 {{ photos.length }}/6</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref, toRefs } from "vue";
import type { Ref } from "vue";
import { DialogForm } from "@/components/dialog";
import draggable from "vuedraggable";
import { SelectLink } from "@/components/select";
import { imageFormat } from "@/utils/format";
const dom: Ref<HTMLDivElement> = ref(null) as any;

const props = defineProps({
    isMultiple: {
        type: Boolean,
        default: false,
    },
    showDesc: {
        type: Boolean,
        default: false,
    },
});
// 动态解析props
const photos = defineModel<any>("photos", { type: Array, default: [] });
// const emit = defineEmits(['update:photo'])
const { isMultiple } = toRefs(props);

const onEdit = (result: any, data: any) => {
    Object.assign(photos.value[data.index], result[0]);
};
const onEditActive = (result: any, data: any) => {
    photos.value[data.index].pic_active_thumb = result[0].pic_thumb;
    photos.value[data.index].pic_active_url = result[0].pic_url;
};
const onAdd = () => {
    photos.value.push({
        pic_title: "",
        pic_thumb: "",
        pic_url: "",
        pic_active_thumb: "",
        pic_active_url: "",
        pic_link: "",
    });
};
const removePic = (index: number) => {
    photos.value.splice(<any>index, 1);
};
</script>

<style lang="less" scoped>
.dec-pic-group .dec-pic-group-item .dec-pic-group-item-con .item-image {
    width: 130px;
    display: flex;
    justify-content: space-between;
}
.item-text {
    position: absolute;
    bottom: -18px;
    width: 100%;
    color: #999;
}
</style>
