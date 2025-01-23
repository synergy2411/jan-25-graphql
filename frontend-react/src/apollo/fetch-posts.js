import { gql } from "@apollo/client";

const FETCH_POSTS = gql`
  query FetchPosts {
    posts {
      id
      title
      body
      published
      author {
        id
        name
        email
        age
        role
      }
    }
  }
`;

export default FETCH_POSTS;
