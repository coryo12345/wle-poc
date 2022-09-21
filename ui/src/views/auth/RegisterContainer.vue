<script setup lang="ts">
import { reactive, ref } from 'vue';
import { register } from 'src/services/authService';
import { ClientResponseError } from 'pocketbase';
import { ElNotification } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter();

const registerFieldNames: Record<string, string> = {
  email: 'E-mail',
  password: 'Password',
  passwordConfirm: 'Confirm Password',
};

const loading = ref(false);

const form = reactive({
  email: '',
  name: '',
  password: '',
  passwordConfirm: '',
});

async function _register() {
  try {
    loading.value = true;
    await register(form.email, form.name, form.password, form.passwordConfirm);
    // Successful registration -> Go home
    router.push('/');
  } catch (error: unknown) {
    loading.value = false;
    const err = error as ClientResponseError;
    const problems = err.data.data;
    Object.keys(problems).forEach((field) => {
      ElNotification({
        title: 'Error',
        type: 'error',
        message: `${registerFieldNames[field]}: ${problems[field].message}`,
        duration: 0,
      });
    });
  }
}
</script>

<template>
  <el-card class="register-card" v-loading="loading">
    <h2 class="text-align-center">Register</h2>
    <el-form>
      <el-form-item label="E-mail">
        <el-input v-model="form.email" placeholder="Enter E-mail" />
      </el-form-item>
      <el-form-item label="Name">
        <el-input v-model="form.name" placeholder="Enter Name" />
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="form.password" type="password" show-password placeholder="Enter Password" />
      </el-form-item>
      <el-form-item label="Confirm Password">
        <el-input v-model="form.passwordConfirm" type="password" show-password placeholder="Confirm Password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="_register">Sign Up</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped lang="scss">
@import 'src/assets/variables.scss';

.register-card {
  max-width: $card-width;
  margin: spacing(8) auto 0 auto;
}
</style>
