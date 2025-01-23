const { sum, getFirstName } = require("./utils");
const {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  gql,
} = require("@apollo/client");
const fetch = require("cross-fetch");
// Connect to GraphQL Server using ApolloClient
// Write Queries
// Assert the result

describe("GraphQL Testing Suite", () => {
  let client = null;

  beforeEach(() => {
    client = new ApolloClient({
      link: createHttpLink({
        uri: "http://localhost:4040/graphql",
        fetch,
      }),
      cache: new InMemoryCache(),
    });
  });

  afterEach(() => {
    client = null;
  });

  test("should return all the available posts", async () => {
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

    const { data } = await client.query({
      query: FETCH_POSTS,
    });

    expect(data.posts.length).not.toBe(0);

    const authors = data.posts.map((post) => post.author);

    expect(authors.length).toEqual(data.posts.length);
  });

  test("should generate token when correct credentials given", async () => {
    const USER_LOGIN = gql`
      mutation UserLogin($email: String!, $password: String!) {
        userLogin(data: { email: $email, password: $password }) {
          token
        }
      }
    `;

    const { data } = await client.mutate({
      mutation: USER_LOGIN,
      variables: {
        email: "ross@test",
        password: "ross123",
      },
    });

    expect(data.userLogin.token).not.toBeUndefined();
  });
});

describe("Utility Testing Suite", () => {
  test("should return first name when full name is given", () => {
    const result = getFirstName("John Doe");
    expect(result).toEqual("John");
  });

  test("should return the sum of two numbers", () => {
    let result = sum(2, 4);
    expect(result).toEqual(6);
  });

  test("should pass the truthy test", () => {
    expect(true).toBeTruthy();
  });
});
