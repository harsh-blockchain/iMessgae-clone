import { Box, Flex } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import React from "react";
import Header from "./Messages/Header";

interface FeedWrapperProps {
  session: Session;
}

function FeedWrapper({ session }: FeedWrapperProps) {
  const router = useRouter();

  const { conversationId } = router.query;

  const {
    user: { id: user_id },
  } = session;

  return (
    <Flex
      direction="column"
      width="100%"
      display={{ base: conversationId ? "flex" : "none", md: "flex" }}
    >
      {conversationId && typeof conversationId === "string" ? (
        <Flex
          direction="column"
          justify="space-between"
          overflow="hidden"
          flexGrow={1}
          border="1px solid black"
        >
          {/* {conversationId} */}
          <Header conversationId={conversationId} userId={user_id} />
          {/* Messages */}
        </Flex>
      ) : (
        <h1>No conversation</h1>
      )}
    </Flex>
  );
}

export default FeedWrapper;
