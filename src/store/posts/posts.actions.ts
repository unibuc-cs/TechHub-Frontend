import {
  CREATE_POST,
  GET_POSTS_BY_THREAD,
  SET_POSTS,
  ADD_POST,
  ADD_UPVOTE,
  REMOVE_UPVOTE,
  ADD_DOWNVOTE,
  REMOVE_DOWNVOTE,
  EDIT_POST,
  DELETE_POST,
  AWARD_TROPHY,
  SET_CURRENT_THREAD_HAS_TROPHY,
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

export const addUpvote = (
  accessToken: string,
  currentEmail: string,
  post: PostInformation
): ActionWithPayload<{
  accessToken: string;
  currentEmail: string;
  post: PostInformation;
}> => ({
  type: ADD_UPVOTE,
  payload: {
    accessToken,
    currentEmail,
    post,
  },
});

export const removeUpvote = (
  accessToken: string,
  currentEmail: string,
  post: PostInformation
): ActionWithPayload<{
  accessToken: string;
  currentEmail: string;
  post: PostInformation;
}> => ({
  type: REMOVE_UPVOTE,
  payload: {
    accessToken,
    currentEmail,
    post,
  },
});

export const addDownvote = (
  accessToken: string,
  currentEmail: string,
  post: PostInformation
): ActionWithPayload<{
  accessToken: string;
  currentEmail: string;
  post: PostInformation;
}> => ({
  type: ADD_DOWNVOTE,
  payload: {
    accessToken,
    currentEmail,
    post,
  },
});

export const removeDownvote = (
  accessToken: string,
  currentEmail: string,
  post: PostInformation
): ActionWithPayload<{
  accessToken: string;
  currentEmail: string;
  post: PostInformation;
}> => ({
  type: REMOVE_DOWNVOTE,
  payload: {
    accessToken,
    currentEmail,
    post,
  },
});

export const editPost = (
  accessToken: string,
  newText: string,
  postId: string
): ActionWithPayload<{
  accessToken: string;
  newText: string;
  postId: string;
}> => ({
  type: EDIT_POST,
  payload: {
    accessToken,
    newText,
    postId,
  },
});

export const deletePost = (
  accessToken: string,
  postId: string
): ActionWithPayload<{ accessToken: string; postId: string }> => ({
  type: DELETE_POST,
  payload: {
    accessToken,
    postId,
  },
});

export const awardTrophy = (
  accessToken: string,
  postId: string
): ActionWithPayload<{ accessToken: string; postId: string }> => ({
  type: AWARD_TROPHY,
  payload: {
    accessToken,
    postId,
  },
});

export const setCurrentThreadHasTrophy = (
  hasTrophy: boolean
): ActionWithPayload<{ hasTrophy: boolean }> => ({
  type: SET_CURRENT_THREAD_HAS_TROPHY,
  payload: {
    hasTrophy,
  },
});
