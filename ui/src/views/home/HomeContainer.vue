<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { Record } from 'pocketbase';
import useVerseStore from 'src/store/verseStore';
import { getAllTags } from 'src/services/themeService';
import { relativeFromNow } from '../../utils/time';

const verseStore = useVerseStore();

onMounted(async () => {
  await verseStore.getBible();
  getRecentTags();
});

const tags = ref([] as Record[]);
const page = ref(1);

async function getRecentTags() {
  const _tags = await getAllTags(page.value);
  page.value++;
  tags.value = [...tags.value, ..._tags];
}

const flatTags = computed(() => {
  return tags.value.map((tag) => {
    const theme = tag['@expand'].theme.name as string;
    return {
      verse: verseStore.getVerseNameById(tag.verseId),
      verseId: tag.verseId,
      verseHref: `/verse/${encodeURIComponent(tag.verseId)}`,
      time: relativeFromNow(tag.created),
      theme,
      themeHref: `/theme/${encodeURIComponent(theme)}`,
    };
  });
});
</script>

<template>
  <div class="card-width">
    <h2 class="underline">All WLE Activity</h2>
    <p v-for="(tag, idx) in flatTags" :key="idx">
      <router-link :to="tag.verseHref">
        <el-link type="primary">{{ tag.verse }}</el-link>
      </router-link>
      -
      <router-link :to="tag.themeHref">
        <el-link>{{ tag.theme }}</el-link>
      </router-link>
      -
      <span>{{ tag.time }}</span>
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
