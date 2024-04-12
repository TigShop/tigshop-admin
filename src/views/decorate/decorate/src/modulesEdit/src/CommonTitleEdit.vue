<template>
    <!-- 标题设置 -->
    <div class="dec-divider-line" v-if="type != 'title'"></div>

    <div class="dec-spread-title">
        <div class="title">标题设置</div>
    </div>

    <div class="dec-edit-group" v-if="type != 'title'">
        <div class="dec-edit-group-title">
            <div class="label">显示标题栏</div>
            <div class="value"></div>
        </div>
        <div class="dec-edit-group-con">
            <div class="dec-radio-group">
                <el-radio-group class="dec-radio-group" v-model="title.show_title">
                    <el-radio-button :value="1">显示</el-radio-button>
                    <el-radio-button :value="0">不显示</el-radio-button>
                </el-radio-group>
            </div>
        </div>
    </div>
    <div class="dec-edit-group">
        <div class="dec-edit-group-title">
            <div class="label">标题栏风格</div>
            <div class="value"></div>
        </div>
        <div class="dec-edit-group-con">
            <el-radio-group class="dec-radio-group" v-model="title.title_style">
                <el-radio-button :label="1">风格一</el-radio-button>
                <el-radio-button :label="2">风格二</el-radio-button>
                <el-radio-button :label="3" v-if="type == 'product'">风格三</el-radio-button>
            </el-radio-group>
        </div>
    </div>
    <div class="dec-edit-group"  v-if="type == 'title'">
        <div class="dec-edit-group-title">
            <div class="label">标题位置</div>
            <div class="value"></div>
        </div>
        <div class="dec-edit-group-con">
            <el-radio-group class="dec-radio-group" v-model="title.title_align">
                <el-radio-button :label="1">居左</el-radio-button>
                <el-radio-button :label="2">居中</el-radio-button>
            </el-radio-group>
        </div>
    </div>
    <div class="dec-edit-group" v-if="type != 'title'">
        <div class="dec-edit-group-title">
            <div class="label">标题背景色</div>
            <div class="value"></div>
        </div>
        <div class="dec-edit-group-con">
            <div class="dec-color-group">
                <div class="dec-color-button">
                    <a class="dec-color-reset" @click="title.title_background = defaultTitle.title_background">重置</a>
                    <SelectColor v-model:color="title.title_background"></SelectColor>
                </div>
            </div>
        </div>
    </div>
    <div class="dec-edit-group" v-if="type == 'product'">
        <div class="dec-edit-group-title">
            <div class="label">背景渐变色</div>
            <div class="value"></div>
        </div>
        <div class="dec-edit-group-con">
            <div class="dec-color-group">
                <div class="dec-color-button">
                    <a class="dec-color-reset" @click="title.title_background2 = defaultTitle.title_background2">重置</a>
                    <SelectColor v-model:color="title.title_background2"></SelectColor>
                </div>
            </div>
        </div>
    </div>
    <div class="dec-edit-group" v-if="type != 'title'">
        <div class="dec-edit-group-title">
            <div class="label">标题图片</div>
            <div class="value"></div>
        </div>
        <div class="dec-edit-group-con">
            <div class="dec-pic-group dec-picSingle-group">
                <PicSelect v-model:photo="title.title_background_pic" v-model:defaultValue="defaultTitle.title_background_pic"></PicSelect>
            </div>
        </div>
    </div>
    <div class="dec-edit-group">
        <div class="dec-edit-group-title">
            <div class="label">标题圆角</div>
        </div>
        <div class="dec-edit-group-con">
            <div class="dec-range-group">
                <el-slider v-model="title.title_radius" show-input :show-input-controls="false" size="small" input-size="default" :max="30" />
            </div>
        </div>
    </div>
    <div class="dec-edit-group">
        <div class="dec-edit-group-title">
            <div class="label">标题内容</div>
        </div>
        <div class="dec-edit-group-con">
            <div class="dec-input-group">
                <el-input v-model="title.title_text" placeholder="请输入标题内容"></el-input>
            </div>
        </div>
    </div>
    <div class="dec-edit-group">
        <div class="dec-edit-group-title">
            <div class="label">标题颜色</div>
            <div class="value"></div>
        </div>
        <div class="dec-edit-group-con">
            <div class="dec-color-group">
                <div class="dec-color-button">
                    <a class="dec-color-reset" @click="title.title_color = defaultTitle.title_color">重置</a>
                    <SelectColor v-model:color="title.title_color"></SelectColor>
                </div>
            </div>
        </div>
    </div>
    <div class="dec-edit-group">
        <div class="dec-edit-group-title">
            <div class="label">描述内容</div>
        </div>
        <div class="dec-edit-group-con">
            <div class="dec-input-group" dynamic-class=".image-ad-title-d">
                <el-input v-model="title.desc_text" placeholder="请输入标题内容"></el-input>
            </div>
        </div>
    </div>
    <div class="dec-edit-group">
        <div class="dec-edit-group-title">
            <div class="label">描述颜色</div>
            <div class="value"></div>
        </div>
        <div class="dec-edit-group-con">
            <div class="dec-color-group">
                <div class="dec-color-button">
                    <a class="dec-color-reset" @click="title.desc_color = defaultTitle.desc_color">重置</a>
                    <SelectColor v-model:color="title.desc_color"></SelectColor>
                </div>
            </div>
        </div>
    </div>
    <div class="dec-edit-group">
        <div class="dec-edit-group-title">
            <div class="label">显示查看更多</div>
            <div class="value"></div>
        </div>
        <div class="dec-edit-group-con">
            <el-radio-group class="dec-radio-group" v-model="title.show_more">
                <el-radio-button :value="1">显示</el-radio-button>
                <el-radio-button :value="0">不显示</el-radio-button>
            </el-radio-group>
        </div>
    </div>
    <div class="dec-edit-group">
        <div class="dec-edit-group-title">
            <div class="label">更多文字颜色</div>
            <div class="value"></div>
        </div>
        <div class="dec-edit-group-con">
            <div class="dec-color-group">
                <div class="dec-color-button">
                    <a class="dec-color-reset" @click="title.more_color = defaultTitle.more_color">重置</a>
                    <SelectColor v-model:color="title.more_color"></SelectColor>
                </div>
            </div>
        </div>
    </div>
    <div class="dec-edit-group ">
        <div class="dec-edit-group-title">
            <div class="label">更多链接</div>
        </div>
        <div class="dec-edit-group-con">
            <div class="dec-link-group">
                <div class="lyecs-link-select">
                    <SelectLink v-model="title.more_link"></SelectLink>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>

import { SelectColor } from '@/components/select'
import { PicSelect } from '@/components/decorate'
import { ref, onMounted, ComputedRef, computed } from 'vue';
import { SelectLink } from '@/components/select';
import { ModuleTitleType } from '@/types/decorate/decorate.d';
import { imageFormat } from "@/utils/format";
import { defaultTitle } from '@/views/decorate/decorate/src/modules/'
const title = defineModel<ModuleTitleType>('modelValue', {default: () => ({})});
const props = defineProps({
    type: {
        type: String,
        default: ''
    }
})
</script>