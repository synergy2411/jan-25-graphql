import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";

const users = [
  { id: "u001", name: "monica geller", age: 21 },
  { id: "u002", name: "rachel green", age: 22 },
  { id: "u003", name: "chandler bing", age: 24 },
];
// Scalar Types - String, Int, Boolean, Float and ID

// typeDefs - define capabilities of server
const typeDefs = /* GraphQL */ `
  type Query {
    hello: String!
    users: [User!]!
  }
  type User {
    id: ID!
    name: String!
    age: Int!
  }
`;

// resolvers - implementation of typeDefs
const resolvers = {
  Query: {
    hello: () => "World!",
    users: () => users,
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
