<template>
    <Component v-if="loaded" v-model:module="module"></Component>
</template>
<script lang="ts" setup>

import { ref, defineAsyncComponent, shallowRef, onMounted } from 'vue';
import { toPascalCase } from "@/utils/util";
const props = defineProps({
    module: Object,
    moduleType: {
        type: String,
        default: ''
    },
})
const module = ref(props.module)
const moduleType = ref(props.moduleType)
const Component = shallowRef();
const loaded = ref(false);
moduleType.value = toPascalCase(moduleType.value)
onMounted(async () => {
    const _import = (path: string) => defineAsyncComponent(() => import(`./modues/${path}.vue`));
    Component.value = _import(moduleType.value)
    loaded.value = true
})
</script>