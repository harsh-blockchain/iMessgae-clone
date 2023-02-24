import { Avatar, Box, Flex, Stack, Text } from "@chakra-ui/react";
import { formatRelative } from "date-fns";
import enUS from "date-fns/locale/en-US";
import React from "react";
import { messagePopulatedType } from "../../../../../../backend/src/utils/types";
import ReactTimeAgo from "react-timeago";

type Props = {
  message: messagePopulatedType;
  sendByMe: boolean;
};

const formatRelativeLocale = {
  lastWeek: "eeee 'at' p",
  yesterday: "'Yesterday at' p",
  today: "p",
  other: "MM/dd/yy",
};

function MessageItem({ message, sendByMe }: Props) {
  console.log(message.createdAt);

  return (
    <div>
      <Stack
        direction="row"
        p={4}
        spacing={4}
        _hover={{ bg: "whiteAlpha.200" }}
        justify={sendByMe ? "flex-end" : "flex-start"}
        wordBreak="break-word"
      >
        {!sendByMe && (
          <Flex align="flex-end">
            <Avatar size="sm" />
          </Flex>
        )}
        <Stack spacing={1} width="100%">
          <Stack
            direction="row"
            align="center"
            justify={sendByMe ? "flex-end" : "flex-start"}
          >
            {!sendByMe && (
              <Text fontWeight={500} textAlign={sendByMe ? "right" : "left"}>
                {message.sender.username}
              </Text>
            )}
            <Text fontSize={14} color="whiteAlpha.700">
              <ReactTimeAgo date={message.createdAt} locale="en-US" />
            </Text>
          </Stack>
          <Flex direction="row" justify={sendByMe ? "flex-end" : "flex-start"}>
            <Box
              bg={sendByMe ? "brand.100" : "whiteAlpha.300"}
              px={2}
              py={1}
              borderRadius={12}
              maxWidth="65%"
            >
              <Text>{message.body}</Text>
            </Box>
          </Flex>
        </Stack>
      </Stack>
    </div>
  );
}

export default MessageItem;
