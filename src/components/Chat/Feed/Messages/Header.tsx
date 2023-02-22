import { useQuery } from "@apollo/client";
import { Button, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import ConversationOperations from "../../../../operations/conversation";
import { formatUsernames } from "../../../../utils/functions.ts";
import { ConversationData } from "../../../../utils/types";

interface Props {
  userId: string;
  conversationId: string;
}

function Header({ userId, conversationId }: Props) {
  const router = useRouter();
  const { data, loading } = useQuery<ConversationData>(
    ConversationOperations.Query.conversations
  );

  const conversation = data?.conversations.find(
    (conversation) => conversation.id === conversationId
  );
  return (
    <div>
      {" "}
      <Stack
        direction="row"
        align="center"
        spacing={6}
        py={5}
        px={{ base: 4, md: 0 }}
        borderBottom="1px solid"
        borderColor="whiteAlpha.200"
      >
        <Button
          display={{ md: "none" }}
          onClick={() =>
            router.replace("?conversationId", "/", {
              shallow: true,
            })
          }
        >
          Back
        </Button>
        {/* {loading && <SkeletonLoader count={1} height="30px" width="320px" />} */}
        {!conversation && !loading && <Text>Conversation Not Found</Text>}
        {conversation && (
          <Stack direction="row">
            <Text color="whiteAlpha.600">To: </Text>
            <Text fontWeight={600}>
              {formatUsernames(conversation.participants, userId)}
            </Text>
          </Stack>
        )}
      </Stack>
    </div>
  );
}

export default Header;
