/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PostInformation } from "../../store/store";
import NavigationIcon from "@material-ui/icons/Navigation";

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
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 4px;
`;

const PostAuthorText = styled.p`
  font-size: 1.1em;
  font-style: italic;
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
  currentEmail: string;
}> = ({
  postInfo,
  onAddUpvote,
  currentEmail,
  onRemoveUpvote,
  onAddDownvote,
  onRemoveDownvote,
}) => {
  const [upvoteArrowColor, setUpvoteArrowColor] = useState<
    "inherit" | "primary"
  >("inherit");

  const [downvoteArrowColor, setDownvoteArrowColor] = useState<
    "inherit" | "secondary"
  >("inherit");

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
        <PostAuthorText>{`By ${postInfo.userEmail} on ${new Date(
          postInfo.dateCreated
        ).getDate()} ${
          months[new Date(postInfo.dateCreated).getMonth()]
        } at ${new Date(postInfo.dateCreated).getHours()}:${new Date(
          postInfo.dateCreated
        ).getMinutes()}`}</PostAuthorText>
      </BottomContainer>
    </Container>
  );
};

export default PostCard;
