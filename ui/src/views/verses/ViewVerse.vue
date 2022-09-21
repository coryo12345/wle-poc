<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useVerseStore from 'src/store/verseStore';
import { getVerse } from 'src/services/verseService';
import { Record } from 'pocketbase';
import AddTagDialog from 'src/components/AddTagDialog.vue';
import { getTagsByVerseAndUser, removeTag as removeTagService } from 'src/services/themeService';
import { CircleCloseFilled } from '@element-plus/icons-vue';

const route = useRoute();
const router = useRouter();
const verseStore = useVerseStore();

const verseName = ref('');
const verseText = ref('');

// load needed data
onMounted(() => {
  if (!route.params.id) {
    return router.push('/verses');
  }

  let verseId: string[];
  try {
    // TODO modify to allow verse range
    verseId = (route.params.id as string).split(':');
  } catch (err) {
    return router.push('/verses');
  }
  if (verseId.length !== 3) {
    return router.push('/verses');
  }

  fetchVerseText(route.params.id as string);

  verseStore.getBible().then(() => {
    // we've already ensured this has length = 3
    buildVerseName(verseId as [string, string, string]);
  });

  fetchUserTags(route.params.id as string);
});

async function fetchVerseText(verseId: string) {
  const verse = await getVerse(verseId);
  verseText.value = verse.verse.verse; // fun naming :)
}

function buildVerseName([bookId, chapter, verse]: [string, string, string]) {
  // at this point the verseStore will have the bible obj
  // if it isn't there, something went wrong
  if (!verseStore.bible) {
    return router.push('/verses');
  }

  // convert bookId to book name
  const _bookId = parseInt(bookId);
  const book = verseStore.bible[_bookId].name;
  verseName.value = `${book} ${chapter}:${verse}`;
}

const tags = ref([] as Record[]);
async function fetchUserTags(verseId: string) {
  tags.value = await getTagsByVerseAndUser(verseId);
}

const flatTags = computed(() => {
  return tags.value.map((tag) => ({
    name: tag['@expand']?.theme?.name,
    id: tag.id,
  }));
});

/* Add Tag Dialog */
const addTagDialogValue = ref(false);

function addTag(tag: Record | null) {
  if (tag) {
    tags.value.push(tag);
  }
  addTagDialogValue.value = false;
}

async function removeTag(tagId: string) {
  await removeTagService(tagId);
  fetchUserTags(route.params.id as string);
}
</script>

<template>
  <div class="card-width">
    <h2 class="underline">{{ verseName }}</h2>
    <p class="mb-6">{{ verseText }}</p>
    <!-- Tags -->
    <p v-if="tags.length === 0">You have not tagged this verse.</p>
    <div v-else>
      <p>You have tagged this verse with the following themes:</p>
      <div class="d-flex">
        <span class="chip mb-2 mr-2 d-flex align-center" v-for="tag in flatTags" :key="tag.id">
          <span class="mr-1">{{ tag.name }}</span>
          <el-icon @click="removeTag(tag.id)">
            <CircleCloseFilled />
          </el-icon>
        </span>
      </div>
    </div>
    <div class="my-2 d-flex">
      <!-- This should open a dialog -->
      <el-button @click="addTagDialogValue = true">Tag this verse</el-button>
    </div>
  </div>
  <add-tag-dialog
    :verse-name="verseName"
    :verse-id="(route.params.id as string)"
    v-model:value="addTagDialogValue"
    @add-tag="addTag"
  />
</template>

<style scoped lang="scss">
@import 'src/assets/variables.scss';

.card-width {
  max-width: $card-width-large;
  margin: auto;
}

.chip {
  line-height: 1em;
  font-size: 1em;
  border-radius: 1em;
  padding: spacing(2);
  background: #eee;

  i.el-icon {
    cursor: pointer;
  }
}
</style>
