import { Action } from "redux";
import { ActionWithPayload, Discount } from "../store";
import {
  GET_DISCOUNTS,
  SET_DISCOUNTS,
  ADD_DISCOUNT,
  SET_NEW_DISCOUNT,
  DELETE_DISCOUNT,
  SEARCH_DISCOUNTS,
} from "./discounts.constants";

export const getAllDiscounts = (): Action => ({
  type: GET_DISCOUNTS,
});

export const setDiscounts = (
  discounts: Discount[]
): ActionWithPayload<{ discounts: Discount[] }> => ({
  type: SET_DISCOUNTS,
  payload: {
    discounts,
  },
});

export const addDiscount = (
  accessToken: string,
  sellerEmail: string,
  title: string,
  description: string,
  pictures: string[],
  pointsCost: number,
  vipStatus: boolean
): ActionWithPayload<{
  accessToken: string;
  sellerEmail: string;
  title: string;
  description: string;
  pictures: string[];
  pointsCost: number;
  vipStatus: boolean;
}> => ({
  type: ADD_DISCOUNT,
  payload: {
    accessToken,
    sellerEmail,
    title,
    description,
    pictures,
    pointsCost,
    vipStatus,
  },
});

export const setNewDiscount = (
  newDiscount: Discount
): ActionWithPayload<{ newDiscount: Discount }> => ({
  type: SET_NEW_DISCOUNT,
  payload: {
    newDiscount,
  },
});

export const deleteDiscount = (
  accessToken: string,
  id: string
): ActionWithPayload<{ accessToken: string; id: string }> => ({
  type: DELETE_DISCOUNT,
  payload: {
    accessToken,
    id,
  },
});

export const searchDiscounts = (
  accessToken: string,
  searchInput: string
): ActionWithPayload<{ accessToken: string; searchInput: string }> => ({
  type: SEARCH_DISCOUNTS,
  payload: {
    accessToken,
    searchInput,
  },
});
