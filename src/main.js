import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import BaseSpinner from '@/components/ui/BaseSpinner.vue';

createApp(App)
  .use(router)
  .use(store)
  .component('base-spinner', BaseSpinner)
  .mount('#app');
