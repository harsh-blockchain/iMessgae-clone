import { Box, Button, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import React, { useState } from "react";
import ConversationModal from "./modal/Modal";
import { ConversationPopulated } from "../../../../../backend/src/utils/types";
import ConversationItem from "./ConversationItem";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

interface ConversationListProps {
  session: Session;
  conversations: any;
  onClick: (conversationId: string) => void;
}

function ConversationList({
  session,
  conversations,
  onClick,
}: ConversationListProps) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const { conversationId } = router.query;
  const {
    user: { id: user_id },
  } = session;

  const onOpen = () => setIsOpen(true);

  const onClose = () => setIsOpen(false);

  return (
    <Box width="100%">
      <Box
        py={2}
        px={4}
        mb={4}
        bg="blackAlpha.300"
        borderRadius={4}
        cursor="pointer"
        onClick={onOpen}
      >
        <Text textAlign="center" color="whiteAlpha.800" fontWeight={500}>
          Find or Start a Conversation
        </Text>
      </Box>
      <ConversationModal onOpen={isOpen} onClose={onClose} session={session} />
      {conversations?.conversations?.map((conversation: any, i: number) => (
        <ConversationItem
          conversation={conversation}
          key={i}
          onClick={() => onClick(conversation.id)}
          isSelected={conversation.id === router.query.conversationId}
          userId={user_id}
        />
      ))}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        width="100%"
        bg="#313131"
        px={8}
        py={6}
        zIndex={1}
      >
        <Button width="100%" onClick={() => signOut()}>
          Logout
        </Button>
      </Box>
    </Box>
  );
}

export default ConversationList;
