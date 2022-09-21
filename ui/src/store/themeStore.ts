import { defineStore } from 'pinia';
import { getAllThemes } from 'src/services/themeService';
import { Record } from 'pocketbase';

type State = {
  themes: null | Record[];
};

export const useThemeStore = defineStore('theme', {
  state: (): State => ({
    themes: null,
  }),
  actions: {
    async getThemes() {
      if (this.themes) return this.themes;
      this.themes = await getAllThemes();
      return this.themes;
    },
  },
});

export default useThemeStore;
