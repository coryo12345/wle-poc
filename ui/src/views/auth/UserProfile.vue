<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useAuthStore } from 'src/store/authStore';
import { Admin, User } from 'pocketbase';
import { Check } from '@element-plus/icons-vue';
import { Profile } from 'src/models/auth';

const authStore = useAuthStore();

const user = ref(null as User | Admin | null);

onMounted(() => {
  user.value = authStore.getUser();
});

const email = computed({
  get() {
    return user.value?.email ? user.value.email : 'No email given';
  },
  set(val) {
    if (!user.value) return;
    user.value.email = val;
  },
});

const emailVerified = computed(() => {
  return user.value && (user.value as User)?.verified !== undefined ? (user.value as User).verified : false;
});

const name = computed({
  get() {
    if (user.value && (user.value as User).profile) {
      const profile = (user.value as User).profile as unknown as Profile;
      return profile.name ? profile.name : '';
    }
  },
  set(val) {
    if (user.value && (user.value as User).profile) {
      const profile = (user.value as User).profile as unknown as Profile;
      const v = val ? val : '';
      profile.name = v;
    }
  },
});

const createdDate = computed(() => {
  if (user.value?.created) {
    return new Date(user.value.created).toLocaleString();
  }
  return '';
});

function verifyEmail() {
  // TODO
  alert('VERIFY EMAIL');
}

function saveName() {
  // TODO
  alert('SAVE NAME');
}
</script>

<template>
  <div class="card-width">
    <h2 class="underline mb-4">Edit Profile</h2>

    <el-tooltip
      class="box-item"
      effect="dark"
      content="Email has not been verified"
      placement="top"
      :disabled="emailVerified"
    >
      <div class="d-flex flex-nowrap mb-2">
        <span class="d-flex align-center mr-2">Email: </span>
        <el-input v-model="email" disabled>
          <template #append>
            <el-icon v-if="emailVerified"><Check /></el-icon>
            <div v-else>
              <el-button @click="verifyEmail">Verify</el-button>
            </div>
          </template>
        </el-input>
      </div>
    </el-tooltip>

    <div class="d-flex flex-nowrap mb-2">
      <span class="d-flex align-center mr-2">Name: </span>
      <el-input v-model="name">
        <template #append>
          <el-button @click="saveName">Save</el-button>
        </template>
      </el-input>
    </div>

    <p>
      Account created on:<span class="ml-1 bold">{{ createdDate }}</span>
    </p>
  </div>
</template>

<style scoped lang="scss">
@import 'src/assets/variables.scss';

.card-width {
  max-width: $card-width-large;
  margin: auto;
}

span {
  vertical-align: middle;
}
</style>
