import { ActionWithPayload, CategoryCard } from "../store";
import { GET_CATEGORIES, SET_CATEGORIES } from "./categories.constants";

export const getCategories = (
  accessToken: string
): ActionWithPayload<{ accessToken: string }> => ({
  type: GET_CATEGORIES,
  payload: {
    accessToken,
  },
});

export const setCategories = (
  categories: CategoryCard[]
): ActionWithPayload<{ categories: CategoryCard[] }> => ({
  type: SET_CATEGORIES,
  payload: {
    categories,
  },
});
