import { ActionWithPayload, UserLoginInformation } from "../store";
import { SET_USER_ACCESS_TOKEN } from "./user.constants";

const initialState: UserLoginInformation = { accessToken: "" };

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
    default:
      return state;
  }
};

export default userReducer;
