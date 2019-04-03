import React from "react";
import { Mutation, Query } from "react-apollo";
import { Text } from "pcln-design-system";
import { Box, Flex, QuickAdd } from "../../../components";
import { updateCreateComment } from "../../Comment/graphql";
import { Comment } from "../../Comment/graphql";
import CommentList from "../../Comment/List";
import { PriorityIndicator, TagList } from "../index";
import { taskDetailQuery } from "../graphql";

export const TaskDetail = ({ taskId, ...props }) => (
  <Flex {...props} flexDirection="column" p={2} bg="#fff" borderRadius={6}>
    <Query query={taskDetailQuery} variables={{ id: taskId }}>
      {({ data: { getTask: task }, loading, error }) => {
        if (error) {
          return `Error: ${error}`;
        }

        if (loading && !task) {
          return "Loading...";
        }

        return (
          <React.Fragment>
            <Flex mb={2}>
              <PriorityIndicator priority={task.priority} />
              <Text fontSize={3} ml={1}>
                {task.name}
              </Text>
            </Flex>
            <Flex mb={1}>
              <Box flex={0.2}>Tags:</Box>
              <Box flex={1}>
                {task.tags.length > 0 ? <TagList tags={task.tags} /> : "none"}
              </Box>
            </Flex>
            <Flex>
              <Box flex={0.2}>List:</Box>
              <Box flex={1}>{task.list.name}</Box>
            </Flex>
            <Box mt={3}>Comments ({task.comments.items.length})</Box>
            <CommentList comments={task.comments.items} />
            <Mutation
              mutation={Comment.mutations.createComment}
              update={updateCreateComment}
            >
              {createComment => (
                <QuickAdd
                  placeholder="Add Comment"
                  onSubmit={value =>
                    createComment({
                      optimisticResponse: {
                        __typename: "Mutation",
                        createComment: {
                          __typename: "Comment",
                          id: "-1",
                          content: value,
                          task: {
                            __typename: "Task",
                            id: task.id
                          },
                          createdAt: "",
                          updatedAt: "",
                          version: 1
                        }
                      },
                      variables: {
                        input: { content: value, commentTaskId: task.id }
                      }
                    })
                  }
                />
              )}
            </Mutation>
          </React.Fragment>
        );
      }}
    </Query>
  </Flex>
);
