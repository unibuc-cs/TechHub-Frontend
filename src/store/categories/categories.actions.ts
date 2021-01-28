import { Action } from "redux";
import { ActionWithPayload, CategoryCard } from "../store";
import { GET_CATEGORIES, SET_CATEGORIES } from "./categories.constants";

export const getCategories = (): Action => ({
  type: GET_CATEGORIES,
});

export const setCategories = (
  categories: CategoryCard[]
): ActionWithPayload<{ categories: CategoryCard[] }> => ({
  type: SET_CATEGORIES,
  payload: {
    categories,
  },
});
