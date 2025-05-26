<template>
  <header class="header" role="banner" aria-label="Filter options">
    <div class="header__button-row">
      <section
        class="header__button-row__results-number"
        aria-label="Number of results"
      >
        <div class="header__button-row__results-number__showing">
          <Typeography
            string="Showing"
            component="p"
            text="result-total"
            weight="700"
            colour="result-total"
          />
        </div>
        <Typeography
          :string="`${filtered_results_total ?? 0} Cars`"
          component="p"
          text="result-total"
          weight="700"
          colour="#000000"
        />
      </section>
      <nav class="header__button-row__buttons" aria-label="Filter results">
        <Button
          type="header"
          string="All"
          font_colour="#000000"
          :selected="selectedTab === 'All'"
          @click="() => filterButtonSelect('All')"
        />
        <Button
          type="header"
          string="Used"
          font_colour="#000000"
          :selected="selectedTab === 'Used'"
          @click="() => filterButtonSelect('Used')"
        />
        <Button
          type="header"
          string="New"
          font_colour="#000000"
          :selected="selectedTab === 'New'"
          @click="() => filterButtonSelect('New')"
        />
        <Button
          type="header"
          string="Offers"
          font_colour="#000000"
          :selected="selectedTab === 'Offers'"
          @click="() => filterButtonSelect('Offers')"
        />
      </nav>
      <div
        class="header__button-row__filters"
        aria-label="Additional filter options"
      >
        <Select
          :options="dropdownOptions"
          placeholder="Filter Data"
          @selected="handleDropdownSelect"
        />
      </div>
    </div>
    <div class="header__mobile_sub-nav">
      <section
        class="header__mobile_sub-nav__results-number"
        aria-label="Number of results"
      >
        <div class="header__mobile_sub-nav__results-number__showing">
          <Typeography
            string="Showing"
            component="p"
            text="mobile-sub-nav"
            weight="400"
            colour="result-total"
          />
        </div>
        <Typeography
          :string="`${
            filtered_results_total ?? 0
          } of ${original_results_total} Cars`"
          component="p"
          text="mobile-sub-nav"
          weight="400"
          colour="#000000"
        />
      </section>
      <div
        class="header__mobile_sub-nav__filters"
        aria-label="Additional filter options"
      >
        <Select
          :options="dropdownOptions"
          placeholder="Filter Data"
          @selected="handleDropdownSelect"
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import Button from "@atoms/Button.vue";
import Select from "@atoms/Select.vue";
import Typeography from "@atoms/Typeography.vue";

import { useResultsStore } from "@stores/resultsStore";

const resultsStore = useResultsStore();

const { filtered_results_total, original_results_total } =
  storeToRefs(resultsStore);

const selectedTab = ref("All");
const selectedFilter = ref("All");

const dropdownOptions = [
  { label: "Lowest Price", value: "lowest_price" },
  { label: "Low Milage", value: "low_milage" },
];

function filterButtonSelect(tab: string) {
  selectedTab.value = tab;

  console.log(tab);

  switch (tab) {
    case "All":
      resultsStore.filterAll();
      break;
    case "Used":
      resultsStore.filterUsed();
      break;
    case "New":
      resultsStore.filterNew();
      break;
    case "Offers":
      resultsStore.filterOffers();
      break;
    default:
      console.log(`Unhandled filter tab: ${tab}`);
  }
}

function handleDropdownSelect(filter: string) {
  console.log("Selected from dropdown:", filter);
  selectedFilter.value = filter;

  switch (filter) {
    case "lowest_price":
      resultsStore.sortByLowestPrice();
      break;
    case "low_milage":
      resultsStore.sortByLowMilage();
      break;
    default:
      console.log(`Unhandled dropdown filter: ${filter}`);
  }
}
</script>

<style lang="scss">
.header {
  width: 100%;
  height: 90px;

  @media (min-width: 760px) {
    width: 669px;
    height: 50px;
  }

  @media (min-width: 1079px) {
    min-width: 85%;
  }

  &__button-row {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__results-number {
      display: none;

      @media (min-width: 760px) {
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }

      &__showing {
        display: none;

        @media (min-width: 1079px) {
          display: block;
          margin-right: 5px;
        }
      }
    }

    &__buttons {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      @media (min-width: 760px) {
        width: 356px;
        height: 30px;
        gap: 10px;
        display: flex;
        justify-content: start;
        align-items: center;
      }
    }

    &__filters {
      display: none;

      @media (min-width: 760px) {
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
    }
  }

  &__mobile_sub-nav {
    margin-top: 22px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (min-width: 760px) {
      display: none;
    }

    &__results-number {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      &__showing {
        display: block;
        margin-right: 5px;
      }
    }

    &__filters {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
}
</style>