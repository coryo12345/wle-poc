<script setup lang="ts">
import useThemeStore from 'src/store/themeStore';
import { computed, onMounted } from 'vue';
import { Record } from 'pocketbase';
import { useRouter } from 'vue-router';

const themeStore = useThemeStore();
const router = useRouter();

onMounted(() => {
  themeStore.getThemes();
});

const themes = computed(() => {
  return themeStore.themes;
});

function goToThemePage(theme: Record) {
  router.push(`/theme/${theme.name}`);
}
</script>

<template>
  <div class="card-width">
    <h2 class="underline mb-2">Themes</h2>
    <p v-for="theme in themes" :key="theme.id" class="theme-btn" @click="goToThemePage(theme)">{{ theme.name }}</p>
  </div>
</template>

<style scoped lang="scss">
@import 'src/assets/variables.scss';

.card-width {
  max-width: $card-width;
  margin: auto;
}

.theme-btn {
  cursor: pointer;
  padding: spacing(1);
  border-radius: 4px;
  margin: 0 0 spacing(1);
}

.theme-btn:hover {
  background-color: #eee;
  transition: 0.1s;
}
</style>
