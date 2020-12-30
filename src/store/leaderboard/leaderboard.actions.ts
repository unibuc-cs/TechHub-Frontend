import {
  GET_LEADERBOARD_USERS,
  SET_LEADERBOARD_USERS,
} from "./leaderboard.constants";
import { ActionWithPayload, UserDetails } from "../store";

export const getLeaderboardUsers = (
  accessToken: string,
  numberOfUsers: number
): ActionWithPayload<{ accessToken: string; numberOfUsers: number }> => ({
  type: GET_LEADERBOARD_USERS,
  payload: {
    accessToken,
    numberOfUsers,
  },
});

export const setLeaderboardUsers = (
  topUsers: UserDetails[]
): ActionWithPayload<{ topUsers: UserDetails[] }> => ({
  type: SET_LEADERBOARD_USERS,
  payload: {
    topUsers,
  },
});
