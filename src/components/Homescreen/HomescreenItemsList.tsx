import React from "react";
import styled from "styled-components";
import { CategoryCard, ThreadInformation } from "../../store/store";
import HomescreenItemCard from "./HomescreenItemCard";

const Container = styled.div`
  width: 100%;
  height: 49vh;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 1em;
    background-color: #edf5e1;
  }

  ::-webkit-scrollbar-track {
    background-color: #edf5e1;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #231f20;
  }
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
        key={item.id}
        type={type}
        threadInformation={item}
      />
    ));
  }

  return <Container>{list}</Container>;
};

export default HomescreenItemsList;
