<template>
    <div style="width:100%" class="gallery-pic">
        <div :class="'gallery-pic-select ' + (photo ? 'have_image' : '')" v-if="!isMultiple">
            <div class="item-img add-photo-btn">
                <Image v-if="photo" class="gallery-img" :src="imageFormat(photo)" />
                <DialogForm type="gallery" class="item-bg" @okCallback="onEdit"
                    :params="{ isMultiple: props.isMultiple }" v-if="!photo">
                    <div class="flex" style="flex-direction: column;line-height: 25px;"><i
                            class="iconfont icon-tianjiatupian"></i><span>添加图片</span></div>
                </DialogForm>
            </div>
            <div class="item-action" v-if="photo">
                <DialogForm type="gallery" class="item item-edit" @okCallback="onEdit"
                    :params="{ isMultiple: props.isMultiple }"><span class=" iconfont icon-bianji1"></span>
                </DialogForm>
                <span @click="removeGallery" class="item item-remove iconfont icon-shanchu"></span>
            </div>
        </div>
        <div class="gallery-list-warp" v-if="isMultiple">
            <div>
                <draggable class="gallery-list-ul" item-key="pic_id" :list="<any>photos" ghost-class="ghost"
                    chosen-class="chosenClass" animation="300" @start="" @end="">
                    <template #item="{ element, index }">
                        <div class="item" data-id="img.img_id">
                            <div class="img">
                                <a class="lyecs-dialogImage">
                                    <Image class="gallery-img" :big="element.pic_url"
                                        :src="imageFormat(element.pic_thumb)" />
                                </a>
                                <i @click="removePic(index)" class="btn-del iconfont icon-cha"></i>
                            </div>
                        </div>
                    </template>

                    <template #footer>
                        <DialogForm type="gallery" class="" @okCallback="onEdit"
                            :params="{ isMultiple: props.isMultiple }">
                            <div class="item gallery-add-item add-gallery-photo-btn" draggable="false">
                                <i class="iconfont icon-tianjiatupian"></i>
                            </div>
                        </DialogForm>
                    </template>
                </draggable>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs } from "vue"
import type { Ref } from "vue"
import { DialogForm } from '@/components/dialog'
import draggable from "vuedraggable";
import { Image } from '@/components/image';
import { imageFormat } from '@/utils/format';
const dom: Ref<HTMLDivElement> = ref(null) as any

const props = defineProps({
    photo: {
        type: String,
        default: ''
    },
    photos: {
        type: Array,
        default: []  // {pic_id,pic_thumb,pic_url,pic_name}
    },
    isMultiple: {
        type: Boolean,
        default: false
    }
})
// 动态解析props
const { photo, photos, isMultiple } = toRefs(props)

const emit = defineEmits(['update:photo', 'update:photos'])
const onEdit = (result: any) => {
    if (isMultiple.value == true) {
        let _photos = photos.value || [];
        emit('update:photos', _photos.concat(result))
    } else {
        emit('update:photo', result[0].pic_url)
    }
}

const removePic = (index: number) => {
    let _photos = photos.value;
    _photos.splice(<any>index, 1)
    emit('update:photos', _photos)
}
const removeGallery = () => {
    emit('update:photo', '')
}
// 相册预览功能
const previewVisible = ref(false);
const previewImage = ref('');
const handleCancel = () => {
    previewImage.value = ''
}
const previewPhoto = (v: any) => {
    previewVisible.value = true;
    previewImage.value = v;
}

</script>

<style lang="less" scoped>
// 相册选择
.gallery-pic-select {
    margin-bottom: 10px;
    position: relative;
    width: 80px;
    height: 80px;
    border: 1px dashed #ddd;
    vertical-align: middle;
    transition: all .3s;
}

.gallery-pic-select.have_image {
    border-style: solid;
}

.gallery-pic-select:hover {
    border-style: dashed;
    border-color: #155bd4
}

.gallery-pic-select .ant-image-img {
    display: inline-block;
    vertical-align: middle;
    height: auto;
    width: auto;
    max-width: 80px;
    max-height: 80px;
    cursor: pointer;
}

.gallery-pic-select a {
    display: flex;
    vertical-align: middle;
    margin-right: 8px;
    align-items: center;
}

.gallery-pic-select a.add-photo-direct-btn {
    display: none;
}

.gallery-pic-select a.add-photo-btn {
    background: #fff;
    border-color: #ddd;
    color: #333;
    position: absolute;
    background: rgba(0, 0, 0, 0.2);
    height: 30px;
    display: none;
}

.gallery-pic-select .item-img {
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.gallery-img {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.gallery-pic {
    :deep(.el-image__inner) {
        max-width: 100% !important;
        max-height: 100% !important;
    }
}

.gallery-pic-select .item-action {
    position: absolute;
    right: 0;
    bottom: 0;
    height: 20px;
    line-height: 20px;
    color: #fff;
    align-content: flex-end;
    width: 100%;
    opacity: 0;
    transition: all .3s;
    visibility: hidden;
    display: flex;
    background: rgba(0, 0, 0, .6);
}
.gallery-pic-select .item-action :deep(.item) {
    display: inline-flex;
    width: 33%;
    align-content: center;
    justify-content: center;
    color: #fff;
    cursor: pointer;

    :first-child {
        margin-left: auto
    }

    :hover {
        color: #fff;
    }

    .item-edit {
        font-size: 17px;
    }

    .item-remove {
        font-size: 14px;
    }

}

.gallery-pic-select.have_image:hover :deep(.item-action) {
    display: flex;
    opacity: 1;
    visibility: visible;
}

.gallery-pic-select .item-bg span {
    display: block;
    font-size: 12px;
}

.gallery-pic-select .item-bg i {
    font-size: 20px;
    text-align: center;
}

.gallery-pic-select .remove-photo-btn {
    display: none;
}

.gallery-pic-select a.add-photo-btn:hover {
    background: #fff;
    border-color: #1890ff;
    color: #1890ff;
}

.gallery-pic-select a i {
    margin-right: 5px;
}


/*商品相册*/
.gallery-list-warp {
    padding: 0;
    display: flex;
    flex-wrap: nowrap;
}

.gallery-list-warp ul {
    display: flex;
    flex-wrap: wrap;
}

.gallery-list-warp .item {
    width: 90px;
    height: 90px;
    margin-right: 10px;
    margin-bottom: 10px;
    position: relative;
}

.gallery-list-warp .gallery-add-item {
    width: 90px;
    height: 90px;
    border: 1px dashed #ddd;
    margin-right: 10px;
    margin-bottom: 10px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    cursor: pointer;
}

.gallery-list-warp .gallery-add-item :deep(.dialog-link) {
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
}

.gallery-list-warp .gallery-add-item i {
    font-size: 22px;
    color: #bebebe;
}

.gallery-list-warp .gallery-add-item:hover {
    border-color: #155bd4;
    color: #155bd4;
}

.gallery-list-warp .gallery-list-ul {
    display: flex;
    flex-wrap: wrap;
}

.gallery-list-warp .item.add_photo a {
    background: url('../images/bg-addImage.png') no-repeat center center;
    width: 100%;
    height: 100%;
    display: block;
}

.gallery-list-warp .item.add_photo a:hover {
    background-color: #f2f2f2
}

.gallery-list-warp .item .img {
    border: 1px solid #eee;
}

.gallery-list-warp .item .img a {
    display: flex;
    width: 88px;
    height: 88px;
    align-items: center;
    justify-content: center;
}

.gallery-list-warp .item .img img {
    width: 100%;
    height: auto;
}

.gallery-list-warp .item .desc {
    line-height: 25px;
    text-align: center;
    height: 25px
}

.gallery-list-warp .item .desc input {
    width: 90px;
    padding: 0 6px;
    height: 20px;
    line-height: 20px;
    border-color: #eee;
}

.gallery-list-warp .item .btn-del {
    position: absolute;
    cursor: pointer;
    right: -10px;
    top: -10px;
    color: #fff;
    background: #dbdbdb;
    border-radius: 50%;
    z-index: 2;
    width: 18px;
    height: 18px;
    text-align: center;
    line-height: 18px;
    font-size: 12px;
    display: none;
}

.gallery-list-warp .item:hover .img {
    border: 1px dashed #155bd4;
}

.gallery-list-warp .item:hover .btn-del {
    display: block;
}

.gallery-list-warp .item .btn-del:hover {
    background: #333;
}
</style>
