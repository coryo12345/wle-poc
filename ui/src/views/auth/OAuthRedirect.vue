<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { AuthProviderInfo, useAuthStore } from 'src/store/authStore';
import { authViaOAuth2 } from 'src/services/authService';
import { STORAGE_PROVIDER_KEY } from 'src/constants';

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  const authData = await attemptAuth();
  if (!authData) {
    router.push('/login');
  } else {
    router.push('/');
  }
});

async function attemptAuth() {
  // parse the query parameters from the redirected url
  const params = route.query as Record<string, string>;

  // load the previously stored provider's data
  const storageItem = localStorage.getItem(STORAGE_PROVIDER_KEY);
  if (storageItem === null || storageItem === undefined) {
    return null;
  }

  const provider = JSON.parse(storageItem) as AuthProviderInfo;
  // compare the redirect's state param and the stored provider's one
  if (provider.state !== params.state) {
    return null;
  }

  return await authViaOAuth2(provider, params.code);
}
</script>

<template>
  <h2 class="text-align-center mt-8">Logging you in...</h2>
  <div v-loading="true" class="loading-box"></div>
</template>

<style scoped>
.loading-box {
  width: 100%;
  min-height: 60px;
}
</style>
