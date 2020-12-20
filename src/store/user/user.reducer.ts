import { ActionWithPayload, UserLoginInformation } from "../store";
import { SET_USER_ACCESS_TOKEN, USER_DID_REGISTER } from "./user.constants";

const initialState: UserLoginInformation = {
  accessToken: "",
  didRegister: false,
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
    default:
      return state;
  }
};

export default userReducer;
