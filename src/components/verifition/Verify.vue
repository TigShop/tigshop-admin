<template>
    <Modal class="verifybox" v-model:open="visible" centered :width="parseInt(imgSize.width) + 30 + 'px'" title="请完成安全验证" :destroyOnClose="false" :footer="null">
        <VerifySlide :is="componentType" :captchaType="captchaType" type="2" :figure="figure" :arith="arith" :mode="mode" :vSpace="vSpace" :explain="explain" :imgSize="imgSize"
            :blockSize="blockSize" :barSize="barSize" ref="instance" @close="closeBox" @success="success"></VerifySlide>
    </Modal>
</template>
<script lang="ts" setup>
/**
 * Verify 验证码组件
 * @description 分发验证码使用
 * */
import VerifySlide from './Verify/VerifySlide.vue'
import VerifyPoints from './Verify/VerifyPoints.vue'
import { Modal } from 'ant-design-vue';
import { computed, ref, onMounted, toRefs, watch } from 'vue';

const props = defineProps({
    captchaType: {
        type: String,
        required: true
    },
    figure: {
        type: Number
    },
    arith: {
        type: Number
    },
    mode: {
        type: String,
        default: 'pop'
    },
    vSpace: {
        type: Number
    },
    explain: {
        type: String
    },
    imgSize: {
        type: Object,
        default() {
            return {
                width: '310px',
                height: '155px'
            }
        }
    },
    blockSize: {
        type: Object
    },
    barSize: {
        type: Object
    },
    close: {
        type: Function
    },
})
const { captchaType, figure, arith, mode, vSpace, explain, imgSize, blockSize, barSize } = toRefs(props)
const clickShow = ref(false)
const verifyType = ref(undefined)
const componentType = ref(undefined)

const instance = <any>ref({})
const emit = defineEmits([
    "okCallback",   //确认后回调
])
const visible = ref(false)
/**
 * refresh
 * @description 刷新
 * */
const refresh = () => {
    console.log(instance.value);
    if (instance.value.refresh) {
        instance.value.refresh()
    }
}
const closeBox = () => {
    visible.value = false
    refresh();
}
const show = () => {
    visible.value = true
}
const success = (res:any) => {
    emit('okCallback', res)
}
defineExpose({
    show
});
</script>
<style lang="less">
.verifybox .ant-modal-body {
    padding: 15px !important;
}

.verifybox .ant-modal-header {
    padding: 16px 15px !important;
}


.verifybox-top {
    padding: 0 15px;
    height: 50px;
    line-height: 50px;
    text-align: left;
    font-size: 16px;
    color: #45494c;
    border-bottom: 1px solid #e4e7eb;
    box-sizing: border-box;
}

.verifybox-bottom {
    padding: 15px;
    box-sizing: border-box;
}

.verifybox-close {
    position: absolute;
    top: 13px;
    right: 9px;
    width: 24px;
    height: 24px;
    text-align: center;
    cursor: pointer;
}

.mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1001;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, .3);
    /* display: none; */
    transition: all .5s;
}

.verify-tips {
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 0;
    transition: all .2s linear;
    line-height: 30px;
    text-indent: 10px;
    color: #fff;
}

.verify-tips.show {
    height: 30px
}

.suc-bg {
    background-color: rgba(92, 184, 92, .5);
    filter: progid:DXImageTransform.Microsoft.gradient(startcolorstr=#7f5CB85C, endcolorstr=#7f5CB85C);
}

.err-bg {
    background-color: rgba(217, 83, 79, .5);
    filter: progid:DXImageTransform.Microsoft.gradient(startcolorstr=#7fD9534F, endcolorstr=#7fD9534F);
}

.tips-enter,
.tips-leave-to {
    bottom: -30px;
}

.tips-enter-active,
.tips-leave-active {
    transition: bottom .5s;
}

/* ---------------------------- */
/*常规验证码*/
.verify-code {
    font-size: 20px;
    text-align: center;
    cursor: pointer;
    margin-bottom: 5px;
    border: 1px solid #ddd;
}

.cerify-code-panel {
    height: 100%;
    overflow: hidden;
}

.verify-code-area {
    float: left;
}

.verify-input-area {
    float: left;
    width: 60%;
    padding-right: 10px;

}

.verify-change-area {
    line-height: 30px;
    float: left;
}

.varify-input-code {
    display: inline-block;
    width: 100%;
    height: 25px;
}

.verify-change-code {
    color: #337AB7;
    cursor: pointer;
}

.verify-btn {
    width: 200px;
    height: 30px;
    background-color: #337AB7;
    color: #FFFFFF;
    border: none;
    margin-top: 10px;
}


/*滑动验证码*/
.verify-bar-area {
    position: relative;
    background: #f7f9fa;
    text-align: center;
    box-sizing: content-box;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.verify-bar-area .verify-move-block {
    position: absolute;
    top: 0px;
    left: 0;
    background: #fff;
    color: #666;
    cursor: pointer;
    box-sizing: content-box;
    box-shadow: 0 0 3px rgba(0, 0, 0, .3);
    transition: background .2s linear;
    border-radius: 1px;
    border: 0;
}

.verify-bar-area .verify-move-block:hover {
    background-color: #1991fa;
    color: #FFFFFF;
}

.verify-bar-area .verify-left-bar {
    position: absolute;
    top: -1px;
    left: -1px;
    background: #d1e0f1;
    cursor: pointer;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    border: 1px solid #ddd;
    border-radius: 0 2px 2px 0;
}

.verify-img-panel {
    margin: 0;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    border-radius: 3px;
    position: relative;
}

.verify-img-panel .verify-refresh {
    width: 25px;
    height: 25px;
    text-align: center;
    padding: 5px;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
}

.verify-img-panel .icon-refresh {
    font-size: 20px;
    color: #fff;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.65);
}

.verify-img-panel .verify-gap {
    background-color: #fff;
    position: relative;
    z-index: 2;
    border: 1px solid #fff;
}

.verify-bar-area .verify-move-block .verify-sub-block {
    position: absolute;
    text-align: center;
    z-index: 3;
    /* border: 1px solid #fff; */
}

.verify-bar-area .verify-move-block .verify-icon {
    font-size: 18px;
}

.verify-bar-area .verify-msg {
    z-index: 3;
}

/*字体图标的css*/
/*@font-face {font-family: "iconfont";*/
/*link: url('../fonts/iconfont.eot?t=1508229193188'); !* IE9*!*/
/*link: url('../fonts/iconfont.eot?t=1508229193188#iefix') format('embedded-opentype'), !* IE6-IE8 *!*/
/*url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'),*/
/*url('../fonts/iconfont.ttf?t=1508229193188') format('truetype'), !* chrome, firefox, opera, Safari, Android, iOS 4.2+*!*/
/*url('../fonts/iconfont.svg?t=1508229193188#iconfont') format('svg'); !* iOS 4.1- *!*/
/*}*/

.icon-check:before {
    content: "\e6e9";
    display: block;
    width: 16px;
    height: 16px;
    line-height: 16px;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9999;
    background-size: contain;
}

.icon-close:before {
    content: "\e6bb";
    display: block;
    width: 16px;
    height: 16px;
    line-height: 16px;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9999;
    background-size: contain;
}

.icon-right:before {
    content: "\e676";
    display: block;
    width: 16px;
    height: 16px;
    position: absolute;
    line-height: 16px;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-size: cover;
    z-index: 9999;
    background-size: contain;
}

.icon-refresh:before {
    content: "\e616";
    display: block;
    width: 16px;
    height: 16px;
    line-height: 16px;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9999;
    background-size: contain;
}
</style>
