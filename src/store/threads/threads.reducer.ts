import {
  ActionWithPayload,
  ThreadInformation,
  ThreadStateInformation,
} from "../store";
import {
  GET_THREADS_BY_CATEGORY,
  GET_VIP_THREADS_BY_CATEGORY,
  SEARCH_THREADS,
  SEARCH_VIP_THREADS,
  SET_THREADS,
  SET_NEW_THREAD,
} from "./threads.constants";

const initialState: ThreadStateInformation = {
  threads: [],
  loading: false,
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
        loading: false,
      };
    case SET_NEW_THREAD:
      return {
        ...state,
        threads: [
          ...state.threads,
          (action as ActionWithPayload<{
            newThread: ThreadInformation;
          }>).payload.newThread,
        ],
      };
    case GET_THREADS_BY_CATEGORY:
      return {
        ...state,
        loading: true,
      };
    case GET_VIP_THREADS_BY_CATEGORY:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_THREADS:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_VIP_THREADS:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default threadsReducer;
