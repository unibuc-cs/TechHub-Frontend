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
  awardTrophy,
} from "../store/posts/posts.actions";
import {
  postsSelector,
  threadHasTrophySelector,
} from "../store/posts/posts.selector";
import styled from "styled-components";
import {
  accessTokenSelector,
  currentEmailSelector,
} from "../store/user/user.selector";
import { userDetailsSelector } from "../store/userDetails/userDetails.selector";
import { PostInformation } from "../store/store";
import PostCard from "../components/Post/PostCard";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { Paper } from "@material-ui/core";
import ReportIcon from "@material-ui/icons/Report";
import LockIcon from "@material-ui/icons/Lock";
import BlockIcon from "@material-ui/icons/Block";
import ReportDialog from "../components/UI/ReportDialog";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 8px;
`;

const LeftContainer = styled.div`
  width: 12.5%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 8px 0;
`;

const RightContainer = styled.div`
  width: 87.5%;
  height: 100%;
  display: flex;
  padding: 8px 0;
  display: flex;
  flex-direction: column;
`;

const DescriptionTextContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 17vh;
`;

const DescriptionBottomContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: 7.5vh;
`;

const UserProfileImage = styled.img`
  width: 100px;
  height: 100px;
`;

const UsernameText = styled.p`
  font-size: 1.2em;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  margin-top: 4px;
`;

const DateContainer = styled.div`
  margin-top: -16px;
  display: flex;
  align-items: center;
`;

const DateText = styled.p`
  font-size: 1.1em;
  font-family: "Montserrat", sans-serif;
  margin-left: 4px;
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
  font-size: 1.3em;
  font-family: "Montserrat", sans-serif;
`;

const DescriptionContainer = styled.div`
  width: 100%;
  padding: 4px;
  display: flex;
`;

const ThreadTitle = styled.p`
  font-size: 2.7em;
  font-weight: bold;
  margin-top: 0;
  word-wrap: break-word;
  font-family: "Montserrat", sans-serif;
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

const ThreadActionButtonsContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 0px;
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
  const threadHasTrophy = useSelector(threadHasTrophySelector);
  const currentUserDetails = useSelector(userDetailsSelector);

  const [newPostText, setNewPostText] = useState<string>("");
  const [reportPostModalIsOpen, setReportPostModalIsOpen] = useState<boolean>(
    false
  );

  const onNewPostTextChangedHandler = (e: any) => {
    setNewPostText(e.target.value);
  };

  const onAddNewPost = () => {
    dispatch(
      createNewPost(
        accessToken,
        currentEmail,
        (location.state as any).threadInformation.id,
        newPostText,
        currentUserDetails.username,
        currentUserDetails.profilePicture
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

  const onAwardTrophy = (postId: string) => {
    dispatch(awardTrophy(accessToken, postId));
  };

  const refreshAfterNewPost = () => {
    setNewPostText("");
  };

  useEffect(() => {
    dispatch(
      getPostsByThread(
        accessToken,
        (location.state as any).threadInformation.id
      )
    );
  }, []);

  let threadActions = null;

  if ((location.state as any).threadInformation.ownerEmail !== currentEmail) {
    if (currentUserDetails.type !== "MODERATOR") {
      threadActions = (
        <Tooltip
          arrow
          title="Report this thread"
          style={{ marginLeft: "-8px" }}
        >
          <IconButton onClick={() => setReportPostModalIsOpen(true)}>
            <ReportIcon />
          </IconButton>
        </Tooltip>
      );
    } else {
      threadActions = (
        <ThreadActionButtonsContainer>
          <Tooltip arrow title="Lock this thread">
            <IconButton onClick={() => {}}>
              <LockIcon />
            </IconButton>
          </Tooltip>
          <Tooltip arrow title="Ban this user">
            <IconButton onClick={() => {}}>
              <BlockIcon color="secondary" />
            </IconButton>
          </Tooltip>
        </ThreadActionButtonsContainer>
      );
    }
  }

  return (
    <Container>
      <PostTitleContainer>
        <ThreadTitle>
          {(location.state as any).threadInformation.title}
        </ThreadTitle>
        <Paper elevation={3} style={{ width: "100%", marginTop: "-35px" }}>
          <DescriptionContainer>
            <LeftContainer>
              <UserProfileImage
                src={(location.state as any).threadInformation.userImage}
                alt="Cannot load image"
              />
              <UsernameText>
                {currentEmail ===
                (location.state as any).threadInformation.ownerEmail
                  ? "You"
                  : (location.state as any).threadInformation.username}
              </UsernameText>
              <DateContainer>
                <CalendarTodayIcon />
                <DateText>{`${new Date(
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
                ).getMinutes()}`}</DateText>
              </DateContainer>
            </LeftContainer>
            <RightContainer>
              <DescriptionTextContainer>
                <PostTextFont>
                  {(location.state as any).threadInformation.text}
                </PostTextFont>
              </DescriptionTextContainer>
              <DescriptionBottomContainer>
                {threadActions}
              </DescriptionBottomContainer>
            </RightContainer>
          </DescriptionContainer>
        </Paper>
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
              threadHasTrophy={threadHasTrophy}
              threadOwnerEmail={
                (location.state as any).threadInformation.ownerEmail
              }
              onAwardTrophy={onAwardTrophy}
              currentUserType={currentUserDetails.type}
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
      <ReportDialog
        open={reportPostModalIsOpen}
        onClose={() => setReportPostModalIsOpen(false)}
        type="thread"
      />
    </Container>
  );
};

export default PostsList;
