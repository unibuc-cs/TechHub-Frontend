import {
  ActionWithPayload,
  Discount,
  DiscountsStateInformation,
} from "../store";
import {
  GET_DISCOUNTS,
  SET_DISCOUNTS,
  SET_NEW_DISCOUNT,
  DELETE_DISCOUNT,
} from "./discounts.constants";

const initialState: DiscountsStateInformation = {
  discounts: [],
  loading: false,
};

const discountsReducer = (
  state = initialState,
  action: ActionWithPayload<unknown>
) => {
  switch (action.type) {
    case GET_DISCOUNTS:
      return {
        ...state,
        loading: true,
      };
    case SET_DISCOUNTS:
      return {
        ...state,
        discounts: [
          ...(action as ActionWithPayload<{ discounts: Discount[] }>).payload
            .discounts,
        ],
        loading: false,
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
