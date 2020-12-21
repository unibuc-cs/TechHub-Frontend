import { ThreadInformation, ActionWithPayload } from "../store";
import {
  GET_ALL_THREADS,
  GET_THREADS_BY_CATEGORY,
  SET_THREADS,
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
