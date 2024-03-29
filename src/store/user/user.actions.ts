import { Action } from "redux";
import { ActionWithPayload } from "../store";
import {
  LOGIN_GET_USER_INFO,
  REGISTER_SEND_INFORMATION,
  SET_USER_ACCESS_TOKEN,
  USER_DID_REGISTER,
  SAVE_USER_EMAIL,
  USER_LOGOUT,
} from "./user.constants";

export const getUserInformation = (
  email: string,
  password: string
): ActionWithPayload<{ email: string; password: string }> => ({
  type: LOGIN_GET_USER_INFO,
  payload: {
    email,
    password,
  },
});

export const sendRegisterInformation = (
  email: string,
  username: string,
  password: string,
  userType: string
): ActionWithPayload<{
  email: string;
  password: string;
  username: string;
  userType: string;
}> => ({
  type: REGISTER_SEND_INFORMATION,
  payload: {
    email,
    username,
    password,
    userType,
  },
});

export const setUserAccessToken = (
  accessToken: string
): ActionWithPayload<{ accessToken: string }> => ({
  type: SET_USER_ACCESS_TOKEN,
  payload: {
    accessToken,
  },
});

export const setUserDidRegister = (): Action => ({
  type: USER_DID_REGISTER,
});

export const setUserEmail = (
  email: string
): ActionWithPayload<{ email: string }> => ({
  type: SAVE_USER_EMAIL,
  payload: {
    email,
  },
});

export const logoutUser = (): Action => ({
  type: USER_LOGOUT,
});
