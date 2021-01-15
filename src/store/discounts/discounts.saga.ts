import { takeEvery, put } from "redux-saga/effects";
import { ActionWithPayload, Discount } from "../store";
import {
  GET_DISCOUNTS,
  ADD_DISCOUNT,
  DELETE_DISCOUNT,
} from "./discounts.constants";
import {
  setDiscounts,
  setNewDiscount,
  deleteDiscount,
} from "./discounts.actions";

function* getAllDiscounts(action: ActionWithPayload<{ accessToken: string }>) {
  try {
    const discounts: Discount[] = yield fetch(
      "http://127.0.0.1:8080/discount",
      {
        method: "GET",
        headers: {
          Authorization: action.payload.accessToken,
        },
      }
    ).then((res) => res.json());
    yield put(setDiscounts(discounts));
  } catch (e) {
    console.warn(e);
  }
}

function* addDiscount(
  action: ActionWithPayload<{
    accessToken: string;
    sellerEmail: string;
    title: string;
    description: string;
    pictures: string[];
    pointsCost: number;
  }>
) {
  try {
    const data = {
      sellerEmail: action.payload.sellerEmail,
      title: action.payload.title,
      description: action.payload.description,
      pictures: [...action.payload.pictures],
      pointsCost: action.payload.pointsCost,
    };

    const res: any = yield fetch("http://127.0.0.1:8080/discount", {
      method: "POST",
      headers: {
        Authorization: action.payload.accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    const newDiscount: Discount = {
      ...data,
      id: res.discountId,
    };
    yield put(setNewDiscount(newDiscount));
  } catch (e) {
    console.log(e);
  }
}

function* deleteDiscountSaga(
  action: ActionWithPayload<{
    accessToken: string;
    id: string;
  }>
) {
  try {
    yield fetch(`http://127.0.0.1:8080/discount/${action.payload.id}`, {
      method: "DELETE",
      headers: {
        Authorization: action.payload.accessToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (e) {
    console.warn(e);
  }
}

export default function* discountsSaga() {
  yield takeEvery(GET_DISCOUNTS, getAllDiscounts);
  yield takeEvery(ADD_DISCOUNT, addDiscount);
  yield takeEvery(DELETE_DISCOUNT, deleteDiscountSaga);
}
