import { gql } from "apollo-server-express";

const postTypeDefs = gql`
  type User {
    id: String
    firstName: String
    lastName: String
    email: String
    password: String
    otpCode: String!
    otpCreateTime: String!
    isOTPVerified: Boolean!
    token: String!
    posts: [Post]
  }

  type Post {
    id: String
    title: String
    message: String
    creator: String
    tags: [String]
    likeCount: Int!
    userId: String!
  }

  type PostData {
    id: String
    title: String
    message: String
    creator: String
    tags: [String]
    likeCount: Int!
  }

  type UsersPost {
    id: String
    firstName: String
    lastName: String
    email: String
    password: String
    otpCode: String!
    otpCreateTime: String!
    isOTPVerified: Boolean!
    token: String!
    posts: [PostData]
  }

  type Query {
    getPostsByUser(id: String): UsersPost
    getPost(id: String!): Post
  }

  type Mutation {
    createPost(
      title: String!
      message: String!
      creator: String!
      tags: [String]!
    ): Post
    updatePost(
      id: String
      title: String
      message: String
      creator: String
      tags: [String]
    ): Post
    deletePost(id: String): Post
    likePost(id: String): Post
  }
`;

export default postTypeDefs;
