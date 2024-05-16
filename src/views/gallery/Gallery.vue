<template>
    <div class="gallery_warp" id="gallery_warp">
        <div class="lyecs_gallery_box">
            <div class="gallery-folder-warp">
                <div class="gallery-folder-list">
                    <div :class="'gallery-folder-item ' + (topGalleryId == 0 ? 'current' : '')" v-if="gallery" @click="folderChange(0)">
                        <div class="folder-item-con">
                            <i class="item-ico"></i>
                            <div class="item-name">全部</div>
                        </div>
                    </div>
                    <div :class="'gallery-folder-item ' + (topGalleryId == item.gallery_id ? 'current' : '')" v-for="(item, key) in gallery">
                        <div :class="'folder-item-con'" @click="folderChange(item.gallery_id)">
                            <i class="item-ico"></i>
                            <div class="item-name">{{ item.gallery_name }}</div>
                        </div>
                        <div class="folder-item-edit">
                            <el-dropdown trigger="click">
                                <i title="编辑" class="ico-font">&#xe669;</i>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item>
                                            <DialogForm
                                                width="600px"
                                                @okCallback="editRecordCallback(item.gallery_id, true)"
                                                title="编辑相册"
                                                path="gallery/GalleryEdit"
                                                :params="{ act: 'detail', id: item.gallery_id }">
                                                <div>编辑相册</div>
                                            </DialogForm>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <div @click="delRootGallery(item.gallery_id)">删除</div>
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </div>
                    </div>
                </div>
                <div class="add-gallery-folder-con">
                    <DialogForm
                        width="600px"
                        @okCallback="addGalleryCallback(0)"
                        title="添加相册"
                        path="gallery/GalleryEdit"
                        :params="{ act: 'add', parentId: 0 }">
                        <el-button class="add-gallery-folder-btn"><em>+</em> 添加相册</el-button>
                    </DialogForm>
                </div>
            </div>
            <div class="gallery-pics-warp">
                <div class="gallery-main" id="gallery-main">
                    <div class="gallery-pic-action">
                        <div class="gallery-pic-action-l">
                            <el-space>
                                <Upload
                                    name="file"
                                    :action="requestUrl.prefix + '/setting/gallery_pic/upload_img?gallery_id=' + galleryId"
                                    :headers="requestUrl.headers"
                                    @change="handleChange"
                                    :showUploadList="false"
                                    :multiple="true">
                                    <el-button type="primary">上传图片</el-button>
                                </Upload>
                                <el-button
                                    v-if="galleryInfo && galleryInfo.parent_id > 0"
                                    class="lyecs-btn return-gallery-btn"
                                    @click="galleryChange(galleryInfo.parent_id)"
                                    >返回上一级</el-button
                                >
                                <DialogForm
                                    v-if="galleryInfo && galleryId > 0"
                                    width="600px"
                                    @okCallback="addGalleryCallback(galleryInfo.gallery_id)"
                                    title="添加子相册"
                                    path="gallery/GalleryEdit"
                                    :params="{ act: 'add', parentId: galleryInfo.gallery_id }">
                                    <el-button class="lyecs-btn add-gallery-btn">添加子相册</el-button>
                                </DialogForm>
                            </el-space>
                        </div>
                        <div class="gallery-pic-action-r">
                            <span style="word-break: keep-all">排序：</span>
                            <el-select @change="changeSort" class="a-select-ui gallery_pic_sort" v-model="sort_order">
                                <el-option label="时间从先到后" value="asc" />
                                <el-option label="时间从后到先" value="desc" />
                            </el-select>
                        </div>
                    </div>
                    <a-spin :spinning="loading">
                        <div class="gallery-list gallery-list" :suppressScrollX="false">
                            <ul v-if="childGalleryList.length > 0 && galleryId > 0">
                                <template v-for="(gallery, key) in childGalleryList">
                                    <li class="gallery-item">
                                        <div class="img" @click="galleryChange(gallery.gallery_id)">
                                            <a v-if="gallery.gallery_pics.length == 0"><span class="img-empty">相册为空</span></a>
                                            <template v-for="(gallery_pic, k) in gallery.gallery_pics">
                                                <img class="gallery_pics" :src="imageFormat(gallery_pic.pic_thumb)" />
                                            </template>
                                        </div>
                                        <p class="pic-actions">
                                            <DialogForm
                                                width="600px"
                                                @okCallback="editRecordCallback(gallery.gallery_id, false)"
                                                title="编辑相册"
                                                path="gallery/GalleryEdit"
                                                :params="{ act: 'detail', id: gallery.gallery_id }">
                                                <a class="btn-edit ico-font">&#xe610;</a>
                                            </DialogForm>
                                            <a-popconfirm title="您确认要删掉该相册吗？" @confirm="delGallery(gallery.gallery_id, key)" placement="bottom">
                                                <a class="btn-del ico-font" title="删除">&#xe60a;</a>
                                            </a-popconfirm>
                                        </p>
                                        <div class="desc">
                                            <input
                                                class="gallery_name"
                                                v-model="gallery.gallery_name"
                                                @change="changGalleryName($event, gallery.gallery_id)"
                                                type="text" />
                                        </div>
                                    </li>
                                </template>
                            </ul>
                            <ul class="gallery-list-ul" v-if="picList.length > 0">
                                <template v-for="(gallery_pic, key) in picList">
                                    <li :class="'gallery-pic-item ' + (gallery_pic.selected == true ? 'selected' : '')">
                                        <div v-if="gallery_pic.pic_thumb">
                                            <div class="img" @click="selectPic(gallery_pic, key)">
                                                <a href="javascript:;"><img :src="imageFormat(gallery_pic.pic_thumb)" /></a>
                                            </div>
                                            <p class="pic-actions">
                                                <a-popconfirm title="您确认要删掉该图片吗？" @confirm="delPic(gallery_pic.pic_id)" placement="bottom">
                                                    <a class="btn-del ico-font" title="删除">&#xe60a;</a>
                                                </a-popconfirm>
                                            </p>
                                            <div class="desc">
                                                <input
                                                    class="pic_name"
                                                    autocomplete="off"
                                                    placeholder="图片名称"
                                                    v-model="gallery_pic.pic_name"
                                                    @change="changPicName($event, gallery_pic.pic_id)"
                                                    type="text" />
                                            </div>
                                            <div class="img-selected-box">
                                                <div class="img-selected-box-angle"></div>
                                                <div class="img-selected-box-sort ico-font">&#xe63b;</div>
                                            </div>
                                        </div>
                                        <div v-if="!gallery_pic.pic_thumb" class="gallery-upload-con">
                                            <span class="txt">{{
                                                gallery_pic.status == "error" ? "上传失败" : gallery_pic.status == "done" ? "上传成功" : "图片上传中"
                                            }}</span>
                                            <Progress :percent="gallery_pic.percent" :status="gallery_pic.status == 'error' ? 'exception' : 'normal'" />
                                        </div>
                                    </li>
                                </template>
                            </ul>
                            <div class="empty-warp" v-if="picList.length == 0 && childGalleryList.length == 0">
                                <div v-if="!loading" class="empty-bg">暂无数据</div>
                            </div>
                        </div>
                        <div class="gallery-list-page">
                            <Pagination
                                v-model:page="page"
                                v-model:size="size"
                                :total="picTotal"
                                @callback="pageChange"
                                layout="slot ,prev, pager, next"
                                :background="false" />
                        </div>
                    </a-spin>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, toRefs, computed, onMounted } from "vue";
import request, { requestUrl } from "@/utils/request";
import { DialogForm } from "@/components/dialog";
import { message, Progress, Upload, Modal } from "ant-design-vue";
import type { UploadChangeParam } from "ant-design-vue";
import { imageFormat } from "@/utils/format";
import { AnyNaptrRecord } from "dns";
import { Pagination } from "@/components/list";

const props = defineProps({
    isMultiple: {
        type: Boolean,
        default: false,
    },
});
// 顶级相册ID
const topGalleryId = ref(0);
// 当前相册ID
const galleryId = ref(0);
// 相册目录
const gallery = ref();
// 当前相册图片列表
const galleryPicList = ref([]);
// 新添加的图片
const uploadPicList = ref<any[]>([]);
// 图片数组
// 当前相册图片数量
const picTotal = ref();
// 当前相册信息
const galleryInfo = ref<any>({});
// 子相册
const childGalleryList = ref<any>([]);
// 是否多选
const { isMultiple } = toRefs(props);
// 已选项-ID
const selectedIds = ref([]);
// 已选项-图片
const selectedPics = ref<any>([]);
// 其它
const page = ref(1);
const size = ref(15);
const loading = ref(true);
const sort_order = ref("desc");

const picList = computed<any>(() => {
    return uploadPicList.value.concat(galleryPicList.value);
});

const handleChange = (info: UploadChangeParam) => {
    if (info.file.status == "uploading") {
    }
    if (info.file.status !== "uploading") {
    }
    if (info.file.status === "done") {
        // 上传完成
        if (info.file.response.data.errcode !== 0) {
            info.file.status = "error";
            message.error(info.file.response.data.message);
        } else {
            for (let index in info.fileList) {
                if (info.file.uid == info.fileList[index].uid) {
                    info.fileList[index] = Object.assign(info.fileList[index], info.fileList[index].response.data);
                }
            }
            message.success("图片上传成功！");
        }
    } else if (info.file.status === "error") {
        message.error(`${info.file.name} 图片上传失败！`);
    }
    uploadPicList.value = info.fileList;
};

// 加载目录和全部相册
const loadGallery = () => {
    request({
        url: "setting/gallery/list",
        method: "get",
        params: { gallery_id: galleryId.value },
    }).then((result: any) => {
        gallery.value = result.filter_result;
        galleryChange(galleryId.value);
    });
};
onMounted(() => {
    loadGallery();
});
const folderChange = (gallery_id: number) => {
    galleryChange(gallery_id);
    page.value = 1;
    topGalleryId.value = gallery_id;
};
const pageChange = (curPage: number) => {
    // page.value = curPage;
    galleryChange(galleryId.value, curPage);
};
// 加载相册，仅改变图片选择区域
const galleryChange = (gallery_id: number, page_id: number = 1) => {
    loading.value = true;
    page.value = page_id;
    request({
        url: "setting/gallery_pic/list",
        method: "get",
        params: { gallery_id, page: page_id, sort_order: sort_order.value },
    })
        .then((result: any) => {
            uploadPicList.value = [];
            galleryPicList.value = result.filter_result;
            childGalleryList.value = result.child_gallery_list;
            picTotal.value = result.total;
            galleryId.value = gallery_id;
            galleryInfo.value = result.gallery_info;
        })
        .catch((error) => {
            message.error(error.message);
        })
        .finally(() => {
            loading.value = false;
        });
};
const changeSort = (value: any) => {
    sort_order.value = value;
    galleryChange(galleryId.value);
};
//  编辑相册
const editRecordCallback = (id: number, isMain: Boolean) => {
    if (isMain == true) {
        loadGallery();
    } else {
        galleryChange(galleryId.value);
    }
};
// 添加相册
const addGalleryCallback = (parentId: number) => {
    if (parentId == 0) {
        loadGallery();
    } else {
        galleryChange(galleryId.value);
    }
};
// 修改相册名称
const changGalleryName = (event: any, gallery_id: number) => {
    request({
        url: "setting/gallery/update_field",
        method: "post",
        data: { id: gallery_id, val: event.target.value, field: "gallery_name" },
    })
        .then((result: any) => {
            message.success(result.message);
        })
        .catch((error) => {
            message.error(error.message);
        });
};
// 修改图片名称
const changPicName = (event: any, pic_id: number) => {
    request({
        url: "setting/gallery_pic/update_field",
        method: "post",
        data: { id: pic_id, val: event.target.value, field: "pic_name" },
    })
        .then((result: any) => {
            message.success(result.message);
        })
        .catch((error) => {
            message.error(error.message);
        });
};
// 删除图片
const delPic = (pic_id: number) => {
    request({
        url: "setting/gallery_pic/del",
        method: "post",
        data: { id: pic_id },
    })
        .then((result: any) => {
            message.success(result.message);
            loadGallery();
        })
        .catch((error) => {
            message.error(error.message);
        });
};
// 删除相册
const delGallery = (gallery_id: number, key: number) => {
    request({
        url: "setting/gallery/del",
        method: "post",
        data: { id: gallery_id },
    })
        .then((result: any) => {
            childGalleryList.value.splice(<any>key, 1);
            message.success(result.message);
        })
        .catch((error) => {
            message.error(error.message);
        });
};
// 删除根相册
const delRootGallery = (gallery_id: number) => {
    Modal.confirm({
        title: "您确认要删除所选相册吗？",
        okType: "danger",
        onOk() {
            request({
                url: "setting/gallery/del",
                method: "post",
                data: { id: gallery_id },
            })
                .then((result: any) => {
                    message.success(result.message);
                    if (galleryId.value == gallery_id) {
                        topGalleryId.value = 0;
                        galleryId.value = 0;
                    }
                    loadGallery();
                })
                .catch((error) => {
                    message.error(error.message);
                });
        },
    });
};
// 父组件回调
const emit = defineEmits(["submitCallback", "okType"]);
emit("okType", false);
// 选择图片
const selectPic = (pic: any, key: number) => {
    let selected = false; //当前图片在不在选择里
    if (selectedPics.value.length > 0) {
        for (let idx in selectedPics.value) {
            if (selectedPics.value[idx]["pic_id"] == pic.pic_id) {
                picList.value[key]["selected"] = false;
                selectedPics.value.splice(<any>idx, 1);
                selected = true;
            }
        }
    }
    // 如果是新钩选
    if (selected == false) {
        // 如果是单选，清除所有选项项
        if (isMultiple.value == false) {
            selectedPics.value = [];
            for (let idx in picList.value) {
                picList.value[idx]["selected"] = false;
            }
        }
        picList.value[key]["selected"] = true;
        selectedPics.value.push({
            pic_id: pic.pic_id,
            pic_thumb: pic.pic_thumb,
            pic_url: pic.pic_url,
            pic_name: pic.pic_name,
        });
    }
    // 确认按钮状态，false为disabled
    emit("okType", selectedPics.value.length > 0 ? true : false);
};
// 弹窗回调
const onFormSubmit = () => {
    // 弹窗确认按钮提交
    emit("submitCallback", selectedPics.value);
};

defineExpose({
    onFormSubmit,
});
</script>
<style lang="less" scoped>
@import "./gallery.less";
</style>
