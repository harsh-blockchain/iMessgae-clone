import React from "react";
import { SearchUser } from "../../../utils/types";
import { Avatar, Button, Flex, Stack, Text } from "@chakra-ui/react";

interface UserSearchListProps {
  users: Array<SearchUser>;
  addParticipant: (user: SearchUser) => void;
  removeParticipant: (user: SearchUser) => void;
}

function UserSearchList({
  users,
  addParticipant,
  removeParticipant,
}: UserSearchListProps) {
  return (
    <>
      {users.length === 0 ? (
        <Flex mt={6} justify="center">
          <Text>No Users Found</Text>
        </Flex>
      ) : (
        <Stack mt={6}>
          {users.map((user) => (
            <Stack
              key={user.id}
              direction="row"
              align="center"
              spacing={4}
              py={2}
              px={4}
              borderRadius={4}
              cursor="pointer"
              _hover={{ bg: "blackAlpha.200" }}
            >
              <Avatar />
              <Flex justify="space-between" width="100%" align="center">
                <Text color="whiteAlpha.700">{user.username}</Text>
                <Button
                  bg="brand.100"
                  _hover={{ bg: "brand.100" }}
                  onClick={() => addParticipant(user)}
                >
                  Select
                </Button>
              </Flex>
            </Stack>
          ))}
        </Stack>
      )}
    </>
  );
}

export default UserSearchList;
