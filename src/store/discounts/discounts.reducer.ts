import {
  ActionWithPayload,
  Discount,
  DiscountsStateInformation,
} from "../store";
import {
  SET_DISCOUNTS,
  SET_NEW_DISCOUNT,
  DELETE_DISCOUNT,
} from "./discounts.constants";

const initialState: DiscountsStateInformation = {
  discounts: [],
};

const discountsReducer = (
  state = initialState,
  action: ActionWithPayload<unknown>
) => {
  switch (action.type) {
    case SET_DISCOUNTS:
      return {
        ...state,
        discounts: [
          ...(action as ActionWithPayload<{ discounts: Discount[] }>).payload
            .discounts,
        ],
      };
    case SET_NEW_DISCOUNT:
      return {
        ...state,
        discounts: [
          ...state.discounts,
          (action as ActionWithPayload<{ newDiscount: Discount }>).payload
            .newDiscount,
        ],
      };
    case DELETE_DISCOUNT:
      return {
        ...state,
        discounts: state.discounts.filter(
          (discount: Discount) =>
            discount.id !==
            (action as ActionWithPayload<{ accessToken: string; id: string }>)
              .payload.id
        ),
      };
    default:
      return state;
  }
};

export default discountsReducer;
