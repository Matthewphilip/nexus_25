import { defineStore } from "pinia";
import axios from "axios";

interface Errors {
  data_fetch: string | null;
  filter_all: string | null;
  filter_used: string | null;
  filter_new: string | null;
  filter_offers: string | null;
  lowest_price: string | null;
  low_milage: string | null;
  submit_value: string | null;
}

interface MediaUrl {
  large: string;
  medium: string;
  thumb: string;
}

interface VehicleData {
  advert_classification: string;
  vehicle_id: number;
  attention_grabber: string | null;
  body_type: string;
  body_type_slug: string;
  colour: string;
  company: string;
  date_first_registered: string;
  derivative: string;
  description: string;
  doors: string;
  drivetrain: string;
  extra_description: string;
  fuel_type: string;
  fuel_type_slug: string;
  insurance_group: string;
  location: string;
  location_slug: string;
  make: string;
  make_slug: string;
  model: string;
  model_year: number | null;
  name: string;
  odometer_units: string;
  odometer_value: number;
  original_price: string;
  plate: string;
  previous_keepers: number;
  price: string;
  price_ex_vat: string;
  price_when_new: string;
  range: string;
  range_slug: string;
  reserved: string;
  seats: string;
  site: string;
  site_slug: string;
  slug: string;
  status: string;
  stock_id: string;
  tax_rate_value: string;
  transmission: string;
  vat: string;
  vat_scheme: string;
  vat_when_new: string;
  vin: string;
  vrm: string;
  year: string;
  media_urls: MediaUrl[];
  original_media_urls: string[];
  key_features: string[];
  monthly_payment: string;
  monthly_finance_type: string;
}

interface ResultsStore {
  original_results_data: VehicleData[];
  filtered_results_data: VehicleData[];
  filtered_results_total: number | null;
  original_results_total: number | null;
  screenWidth: number | null;
  error: Errors;
  loading: boolean;
}

export const useResultsStore = defineStore("resultsStore", {
  state: (): ResultsStore => ({
    original_results_data: [],
    filtered_results_data: [],
    filtered_results_total: null,
    original_results_total: null,
    screenWidth: typeof window !== "undefined" ? window.innerWidth : 1024,
    error: {
      data_fetch: "",
      filter_all: "",
      filter_used: "",
      filter_new: "",
      filter_offers: "",
      lowest_price: "",
      low_milage: "",
      submit_value: "",
    },
    loading: false,
  }),

  getters: {
    getResultsData: (state) => state.original_results_data,
    getFilteredResultsData: (state) => state.filtered_results_data,
  },
  actions: {
    async fetchResults() {
      this.loading = true;

      const url =
        "https://m6zhmj6dggvrmepfanilteq4q40rlalu.lambda-url.eu-west-1.on.aws/vehicles";

      try {
        const res = await axios.get(url);

        console.log("data from API:", res.data.data);

        this.original_results_data = res.data.data;
        this.filtered_results_data = res.data.data;

        this.filtered_results_total = this.filtered_results_data.length;
        this.original_results_total = this.original_results_data.length;
      } catch (err: any) {
        this.error.data_fetch = err.message || "Failed to fetch results";
      } finally {
        this.loading = false;
      }
    },

    async filterAll() {
      console.log("hit filter all");
      this.loading = true;

      try {
        this.filtered_results_data = this.original_results_data;

        this.filtered_results_total = this.filtered_results_data.length;
      } catch (err: any) {
        this.error.filter_all = err.message || "Failed to fetch results";
      } finally {
        this.loading = false;
      }
    },

    async filterUsed() {
      console.log("hit filter used");

      this.loading = true;

      try {
        this.filtered_results_data = this.original_results_data.filter(
          (item) => item.advert_classification === "Used"
        );

        this.filtered_results_total = this.filtered_results_data.length;
      } catch (err: any) {
        this.error.filter_used = err.message || "Failed to fetch results";
      } finally {
        this.loading = false;
      }
    },

    async filterNew() {
      console.log("hit filter new");

      this.loading = true;

      try {
        this.filtered_results_data = this.original_results_data.filter(
          (item) => item.advert_classification === "New"
        );

        this.filtered_results_total = this.filtered_results_data.length;
      } catch (err: any) {
        this.error.filter_new = err.message || "Failed to fetch results";
      } finally {
        this.loading = false;
      }
    },

    async filterOffers() {
      console.log("hit filter offers");

      this.loading = true;

      try {
        this.filtered_results_data = this.original_results_data.filter(
          (item) => {
            const originalPrice = parseFloat(item.original_price);
            const currentPrice = parseFloat(item.price);

            if (isNaN(originalPrice) || isNaN(currentPrice)) return false;

            return originalPrice > currentPrice;
          }
        );

        this.filtered_results_total = this.filtered_results_data.length;
      } catch (err: any) {
        this.error.filter_offers = err.message || "Failed to fetch results";
      } finally {
        this.loading = false;
      }
    },

    async sortByLowestPrice() {
      console.log("hit lowest price");

      this.loading = true;
      this.error.filter_offers = null;

      try {
        this.filtered_results_data = [...this.original_results_data].sort(
          (a, b) => parseFloat(a.price ?? "0") - parseFloat(b.price ?? "0")
        );

        this.filtered_results_total = this.filtered_results_data.length;
      } catch (err: any) {
        this.error.lowest_price = err.message || "Failed to fetch results";
      } finally {
        this.loading = false;
      }
    },

    async sortByLowMilage() {
      console.log("hit low milage");

      this.loading = true;

      try {
        this.filtered_results_data = [...this.original_results_data].sort(
          (a, b) => (a.odometer_value ?? 0) - (b.odometer_value ?? 0)
        );

        this.filtered_results_total = this.filtered_results_data.length;
      } catch (err: any) {
        this.error.low_milage = err.message || "Failed to fetch results";
      } finally {
        this.loading = false;
      }
    },

    async submitValueCar(vrm: string, milage: string) {
      console.log("hit submit value car: ", vrm, milage);

      this.loading = true;

      try {
        // Insert post request to submit VRM and milage data for valuation
      } catch (err: any) {
        this.error.submit_value = err.message || "Failed to fetch results";
      } finally {
        this.loading = false;
      }
    },

    initScreenWidthListener() {
      if (typeof window === "undefined") return;
      this.screenWidth = window.innerWidth;
      window.addEventListener("resize", this.updateScreenWidth);
    },

    updateScreenWidth() {
      this.screenWidth = window.innerWidth;
    },
    removeScreenWidthListener() {
      window.removeEventListener("resize", this.updateScreenWidth);
    },
  },
});
