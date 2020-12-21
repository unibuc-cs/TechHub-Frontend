import {
  ActionWithPayload,
  ThreadInformation,
  ThreadStateInformation,
} from "../store";
import { SET_THREADS } from "./threads.constants";

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
    default:
      return state;
  }
};

export default threadsReducer;
