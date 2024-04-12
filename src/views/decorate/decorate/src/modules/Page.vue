<template>
    <div class="module-ad-con module-topbar-warp" :style="format.title_background_color">
        <div class="module-topbar-con">
            <div class="module-topbar-title-con">
                <div class="title-item" :style="format.title_color">{{ module.title || '页面标题' }}</div>
            </div>
        </div>
    </div>
    <!--  -->
</template>
<script lang="ts" setup>

import { ref, onMounted, computed } from 'vue';
const props = defineProps({
    module: Object,
})
const module = ref(props.module);
// 页面设置
const defaultModule = {
    'title': '',
    'title_color': '',
    'title_background_color': '',
    'background_image': {
        'pic_url': '',
        'pic_thumb': '',
    },
    'background_color': '',
    'background_repeat': 1,
    'background_size': 1,
}
const dealDefault = () => {
    for (let i in defaultModule) {
        if (typeof module.value[i] === "undefined") {
            module.value[i] = defaultModule[i]
        }
    }
}
onMounted(async () => {
    dealDefault();
})

const format = computed(() => {
    return {
        'title_background_color': module.value.title_background_color ? 'background-color:' + module.value.title_background_color + ';' : '',
        'title_color': 'color:' + module.value.title_color + ';',
    }
})
const backgroundColor = ref('#000000')
            // background-position: top center;
            // {{format.background_color}}
            // {{format.background_image}}
            // {{format.background_repeat}}
            // {{format.background_size}}
</script>
<style lang="less">
</style>