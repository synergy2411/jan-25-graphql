import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";

// typeDefs - define capabilities of server
const typeDefs = `
    type Query {
        hello: String
    }
`;

// resolvers - implementation of typeDefs
const resolvers = {
  Query: {
    hello: () => "GraphQL Server!",
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
