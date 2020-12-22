import {
  CREATE_POST,
  GET_POSTS_BY_THREAD,
  SET_POSTS,
  ADD_POST,
} from "./posts.constants";
import { ActionWithPayload, PostInformation } from "../store";

export const getPostsByThread = (
  accessToken: string,
  threadId: string
): ActionWithPayload<{ accessToken: string; threadId: string }> => ({
  type: GET_POSTS_BY_THREAD,
  payload: {
    accessToken,
    threadId,
  },
});

export const setPosts = (
  posts: PostInformation[]
): ActionWithPayload<{ posts: PostInformation[] }> => ({
  type: SET_POSTS,
  payload: {
    posts,
  },
});

export const createNewPost = (
  accessToken: string,
  userEmail: string,
  threadId: string,
  text: string
): ActionWithPayload<{
  accessToken: string;
  userEmail: string;
  threadId: string;
  text: string;
}> => ({
  type: CREATE_POST,
  payload: {
    accessToken,
    userEmail,
    threadId,
    text,
  },
});

export const addPost = (
  newPost: PostInformation
): ActionWithPayload<{ newPost: PostInformation }> => ({
  type: ADD_POST,
  payload: {
    newPost,
  },
});
