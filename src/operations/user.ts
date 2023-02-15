import { gql } from "@apollo/client";

export default {
  Query: {},
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
