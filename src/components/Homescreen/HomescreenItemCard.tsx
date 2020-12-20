import React from "react";
import styled from "styled-components";

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

const CardTitle = styled.p`
  font-size: 1.3em;
  font-weight: bold;
  color: #231f20;
`;

const CardContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 16px;
`;

const HomescreenItemCard: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Container>
      <CardContent>
        <CardTitle>{title}</CardTitle>
      </CardContent>
    </Container>
  );
};

export default HomescreenItemCard;
