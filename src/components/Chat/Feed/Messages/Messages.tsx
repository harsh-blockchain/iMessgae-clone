import { useQuery } from "@apollo/client";
import { Flex, Skeleton, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { MessageData, MessageVariables } from "../../../../utils/types";
import MessageOperations from "../../../../operations/message";
import SkeletonLoader from "../../../common/SkeletonLoader";
import { messagePopulatedType } from "../../../../../../backend/src/utils/types";
import MessageItem from "./MessageItem";
import { useSession } from "next-auth/react";

interface Props {
  conversationId: string;
  userId: string;
}

interface messageInterfaceData {
  subscriptionData: {
    data: {
      messageSent: messagePopulatedType;
    };
  };
}

function Messages({ conversationId, userId }: Props) {
  const { data: session } = useSession();

  const user_id = session?.user.id;

  const { data, error, loading, subscribeToMore } = useQuery<
    MessageData,
    MessageVariables
  >(MessageOperations.Query.messages, {
    variables: {
      conversationId: conversationId,
    },
  });

  console.log("data", data);

  if (error) {
    return null;
  }

  const subscribeToMessages = async (conversationId: string) => {
    subscribeToMore({
      document: MessageOperations.Subscriptions.messageSent,
      variables: {
        conversationId,
      },
      updateQuery: (prev, { subscriptionData }: messageInterfaceData) => {
        if (!subscriptionData) return prev;
        const newMessage = subscriptionData.data.messageSent;
        return Object.assign({}, prev, {
          messages: [newMessage, ...prev.messages],
        });
      },
    });
  };

  useEffect(() => {
    subscribeToMessages(conversationId);
  }, [conversationId]);

  return (
    <div>
      <Flex direction="column" justify="flex-end" overflow="hidden">
        {loading && (
          <Stack px={5}>
            <SkeletonLoader height="60px" count={7} width="98%" />
          </Stack>
        )}
        {data?.messages && (
          <Flex direction="column-reverse" overflowY="hidden" height="100%">
            {data.messages.map((message, i) => (
              <MessageItem
                key={i}
                message={message}
                sendByMe={message.sender.id === user_id}
              />
            ))}
          </Flex>
        )}
      </Flex>
    </div>
  );
}

export default Messages;
