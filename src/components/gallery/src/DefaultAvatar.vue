<template>
    <div :class="avatar?'have':'no-have'" class="system-img">
        <div v-if="!avatar" class="dialog-link" @click="show()">
            <i class="iconfont icon-tianjiatupian"></i>
            <span>系统头像</span>
        </div>
        <div v-else class="have-image">
            <el-image :preview-src-list="[getAssetsFile(current)]" :src="getAssetsFile(current)" style="width: 80px;height: 80px"></el-image>
            <div class="bar">
                <span class="iconfont icon-bianji1" @click="show()"></span>
                <span class="iconfont icon-shanchu" style="margin-left: 6px" @click="del()"></span>
            </div>
        </div>
    </div>
    <el-dialog
        v-model="dialogVisible"
        title="系统头像"
        width="830"
    >
        <div class="image-list">
            <div v-for="item in imageList" :class="current==item?'select':''" class="image-item" @click="selectImage(item)">
                <el-image :src="getAssetsFile(item)" style="width: 100px;height: 100px"></el-image>
            </div>

        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="save()">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import {ref} from "vue";
import {getAssetsFile} from "@/utils/util";

const props = defineProps({
    avatar: {
        type: String,
        default: "",
    }
});

const imageList = ref([
    '../assets/avatar/1.jpeg',
    '../assets/avatar/2.jpeg',
    '../assets/avatar/3.jpeg',
    '../assets/avatar/4.jpeg',
    '../assets/avatar/5.jpeg',
    '../assets/avatar/6.jpeg',
    '../assets/avatar/7.jpeg',
    '../assets/avatar/8.jpeg',
    '../assets/avatar/9.jpeg',
    '../assets/avatar/10.jpeg',
    '../assets/avatar/11.jpeg',
    '../assets/avatar/12.jpeg',
    '../assets/avatar/13.jpeg',
    '../assets/avatar/14.jpeg',
    '../assets/avatar/15.jpeg',
    '../assets/avatar/16.jpeg',
    '../assets/avatar/17.jpeg',
    '../assets/avatar/18.jpeg',
    '../assets/avatar/19.jpeg',
    '../assets/avatar/20.jpeg',
    '../assets/avatar/21.jpeg',
    '../assets/avatar/22.jpeg',
    '../assets/avatar/23.jpeg',
    '../assets/avatar/24.jpeg',
    '../assets/avatar/25.jpeg',
    '../assets/avatar/26.jpeg',
    '../assets/avatar/27.jpeg',
    '../assets/avatar/28.jpeg',
    '../assets/avatar/29.jpeg',
    '../assets/avatar/30.jpeg',
    '../assets/avatar/31.jpeg',
    '../assets/avatar/32.jpeg',
    '../assets/avatar/33.jpeg',
    '../assets/avatar/34.jpeg'
])
const selectImage = (value: string) => {
    current.value = value;
}
const emit = defineEmits(["update:avatar"]);
const dialogVisible = ref(false)
const current = ref<string | number>(props.avatar)

const show = () => {
    dialogVisible.value = true
}
const del = () => {
    emit("update:avatar", '');
    current.value = imageList.value[0]
}
const save = () => {
    emit("update:avatar", current.value);
    dialogVisible.value = false;
}
</script>
<style lang="less" scoped>
.system-img {
    width: 80px;
    height: 80px;

    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-direction: column;

    .dialog-link {
        display: inline-flex;
        flex-direction: column;
        line-height: 25px;

        & > i {
            font-size: 20px;
            color: rgba(0, 0, 0, 0.85);
            text-align: center;
        }
    }

    .have-image {
        width: 80px;
        height: 80px;
        position: relative;

        .bar {
            display: none; /* 初始隐藏 */
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            line-height: 20px;
            transition: all .3s;
            color: white;
            height: 20px;
            background: rgba(0, 0, 0, 0.6);
            padding: 0 10px;
            box-sizing: border-box;

        }
    }

    .have-image:hover .bar {
        display: block; /* 鼠标移入时显示 */
    }
}

.system-img:hover {
    border: 1px dashed var(--tig-primary);
}

.have {
    border: 1px solid #ddd;
}

.no-have {
    border: 1px dashed #ddd;
}

.image-list {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: left;
    gap: 10px;
    padding: 10px 0;

    .image-item {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border: 2px solid #eee;
        position: relative;
    }

    .select {
        border: 2px solid var(--tig-primary);


    }

    /* 三角形 */

    .select::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        border-top: 30px solid var(--tig-primary);
        border-left: 30px solid transparent;
    }
}
</style>
