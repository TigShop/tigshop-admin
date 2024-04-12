<template>
    <div class="body-menu-mask"></div>
    <div class="main-warp">
        <perfect-scrollbar class="main-layout-box">
            <div class="page-grid-content">
                <pageHeader></pageHeader>
                <router-view :key="$route.fullPath" />
            </div>
        </perfect-scrollbar>
    </div>
</template>
<script setup lang="ts" >
import pageHeader from './pageHeader.vue'
</script>
<style lang="less">
.main-warp {
    position: absolute;
    height: 100%;
    z-index: 10;
    left: 268px;
    right: 0;
}

.main-layout-box {
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    z-index: 2;
    background: #fff;
    bottom: 0;
    overflow-y: auto;
}</style>