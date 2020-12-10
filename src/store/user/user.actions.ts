import { ActionWithPayload } from "../store";
import {
  LOGIN_GET_USER_INFO,
  REGISTER_SEND_INFORMATION,
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
  password: string,
  username: string
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
