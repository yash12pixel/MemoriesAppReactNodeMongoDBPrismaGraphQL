import { gql } from "apollo-server-express";
const userTypeDefs = gql`
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
    posts: [Post]!
  }

  type Query {
    getUser(id: String!): User
    getUsers: [User]
  }

  type Mutation {
    createUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): User
    verifyUsersOtp(email: String!, otpCode: String!): User
    resendUserOtp(email: String!): User
    login(email: String!, password: String!): User
    forgotCredential(email: String!): User
    updatePassword(password: String!, otpCode: String!): User
    updateEmailOnProfile(email: String): User
    verifyOtpOnProfile(email: String!, otpCode: String!): User
    resendOtpOnProfile(email: String!): User
    updatePasswordOnProfile(
      oldPassword: String
      password: String!
      confirmPassword: String!
    ): User
  }
`;

export default userTypeDefs;
