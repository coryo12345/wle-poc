<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useThemeStore from 'src/store/themeStore';
import { getAllTagsByTheme, getTagsByThemeAndUser } from 'src/services/themeService';
import { Record } from 'pocketbase';
import useVerseStore from 'src/store/verseStore';
import { relativeFromNow } from 'src/utils/time';

const route = useRoute();
const router = useRouter();
const themeStore = useThemeStore();
const verseStore = useVerseStore();

const themeName = ref('');

onMounted(async () => {
  if (!route.params.name) return router.push('/themes');
  themeName.value = route.params.name.toString();

  await Promise.all([themeStore.getThemes(), verseStore.getBible()]);

  await getUserTags();
  await getTagsByTheme();
});

const page = ref(1);
const myTags = ref([] as Record[]);
const allTags = ref([] as Record[]);

async function getUserTags() {
  const theme = themeStore.themes?.find((theme) => theme.name === themeName.value);
  if (!theme) return router.push('/themes');
  myTags.value = await getTagsByThemeAndUser(theme.id);
}

async function getTagsByTheme() {
  const theme = themeStore.themes?.find((theme) => theme.name === themeName.value);
  if (!theme) return router.push('/themes');
  allTags.value = await getAllTagsByTheme(theme.id);
}

const buildFlatTag = (tag: Record) => {
  const verse = verseStore.getVerseNameById(tag.verseId);
  const time = relativeFromNow(tag.created);
  return { verse, time, verseId: tag.verseId };
};

const myFlatTags = computed(() => {
  return myTags.value.map(buildFlatTag);
});

const allFlatTags = computed(() => {
  return allTags.value.map(buildFlatTag);
});

function generateVerseHref(verseId: string) {
  return `/verse/${encodeURIComponent(verseId)}`;
}
</script>

<template>
  <div class="card-width">
    <h2 class="underline">{{ themeName }}</h2>
    <div v-if="myFlatTags.length">
      <h3>Verses you've tagged with {{ themeName }}</h3>
      <p v-for="(msg, idx) in myFlatTags" :key="idx">
        <router-link :to="generateVerseHref(msg.verseId)">
          <el-link type="primary">{{ msg.verse }}</el-link>
        </router-link>
        - {{ msg.time }}
      </p>
    </div>
    <h3 v-else>You have not tagged any verses with {{ themeName }}</h3>
    <h3>Verses other users have tagged with {{ themeName }}</h3>
    <p v-for="(msg, idx) in allFlatTags" :key="idx">
      <router-link :to="generateVerseHref(msg.verseId)">
        <el-link type="primary">{{ msg.verse }}</el-link>
      </router-link>
      - {{ msg.time }}
    </p>
  </div>
</template>

<style scoped lang="scss">
@import 'src/assets/variables.scss';

.card-width {
  max-width: $card-width-large;
  margin: auto;
}
</style>
