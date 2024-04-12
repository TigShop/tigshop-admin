<template>
    <div style="width:100%">
        <div class="gallery-list-warp">
            <div class="dec-pic-group">
                <div class="dec-pic-group-list">
                    <draggable class="gallery-list-ul" item-key="" :list="<any>photos" ghost-class="ghost"
                        chosen-class="chosenClass" animation="300" @start="" @end="">
                        <template #item="{ element, index }">
                            <div class="dec-pic-group-item">
                                <div class="dec-pic-group-item-con">
                                    <div class="item-image">
                                        <div class="item-image-con">
                                            <img class="item-image-src" v-if="element.pic_thumb" :src="imageFormat(element.pic_thumb)">
                                            <DialogForm type="gallery" class="" @okCallback="onEdit"
                                                :params="{ isMultiple: false }" :data="{ index: index }">
                                                <span class="change-image">更换图片</span>
                                            </DialogForm>
                                        </div>
                                    </div>
                                    <div class="item-info">
                                        <div class="item-info-item item-info-title">
                                            <span class="lable">标题</span>
                                            <el-input placeholder="建议10个字以内，可不填" v-model="element.pic_title"></el-input>
                                        </div>
                                        <div class="item-info-item item-info-title" v-if="showDesc">
                                            <span class="lable">描述</span>
                                            <el-input placeholder="可不填" v-model="element.pic_desc"></el-input>
                                        </div>
                                        <div class="item-info-item item-info-link">
                                            <span class="lable">链接</span>
                                            <div class="lyecs-link-select">
                                                <SelectLink v-model="element.pic_link"></SelectLink>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="isMultiple == true" class="del-item" @click="removePic(index)"><i
                                            class="ico-decorate icon-dec-cha"></i></div>
                                </div>
                            </div>
                        </template>
                    </draggable>
                </div>
                <div class="dec-pic-group-list" v-if="isMultiple == false">
                    <div class="dec-pic-group-item">
                        <div class="dec-pic-group-item-con">
                            <div class="item-image">
                                <div class="item-image-con">
                                    <img class="item-image-src" v-if="photo.pic_thumb" :src="imageFormat(photo.pic_thumb)">
                                    <DialogForm type="gallery" class="" @okCallback="onEdit"
                                        :params="{ isMultiple: false }">
                                        <span class="change-image">{{ photo.pic_thumb ? '更换图片' : '添加图片' }}</span>
                                    </DialogForm>
                                </div>
                            </div>
                            <div class="item-info">
                                <div class="item-info-item item-info-title">
                                    <span class="lable">标题</span>
                                    <el-input placeholder="建议10个字以内，可不填" v-model="photo.pic_title"></el-input>
                                </div>
                                <div class="item-info-item item-info-title" v-if="showDesc">
                                    <span class="lable">描述</span>
                                    <el-input placeholder="可不填" v-model="photo.pic_desc"></el-input>
                                </div>
                                <div class="item-info-item item-info-link">
                                    <span class="lable">链接</span>
                                    <div class="lyecs-link-select">
                                        <SelectLink v-model="photo.pic_link"></SelectLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dec-pic-add-con" v-if="isMultiple == true">
                    <DialogForm type="gallery" class="" @okCallback="onAdd" :params="{ isMultiple: isMultiple }"
                        style="width: 100%;">
                        <a class="dec-pic-add-btn"><i class="ico-decorate icon-dec-jia"></i>添加图片</a>
                    </DialogForm>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref, toRefs } from "vue"
import type { Ref } from "vue"
import { DialogForm } from '@/components/dialog'
import draggable from "vuedraggable";
import { SelectLink } from '@/components/select';
import { imageFormat } from "@/utils/format";
const dom: Ref<HTMLDivElement> = ref(null) as any

const props = defineProps({
    isMultiple: {
        type: Boolean,
        default: false
    },
    showDesc: {
        type: Boolean,
        default: false
    }
})
// 动态解析props
const photos = defineModel<any>("photos", { type: Array, default: [] });
const photo = defineModel<any>("photo", { type: Object, default: {} });
// const emit = defineEmits(['update:photo'])
const { isMultiple } = toRefs(props)

const onEdit = (result: any, data: any) => {
    if (isMultiple.value) {
        Object.assign(photos.value[data.index], result[0])
    } else {
        photo.value = result[0]
    }
}
const onAdd = (result: any) => {
    photos.value.push(...result)
}
const removePic = (index: number) => {
    photos.value.splice(<any>index, 1)
}
</script>

<style lang="less" scoped></style>
