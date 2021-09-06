<template>
  <router-link :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: ['to', 'mode'],
};
</script>

<style lang="scss" scoped>
a:link,
a:visited {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: 0.75rem 2.2rem;
  font-size: 1.4rem;
  background-color: var(--background-color-elements);
  color: var(--text-primary-color);
  border: 1px solid #a8a8a8;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(37, 22, 22, 0.3);
  transition: all 0.3s;
}

a:hover,
a:active {
  transform: translateY(-3px);
  box-shadow: 0 4px 4px rgba(145, 145, 145, 0.5);
}
</style>
