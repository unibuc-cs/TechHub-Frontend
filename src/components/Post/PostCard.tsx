/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PostInformation } from "../../store/store";
import NavigationIcon from "@material-ui/icons/Navigation";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ReportIcon from "@material-ui/icons/Report";
import BlockIcon from "@material-ui/icons/Block";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import Tooltip from "@material-ui/core/Tooltip";
import EditPostDialog from "../UI/EditPostDialog";
import DeletePostConfirmDialog from "../UI/DeletePostConfirmDialog";
import Button from "@material-ui/core/Button/Button";
import trophy from "../../assets/trophy.png";
import AwardTrophyDialog from "../UI/AwardTrophyDialog";
import Paper from "@material-ui/core/Paper";
import ReportDialog from "../UI/ReportDialog";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: start;
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

const MiddleContainer = styled.div`
  width: 80%;
  min-height: 25vh;
  display: flex;
  flex-direction: column;
`;

const RightContainer = styled.div`
  width: 7.5%;
  min-height: 25vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PostTextContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 17.5vh;
  padding: 8px;
`;

const PostBottomContainer = styled.div`
  width: 100%;
  height: 7.5vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 4px;
`;

const PostText = styled.p`
  font-size: 1.1em;
  font-family: "Montserrat", sans-serif;
  margin-top: 0;
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

const VotingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const UpArrowContainer = styled.div`
  :hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const DownArrowContainer = styled.div`
  transform: rotate(180deg);

  :hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const VotesCountContainer = styled.div`
  margin-top: 0;
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VotesCount = styled.p`
  font-size: 1.5em;
  font-weight: bold;
  font-family: "Montserrat", sans-serif;
`;

const PostEditRemoveButtonsContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 0px;
`;

const TrophyImage = styled.img`
  width: 67px;
  height: 50px;
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

const PostCard: React.FC<{
  postInfo: PostInformation;
  onAddUpvote: (post: PostInformation) => void;
  onRemoveUpvote: (post: PostInformation) => void;
  onAddDownvote: (post: PostInformation) => void;
  onRemoveDownvote: (post: PostInformation) => void;
  onEditPost: (newText: string, postId: string) => void;
  onDeletePost: (postId: string) => void;
  onAwardTrophy: (postId: string) => void;
  currentEmail: string;
  threadHasTrophy: boolean;
  threadOwnerEmail: string;
  currentUserType: string;
  reportTypes: string[];
}> = ({
  postInfo,
  onAddUpvote,
  currentEmail,
  onRemoveUpvote,
  onAddDownvote,
  onRemoveDownvote,
  onEditPost,
  onDeletePost,
  onAwardTrophy,
  threadHasTrophy,
  threadOwnerEmail,
  currentUserType,
  reportTypes,
}) => {
  const [upvoteArrowColor, setUpvoteArrowColor] = useState<
    "inherit" | "primary"
  >("inherit");

  const [downvoteArrowColor, setDownvoteArrowColor] = useState<
    "inherit" | "secondary"
  >("inherit");

  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
  const [awardTrophyModalIsOpen, setAwardTrophyModalIsOpen] = useState<boolean>(
    false
  );
  const [reportPostModalIsOpen, setReportPostModalIsOpen] = useState<boolean>(
    false
  );

  useEffect(() => {
    if (postInfo.upvotes.includes(currentEmail)) {
      setUpvoteArrowColor("primary");
    }
    if (postInfo.downvotes.includes(currentEmail)) {
      setDownvoteArrowColor("secondary");
    }
  }, []);

  const onUpvoteClicked = () => {
    if (!postInfo.upvotes.includes(currentEmail)) {
      // Not upvoted
      setUpvoteArrowColor("primary");
      setDownvoteArrowColor("inherit");

      if (postInfo.downvotes.includes(currentEmail)) {
        //if we upvote and the post is downvoted, remove the downvote
        onRemoveDownvote(postInfo);
      }
      onAddUpvote(postInfo);
    } else {
      setUpvoteArrowColor("inherit");
      onRemoveUpvote(postInfo);
    }
  };

  const onDownvoteClicked = () => {
    if (!postInfo.downvotes.includes(currentEmail)) {
      // Not downvoted
      setDownvoteArrowColor("secondary");
      setUpvoteArrowColor("inherit");

      if (postInfo.upvotes.includes(currentEmail)) {
        //if we downvote and the post is upvoted, remove the upvote
        onRemoveUpvote(postInfo);
      }
      onAddDownvote(postInfo);
    } else {
      setDownvoteArrowColor("inherit");
      onRemoveDownvote(postInfo);
    }
  };

  let postActions = null;

  if (currentEmail === postInfo.userEmail) {
    postActions = (
      <PostEditRemoveButtonsContainer>
        <Tooltip arrow title="Edit your post">
          <IconButton onClick={() => setEditModalIsOpen(true)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip arrow title="Delete your post">
          <IconButton onClick={() => setDeleteModalIsOpen(true)}>
            <DeleteIcon color="secondary" />
          </IconButton>
        </Tooltip>
      </PostEditRemoveButtonsContainer>
    );
  } else {
    if (currentUserType === "MODERATOR") {
      postActions = (
        <PostEditRemoveButtonsContainer>
          <Tooltip arrow title="Delete this post">
            <IconButton onClick={() => setDeleteModalIsOpen(true)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip arrow title="Ban this user">
            <IconButton onClick={() => {}}>
              <BlockIcon color="secondary" />
            </IconButton>
          </Tooltip>
        </PostEditRemoveButtonsContainer>
      );
    } else {
      postActions = (
        <Tooltip arrow title="Report this post">
          <IconButton onClick={() => setReportPostModalIsOpen(true)}>
            <ReportIcon />
          </IconButton>
        </Tooltip>
      );
    }
  }

  return (
    <Paper
      elevation={3}
      style={{ width: "90%", margin: "16px 0", height: "auto" }}
    >
      <Container>
        <LeftContainer>
          <UserProfileImage src={postInfo.userImage} alt="Cannot load image" />
          <UsernameText>
            {currentEmail === postInfo.userEmail ? "You" : postInfo.username}
          </UsernameText>
          <DateContainer>
            <CalendarTodayIcon />
            <DateText>{`${new Date(postInfo.dateCreated).getDate()} ${
              months[new Date(postInfo.dateCreated).getMonth()]
            } at ${new Date(postInfo.dateCreated).getHours()}:${new Date(
              postInfo.dateCreated
            ).getMinutes()}`}</DateText>
          </DateContainer>
        </LeftContainer>
        <MiddleContainer>
          <PostTextContainer>
            <PostText>{postInfo.text}</PostText>
          </PostTextContainer>
          <PostBottomContainer>
            {postInfo.hasTrophy ? (
              <TrophyImage src={trophy} alt="Cannot load image" />
            ) : null}
            {postActions}
            {postInfo.userEmail !== currentEmail &&
            !threadHasTrophy &&
            threadOwnerEmail === currentEmail ? (
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#228B22",
                  color: "white",
                  marginRight: "4px",
                }}
                onClick={() => setAwardTrophyModalIsOpen(true)}
                size="small"
              >
                Award Trophy
              </Button>
            ) : null}
          </PostBottomContainer>
        </MiddleContainer>
        <RightContainer>
          <VotingContainer>
            <UpArrowContainer onClick={onUpvoteClicked}>
              <NavigationIcon fontSize="large" color={upvoteArrowColor} />
            </UpArrowContainer>
            <VotesCountContainer>
              <VotesCount>
                {postInfo.upvotes.length - postInfo.downvotes.length}
              </VotesCount>
            </VotesCountContainer>
            <DownArrowContainer onClick={onDownvoteClicked}>
              <NavigationIcon fontSize="large" color={downvoteArrowColor} />
            </DownArrowContainer>
          </VotingContainer>
        </RightContainer>
      </Container>
      <EditPostDialog
        open={editModalIsOpen}
        currentPostText={postInfo.text}
        onClose={() => setEditModalIsOpen(false)}
        onEditPost={onEditPost}
        postId={postInfo.id}
      />
      <DeletePostConfirmDialog
        open={deleteModalIsOpen}
        onClose={() => setDeleteModalIsOpen(false)}
        onDeletePost={onDeletePost}
        postId={postInfo.id}
      />
      <AwardTrophyDialog
        open={awardTrophyModalIsOpen}
        onClose={() => setAwardTrophyModalIsOpen(false)}
        onAwardPost={onAwardTrophy}
        postId={postInfo.id}
      />
      <ReportDialog
        open={reportPostModalIsOpen}
        onClose={() => setReportPostModalIsOpen(false)}
        type="post"
        reportTypes={reportTypes}
      />
    </Paper>
  );
};

export default PostCard;
