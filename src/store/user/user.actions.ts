import { Action } from "redux";
import { ActionWithPayload } from "../store";
import {
  LOGIN_GET_USER_INFO,
  REGISTER_SEND_INFORMATION,
  SET_USER_ACCESS_TOKEN,
  USER_DID_REGISTER,
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
  password: string
): ActionWithPayload<{
  email: string;
  password: string;
  username: string;
}> => ({
  type: REGISTER_SEND_INFORMATION,
  payload: {
    email,
    username,
    password,
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
