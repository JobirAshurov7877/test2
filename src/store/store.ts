// store.ts
import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./categoriesSlice";
import rootSlice from "./rootSlice";
import subrootReducer from "./subrootSlice";
import subServiceSlice from "./subServiceSlice";
import rootWithServicesSlice from "./rootWithServicesSlice";
import rootsSlice from "./rootsSlice";
import blogSlice from "./blogSlice";
import articlesSlice from "./articlesSlice";
import blogCategorySlice from "./blogCategorySlice";
import blogFilteredSlice from "./blogFilteredSlice";
import blogSingleSlice from "./blogSingleSlice";
import pricingSlice from "./pricingSlice";

const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    root: rootSlice,
    subroot: subrootReducer,
    subservice: subServiceSlice,
    rootWithServicesSlice: rootWithServicesSlice,
    roots: rootsSlice,
    blog: blogSlice,
    articles: articlesSlice,
    blogCategory: blogCategorySlice,
    filteredCategory: blogFilteredSlice,
    blogSinglePage: blogSingleSlice,
    pricingData: pricingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
