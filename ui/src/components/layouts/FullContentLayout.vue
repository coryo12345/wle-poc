<script setup lang="ts"></script>

<template>
  <div class="common-layout">
    <el-container class="layout-container">
      <el-header class="layout-header">
        <slot name="header" />
      </el-header>
      <el-main>
        <slot name="main" />
      </el-main>
      <el-footer>
        <slot name="footer" />
      </el-footer>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout,
.layout-container {
  width: 100%;
  height: 100%;
}

.layout-header {
  background-color: burlywood;
}
</style>
