import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";

// Scalar Types - String, Int, Boolean, Float and ID

// typeDefs - define capabilities of server
const typeDefs = `
    type Query {
        hello: String!
        age: Int
        isAdmin: Boolean
        salary: Float
        userId: ID
        friends: [String!]!
    }
`;

// resolvers - implementation of typeDefs
const resolvers = {
  Query: {
    hello: () => "World!",
    age: () => 23,
    isAdmin: () => true,
    salary: () => 123.34,
    userId: () => "jsdh-76576-sdfsdf-sd878",
    friends: () => ["Joey", null, "Ross", "Rachel"],
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
