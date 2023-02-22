import React from "react";
import { SearchUser } from "../../../../utils/types";
import { Flex, Stack, Text, Button } from "@chakra-ui/react";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface ParticipantsProps {
  participants: Array<SearchUser>;
  removeParticipant: (user: SearchUser) => void;
}

function Participants({ participants, removeParticipant }: ParticipantsProps) {
  return (
    <Flex mt={9} gap="10px" flexWrap="wrap">
      {participants.map((participant, index) => (
        <Stack
          key={index}
          direction="row"
          align="center"
          bg="whiteAlpha.200"
          borderRadius={8}
          p={2}
        >
          <Text>{participant.username}</Text>
          <AiOutlineCloseCircle
            onClick={() => removeParticipant(participant)}
            size={20}
            cursor="pointer"
          />
        </Stack>
      ))}
    </Flex>
  );
}

export default Participants;
