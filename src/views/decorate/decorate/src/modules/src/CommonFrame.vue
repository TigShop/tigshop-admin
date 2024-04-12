<template></template>
<script lang="ts" setup>
import { ref } from 'vue';
const defaultFrame = {
    // 结构设置
    'background_color': '',
    'inner_padding': 0,
    'box_radius': 0,
    'box_padding': 10,
    'box_padding_top': 5,
    'box_padding_bottom': 5,
}
defineExpose({
    defaultFrame
});
</script>