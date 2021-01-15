import { PurchasedDiscount, ActionWithPayload } from "../store";
import {
  GET_PURCHASED_DISCOUNTS_BY_USER,
  ADD_PURCHASED_DISCOUNTS,
  SET_NEW_PURCHASED_DISCOUNT,
  SET_PURCHASED_DISCOUNTS,
} from "./purchasedDiscounts.constants";

export const getPurchasedDiscountsByUser = (
  accessToken: string,
  email: string
): ActionWithPayload<{ accessToken: string; email: string }> => ({
  type: GET_PURCHASED_DISCOUNTS_BY_USER,
  payload: {
    accessToken,
    email,
  },
});

export const setPurchasedDiscounts = (discounts: PurchasedDiscount[]) => ({
  type: SET_PURCHASED_DISCOUNTS,
  payload: {
    discounts,
  },
});

export const addPurchasedDiscount = (
  accessToken: string,
  purchaserEmail: string,
  pointsSpent: number,
  discountId: string,
  datePurchased: string
): ActionWithPayload<{
  accessToken: string;
  purchaserEmail: string;
  pointsSpent: number;
  discountId: string;
  datePurchased: string;
}> => ({
  type: ADD_PURCHASED_DISCOUNTS,
  payload: {
    accessToken,
    purchaserEmail,
    pointsSpent,
    discountId,
    datePurchased,
  },
});

export const setNewPurchasedDiscount = (
  newPurchasedDiscount: PurchasedDiscount
): ActionWithPayload<{ newPurchasedDiscount: PurchasedDiscount }> => ({
  type: SET_NEW_PURCHASED_DISCOUNT,
  payload: {
    newPurchasedDiscount,
  },
});
