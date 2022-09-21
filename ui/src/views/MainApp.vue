<script setup lang="ts">
import PageHeader from '../components/header/PageHeader.vue';
import FullContentLayout from '../components/layouts/FullContentLayout.vue';

import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/store/authStore';

const router = useRouter();
const authStore = useAuthStore();

onMounted(() => {
  if (!authStore.getUser()) {
    router.push('/login');
  }
});
</script>

<template>
  <full-content-layout>
    <template #header>
      <page-header />
    </template>
    <template #main>
      <router-view />
    </template>
    <template #footer>
      <div class="d-flex align-center justify-center mt-2">Copyright 2022 WLE</div>
    </template>
  </full-content-layout>
</template>
