import { gql } from "@apollo/client";

const CREATE_POST = gql`
  mutation CreatePost(
    $message: String
    $kudos: Int
    $receivers: [ID!]
    $virtual_receivers: [String!]
    $team_id: ID
    $images: [UploadedFile!]!
  ) {
    createPost(
      message: $message
      amount: $kudos
      receiverIds: $receivers
      nullReceivers: $virtual_receivers
      teamId: $team_id
      images: $images
    ) {
      post {
        id
        amount
      }
    }
  }
`;
export default CREATE_POST;
