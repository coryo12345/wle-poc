import { createRouter, createWebHistory } from 'vue-router';
import LoginContainer from 'src/views/auth/LoginContainer.vue';
import RegisterContainer from 'src/views/auth/RegisterContainer.vue';
import MainApp from 'src/views/MainApp.vue';
import OAuthLogin from 'src/views/auth/OAuthLogin.vue';
import OAuthRedirect from 'src/views/auth/OAuthRedirect.vue';
import HomeContainer from 'src/views/home/HomeContainer.vue';
import ThemesContainer from 'src/views/themes/ThemesContainer.vue';
import VersesContainer from 'src/views/verses/VersesContainer.vue';
import ViewVerse from 'src/views/verses/ViewVerse.vue';
import ViewTheme from '../views/themes/ViewTheme.vue';

const routes = [
  // These routes can be enabled if email/password authentication is enabled
  // { path: '/login', component: LoginContainer },
  // { path: '/register', component: RegisterContainer },
  { path: '/login', component: OAuthLogin },
  { path: '/redirect', component: OAuthRedirect },
  {
    path: '/',
    component: MainApp,
    children: [
      { path: '/', component: HomeContainer },
      { path: '/themes', component: ThemesContainer },
      { path: '/theme/:name', component: ViewTheme },
      { path: '/verses', component: VersesContainer },
      { path: '/verse/:id', component: ViewVerse },
    ],
  },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
export const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});
