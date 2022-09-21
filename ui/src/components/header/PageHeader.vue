<script setup lang="ts">
import { UserFilled } from '@element-plus/icons-vue';
import GlobalSearch from 'src/components/header/GlobalSearch.vue';
import { computed } from 'vue';
import { useClient } from 'src/services/config';
import { useAuthStore } from 'src/store/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const userName = computed(() => {
  return authStore.getUserName();
});

function logout() {
  const client = useClient();
  client.authStore.clear();
  window.location.reload();
}

function goHome() {
  router.push('/');
}
</script>

<template>
  <el-page-header class="page-header" icon="" title="WLE" @back="goHome">
    <template #content>
      <div class="d-flex align-center">
        <p class="mr-2"><router-link to="/themes">Themes</router-link></p>
        <p class="mr-2"><router-link to="/verses">Verses</router-link></p>
      </div>
    </template>
    <template #extra>
      <div class="d-flex align-center">
        <global-search class="ml-2" />
        <el-dropdown>
          <el-avatar class="ml-2 avatar" :icon="UserFilled" />
          <template #dropdown>
            <el-dropdown-menu>
              <p class="mx-4 hello-message">Hello, {{ userName }}</p>
              <el-dropdown-item>My Profile</el-dropdown-item>
              <el-dropdown-item @click="logout" divided>Log Out</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </template>
  </el-page-header>
</template>

<style scoped>
:deep(.el-page-header__breadcrumb) {
  margin: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  color: inherit;
}

.avatar {
  min-height: 2em;
  min-width: 2em;
}

.hello-message {
  font-size: 1.2em;
}
</style>
