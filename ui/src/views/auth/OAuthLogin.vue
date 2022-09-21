<script setup lang="ts">
import { useAuthStore, AuthProviderInfo } from 'src/store/authStore';
import { getAuthMethods } from 'src/services/authService';
import { onMounted, Ref, ref } from 'vue';
import { REDIRECT_URL, STORAGE_PROVIDER_KEY } from 'src/constants';

const authStore = useAuthStore();

const loading = ref(true);
const authProviders: Ref<AuthProviderInfo[]> = ref([]);

onMounted(async () => {
  authProviders.value = await getAuthMethods();
  loading.value = false;
});

function login(provider: AuthProviderInfo) {
  localStorage.setItem(STORAGE_PROVIDER_KEY, JSON.stringify(provider));
  console.log(REDIRECT_URL);
  const authUrl = provider.authUrl + REDIRECT_URL;
  window.location.href = authUrl;
}
</script>

<template>
  <el-card class="login-card" v-loading="loading">
    <h2 class="text-align-center">Log In</h2>
    <ul class="pl-0">
      <li v-for="provider in authProviders" :key="provider.name">
        <el-button @click="login(provider)">
          Log in with&nbsp;
          <span class="caps"> {{ provider.name }}</span>
        </el-button>
      </li>
    </ul>
  </el-card>
</template>

<style scoped lang="scss">
@import 'src/assets/variables.scss';

.login-card {
  max-width: $card-width;
  margin: spacing(8) auto 0 auto;
}

.caps {
  text-transform: capitalize;
}

li {
  list-style: none;
  text-align: center;
}
</style>
