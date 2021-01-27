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
  threadIsLockedSelector,
  postsLoadingSelector,
} from "../store/posts/posts.selector";
import styled from "styled-components";
import {
  accessTokenSelector,
  currentEmailSelector,
} from "../store/user/user.selector";
import { addReport } from "../store/reports/reports.actions";
import { banUser } from "../store/userDetails/userDetails.actions";
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
import { reportTypesSelector } from "../store/reports/reports.selectors";
import ItemReportsDialog from "../components/UI/ItemReportsDialog";
import BanUserConfirmDialog from "../components/UI/BanUserConfirmDialog";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { lockThread } from "../store/threads/threads.actions";
import LockThreadConfirmDialog from "../components/UI/LockThreadConfirmDialog";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Spinner from "../components/UI/Spinner/Spinner";

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

const UsernameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UsernameText = styled.p`
  font-size: 1.2em;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
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
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 4px;
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

const ReportContainer = styled.div`
  width: 100%;
  height: 5vh;
  background-color: salmon;
  display: flex;
  align-items: center;
  padding: 0 8px;
`;

const ReportText = styled.p`
  color: white;
  font-size: 1.1em;
  font-family: "Montserrat", sans-serif;
`;

const LockedThreadBar = styled.div`
  width: 100%;
  height: 10vh;
  background-color: salmon;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LockedThreadText = styled.p`
  font-size: 2em;
  font-family: "Montserrat", sans-serif;
  color: white;
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
  const postsLoading = useSelector(postsLoadingSelector);
  const threadHasTrophy = useSelector(threadHasTrophySelector);
  const currentUserDetails = useSelector(userDetailsSelector);
  const reportTypes = useSelector(reportTypesSelector);
  const threadIsLocked = useSelector(threadIsLockedSelector);

  const [newPostText, setNewPostText] = useState<string>("");
  const [reportPostModalIsOpen, setReportPostModalIsOpen] = useState<boolean>(
    false
  );
  const [
    itemReportsDialogIsOpen,
    setItemReportsDialogIsOpen,
  ] = useState<boolean>(false);
  const [banUserDialogIsVisible, setBanUserDialogIsVisible] = useState<boolean>(
    false
  );
  const [
    lockThreadDialogIsVisible,
    setLockThreadDialogIsVisible,
  ] = useState<boolean>(false);

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

  const onBanUser = (email: string) => {
    dispatch(banUser(accessToken, email));
  };

  const onSubmitReportClickedHandler = (
    isThread: boolean,
    reportType: string,
    description: string,
    postId?: string
  ) => {
    if (isThread) {
      dispatch(
        addReport(
          accessToken,
          currentUserDetails.email,
          (location.state as any).threadInformation.id,
          reportType,
          description,
          new Date().toString(),
          false,
          false,
          (location.state as any).threadInformation
        )
      );
    } else {
      dispatch(
        addReport(
          accessToken,
          currentUserDetails.email,
          postId!,
          reportType,
          description,
          new Date().toString(),
          false,
          true,
          (location.state as any).threadInformation
        )
      );
    }
  };

  const onThreadLockedHandler = () => {
    dispatch(
      lockThread(accessToken, (location.state as any).threadInformation.id)
    );
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
            <IconButton onClick={() => setLockThreadDialogIsVisible(true)}>
              <LockIcon color="secondary" />
            </IconButton>
          </Tooltip>
          {(location.state as any).threadInformation.accountStatus !==
          "banned" ? (
            <Tooltip arrow title="Ban this user">
              <IconButton onClick={() => setBanUserDialogIsVisible(true)}>
                <BlockIcon color="secondary" />
              </IconButton>
            </Tooltip>
          ) : null}
        </ThreadActionButtonsContainer>
      );
    }
  } else {
    if (currentUserDetails.type !== "MODERATOR") {
      threadActions = (
        <Tooltip arrow title="Lock this thread" style={{ marginLeft: "-8px" }}>
          <IconButton onClick={() => setLockThreadDialogIsVisible(true)}>
            <LockIcon color="secondary" />
          </IconButton>
        </Tooltip>
      );
    }
  }

  let postsContent = null;

  if (!postsLoading) {
    if (posts.length > 0) {
      postsContent = posts.map((post: PostInformation) => (
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
          reportTypes={reportTypes}
          onSubmitReportHandler={onSubmitReportClickedHandler}
          onBanUser={onBanUser}
        />
      ));
    } else {
      postsContent = (
        <h1 style={{ fontFamily: "Montserrat" }}>There are no posts yet.</h1>
      );
    }
  } else {
    postsContent = <Spinner />;
  }

  return (
    <Container>
      {threadIsLocked ? (
        <LockedThreadBar>
          <LockOutlinedIcon
            fontSize="large"
            style={{ color: "white", marginRight: "8px" }}
          />
          <LockedThreadText>This thread has been locked.</LockedThreadText>
        </LockedThreadBar>
      ) : null}
      <PostTitleContainer>
        <ThreadTitle>
          {(location.state as any).threadInformation.title}
        </ThreadTitle>
        <Paper elevation={3} style={{ width: "100%", marginTop: "-35px" }}>
          <DescriptionContainer>
            <ContentContainer>
              <LeftContainer>
                <UserProfileImage
                  src={(location.state as any).threadInformation.userImage}
                  alt="Cannot load image"
                />
                <UsernameContainer>
                  <UsernameText>
                    {currentEmail ===
                    (location.state as any).threadInformation.ownerEmail
                      ? "You"
                      : (location.state as any).threadInformation.username}
                  </UsernameText>
                  {(location.state as any).threadInformation.accountStatus ===
                  "banned" ? (
                    <Tooltip arrow title="This user has been banned">
                      <RemoveCircleIcon fontSize="small" />
                    </Tooltip>
                  ) : null}
                </UsernameContainer>
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
            </ContentContainer>
            {(location.state as any).threadInformation.isReported &&
            currentUserDetails.type === "MODERATOR" ? (
              <ReportContainer>
                <ReportText>This thread has been reported.</ReportText>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "white",
                    color: "salmon",
                    marginLeft: "4px",
                  }}
                  onClick={() => setItemReportsDialogIsOpen(true)}
                  size="small"
                >
                  View Reports
                </Button>
              </ReportContainer>
            ) : null}
          </DescriptionContainer>
        </Paper>
      </PostTitleContainer>
      <PostsListsContainer>{postsContent}</PostsListsContainer>
      {!threadIsLocked ? (
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
      ) : null}
      <ReportDialog
        open={reportPostModalIsOpen}
        onClose={() => setReportPostModalIsOpen(false)}
        type="thread"
        reportTypes={reportTypes}
        onSubmitReportHandler={onSubmitReportClickedHandler}
      />
      <ItemReportsDialog
        open={itemReportsDialogIsOpen}
        onClose={() => setItemReportsDialogIsOpen(false)}
        isThread={true}
        reportedItemId={(location.state as any).threadInformation.id}
      />
      <BanUserConfirmDialog
        open={banUserDialogIsVisible}
        onClose={() => setBanUserDialogIsVisible(false)}
        email={(location.state as any).threadInformation.ownerEmail}
        onBanUser={onBanUser}
        username={(location.state as any).threadInformation.username}
      />
      <LockThreadConfirmDialog
        open={lockThreadDialogIsVisible}
        onClose={() => setLockThreadDialogIsVisible(false)}
        onLockThread={onThreadLockedHandler}
      />
    </Container>
  );
};

export default PostsList;
