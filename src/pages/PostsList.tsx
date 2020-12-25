/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  getPostsByThread,
  createNewPost,
  addUpvote,
  removeUpvote,
  addDownvote,
  removeDownvote,
  editPost,
  deletePost,
} from "../store/posts/posts.actions";
import { postsSelector } from "../store/posts/posts.selector";
import styled from "styled-components";
import {
  accessTokenSelector,
  currentEmailSelector,
} from "../store/user/user.selector";
import { PostInformation } from "../store/store";
import PostCard from "../components/Post/PostCard";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 8px;
`;

const PostTitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: flex-start;
`;

const PostTextFont = styled.p`
  margin-top: 0;
  font-size: 1.1em;
`;

const PostTextContainer = styled.div`
  width: 100%;
  box-shadow: 4px 4px 4px #231f20;
  border: 1px solid #231f20;
  padding: 4px;
  margin-top: -35px;
`;

const ThreadTitle = styled.p`
  font-size: 2.7em;
  font-weight: bold;
  margin-top: 0;
  word-wrap: break-word;
`;

const ThreadSubtitle = styled.p`
  font-size: 1.7em;
  font-style: italic;
  margin-top: 5px;
`;

const PostsListsContainer = styled.div`
  width: 100%;
  margin: 8px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CreatePostContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px 0;
`;

const ButtonContainer = styled.div`
  margin-left: 16px;
`;

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const PostsList = () => {
  const location = useLocation();

  const dispatch = useDispatch();

  const currentEmail = useSelector(currentEmailSelector);
  const accessToken = useSelector(accessTokenSelector);
  const posts = useSelector(postsSelector);

  const [newPostText, setNewPostText] = useState<string>("");

  const onNewPostTextChangedHandler = (e: any) => {
    setNewPostText(e.target.value);
  };

  const onAddNewPost = () => {
    dispatch(
      createNewPost(
        accessToken,
        currentEmail,
        (location.state as any).threadInformation.id,
        newPostText
      )
    );
    refreshAfterNewPost();
  };

  const onAddUpvote = (post: PostInformation) => {
    dispatch(addUpvote(accessToken, currentEmail, post));
  };

  const onRemoveUpvote = (post: PostInformation) => {
    dispatch(removeUpvote(accessToken, currentEmail, post));
  };

  const onAddDownvote = (post: PostInformation) => {
    dispatch(addDownvote(accessToken, currentEmail, post));
  };

  const onRemoveDownvote = (post: PostInformation) => {
    dispatch(removeDownvote(accessToken, currentEmail, post));
  };

  const onEditPost = (newText: string, postId: string) => {
    dispatch(editPost(accessToken, newText, postId));
  };

  const onDeletePost = (postId: string) => {
    dispatch(deletePost(accessToken, postId));
  };

  const refreshAfterNewPost = () => {
    setNewPostText("");
    dispatch(
      getPostsByThread(
        accessToken,
        (location.state as any).threadInformation.id
      )
    );
  };

  useEffect(() => {
    dispatch(
      getPostsByThread(
        accessToken,
        (location.state as any).threadInformation.id
      )
    );
  }, []);

  return (
    <Container>
      <PostTitleContainer>
        <ThreadTitle>
          {(location.state as any).threadInformation.title}
        </ThreadTitle>
        <PostTextContainer>
          <PostTextFont>
            {(location.state as any).threadInformation.text}
          </PostTextFont>
        </PostTextContainer>
        <ThreadSubtitle>
          {`By ${
            (location.state as any).threadInformation.ownerEmail
          } on ${new Date(
            (location.state as any).threadInformation.dateCreated
          ).getDate()} ${
            months[
              new Date(
                (location.state as any).threadInformation.dateCreated
              ).getMonth()
            ]
          } at ${new Date(
            (location.state as any).threadInformation.dateCreated
          ).getHours()}:${new Date(
            (location.state as any).threadInformation.dateCreated
          ).getMinutes()}`}
        </ThreadSubtitle>
      </PostTitleContainer>
      <PostsListsContainer>
        {posts.length > 0 ? (
          posts.map((post: PostInformation) => (
            <PostCard
              postInfo={post}
              key={post.id}
              currentEmail={currentEmail}
              onAddUpvote={onAddUpvote}
              onRemoveUpvote={onRemoveUpvote}
              onAddDownvote={onAddDownvote}
              onRemoveDownvote={onRemoveDownvote}
              onEditPost={onEditPost}
              onDeletePost={onDeletePost}
            />
          ))
        ) : (
          <h1>There are no posts yet.</h1>
        )}
      </PostsListsContainer>
      <CreatePostContainer>
        <TextField
          placeholder="Say something..."
          multiline
          variant="outlined"
          color="secondary"
          style={{ width: "50%" }}
          onChange={onNewPostTextChangedHandler}
          value={newPostText}
        />
        <ButtonContainer>
          <Button
            variant="contained"
            style={{ backgroundColor: "#228B22", color: "white" }}
            onClick={onAddNewPost}
          >
            Post
          </Button>
        </ButtonContainer>
      </CreatePostContainer>
    </Container>
  );
};

export default PostsList;
