/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PostInformation } from "../../store/store";
import NavigationIcon from "@material-ui/icons/Navigation";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import EditPostDialog from "../UI/EditPostDialog";
import DeletePostConfirmDialog from "../UI/DeletePostConfirmDialog";
import Button from "@material-ui/core/Button/Button";
import trophy from "../../assets/trophy.png";
import AwardTrophyDialog from "../UI/AwardTrophyDialog";

const Container = styled.div`
  width: 90%;
  border: 1px solid #231f20;
  box-shadow: 4px 4px 4px #231f20;
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const TopContainer = styled.div`
  margin-top: 0;
  width: 100%;
  display: flex;
`;

const TopLeftContainer = styled.div`
  margin-top: 0;
  width: 5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const TopRightContainer = styled.div`
  margin-top: 0;
  width: 95%;
  padding: 0 4px;
`;

const PostBodyText = styled.p`
  font-size: 1.1em;
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
`;

const BottomContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 4px;
`;

const PostEditRemoveButtonsContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 8px;
`;

const PostAuthorText = styled.p`
  font-size: 1.1em;
  font-style: italic;
`;

const TrophyImage = styled.img`
  width: 125px;
  height: 100px;
  margin-right: 8px;
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
      setUpvoteArrowColor("primary");
      setDownvoteArrowColor("inherit");
      onRemoveDownvote(postInfo);
      onAddUpvote(postInfo);
    } else {
      setUpvoteArrowColor("inherit");
      onRemoveUpvote(postInfo);
    }
  };

  const onDownvoteClicked = () => {
    if (!postInfo.downvotes.includes(currentEmail)) {
      setDownvoteArrowColor("secondary");
      setUpvoteArrowColor("inherit");
      onRemoveUpvote(postInfo);
      onAddDownvote(postInfo);
    } else {
      setDownvoteArrowColor("inherit");
      onRemoveDownvote(postInfo);
    }
  };

  return (
    <Container>
      <TopContainer>
        <TopLeftContainer>
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
        </TopLeftContainer>
        <TopRightContainer>
          <PostBodyText>{postInfo.text}</PostBodyText>
        </TopRightContainer>
      </TopContainer>
      <BottomContainer>
        {postInfo.hasTrophy ? (
          <TrophyImage src={trophy} alt="Cannot load image" />
        ) : null}
        {postInfo.userEmail === currentEmail ? (
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
        ) : null}
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
        <PostAuthorText>{`By ${postInfo.userEmail} on ${new Date(
          postInfo.dateCreated
        ).getDate()} ${
          months[new Date(postInfo.dateCreated).getMonth()]
        } at ${new Date(postInfo.dateCreated).getHours()}:${new Date(
          postInfo.dateCreated
        ).getMinutes()}`}</PostAuthorText>
      </BottomContainer>
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
    </Container>
  );
};

export default PostCard;
