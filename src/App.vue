<template>
  <TheHeader />
  <router-view />
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';

export default {
  components: {
    TheHeader,
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap');
:root {
  --background-color-primary: #fafafa;
  --background-color-elements: #fff;
  --text-primary-color: #111517;
  --input-primary-color: #858585;
}

:root.dark-theme {
  --background-color-primary: #202c37;
  --background-color-elements: #2b3945;
  --text-primary-color: #fff;
  --input-primary-color: #fff;
}

*,
*::after,
*::before {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html {
  // 10px / 16px = 62.5%
  font-size: 62.5%;

  @media (max-width: 1000px) {
    font-size: 56.25%;
  }

  @media (max-width: 600px) {
    font-size: 50%;
  }
}

body {
  font-family: 'Nunito Sans', sans-serif;
  line-height: 1;
  font-weight: 300;
  background-color: var(--background-color-primary);
  transition: background-color 0.3s;
}

input,
select {
  font-family: inherit;
}

input {
  color: var(--background-color-elements);
}

.heading-primary {
  font-size: 2.2rem;
  font-weight: 800;

  @media (max-width: 600px) {
    font-size: 1.6rem;
  }
}

.heading-secondary {
  font-size: 1.8rem;
  margin: 2.4rem 0;
  font-weight: 800;
}

.flex {
  display: flex;
}

.font-600 {
  font-weight: 600;
}
</style>
