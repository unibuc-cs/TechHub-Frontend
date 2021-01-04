import React from "react";
import styled from "styled-components";
import { useHistory, useRouteMatch } from "react-router-dom";
import { ThreadInformation } from "../../store/store";
import trophy from "../../assets/trophy.png";

const Container = styled.div`
  width: 100%;
  border: 1px solid #231f20;
  height: 65px;
  margin: 8px 0;
  box-shadow: 4px 4px 4px #231f20;

  :hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const CardTitle = styled.p<{ topMargin?: boolean }>`
  font-size: 1.3em;
  font-weight: bold;
  color: #231f20;
  ${({ topMargin }) => (topMargin ? "margin-top: 0px;" : null)}
`;

const CardContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 16px;
`;

const ThreadLeftSideContainer = styled.div`
  width: 80%;
  height: 65px;
`;

const ThreadRightSideContainer = styled.div`
  width: 20%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const OwnerTitle = styled.p`
  font-size: 0.8em;
  font-style: italic;
`;

const DateTitle = styled.p`
  font-size: 1em;
  font-weight: bold;
`;

const TrophyImage = styled.img`
  width: 66px;
  height: 50px;
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

const HomescreenItemCard: React.FC<{
  title: string;
  type: string;
  threadInformation?: ThreadInformation;
}> = ({ title, type, threadInformation }) => {
  const history = useHistory();
  const { url } = useRouteMatch();

  const onCardClickedHandler = (type: string) => {
    if (type === "categories") {
      history.push({
        pathname: `${url}/${title.toLowerCase()}`,
        state: { category: title },
      });
    } else {
      history.push({
        pathname: `/homescreen/thread/${threadInformation?.id}`,
        state: { threadInformation },
      });
    }
  };

  return (
    <Container onClick={() => onCardClickedHandler(type)}>
      <CardContent>
        {type === "categories" ? (
          <CardTitle>{title}</CardTitle>
        ) : (
          <>
            <ThreadLeftSideContainer>
              <CardTitle topMargin>{title}</CardTitle>
              <OwnerTitle>{`By ${threadInformation?.ownerEmail}`}</OwnerTitle>
            </ThreadLeftSideContainer>
            <ThreadRightSideContainer>
              {threadInformation?.hasTrophy ? (
                <TrophyImage src={trophy} alt="Cannot load image" />
              ) : null}
              <DateTitle>
                {threadInformation?.dateCreated
                  ? `On ${new Date(threadInformation?.dateCreated).getDate()} ${
                      months[
                        new Date(threadInformation?.dateCreated).getMonth()
                      ]
                    }`
                  : null}
              </DateTitle>
            </ThreadRightSideContainer>
          </>
        )}
      </CardContent>
    </Container>
  );
};

export default HomescreenItemCard;
