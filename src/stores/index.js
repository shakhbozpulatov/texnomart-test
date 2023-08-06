import { defineStore } from "pinia";

export const useSearchResult = defineStore("search", {
  state: () => ({ searchData: [] }),
});
