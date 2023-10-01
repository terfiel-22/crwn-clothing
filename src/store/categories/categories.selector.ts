import { createSelector } from "reselect";
import { CategoriesState } from "./categories.reducer";
import { Category, CategoryMap } from "./categories.types";
import { RootState } from "../store";

const selectCategoryReducer = (state: RootState): CategoriesState =>
  state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice): Category[] => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap => {
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap);
  }
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice): boolean => categoriesSlice.isLoading
);
