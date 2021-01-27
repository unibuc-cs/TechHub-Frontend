import {
  ActionWithPayload,
  PostStateInformation,
  PostInformation,
} from "../store";
import {
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
  SET_CURRENT_THREAD_IS_LOCKED,
} from "./posts.constants";

const initialState: PostStateInformation = {
  posts: [],
  currentThreadHasTrophy: false,
  currentThreadIsLocked: false,
};

const postsReducer = (
  state = initialState,
  action: ActionWithPayload<unknown>
) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: [
          ...(action as ActionWithPayload<{ posts: PostInformation[] }>).payload
            .posts,
        ],
      };
    case ADD_POST:
      return {
        ...state,
        posts: [
          ...state.posts,
          (action as ActionWithPayload<{ newPost: PostInformation }>).payload
            .newPost,
        ],
      };
    case ADD_UPVOTE:
      return {
        ...state,
        posts: state.posts.map((post: PostInformation) => {
          if (
            post.id ===
            (action as ActionWithPayload<{
              accessToken: string;
              currentEmail: string;
              post: PostInformation;
            }>).payload.post.id
          ) {
            return {
              ...post,
              upvotes: [
                ...post.upvotes,
                (action as ActionWithPayload<{
                  accessToken: string;
                  currentEmail: string;
                  post: PostInformation;
                }>).payload.currentEmail,
              ],
            };
          } else {
            return post;
          }
        }),
      };
    case REMOVE_UPVOTE:
      return {
        ...state,
        posts: state.posts.map((post: PostInformation) => {
          if (
            post.id ===
            (action as ActionWithPayload<{
              accessToken: string;
              currentEmail: string;
              post: PostInformation;
            }>).payload.post.id
          ) {
            return {
              ...post,
              upvotes: post.upvotes.filter(
                (email: string) =>
                  email !==
                  (action as ActionWithPayload<{
                    accessToken: string;
                    currentEmail: string;
                    post: PostInformation;
                  }>).payload.currentEmail
              ),
            };
          } else {
            return post;
          }
        }),
      };
    case ADD_DOWNVOTE:
      return {
        ...state,
        posts: state.posts.map((post: PostInformation) => {
          if (
            post.id ===
            (action as ActionWithPayload<{
              accessToken: string;
              currentEmail: string;
              post: PostInformation;
            }>).payload.post.id
          ) {
            return {
              ...post,
              downvotes: [
                ...post.downvotes,
                (action as ActionWithPayload<{
                  accessToken: string;
                  currentEmail: string;
                  post: PostInformation;
                }>).payload.currentEmail,
              ],
            };
          } else {
            return post;
          }
        }),
      };
    case REMOVE_DOWNVOTE:
      return {
        ...state,
        posts: state.posts.map((post: PostInformation) => {
          if (
            post.id ===
            (action as ActionWithPayload<{
              accessToken: string;
              currentEmail: string;
              post: PostInformation;
            }>).payload.post.id
          ) {
            return {
              ...post,
              downvotes: post.downvotes.filter(
                (email: string) =>
                  email !==
                  (action as ActionWithPayload<{
                    accessToken: string;
                    currentEmail: string;
                    post: PostInformation;
                  }>).payload.currentEmail
              ),
            };
          } else {
            return post;
          }
        }),
      };
    case EDIT_POST:
      return {
        ...state,
        posts: state.posts.map((post: PostInformation) => {
          if (
            post.id ===
            (action as ActionWithPayload<{
              accessToken: string;
              newText: string;
              postId: string;
            }>).payload.postId
          ) {
            return {
              ...post,
              text: (action as ActionWithPayload<{
                accessToken: string;
                newText: string;
                postId: string;
              }>).payload.newText,
            };
          } else {
            return post;
          }
        }),
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(
          (post: PostInformation) =>
            post.id !==
            (action as ActionWithPayload<{
              accessToken: string;
              postId: string;
            }>).payload.postId
        ),
      };
    case AWARD_TROPHY:
      return {
        ...state,
        posts: state.posts.map((post: PostInformation) => {
          if (
            post.id ===
            (action as ActionWithPayload<{
              accessToken: string;
              postId: string;
            }>).payload.postId
          ) {
            return {
              ...post,
              hasTrophy: true,
            };
          } else {
            return post;
          }
        }),
      };
    case SET_CURRENT_THREAD_HAS_TROPHY:
      return {
        ...state,
        currentThreadHasTrophy: (action as ActionWithPayload<{
          hasTrophy: boolean;
        }>).payload.hasTrophy,
      };
    case SET_CURRENT_THREAD_IS_LOCKED:
      return {
        ...state,
        currentThreadIsLocked: (action as ActionWithPayload<{
          isLocked: boolean;
        }>).payload.isLocked,
      };
    default:
      return state;
  }
};

export default postsReducer;
