import {
  GET_LEADERBOARD_USERS,
  SET_LEADERBOARD_USERS,
} from "./leaderboard.constants";
import { ActionWithPayload, UserDetails } from "../store";

export const getLeaderboardUsers = (
  numberOfUsers: number
): ActionWithPayload<{ numberOfUsers: number }> => ({
  type: GET_LEADERBOARD_USERS,
  payload: {
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
