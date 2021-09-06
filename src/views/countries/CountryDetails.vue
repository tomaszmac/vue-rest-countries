<template>
  <div class="details">
    <base-button to="/" class="back-btn">
      <ion-icon name="arrow-back-outline" class="details__icon"></ion-icon>
      Back
    </base-button>
    <div class="details__country flex" v-if="isCountryFiltered">
      <div class="details__img-container">
        <img
          :src="detailedCountry.flag"
          :alt="detailedCountry.name + ' flag'"
          class="details__flag"
        />
      </div>
      <div class="details__information flex">
        <h1 class="heading-primary">{{ detailedCountry.name }}</h1>
        <div class="details__lists flex">
          <ul class="details__list">
            <li class="list--item">
              <span class="font-600">Native name: </span>
              {{ detailedCountry.nativeName }}
            </li>
            <li class="list--item">
              <span class="font-600">Population: </span>
              {{ detailedCountry.population.toLocaleString('en-en') }}
            </li>
            <li class="list--item">
              <span class="font-600">Region:</span>
              {{ detailedCountry.region }}
            </li>
            <li class="list--item">
              <span class="font-600">Sub Region: </span>
              {{ detailedCountry.subregion }}
            </li>
            <li class="list--item">
              <span class="font-600">Capital: </span>
              {{ detailedCountry.capital }}
            </li>
          </ul>
          <ul class="details__list">
            <li class="list--item">
              <span class="font-600">Top Level Domain: </span>
              {{ topDomains }}
            </li>
            <li class="list--item">
              <span class="font-600">Currencies: </span>{{ currencies }}
            </li>
            <li class="list--item">
              <span class="font-600">Languages: </span>
              {{ languages }}
            </li>
          </ul>
        </div>
        <div
          class="details__border-countries flex"
          v-if="areThereBorderCountries"
        >
          <div class="left">
            <span class="font-600">Border Countries: </span>
          </div>
          <div class="right flex">
            <base-button
              :to="{
                name: 'CountryDetails',
                params: { country: border, title: border },
              }"
              v-for="border in borderCountryNames"
              :key="border"
            >
              {{ border }}</base-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseButton from '@/components/ui/BaseButton.vue';

export default {
  props: ['country'],
  components: {
    BaseButton,
  },
  created() {
    this.findCountry();
  },
  data() {
    return {
      detailedCountry: null,
    };
  },
  methods: {
    findCountry(route) {
      const { countries } = this.$store.getters;
      const chosenCountry = route?.params.country || this.country;

      // If countries haven't been loaded I want to redirect to the main page.
      if (countries === null) {
        this.$router.push('/');
        return;
      }

      this.detailedCountry = countries.find(
        (country) => country.name === chosenCountry,
      );
    },
    concatenateObjectProperties(obj, propName) {
      let concatenatedString = '';
      obj.forEach((val) => {
        concatenatedString += `${val[propName]}, `;
      });

      return concatenatedString.slice(0, -2);
    },
    findCountryNames() {
      const { countries } = this.$store.getters;
      let fullCountryName;
      const countryNames = [];

      this.detailedCountry.borders.forEach((code) => {
        fullCountryName = countries.find((country) => country.cioc === code);
        if (fullCountryName) {
          countryNames.push(fullCountryName.name);
        }
      });

      return countryNames;
    },
  },
  computed: {
    isCountryFiltered() {
      return this.detailedCountry;
    },
    topDomains() {
      return this.detailedCountry.topLevelDomain.join(',');
    },
    currencies() {
      return this.concatenateObjectProperties(
        this.detailedCountry.currencies,
        'name',
      );
    },
    languages() {
      return this.concatenateObjectProperties(
        this.detailedCountry.languages,
        'name',
      );
    },
    borderCountryNames() {
      return this.findCountryNames();
    },
    areThereBorderCountries() {
      return this.detailedCountry.borders.length !== 0;
    },
  },
  watch: {
    $route(newRoute) {
      this.findCountry(newRoute);
    },
  },
};
</script>

<style lang="scss" scoped>
.details {
  margin: $layout-space-tb;
  color: var(--text-primary-color);

  @media (max-width: 1000px) {
    margin: $layout-space-tb-1000;
  }

  @media (max-width: 600px) {
    margin: $layout-space-tb-600;

    .back-btn {
      margin: 2.4rem 0;
    }
  }

  .details__icon {
    width: 1.6rem;
    height: 1.6rem;
    fill: var(--text-primary-color);
    margin-right: 1rem;
  }

  .details__country {
    margin-top: 4.6rem;
    align-items: center;
    gap: 4rem;
    font-size: $default-font-size;

    @media (max-width: 600px) {
      flex-direction: column;
    }

    .details__img-container {
      min-width: 50%;
      padding-right: 4rem;

      @media (max-width: 600px) {
        padding-right: 0;
      }

      .details__flag {
        width: 100%;
        height: auto;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
      }
    }

    .details__information {
      flex-direction: column;
      min-width: 50%;

      .heading-primary {
        font-size: 2.8rem;
      }

      .details__lists {
        margin: 2rem 0;
        gap: 3rem;
        line-height: 1.6;

        @media (max-width: 1000px) {
          flex-direction: column;
        }

        @media (max-width: 600px) {
          flex-direction: column;
          line-height: 2;
        }

        .details__list {
          list-style: none;
        }
      }

      .details__border-countries {
        margin-top: 2.2rem;
        align-items: center;

        .left {
          margin-top: 1rem;
          margin-right: 2.2rem;
        }

        .right {
          align-items: center;
          flex-wrap: wrap;
          flex: 1;
        }

        a {
          margin-top: 1rem;
        }

        a:not(:last-child) {
          margin-right: 0.75rem;
        }
      }
    }
  }
}
</style>
