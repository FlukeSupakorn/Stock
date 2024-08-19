import { atom } from "recoil";

export const loadingState = atom({
  key: "loadingState",
  default: false,
});

export const productsState = atom({
  key: "productsState",
  default: [],
});

export const categoriesState = atom({
  key: "categoriesState",
  default: [],
});

export const selectedFiltersState = atom({
  key: "selectedFiltersState",
  default: {
    category: [],
    priceRange: [0, 100000],
    rating: [],
  },
});