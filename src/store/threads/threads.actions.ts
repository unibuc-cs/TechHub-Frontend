import { ThreadInformation, ActionWithPayload } from "../store";
import {
  GET_ALL_THREADS,
  GET_THREADS_BY_CATEGORY,
  SET_THREADS,
  ADD_THREAD,
  SET_NEW_THREAD,
  SEARCH_THREADS,
  GET_VIP_THREADS_BY_CATEGORY,
  ADD_VIP_THREAD,
  SEARCH_VIP_THREADS,
  LOCK_THREAD,
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

export const setNewThread = (newThread: ThreadInformation) => ({
  type: SET_NEW_THREAD,
  payload: {
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

export const getVipThreadsByCategory = (
  accessToken: string,
  category: string
): ActionWithPayload<{ accessToken: string; category: string }> => ({
  type: GET_VIP_THREADS_BY_CATEGORY,
  payload: {
    accessToken,
    category,
  },
});

export const addVipThread = (
  accessToken: string,
  newThread: ThreadInformation
): ActionWithPayload<{
  accessToken: string;
  newThread: ThreadInformation;
}> => ({
  type: ADD_VIP_THREAD,
  payload: {
    accessToken,
    newThread,
  },
});

export const searchVipThreads = (
  accessToken: string,
  searchInput: string,
  category: string
): ActionWithPayload<{
  accessToken: string;
  searchInput: string;
  category: string;
}> => ({
  type: SEARCH_VIP_THREADS,
  payload: {
    accessToken,
    searchInput,
    category,
  },
});

export const lockThread = (
  accessToken: string,
  threadId: string
): ActionWithPayload<{ accessToken: string; threadId: string }> => ({
  type: LOCK_THREAD,
  payload: {
    accessToken,
    threadId,
  },
});
