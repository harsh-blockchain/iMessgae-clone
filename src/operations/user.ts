import { gql } from "@apollo/client";

export default {
  Query: {
    searchUsers: gql`
      query SearchUsers($username: String!) {
        searchUsers(username: $username) {
          id
          username
          image
        }
      }
    `,
  },
  Mutation: {
    createUsername: gql`
      mutation Createusername($username: String!) {
        createUsername(username: $username) {
          success
          error
        }
      }
    `,
  },
  Subscriptions: {},
};
