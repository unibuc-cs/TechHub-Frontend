import { ThreadInformation, ActionWithPayload } from "../store";
import {
  GET_ALL_THREADS,
  GET_THREADS_BY_CATEGORY,
  SET_THREADS,
  ADD_THREAD,
  SEARCH_THREADS,
} from "./threads.constants";

export const getAllThreads = (
  accessToken: string
): ActionWithPayload<{ accessToken: string }> => ({
  type: GET_ALL_THREADS,
  payload: {
    accessToken,
  },
});

export const getThreadsByCategory = (
  accessToken: string,
  category: string
): ActionWithPayload<{ accessToken: string; category: string }> => ({
  type: GET_THREADS_BY_CATEGORY,
  payload: {
    accessToken,
    category,
  },
});

export const setThreads = (
  threads: ThreadInformation[]
): ActionWithPayload<{ threads: ThreadInformation[] }> => ({
  type: SET_THREADS,
  payload: {
    threads,
  },
});

export const addThread = (
  accessToken: string,
  newThread: ThreadInformation
): ActionWithPayload<{
  accessToken: string;
  newThread: ThreadInformation;
}> => ({
  type: ADD_THREAD,
  payload: {
    accessToken,
    newThread,
  },
});

export const searchThreads = (
  accessToken: string,
  searchInput: string,
  category: string
): ActionWithPayload<{
  accessToken: string;
  searchInput: string;
  category: string;
}> => ({
  type: SEARCH_THREADS,
  payload: {
    accessToken,
    searchInput,
    category,
  },
});
