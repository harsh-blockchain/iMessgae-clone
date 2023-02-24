import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import React, { useEffect } from "react";
import ConversationList from "./ConversationList";
import ConversationOperations from "../../../operations/conversation";
import { useQuery } from "@apollo/client";
import { ConversationData } from "../../../utils/types";
import { ConversationPopulated } from "../../../../../backend/src/utils/types";
import { useRouter } from "next/router";
import { NextPageContext } from "next";
import SkeletonLoader from "../../common/SkeletonLoader";

interface ConversationWrapperProps {
  session: Session;
}

function ConversationWrapper({ session }: ConversationWrapperProps) {
  const router = useRouter();

  const { conversationId } = router.query;

  const {
    data: conversationData,
    error: conversationError,
    loading: conversationLoading,
    subscribeToMore: conversationSubscribeToMore,
  } = useQuery(ConversationOperations.Query.conversations);

  const onViewConversation = async (conversationId: string) => {
    router.push({
      query: { conversationId },
    });
  };

  const subscribeToConversation = () => {
    conversationSubscribeToMore({
      document: ConversationOperations.Subscriptions.conversationCreated,
      updateQuery: (
        prev,
        {
          subscriptionData,
        }: {
          subscriptionData: {
            data: { conversationCreated: ConversationPopulated };
          };
        }
      ) => {
        if (!subscriptionData.data) return prev;
        const newConversation = subscriptionData.data.conversationCreated;
        return Object.assign({}, prev, {
          conversations: [...prev.conversations, newConversation],
        });
      },
    });
  };

  useEffect(() => {
    subscribeToConversation();
  }, []);

  return (
    <Box
      bg="whiteAlpha.50"
      py={6}
      px={3}
      width={{ base: "100%", md: "400px" }}
      position="relative"
      display={{ base: conversationId ? "none" : "flex", md: "flex" }}
    >
      {/* loader */}
      {conversationLoading ? (
        <SkeletonLoader count={6} height="80px" width="300px" />
      ) : (
        <ConversationList
          session={session}
          conversations={conversationData || []}
          onClick={onViewConversation}
        />
      )}
    </Box>
  );
}

export default ConversationWrapper;
