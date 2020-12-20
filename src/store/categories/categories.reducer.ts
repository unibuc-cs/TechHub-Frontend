import {
  ActionWithPayload,
  CategoryCard,
  CategoriesInformation,
} from "../store";
import { SET_CATEGORIES } from "./categories.constants";

const initialState: CategoriesInformation = {
  categories: [],
};

const categoriesReducer = (
  state = initialState,
  action: ActionWithPayload<unknown>
) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: [
          ...(action as ActionWithPayload<{ categories: CategoryCard[] }>)
            .payload.categories,
        ],
      };
    default:
      return state;
  }
};

export default categoriesReducer;
