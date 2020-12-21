import React from "react";
import styled from "styled-components";
import { CategoryCard, ThreadInformation } from "../../store/store";
import HomescreenItemCard from "./HomescreenItemCard";

const Container = styled.div`
  width: 100%;
  height: 49vh;
  overflow-y: scroll;
`;

const HomescreenItemsList: React.FC<{
  items: any;
  type: string;
}> = ({ items, type }) => {
  let list: any = [];
  if (type === "categories") {
    list = items.map((item: CategoryCard) => (
      <HomescreenItemCard title={item.title} key={item.title} type={type} />
    ));
  } else {
    list = items.map((item: ThreadInformation) => (
      <HomescreenItemCard
        title={item.title}
        key={item.title}
        type={type}
        ownerEmail={item.ownerEmail}
        dateCreated={item.dateCreated}
      />
    ));
  }

  return <Container>{list}</Container>;
};

export default HomescreenItemsList;
