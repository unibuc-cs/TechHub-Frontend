import { takeEvery, put } from "redux-saga/effects";
import { ActionWithPayload, PostInformation } from "../store";
import { GET_POSTS_BY_THREAD, CREATE_POST } from "./posts.constants";
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
    put(addPost(newPost));
  } catch (e) {
    console.warn(e);
  }
}

export default function* postsSaga() {
  yield takeEvery(GET_POSTS_BY_THREAD, getPostsByThread);
  yield takeEvery(CREATE_POST, addNewPost);
}
