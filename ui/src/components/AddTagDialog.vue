<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import useThemeStore from 'src/store/themeStore';
import { Record } from 'pocketbase';
import { addTag } from 'src/services/themeService';
import { ElMessage } from 'element-plus';

const props = defineProps<{ verseName: string; verseId: string; value?: boolean }>();
const emit = defineEmits<{
  (e: 'update:value', value: boolean): void;
  (e: 'add-tag', value: Record | null): void;
}>();

const themeStore = useThemeStore();

/* DIALOG MODEL */
const _val = computed({
  get() {
    return props.value !== undefined ? props.value : false;
  },
  set(val) {
    emit('update:value', val);
  },
});

/* THEME LIST */
onMounted(() => {
  themeStore.getThemes();
});

const themes = computed(() => {
  return themeStore.themes ? themeStore.themes : [];
});

/* AUTO-COMPLETE SETUP */
const searchVal = ref('');

function searchThemes(text: string, callback: Function) {
  const _text = text.toLocaleLowerCase();
  const results = text.length
    ? themes.value.filter((theme) => (theme.name as string).toLocaleLowerCase().includes(_text))
    : themes.value;
  console.log(text, results);
  callback(results);
}

function selectTheme(val: Record) {
  searchVal.value = val.name;
}

/* SUBMIT BUTTON */
const submitLoading = ref(false);

const submitDisabled = computed(() => {
  return !themes.value.some((theme) => theme.name === searchVal.value);
});

async function saveTag() {
  submitLoading.value = true;
  const theme = themes.value.find((theme) => theme.name === searchVal.value);
  if (!theme) {
    submitLoading.value = false;
    ElMessage({
      message: 'Unable to add tag. Please try again later.',
      type: 'error',
    });
    return;
  }
  const resp = await addTag(props.verseId, theme);
  submitLoading.value = false;
  emit('add-tag', resp);
}
</script>

<template>
  <el-dialog v-model="_val" :show-close="false" :title="`Add Tag to ${props.verseName}`" v-loading="submitLoading">
    <el-autocomplete
      v-model="searchVal"
      :fetch-suggestions="searchThemes"
      clearable
      class="inline-input w-50"
      placeholder="Select a Theme"
      @select="selectTheme"
    >
      <template #default="{ item }">
        <span>{{ item.name }}</span>
      </template>
    </el-autocomplete>
    <template #footer>
      <div class="d-flex">
        <el-button type="primary" :disabled="submitDisabled" @click="saveTag">Save</el-button>
      </div>
    </template>
  </el-dialog>
</template>
