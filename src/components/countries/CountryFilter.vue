<template>
  <div class="filter flex">
    <div class="filter__search flex">
      <ion-icon name="search" class="filter__icon"></ion-icon>
      <input
        type="text"
        placeholder="Search for a country"
        class="filter__input"
        @change="searchForCountry"
      />
    </div>
    <div class="filter__region flex">
      <div class="filter__select flex" @click="toggleFilter">
        <p class="filter__paragraph">{{ filterMessage }}</p>
        <ion-icon name="chevron-down-outline" v-if="!isFilterActive"></ion-icon>
        <ion-icon name="chevron-up-outline" v-else></ion-icon>
      </div>
      <div v-show="isFilterActive" class="filter__list-container flex">
        <ul class="filter__list" @click="getValueFromList">
          <li class="filter__item">All</li>
          <li class="filter__item">Africa</li>
          <li class="filter__item">Americas</li>
          <li class="filter__item">Asia</li>
          <li class="filter__item">Europe</li>
          <li class="filter__item">Oceania</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['input-country', 'filter'],
  data() {
    return {
      isFilterActive: null,
      activeRegionFilter: 'Filter by Region',
    };
  },
  methods: {
    toggleFilter() {
      this.isFilterActive = !this.isFilterActive;
    },
    getValueFromList(e) {
      if (e.target.tagName !== 'LI') return;

      const region = e.target.textContent;
      this.activeRegionFilter = region === 'All' ? 'Filter by Region' : region;

      // Toggle filter
      this.isFilterActive = !this.isFilterActive;
      this.$emit('filter', region);
    },
    searchForCountry(e) {
      const countryName = e.target.value;
      this.$emit('input-country', countryName);
    },
  },
  computed: {
    filterMessage() {
      return this.activeRegionFilter;
    },
  },
};
</script>

<style lang="scss" scoped>
.filter {
  position: relative;
  min-height: 5.4rem;
  margin: $layout-space-tb;
  justify-content: space-between;
  color: var(--text-primary-color);
  font-size: $default-font-size-home;

  @media (max-width: 1000px) {
    margin: $layout-space-tb-1000;
  }

  @media (max-width: 600px) {
    margin: 2.8rem 2.4rem;
    flex-direction: column;
  }

  .filter__region,
  .filter__search {
    background-color: var(--background-color-elements);
    align-items: center;
    box-shadow: 0 2px 12px rgba(56, 56, 56, 0.1);
    border-radius: 4px;
    overflow: hidden;
    transition: background-color 0.3s;
  }

  .filter__search {
    min-width: 35%;

    @media (max-width: 600px) {
      min-height: 4.8rem;
    }

    .filter__icon {
      width: 2.2rem;
      height: 2.2rem;
      margin-left: 2.2rem;
      fill: var(--input-primary-color);
    }

    .filter__input {
      width: 100%;
      padding: 1.2rem 2.4rem;
      border: none;
      background-color: var(--background-color-elements);
      color: var(--text-primary-color);
      transition: background-color 0.3s;
      font-size: inherit;

      &::placeholder {
        color: var(--input-primary-color);
      }

      &:focus {
        outline: none;
      }
    }
  }

  .filter__region {
    width: 18rem;
    font-size: 1.4rem;
    font-weight: 600;

    @media (max-width: 600px) {
      margin-top: 3.8rem;
      min-height: 4.8rem;
    }

    .filter__select {
      height: 100%;
      width: 100%;
      padding: 0 2rem;
      cursor: pointer;
      justify-content: space-between;
      align-items: center;

      .filter__paragraph {
        margin-right: 1.2rem;
        user-select: none;
      }
    }

    .filter__list-container {
      position: absolute;
      top: 5.8rem;
      right: 0;
      width: 18rem;
      align-content: flex-start;
      background-color: var(--background-color-elements);
      border-radius: 4px;
      line-height: 1.7;
      font-weight: 600;
      font-size: 1.4rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
      z-index: 99;

      @media (max-width: 600px) {
        top: 12.8rem;
        left: 0;
      }

      .filter__list {
        list-style: none;
        padding: 2rem 2rem;
        user-select: none;

        .filter__item {
          cursor: pointer;
          transition: all 0.3s;

          &:hover {
            color: #707374;
          }
        }
      }
    }
  }
}
</style>
