import {
  ActionWithPayload,
  UserDetailsStateInformation,
  UserDetails,
} from "../store";
import {
  SET_USER_DETAILS,
  CHANGE_PROFILE_PICTURE,
} from "./userDetails.constants";

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
    trophies: 0,
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
    case CHANGE_PROFILE_PICTURE:
      return {
        ...state,
        details: {
          ...state.details,
          profilePicture: (action as ActionWithPayload<{
            accessToken: string;
            email: string;
            newImage: string;
          }>).payload.newImage,
        },
      };
    default:
      return state;
  }
};

export default userDetailsReducer;
