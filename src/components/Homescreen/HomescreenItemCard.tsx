import React from "react";
import styled from "styled-components";
import { useHistory, useRouteMatch } from "react-router-dom";

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
  justify-content: center;
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
  ownerEmail?: string;
  dateCreated?: string;
}> = ({ title, type, ownerEmail, dateCreated }) => {
  const history = useHistory();
  const { url } = useRouteMatch();

  const onCardClickedHandler = (type: string) => {
    if (type === "categories") {
      history.push({
        pathname: `${url}/${title.toLowerCase()}`,
        state: { category: title },
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
              <OwnerTitle>{`By ${ownerEmail}`}</OwnerTitle>
            </ThreadLeftSideContainer>
            <ThreadRightSideContainer>
              <DateTitle>
                {dateCreated
                  ? `On ${new Date(dateCreated).getDate()} ${
                      months[new Date(dateCreated).getMonth()]
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
