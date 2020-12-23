import {
  ActionWithPayload,
  ThreadInformation,
  ThreadStateInformation,
} from "../store";
import { SET_THREADS, ADD_THREAD } from "./threads.constants";

const initialState: ThreadStateInformation = {
  threads: [],
};

const threadsReducer = (
  state = initialState,
  action: ActionWithPayload<unknown>
) => {
  switch (action.type) {
    case SET_THREADS:
      return {
        ...state,
        threads: [
          ...(action as ActionWithPayload<{ threads: ThreadInformation[] }>)
            .payload.threads,
        ],
      };
    case ADD_THREAD:
      return {
        ...state,
        threads: [
          ...state.threads,
          (action as ActionWithPayload<{
            accessToken: string;
            newThread: ThreadInformation;
          }>).payload.newThread,
        ],
      };
    default:
      return state;
  }
};

export default threadsReducer;
