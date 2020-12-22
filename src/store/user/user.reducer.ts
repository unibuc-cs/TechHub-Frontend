import { ActionWithPayload, UserLoginInformation } from "../store";
import {
  SET_USER_ACCESS_TOKEN,
  USER_DID_REGISTER,
  SAVE_USER_EMAIL,
} from "./user.constants";

const initialState: UserLoginInformation = {
  accessToken: "",
  didRegister: false,
  currentUserEmail: "",
};

const userReducer = (
  state = initialState,
  action: ActionWithPayload<unknown>
) => {
  switch (action.type) {
    case SET_USER_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: (action as ActionWithPayload<{ accessToken: string }>)
          .payload.accessToken,
      };
    case USER_DID_REGISTER:
      return {
        ...state,
        didRegister: true,
      };
    case SAVE_USER_EMAIL:
      return {
        ...state,
        currentUserEmail: (action as ActionWithPayload<{ email: string }>)
          .payload.email,
      };
    default:
      return state;
  }
};

export default userReducer;
