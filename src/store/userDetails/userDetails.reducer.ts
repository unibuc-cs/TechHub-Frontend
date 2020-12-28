import {
  ActionWithPayload,
  UserDetailsStateInformation,
  UserDetails,
} from "../store";
import { SET_USER_DETAILS } from "./userDetails.constants";

const initialState: UserDetailsStateInformation = {
  details: {
    accountStatus: "",
    currentPoints: 0,
    email: "",
    password: "",
    profilePicture: "",
    totalPoints: 0,
    type: "",
    username: "",
    vipStatus: false,
  },
};

const userDetailsReducer = (
  state = initialState,
  action: ActionWithPayload<unknown>
) => {
  switch (action.type) {
    case SET_USER_DETAILS:
      return {
        ...state,
        details: (action as ActionWithPayload<{ details: UserDetails }>).payload
          .details,
      };
    default:
      return state;
  }
};

export default userDetailsReducer;
