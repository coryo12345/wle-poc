<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
import { ref } from 'vue';

const searchString = ref('');

function searchSite() {
  console.log('search: ', searchString.value);
}
</script>

<template>
  <el-input v-model="searchString" placeholder="search not yet implemented" @keyup.enter="searchSite">
    <template #suffix>
      <Search class="icon" @click="searchSite" />
    </template>
  </el-input>
</template>

<style scoped>
.icon {
  max-height: 1em;
  cursor: pointer;
}
</style>
