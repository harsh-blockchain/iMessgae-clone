import React from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { Button, Flex } from "@chakra-ui/react";
import ConversationWrapper from "./Conversation/ConversationWrapper";
import FeedWrapper from "./Feed/FeedWrapper";
import { Session } from "next-auth";

interface chatProps {
  session: Session;
}

function Chat({ session }: chatProps) {
  return (
    <Flex height="100vh">
      <ConversationWrapper session={session} />
      <FeedWrapper session={session} />
    </Flex>
  );
}

export default Chat;
