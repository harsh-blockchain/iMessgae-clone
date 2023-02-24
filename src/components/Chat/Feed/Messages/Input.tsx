import { useMutation } from "@apollo/client";
import { Box, Input } from "@chakra-ui/react";
import { Session } from "next-auth";
import React, { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { sendMessageArgs } from "../../../../../../backend/src/utils/types";
import messageOperations from "../../../../operations/message";
import { ObjectId } from "bson";

interface Props {
  session: Session;
  conversationId: string;
}

function InputMessage({ session, conversationId }: Props) {
  const [messageBody, setMessageBody] = useState<string>("");

  const [sendMessage, { data, error, loading }] = useMutation<
    { sendMessage: boolean },
    sendMessageArgs
  >(messageOperations.Mutation.sendMessage);

  const onSendMessage = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const { id: senderId } = session.user;
      const messageId = new ObjectId().toString();

      const newMessage: sendMessageArgs = {
        body: messageBody,
        conversationId,
        id: messageId,
        senderId,
      };

      const { data } = await sendMessage({
        variables: {
          ...newMessage,
        },
      });
      setMessageBody("");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  return (
    <div>
      <Box px={4} py={6} width="100%">
        <form onSubmit={onSendMessage}>
          <Input
            value={messageBody}
            onChange={(e) => setMessageBody(e.target.value)}
            size="md"
            placeholder="Type your message here..."
            _focus={{
              boxShadow: "none",
              border: "1px solid",
              borderColor: "whiteAlpha.300",
            }}
            resize="none"
          />
        </form>
      </Box>
    </div>
  );
}

export default InputMessage;
