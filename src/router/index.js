import { createRouter, createWebHistory } from 'vue-router';
import CountriesList from '@/views/countries/CountriesList.vue';
import CountryDetails from '@/views/countries/CountryDetails.vue';

const routes = [
  {
    path: '/',
    name: 'CountriesList',
    component: CountriesList,
    meta: {
      title: 'Home',
    },
  },
  {
    path: '/:country',
    name: 'CountryDetails',
    component: CountryDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _, next) => {
  const title = to.meta.title ? to.meta.title : to.params.title;
  document.title = `${title} | Where in the world? `;
  next();
});
export default router;
