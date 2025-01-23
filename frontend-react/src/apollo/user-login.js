import { gql } from "@apollo/client";

const USER_LOGIN = gql`
  mutation UserLogin($email: String!, $password: String!) {
    userLogin(data: { email: $email, password: $password }) {
      token
    }
  }
`;

export default USER_LOGIN;
