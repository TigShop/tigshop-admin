<template>
    <div class="div2">
        <div class="notice-warp">
            <p> 提示：</p>
            <p> PC端链接：推荐您可以直接填写根域名后面的链接（比如index.html?id=1）；</p>
            <p> 您可以带上完整的http或https链接（比如https://www.lyecs.com/index.html?id=1）；</p>
            <p> 链接需匹配商城展示页面的链接，否则无法访问。</p>
            <p> 移动端链接：您可以通过H5页面的地址栏或开发人员了解到具体页面链接</p>
        </div>
        <div class="info">
            <div class="item">
                <div class="title-width">PC端链接：</div>
                <el-input v-model="link" class="input-width" placeholder="请输入链接" @keyup="onChange" :validate-event="false"></el-input>
            </div>

            <div class="item">
                <div class="title-width">移动端链接：</div>
                <el-input v-model="appLink" class="input-width" placeholder="请输入H5/小程序/App路径" @keyup="onChange"></el-input>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>

import { ref } from "vue";
const linkSelectData = defineModel('linkSelectData');
const link = ref('');
const appLink = ref('');
const onChange = () => {
    if (link.value != '' && appLink.value != '') {
        linkSelectData.value = {
            path: 'custom',
            label: '自定义链接',
            name: link.value ? link.value : appLink.value,
            link: link.value,
            appLink: appLink.value,
        }
    } else {
        linkSelectData.value = {}
    }
}

</script>
<style lang="less" scoped>
.extra {
    color: #999;
    padding-left: 10px;
}

.div2 {


    .info {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .item {
            display: flex;
            flex-direction: row;

            .title-width {
                width: 120px;
                display: flex;
                justify-content: end;
                align-items: center;
            }
        }


    }

}


</style>
