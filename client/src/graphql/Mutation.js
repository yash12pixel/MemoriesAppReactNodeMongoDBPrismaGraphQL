import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      id
      firstName
      lastName
      email
      otpCode
      otpCreateTime
      isOTPVerified
    }
  }
`;

export const VERIFY_USER = gql`
  mutation verifyUsersOtp($email: String!, $otpCode: String!) {
    verifyUsersOtp(email: $email, otpCode: $otpCode) {
      id
      firstName
      lastName
      email
      otpCode
      otpCreateTime
      isOTPVerified
    }
  }
`;

export const RESEND_USER_OTP = gql`
  mutation resendUserOtp($email: String!) {
    resendUserOtp(email: $email) {
      id
      firstName
      lastName
      email
      otpCode
      otpCreateTime
      isOTPVerified
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      firstName
      email
      isOTPVerified
      token
    }
  }
`;

export const FORGOT_USER_CREDENTIALS = gql`
  mutation forgotCredential($email: String!) {
    forgotCredential(email: $email) {
      id
      firstName
      lastName
      email
      otpCode
      otpCreateTime
      isOTPVerified
    }
  }
`;

export const UPDATE_USER_PASSWORD = gql`
  mutation updatePassword($password: String!, $otpCode: String!) {
    updatePassword(password: $password, otpCode: $otpCode) {
      id
      firstName
      lastName
      email
      otpCode
      otpCreateTime
      isOTPVerified
    }
  }
`;

export const UPDATE_USER_EMAIL = gql`
  mutation updateEmailOnProfile($email: String) {
    updateEmailOnProfile(email: $email) {
      id
      firstName
      lastName
      email
      otpCode
      otpCreateTime
      isOTPVerified
    }
  }
`;

export const VERIFY_USER_OTP_ON_PROFILE = gql`
  mutation verifyOtpOnProfile($email: String!, $otpCode: String!) {
    verifyOtpOnProfile(email: $email, otpCode: $otpCode) {
      id
      firstName
      lastName
      email
      otpCode
      otpCreateTime
      isOTPVerified
      token
    }
  }
`;

export const RESEND_USER_EMAIL_OTP = gql`
  mutation resendOtpOnProfile($email: String!) {
    resendOtpOnProfile(email: $email) {
      id
      firstName
      lastName
      email
      otpCode
      otpCreateTime
      isOTPVerified
      token
    }
  }
`;

export const UPDATE_PASSWORD_ON_PROFILE = gql`
  mutation updatePasswordOnProfile(
    $oldPassword: String
    $password: String!
    $confirmPassword: String!
  ) {
    updatePasswordOnProfile(
      oldPassword: $oldPassword
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      firstName
      lastName
      email
      otpCode
      otpCreateTime
      isOTPVerified
      token
    }
  }
`;

// post mutations
export const CREATE_POST = gql`
  mutation createPost(
    $title: String!
    $message: String!
    $creator: String!
    $tags: [String]!
  ) {
    createPost(
      title: $title
      message: $message
      creator: $creator
      tags: $tags
    ) {
      id
      title
      message
      creator
      tags
      likeCount
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost(
    $id: String!
    $title: String!
    $message: String!
    $creator: String!
    $tags: [String]!
  ) {
    updatePost(
      id: $id
      title: $title
      message: $message
      creator: $creator
      tags: $tags
    ) {
      id
      title
      message
      creator
      tags
      likeCount
    }
  }
`;

export const LIKE_POST = gql`
  mutation likePost($id: String!) {
    likePost(id: $id) {
      id
      title
      message
      creator
      tags
      likeCount
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($id: String!) {
    deletePost(id: $id) {
      id
      title
      message
      creator
      tags
      likeCount
    }
  }
`;
