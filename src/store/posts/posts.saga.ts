import { takeEvery, put } from "redux-saga/effects";
import {
  ActionWithPayload,
  PostInformation,
  ThreadInformation,
  UserDetails,
} from "../store";
import {
  GET_POSTS_BY_THREAD,
  CREATE_POST,
  ADD_UPVOTE,
  REMOVE_UPVOTE,
  ADD_DOWNVOTE,
  REMOVE_DOWNVOTE,
  EDIT_POST,
  DELETE_POST,
  AWARD_TROPHY,
} from "./posts.constants";
import {
  setPosts,
  addPost,
  setCurrentThreadHasTrophy,
  setCurrentThreadIsLocked,
} from "./posts.actions";

function* getPostsByThread(action: ActionWithPayload<{ threadId: string }>) {
  try {
    const finalPosts: PostInformation[] = [];
    const initialPosts: PostInformation[] = yield fetch(
      `http://127.0.0.1:8080/thread/${action.payload.threadId}/posts`,
      {
        method: "GET",
      }
    ).then((res) => res.json());

    for (let index = 0; index < initialPosts.length; index++) {
      const details: UserDetails = yield fetch(
        `http://127.0.0.1:8080/user/${initialPosts[index].userEmail}`,
        {
          method: "GET",
        }
      ).then((res) => res.json());

      finalPosts.push({
        ...initialPosts[index],
        userImage: details.profilePicture,
        username: details.username,
        accountStatus: details.accountStatus,
      });
    }

    const thread: ThreadInformation = yield fetch(
      `http://127.0.0.1:8080/thread/${action.payload.threadId}`,
      {
        method: "GET",
      }
    ).then((res) => res.json());

    yield put(setPosts(finalPosts));
    yield put(setCurrentThreadHasTrophy(thread.hasTrophy));
    yield put(setCurrentThreadIsLocked(thread.isLocked));
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
    username: string;
    userPicture: string;
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
      userImage: action.payload.userPicture,
      username: action.payload.username,
      isReported: false,
      accountStatus: "",
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
    console.log(`http://127.0.0.1:8080/post/${action.payload.post.id}/upvote/`);
    yield fetch(
      `http://127.0.0.1:8080/post/${action.payload.post.id}/upvote/`,
      {
        method: "PUT",
        headers: {
          Authorization: action.payload.accessToken,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
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
    yield fetch(
      `http://127.0.0.1:8080/post/${action.payload.post.id}/removeUpvote/`,
      {
        method: "PUT",
        headers: {
          Authorization: action.payload.accessToken,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
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
    yield fetch(
      `http://127.0.0.1:8080/post/${action.payload.post.id}/downvote`,
      {
        method: "PUT",
        headers: {
          Authorization: action.payload.accessToken,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
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
    yield fetch(
      `http://127.0.0.1:8080/post/${action.payload.post.id}/removeDownvote`,
      {
        method: "PUT",
        headers: {
          Authorization: action.payload.accessToken,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (e) {
    console.warn(e);
  }
}

function* editPost(
  action: ActionWithPayload<{
    accessToken: string;
    newText: string;
    postId: string;
  }>
) {
  try {
    const data = {
      text: action.payload.newText,
    };
    yield fetch(`http://127.0.0.1:8080/post/${action.payload.postId}`, {
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

function* deletePost(
  action: ActionWithPayload<{
    accessToken: string;
    postId: string;
  }>
) {
  try {
    yield fetch(`http://127.0.0.1:8080/post/${action.payload.postId}`, {
      method: "DELETE",
      headers: {
        Authorization: action.payload.accessToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (e) {
    console.warn(e);
  }
}

function* awardTrophy(
  action: ActionWithPayload<{
    accessToken: string;
    postId: string;
  }>
) {
  try {
    const data = {
      hasTrophy: true,
    };
    yield fetch(
      `http://127.0.0.1:8080/post/${action.payload.postId}/awardTrophy`,
      {
        method: "PUT",
        headers: {
          Authorization: action.payload.accessToken,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(data),
      }
    );
    yield put(setCurrentThreadHasTrophy(true));
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
  yield takeEvery(EDIT_POST, editPost);
  yield takeEvery(DELETE_POST, deletePost);
  yield takeEvery(AWARD_TROPHY, awardTrophy);
}
