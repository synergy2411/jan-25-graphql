import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";

const users = [
  { id: "u001", name: "monica geller", age: 21 },
  { id: "u002", name: "rachel green", age: 22 },
  { id: "u003", name: "chandler bing", age: 24 },
];

// Post should contain id, title, body and published fields
const posts = [
  { id: "p001", title: "GraphQL 101", body: "Awesome Blog", published: true },
  {
    id: "p002",
    title: "Spring in Java",
    body: "Like it❤️❤️",
    published: false,
  },
  { id: "p003", title: "Refresh React", body: "Very fast", published: true },
  {
    id: "p004",
    title: "Beginning with Node",
    body: "NodeJS Fundamentals",
    published: false,
  },
];

// Scalar Types - String, Int, Boolean, Float and ID

// typeDefs - define capabilities of server
const typeDefs = /* GraphQL */ `
  type Query {
    hello: String!
    users(query: String): [User!]!
    posts: [Post!]!
  }
  type User {
    id: ID!
    name: String!
    age: Int!
  }
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`;

// resolvers - implementation of typeDefs
const resolvers = {
  Query: {
    hello: () => "World!",
    users: (parent, args, context, info) => {
      if (args.query) {
        return users.filter((user) =>
          user.name.includes(args.query.toLowerCase())
        );
      }
      return users;
    },
    posts: () => posts,
  },
};

const schema = createSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({
  schema,
});

const server = createServer(yoga);

server.listen(4000, () => console.log("GraphQL Server running on PORT: 4000"));
