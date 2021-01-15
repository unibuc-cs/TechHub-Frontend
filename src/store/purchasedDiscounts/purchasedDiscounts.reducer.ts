import {
  ActionWithPayload,
  PurchasedDiscount,
  PurchasedDiscountsStateInformation,
} from "../store";
import {
  SET_PURCHASED_DISCOUNTS,
  SET_NEW_PURCHASED_DISCOUNT,
} from "./purchasedDiscounts.constants";

const initialState: PurchasedDiscountsStateInformation = {
  purchasedDiscounts: [],
};

const purchasedDiscountsReducer = (
  state = initialState,
  action: ActionWithPayload<unknown>
) => {
  switch (action.type) {
    case SET_PURCHASED_DISCOUNTS:
      return {
        ...state,
        discounts: [
          ...(action as ActionWithPayload<{ discounts: PurchasedDiscount[] }>)
            .payload.discounts,
        ],
      };
    case SET_NEW_PURCHASED_DISCOUNT:
      return {
        ...state,
        discounts: [
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
