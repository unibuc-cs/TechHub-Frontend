import {
  ActionWithPayload,
  PurchasedDiscount,
  PurchasedDiscountsStateInformation,
} from "../store";
import {
  GET_PURCHASED_DISCOUNTS_BY_USER,
  SET_PURCHASED_DISCOUNTS,
  SET_NEW_PURCHASED_DISCOUNT,
} from "./purchasedDiscounts.constants";

const initialState: PurchasedDiscountsStateInformation = {
  purchasedDiscounts: [],
  loading: false,
};

const purchasedDiscountsReducer = (
  state = initialState,
  action: ActionWithPayload<unknown>
) => {
  switch (action.type) {
    case GET_PURCHASED_DISCOUNTS_BY_USER:
      return {
        ...state,
        loading: true,
      };
    case SET_PURCHASED_DISCOUNTS:
      return {
        ...state,
        purchasedDiscounts: [
          ...(action as ActionWithPayload<{ discounts: PurchasedDiscount[] }>)
            .payload.discounts,
        ],
        loading: false,
      };
    case SET_NEW_PURCHASED_DISCOUNT:
      return {
        ...state,
        purchasedDiscounts: [
          ...state.purchasedDiscounts,
          (action as ActionWithPayload<{
            newPurchasedDiscount: PurchasedDiscount;
          }>).payload.newPurchasedDiscount,
        ],
      };
    default:
      return state;
  }
};

export default purchasedDiscountsReducer;
