import { ActionWithPayload } from "../store";
import { LOGIN_GET_USER_INFO } from "./user.constants";

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
