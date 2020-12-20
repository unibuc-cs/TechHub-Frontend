import React from "react";
import styled from "styled-components";
import { CategoryCard } from "../../store/store";
import HomescreenItemCard from "./HomescreenItemCard";

const Container = styled.div`
  width: 100%;
  height: 49vh;
  overflow-y: scroll;
`;

const HomescreenItemsList: React.FC<{ items: CategoryCard[] }> = ({
  items,
}) => {
  return (
    <Container>
      {items.map((item: CategoryCard) => (
        <HomescreenItemCard title={item.title} key={item.title} />
      ))}
    </Container>
  );
};

export default HomescreenItemsList;
