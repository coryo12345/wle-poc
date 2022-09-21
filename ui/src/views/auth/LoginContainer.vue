<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from 'src/services/authService';
import { ClientResponseError } from 'pocketbase';
import { ElNotification } from 'element-plus';

const FIELD_NAMES: Record<string, string> = {
  email: 'E-mail',
  password: 'Password',
};

const router = useRouter();

const loading = ref(false);
const form = reactive({
  email: '',
  password: '',
});

async function _login() {
  try {
    loading.value = true;
    await login(form.email, form.password);
    // success, go home
    router.push('/');
  } catch (error) {
    loading.value = false;
    const err = error as ClientResponseError;
    const problems = err.data.data;
    Object.keys(problems).forEach((field) => {
      ElNotification({
        title: 'Error',
        type: 'error',
        message: `${FIELD_NAMES[field]}: ${problems[field].message}`,
        duration: 0,
      });
    });
  }
}

function _register() {
  router.push('/register');
}
</script>

<template>
  <el-card class="login-card" v-loading="loading">
    <h2 class="text-align-center">Log In</h2>
    <el-form>
      <el-form-item label="E-mail">
        <el-input v-model="form.email" placeholder="Enter E-mail" />
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="form.password" type="password" show-password placeholder="Enter Password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="_login">Sign In</el-button>
        <span class="mx-2 bold">OR</span>
        <el-button @click="_register">Sign Up</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped lang="scss">
@import 'src/assets/variables.scss';

.login-card {
  max-width: $card-width;
  margin: spacing(8) auto 0 auto;
}
</style>
