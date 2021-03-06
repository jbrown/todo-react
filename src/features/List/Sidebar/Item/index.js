import React from "react";
import gql from "graphql-tag";
import styled from "styled-components";
import { Badge, Box, Flex } from "jbrown-design-system";

const ListItemWrapper = styled(Flex)`
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
`;

export const ListSidebarItem = ({ isSelected, name, tasks, onClick }) => (
  <ListItemWrapper
    className="ListSidebarItem"
    flexDirection="row"
    my={1}
    px={2}
    py={1}
    bg={isSelected ? "#fff" : null}
    onClick={onClick}
  >
    <Box flex={1} className="ListSidebarItem__name">
      {name}
    </Box>
    {tasks.items.length > 0 ? <Badge>{tasks.items.length}</Badge> : null}
  </ListItemWrapper>
);

ListSidebarItem.fragment = gql`
  fragment ListSidebarItemFragment on List {
    id
    name
    tasks(filter: { completed: { eq: false } }, limit: 10) {
      items {
        id
      }
    }
  }
`;
