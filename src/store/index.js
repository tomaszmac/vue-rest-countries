import { createStore } from 'vuex';

const store = createStore({
  state: {
    countries: null,
    theme: null,
  },
  mutations: {
    loadAllCountries(state, payload) {
      state.countries = payload;
    },
    setTheme(state, payload) {
      localStorage.setItem('user-theme', payload);
      state.theme = payload;
      document.documentElement.className = payload;
    },
  },
  actions: {
    async fetchAllCountries({ commit }) {
      const response = await fetch('https://restcountries.com/v2/all');
      const data = await response.json();

      if (!response.ok) {
        const error = new Error(data.message) || 'Failed to fetch data';
        throw error;
      }

      commit('loadAllCountries', data);
    },
    toggleDarkMode({ commit }) {
      const activeTheme = localStorage.getItem('user-theme');
      if (activeTheme === 'light-theme') {
        commit('setTheme', 'dark-theme');
      } else {
        commit('setTheme', 'light-theme');
      }
    },
    setPreferredTheme({ commit }, payload) {
      commit('setTheme', payload);
    },
  },
  getters: {
    countries(state) {
      return state.countries;
    },
    theme(state) {
      return state.theme;
    },
    isDarkMode(state) {
      if (state.theme === 'dark-theme') {
        return true;
      }
      return false;
    },
  },
});

export default store;
