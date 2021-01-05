import { UserDetails, ActionWithPayload } from "../store";
import {
  GET_USER_DETAILS_BY_EMAIL,
  SET_USER_DETAILS,
  CHANGE_PROFILE_PICTURE,
} from "./userDetails.constants";

export const getUserDetailsByEmail = (
  accessToken: string,
  email: string
): ActionWithPayload<{ accessToken: string; email: string }> => ({
  type: GET_USER_DETAILS_BY_EMAIL,
  payload: {
    accessToken,
    email,
  },
});

export const setUserDetails = (
  details: UserDetails
): ActionWithPayload<{ details: UserDetails }> => ({
  type: SET_USER_DETAILS,
  payload: {
    details,
  },
});

export const changeProfilePicture = (
  accessToken: string,
  email: string,
  newImage: string
): ActionWithPayload<{
  accessToken: string;
  email: string;
  newImage: string;
}> => ({
  type: CHANGE_PROFILE_PICTURE,
  payload: {
    accessToken,
    email,
    newImage,
  },
});
