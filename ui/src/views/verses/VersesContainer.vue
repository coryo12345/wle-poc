<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import useVerseStore from 'src/store/verseStore';
import { useRouter } from 'vue-router';

const verseStore = useVerseStore();
const router = useRouter();

onMounted(() => {
  verseStore.getBible();
});

const activeTab = ref('book');

const bookId = ref(0);
const bookName = computed(() => {
  if (!verseStore.bible) return [];
  return verseStore.bible[bookId.value].name;
});

const chapter = ref(1);
const chapters = computed(() => {
  if (!verseStore.bible) return [];
  return verseStore.bible[bookId.value].chapters;
});

const verses = computed(() => {
  if (!verseStore.bible) return 0;
  return verseStore.bible[bookId.value].chapters[chapter.value];
});

function setChapter(_chapter: number) {
  chapter.value = _chapter;
  activeTab.value = 'verse';
}

function setBook(_bookId: number) {
  bookId.value = _bookId;
  activeTab.value = 'chapter';
}

function goToVerse(verse: number) {
  const verseId = encodeURIComponent([bookId.value, chapter.value, verse].join(':'));
  router.push(`/verse/${verseId}`);
}
</script>

<template>
  <div class="card-width">
    <h2>Find a Verse</h2>
    <el-tabs v-model="activeTab">
      <!-- Books -->
      <el-tab-pane label="Book" name="book">
        <span v-for="(book, bookId) in verseStore.bible" :key="bookId" class="mr-2 mb-2 d-inline-block">
          <el-button @click="setBook(bookId)">
            {{ book.name }}
          </el-button>
        </span>
      </el-tab-pane>
      <!-- Chapters -->
      <el-tab-pane label="Chapter" name="chapter">
        <h3>{{ bookName }}</h3>
        <span v-for="(_, chapter) in chapters" :key="chapter" class="mr-2 mb-2 d-inline-block">
          <el-button @click="setChapter(chapter)">
            {{ chapter }}
          </el-button>
        </span>
      </el-tab-pane>
      <!-- Verses -->
      <el-tab-pane label="Verse" name="verse">
        <h3>{{ bookName }} {{ chapter }}</h3>
        <span v-for="verse in verses" :key="verse" class="mr-2 mb-2 d-inline-block">
          <el-button @click="goToVerse(verse)">
            {{ verse }}
          </el-button>
        </span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.card-width {
  max-width: 800px;
  margin: auto;
}
</style>
