import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Stack,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import UserOperations from "../../../../operations/user";
import ConversationOperations from "../../../../operations/conversation";
import {
  CreateConversationData,
  CreateConversationInput,
  SearchUser,
  SearchUserData,
  SearchuserInput,
} from "../../../../utils/types";
import UserSearchList from "../UserSearchList";
import Participants from "./Participants";
import { toast } from "react-hot-toast";
import { Session } from "next-auth";
import { ApolloError } from "@apollo/client";
import { useRouter } from "next/router";

interface Modalprops {
  onOpen: boolean;
  onClose: () => void;
  session: Session;
}

function ConversationModal({ onOpen, onClose, session }: Modalprops) {
  const [username, setUsername] = useState("");
  const [participants, setParticipants] = useState<Array<SearchUser>>([]);

  const router = useRouter();

  const {
    user: { id: userId },
  } = session;

  /* convert id to string */
  const userIdString = userId.toString();

  const [searchUsers, { data, loading, error }] = useLazyQuery<
    SearchUserData,
    SearchuserInput
  >(UserOperations.Query.searchUsers);

  const [createConversation, { loading: createLoading }] = useMutation<
    CreateConversationData,
    CreateConversationInput
  >(ConversationOperations.Mutation.createConversation);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    searchUsers({ variables: { username } });
  };

  const addParticipant = (user: SearchUser) => {
    let found: boolean = false;
    for (let i = 0; i < participants.length; i++) {
      if (participants[i].id === user.id) {
        found = true;
        break;
      }
    }
    if (!found) {
      setParticipants([...participants, user]);
    } else {
      toast("User already added !", {
        icon: "⚡",
        style: { background: "#2d2d2d", color: "white" },
      });
    }
  };

  const removeParticipant = (user: SearchUser) => {
    setParticipants(
      participants.filter((participant) => participant.id !== user.id)
    );
  };

  const createConversations = async () => {
    try {
      const array: Array<string> = [
        userIdString,
        ...participants.map((user) => user.id),
      ];
      console.log(array, "Data");
      const { data } = await createConversation({
        variables: {
          participantIds: array,
        },
      });

      if (!data?.createConversation) {
        throw new Error("Failed to Create Conversation !");
      }

      const {
        createConversation: { conversationId },
      } = data;

      router.push({ query: { conversationId } });

      toast("Conversation Added Successfully !", {
        icon: "🚀",
        style: { background: "#2d2d2d", color: "white" },
      });

      onClose();
      setUsername("");
      setParticipants([]);
      console.log(data);
    } catch (error: any) {
      console.log(error instanceof ApolloError);

      toast(error?.message, {
        icon: "⚡",
        style: { background: "#2d2d2d", color: "white" },
      });
    }
  };

  return (
    <>
      <Modal isOpen={onOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#2d2d2d" pb={4}>
          <ModalHeader>Create A Conversation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <Stack spacing={4}>
                <Input
                  placeholder="Enter a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Button
                  type="submit"
                  disabled={!username}
                  onClick={onSubmit}
                  isLoading={loading}
                >
                  Search
                </Button>
              </Stack>
            </form>

            {/*  */}
            {data?.searchUsers && (
              <UserSearchList
                users={data.searchUsers}
                addParticipant={addParticipant}
                removeParticipant={removeParticipant}
              />
            )}

            {participants.length > 0 && (
              <>
                <Participants
                  participants={participants}
                  removeParticipant={removeParticipant}
                />
                <Button
                  bg="whatsapp.400"
                  width="100%"
                  mt={6}
                  _hover={{ bg: "whatsapp.600" }}
                  disabled={participants.length === 0}
                  onClick={createConversations}
                  isLoading={createLoading}
                >
                  Create Conversation
                </Button>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ConversationModal;
