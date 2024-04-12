<template>
    <pageTopBar ></pageTopBar>
    <pageLeftMenu ></pageLeftMenu>
    <pageContainer >
        <router-view />
    </pageContainer>
</template>

<script setup lang="ts">
import pageLeftMenu from './lib/pageLeftMenu.vue'
import pageTopBar from './lib/pageTopBar.vue'
import pageContainer from './lib/pageContainer.vue'
</script>