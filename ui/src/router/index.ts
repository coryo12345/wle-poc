import { useAuthStore } from 'src/store/authStore';
import { createRouter, createWebHistory } from 'vue-router';
import LoginContainer from 'src/views/auth/LoginContainer.vue';
import RegisterContainer from 'src/views/auth/RegisterContainer.vue';
import MainApp from 'src/views/MainApp.vue';
// import OAuthLogin from 'src/views/auth/OAuthLogin.vue';
// import OAuthRedirect from 'src/views/auth/OAuthRedirect.vue';
import HomeContainer from 'src/views/home/HomeContainer.vue';
import ThemesContainer from 'src/views/themes/ThemesContainer.vue';
import VersesContainer from 'src/views/verses/VersesContainer.vue';
import ViewVerse from 'src/views/verses/ViewVerse.vue';
import ViewTheme from 'src/views/themes/ViewTheme.vue';
import UserProfile from 'src/views/auth/UserProfile.vue';
import { refreshToken, logout } from 'src/services/authService';

const authStore = useAuthStore();

const routes = [
  // These routes can be enabled if email/password authentication is enabled
  { path: '/login', component: LoginContainer },
  { path: '/register', component: RegisterContainer },
  // These routes can be enabled to use oauth instead
  // { path: '/login', component: OAuthLogin },
  // { path: '/redirect', component: OAuthRedirect },
  {
    path: '/',
    component: MainApp,
    children: [
      { path: '/', component: HomeContainer },
      { path: '/profile', component: UserProfile },
      { path: '/themes', component: ThemesContainer },
      { path: '/theme/:name', component: ViewTheme },
      { path: '/verses', component: VersesContainer },
      { path: '/verse/:id', component: ViewVerse },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Attempt to refresh auth token
router.beforeEach(async () => {
  const expDate = authStore.getTokenExpDate();
  const now = new Date();
  // token still valid
  if (now < expDate) return;
  // token has expired, attempt to refresh
  try {
    await refreshToken();
  } catch (err) {
    // failed to refresh the token, logout...
    logout(false);
  }
});
