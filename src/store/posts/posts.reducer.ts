import {
  ActionWithPayload,
  PostStateInformation,
  PostInformation,
} from "../store";
import { SET_POSTS, ADD_POST } from "./posts.constants";

const initialState: PostStateInformation = {
  posts: [],
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
    default:
      return state;
  }
};

export default postsReducer;
