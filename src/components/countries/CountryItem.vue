<template>
  <div class="country__card flex" @click="goToDetails">
    <img :src="countryFlagSrc[1]" alt="" class="country__flag" />
    <div class="country__details">
      <h2 class="heading-secondary">{{ this.countryName }}</h2>
      <p class="paragraph">
        <span class="font-600">Population: </span
        >{{ countryPopulationNormalized }}
      </p>
      <p class="paragraph">
        <span class="font-600">Region: </span>{{ this.countryRegion }}
      </p>
      <p class="paragraph">
        <span class="font-600">Capital: </span>{{ this.countryCapital }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    countryFlagSrc: {
      type: Array,
      required: true,
    },
    countryName: {
      type: String,
      required: true,
    },
    countryPopulation: {
      type: Number,
    },
    countryRegion: {
      type: String,
    },
    countryCapital: {
      type: String,
    },
  },
  computed: {
    countryPopulationNormalized() {
      return this.countryPopulation?.toLocaleString('en-en');
    },
  },
  methods: {
    goToDetails() {
      this.$router.push({
        name: 'CountryDetails',
        params: { country: this.countryName, title: this.countryName },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.country__card {
  width: 100%;
  cursor: pointer;
  flex-direction: column;
  background-color: var(--background-color-elements);
  padding-bottom: 2.4rem;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s;
  border: 1px solid var(--background-color-primary);
  color: var(--text-primary-color);

  &:hover {
    transform: translateY(-3px) skewX(1deg);
    box-shadow: 2px 6px 10px rgba(0, 0, 0, 0.1);
  }

  .country__flag {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .country__details {
    padding: 0 2rem;

    .paragraph {
      font-size: 1.4rem;
      padding-bottom: 1.2rem;
    }
  }
}
</style>
