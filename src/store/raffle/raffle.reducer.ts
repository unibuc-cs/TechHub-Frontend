import { ActionWithPayload, RaffleStateInformation, Raffle } from "../store";
import {
  CLOSE_NOTIFICATION,
  GET_ACTIVE_RAFFLE,
  GET_PREVIOUS_RAFFLE,
  RAFFLE_REGISTER,
  SET_ACTIVE_RAFFLE,
  SET_PREVIOUS_RAFFLE,
} from "./raffle.constants";

const initialState: RaffleStateInformation = {
  activeRaffle: {
    createTime: {
      seconds: 0,
      nanos: 0,
    },
    drawTime: {
      seconds: 0,
      nanos: 0,
    },
    entries: [],
    id: "",
    isActive: false,
    prize: 0,
    winner: "",
    winnerUsername: "",
  },
  previousRaffle: {
    createTime: {
      seconds: 0,
      nanos: 0,
    },
    drawTime: {
      seconds: 0,
      nanos: 0,
    },
    entries: [],
    id: "",
    isActive: false,
    prize: 0,
    winner: "",
    winnerUsername: "",
  },
  loading: false,
  notificationClosed: false,
};

const raffleReducer = (
  state = initialState,
  action: ActionWithPayload<unknown>
) => {
  switch (action.type) {
    case GET_ACTIVE_RAFFLE:
      return {
        ...state,
        loading: true,
      };
    case SET_ACTIVE_RAFFLE:
      return {
        ...state,
        activeRaffle: (action as ActionWithPayload<{ raffle: Raffle }>).payload
          .raffle,
        loading: false,
      };
    case GET_PREVIOUS_RAFFLE:
      return {
        ...state,
        loading: true,
      };
    case SET_PREVIOUS_RAFFLE:
      return {
        ...state,
        previousRaffle: (action as ActionWithPayload<{ raffle: Raffle }>)
          .payload.raffle,
        loading: false,
      };
    case RAFFLE_REGISTER:
      return {
        ...state,
        activeRaffle: {
          ...state.activeRaffle,
          entries: [
            ...state.activeRaffle.entries,
            (action as ActionWithPayload<{
              accessToken: string;
              email: string;
            }>).payload.email,
          ],
          prize: state.activeRaffle.prize + 50,
        },
      };
    case CLOSE_NOTIFICATION:
      return {
        ...state,
        notificationClosed: true,
      };
    default:
      return state;
  }
};

export default raffleReducer;
