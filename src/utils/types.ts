import { messagePopulated } from "./../../../backend/src/resolvers/message";
import {
  ConversationPopulated,
  messagePopulatedType,
} from "./../../../backend/src/utils/types";
export interface createUsernameData {
  createUsername: {
    success: boolean;
    error: string;
  };
}

export interface createUsernamevariables {
  username: string;
}

export interface SearchuserInput {
  username: string;
}

export interface SearchUserData {
  searchUsers: Array<SearchUser>;
}

export interface SearchUser {
  id: string;
  username: string;
  image: string;
}

/* conversations */

export interface CreateConversationData {
  createConversation: {
    conversationId: string;
  };
}

export interface CreateConversationInput {
  participantIds: Array<string>;
}

/*  */

export interface ConversationData {
  conversations: Array<ConversationPopulated>;
}

/* messages */

export interface MessageData {
  messages: Array<messagePopulatedType>;
}

export interface MessageVariables {
  conversationId: string;
}
