import { takeEvery, put } from "redux-saga/effects";
import { ActionWithPayload, Discount, PurchasedDiscount } from "../store";
import {
  GET_PURCHASED_DISCOUNTS_BY_USER,
  ADD_PURCHASED_DISCOUNTS,
} from "./purchasedDiscounts.constants";
import {
  setPurchasedDiscounts,
  setNewPurchasedDiscount,
} from "./purchasedDiscounts.actions";

function* getPurchasedDiscountsByUserSaga(
  action: ActionWithPayload<{ accessToken: string; email: string }>
) {
  try {
    const finalPurchasedDiscounts: PurchasedDiscount[] = [];
    const initialPurchasedDiscounts: any = yield fetch(
      `http://127.0.0.1:8080/purchasedDiscount/purchasedDiscountsByPurchaser/${action.payload.email}`,
      {
        method: "GET",
        headers: {
          Authorization: action.payload.accessToken,
        },
      }
    ).then((res) => res.json());

    // add Discount to each purchased discount
    for (let index = 0; index < initialPurchasedDiscounts.length; index++) {
      const discount: Discount = yield fetch(
        `http://127.0.0.1:8080/discount/${initialPurchasedDiscounts[index].discountId}`,
        {
          method: "GET",
          headers: {
            Authorization: action.payload.accessToken,
          },
        }
      ).then((res) => res.json());

      finalPurchasedDiscounts.push({
        datePurchased: initialPurchasedDiscounts[index].datePurchased,
        discount,
        id: initialPurchasedDiscounts[index].id,
        pointsSpent: initialPurchasedDiscounts[index].pointsSpent,
        purchaserEmail: initialPurchasedDiscounts[index].purchasedEmail,
      });
    }

    yield put(setPurchasedDiscounts(finalPurchasedDiscounts));
  } catch (e) {
    console.warn(e);
  }
}

function* addPurchasedDiscountSaga(
  action: ActionWithPayload<{
    accessToken: string;
    purchaserEmail: string;
    pointsSpent: number;
    discountId: string;
    datePurchased: string;
  }>
) {
  try {
    const data = {
      purchaserEmail: action.payload.purchaserEmail,
      pointsSpent: action.payload.pointsSpent,
      discountId: action.payload.discountId,
    };

    const newInitialPurchasedDiscount: any = yield fetch(
      "http://127.0.0.1:8080/purchasedDiscount",
      {
        method: "POST",
        headers: {
          Authorization: action.payload.accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    ).then((res) => res.json());

    console.log(newInitialPurchasedDiscount.purchasedDiscountModelId);

    const discount: Discount = yield fetch(
      `http://127.0.0.1:8080/discount/${action.payload.discountId}`,
      {
        method: "GET",
        headers: {
          Authorization: action.payload.accessToken,
        },
      }
    ).then((res) => res.json());

    const newPurchasedDiscount: PurchasedDiscount = {
      datePurchased: newInitialPurchasedDiscount.datePurchased,
      discount,
      id: newInitialPurchasedDiscount.purchasedDiscountModelId,
      pointsSpent: newInitialPurchasedDiscount.pointsSpent,
      purchaserEmail: newInitialPurchasedDiscount.purchaserEmail,
    };

    yield put(setNewPurchasedDiscount(newPurchasedDiscount));
  } catch (e) {
    console.warn(e);
  }
}

export default function* purchasedDiscountsSaga() {
  yield takeEvery(
    GET_PURCHASED_DISCOUNTS_BY_USER,
    getPurchasedDiscountsByUserSaga
  );
  yield takeEvery(ADD_PURCHASED_DISCOUNTS, addPurchasedDiscountSaga);
}
