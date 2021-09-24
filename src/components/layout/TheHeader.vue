<template>
  <header class="header flex">
    <h1 class="heading-primary">Where in the world?</h1>
    <div class="header__dark-mode flex" @click="toggleDarkMode">
      <ion-icon v-if="!isDarkMode" name="moon-outline" class="icon"></ion-icon>
      <ion-icon v-else name="moon"></ion-icon>
      <span class="header__span">Dark mode</span>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    toggleDarkMode() {
      const activeTheme = localStorage.getItem('user-theme');
      if (activeTheme === 'light-theme') {
        this.$store.dispatch('toggleDarkMode', 'dark-theme');
      } else {
        this.$store.dispatch('toggleDarkMode', 'light-theme');
      }
    },
    getMediaPreference() {
      const hasDarkPreference = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      if (hasDarkPreference) {
        return 'dark-theme';
      }
      return 'light-theme';
    },
  },
  computed: {
    isDarkMode() {
      return this.$store.getters.isDarkMode;
    },
  },
  mounted() {
    const initUserTheme = this.getMediaPreference();
    this.$store.dispatch('setPreferredTheme', initUserTheme);
  },
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 6.8rem;
  padding: $layout-space;
  justify-content: space-between;
  align-items: center;
  background-color: var(--background-color-elements);
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  color: var(--text-primary-color);
  transition: background-color 0.3s;

  @media (max-width: 1000px) {
    padding: $layout-space-1000;
  }

  @media (max-width: 600px) {
    padding: $layout-space-600;
  }

  .header__dark-mode {
    cursor: pointer;
    align-items: center;
    font-size: 1.8rem;

    @media (max-width: 600px) {
      font-size: 1.6rem;
    }

    .header__span {
      font-weight: 800;
      margin-left: 0.8rem;
    }

    .icon {
      width: 1.6rem;
      height: 1.6rem;
    }
  }
}
</style>
