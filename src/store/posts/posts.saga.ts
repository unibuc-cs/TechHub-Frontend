import { takeEvery, put } from "redux-saga/effects";
import { ActionWithPayload, PostInformation } from "../store";
import {
  GET_POSTS_BY_THREAD,
  CREATE_POST,
  ADD_UPVOTE,
  REMOVE_UPVOTE,
  ADD_DOWNVOTE,
  REMOVE_DOWNVOTE,
} from "./posts.constants";
import { setPosts, addPost } from "./posts.actions";

function* getPostsByThread(
  action: ActionWithPayload<{ accessToken: string; threadId: string }>
) {
  try {
    const posts: PostInformation[] = yield fetch(
      `http://127.0.0.1:8080/thread/${action.payload.threadId}/posts`,
      {
        method: "GET",
        headers: {
          Authorization: action.payload.accessToken,
        },
      }
    ).then((res) => res.json());
    console.log(posts);
    yield put(setPosts(posts));
  } catch (e) {
    console.warn(e);
  }
}

function* addNewPost(
  action: ActionWithPayload<{
    accessToken: string;
    userEmail: string;
    threadId: string;
    text: string;
  }>
) {
  try {
    const data = {
      userEmail: action.payload.userEmail,
      threadId: action.payload.threadId,
      text: action.payload.text,
      upvotes: [],
      downvotes: [],
    };
    const newPostId: any = yield fetch(`http://127.0.0.1:8080/post`, {
      method: "POST",
      headers: {
        Authorization: action.payload.accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
    const newPost: PostInformation = {
      dateCreated: new Date().toString(),
      downvotes: [],
      upvotes: [],
      hasTrophy: false,
      id: newPostId.postId,
      postNumber: 0,
      text: action.payload.text,
      threadId: action.payload.threadId,
      userEmail: action.payload.userEmail,
    };
    yield put(addPost(newPost));
  } catch (e) {
    console.warn(e);
  }
}

function* addUpvote(
  action: ActionWithPayload<{
    accessToken: string;
    currentEmail: string;
    post: PostInformation;
  }>
) {
  try {
    const newUpvotes = [
      ...action.payload.post.upvotes,
      action.payload.currentEmail,
    ];
    const data = {
      upvotes: newUpvotes,
    };
    yield console.log(JSON.stringify(data));
    yield fetch(`http://127.0.0.1:8080/post/${action.payload.post.id}`, {
      method: "PUT",
      headers: {
        Authorization: action.payload.accessToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    });
  } catch (e) {
    console.warn(e);
  }
}

function* removeUpvote(
  action: ActionWithPayload<{
    accessToken: string;
    currentEmail: string;
    post: PostInformation;
  }>
) {
  try {
    const newUpvotes = action.payload.post.upvotes.filter(
      (email: string) => email !== action.payload.currentEmail
    );
    const data = {
      upvotes: newUpvotes,
    };
    yield console.log(JSON.stringify(data));
    yield fetch(`http://127.0.0.1:8080/post/${action.payload.post.id}`, {
      method: "PUT",
      headers: {
        Authorization: action.payload.accessToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    });
  } catch (e) {
    console.warn(e);
  }
}

function* addDownvote(
  action: ActionWithPayload<{
    accessToken: string;
    currentEmail: string;
    post: PostInformation;
  }>
) {
  try {
    const newDownvotes = [
      ...action.payload.post.downvotes,
      action.payload.currentEmail,
    ];
    const data = {
      downvotes: newDownvotes,
    };
    yield console.log(JSON.stringify(data));
    yield fetch(`http://127.0.0.1:8080/post/${action.payload.post.id}`, {
      method: "PUT",
      headers: {
        Authorization: action.payload.accessToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    });
  } catch (e) {
    console.warn(e);
  }
}

function* removeDownvote(
  action: ActionWithPayload<{
    accessToken: string;
    currentEmail: string;
    post: PostInformation;
  }>
) {
  try {
    const newDownvotes = action.payload.post.downvotes.filter(
      (email: string) => email !== action.payload.currentEmail
    );
    const data = {
      downvotes: newDownvotes,
    };
    yield console.log(JSON.stringify(data));
    yield fetch(`http://127.0.0.1:8080/post/${action.payload.post.id}`, {
      method: "PUT",
      headers: {
        Authorization: action.payload.accessToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    });
  } catch (e) {
    console.warn(e);
  }
}

export default function* postsSaga() {
  yield takeEvery(GET_POSTS_BY_THREAD, getPostsByThread);
  yield takeEvery(CREATE_POST, addNewPost);
  yield takeEvery(ADD_UPVOTE, addUpvote);
  yield takeEvery(REMOVE_UPVOTE, removeUpvote);
  yield takeEvery(ADD_DOWNVOTE, addDownvote);
  yield takeEvery(REMOVE_DOWNVOTE, removeDownvote);
}
