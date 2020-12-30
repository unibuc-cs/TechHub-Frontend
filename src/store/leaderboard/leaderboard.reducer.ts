import {
  ActionWithPayload,
  LeaderboardStateInformation,
  UserDetails,
} from "../store";
import { SET_LEADERBOARD_USERS } from "./leaderboard.constants";

const initialState: LeaderboardStateInformation = {
  topUsers: [],
};

const leaderboardReducer = (
  state = initialState,
  action: ActionWithPayload<unknown>
) => {
  switch (action.type) {
    case SET_LEADERBOARD_USERS:
      return {
        ...state,
        topUsers: (action as ActionWithPayload<{ topUsers: UserDetails[] }>)
          .payload.topUsers,
      };
    default:
      return state;
  }
};

export default leaderboardReducer;
