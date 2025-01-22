import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4040/graphql",
  cache: new InMemoryCache(),
});

const FETCH_POSTS = gql`
  query {
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

window.onload = async function () {
  const listContainer = document.querySelector("#list-container");

  const { data } = await client.query({
    query: FETCH_POSTS,
  });

  data.posts.forEach((post) => {
    const liElement = document.createElement("li");
    liElement.innerHTML = post.title.toUpperCase();
    listContainer.appendChild(liElement);
  });
};
