<template>
  <main>
    <CountryFilter
      @input-country="searchForCountry"
      @filter="searchFilteredCountries"
    />
    <section class="countries">
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <div v-else-if="hasCountries" class="countries__list">
        <CountryItem
          v-for="(country, index) in filteredCountries"
          :key="index"
          :countryFlagSrc="country.flag"
          :countryName="country.name"
          :countryPopulation="country.population"
          :countryRegion="country.region"
          :countryCapital="country.capital"
        />
      </div>
      <h2 class="heading-secondary" v-else>
        {{ errorMessage || 'No countries found. Please try another query.' }}
      </h2>
    </section>
  </main>
</template>

<script>
import CountryFilter from '@/components/countries/CountryFilter.vue';
import CountryItem from '@/components/countries/CountryItem.vue';

export default {
  name: 'CountriesList',
  components: {
    CountryItem,
    CountryFilter,
  },
  data() {
    return {
      error: null,
      isLoading: null,
      countryFilter: {
        name: null,
        region: null,
      },
    };
  },
  created() {
    if (this.$store.getters.countries === null) this.loadCountries();
  },
  computed: {
    filteredCountries() {
      const { countries } = this.$store.getters;
      const name = this.countryFilter.name?.toLowerCase();
      const region = this.countryFilter.region?.toLowerCase();
      const isFilterOff = !name && (!region || region === 'all');

      if (isFilterOff) {
        return countries;
      }

      return countries.filter((country) => {
        if (name && region) {
          return (
            // eslint-disable-next-line operator-linebreak
            country.name.toLowerCase().includes(name) &&
            country.region.toLowerCase() === region
          );
        }
        if (name) {
          return country.name.toLowerCase().includes(name);
        }
        if (region) {
          return country.region.toLowerCase() === region;
        }
        return false;
      });
    },
    hasCountries() {
      return !this.isLoading && this.filteredCountries.length !== 0;
    },
  },
  methods: {
    async loadCountries() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('fetchAllCountries');
      } catch (err) {
        this.errorMessage = err.message || 'Something went wrong';
      }
      this.isLoading = false;
    },
    searchForCountry(country) {
      this.countryFilter.name = country;
    },
    searchFilteredCountries(region) {
      this.countryFilter.region = region;
    },
  },
};
</script>

<style lang="scss" scoped>
.countries {
  margin: $layout-space;

  @media (max-width: 1000px) {
    margin: $layout-space-1000;
  }

  @media (max-width: 600px) {
    margin: $layout-space-600;
  }

  .countries__list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 6rem;

    @media (max-width: 1000px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 900px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
