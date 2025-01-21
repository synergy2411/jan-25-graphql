import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import db from "./model/data.js";
import resolvers from "./graphql/resolvers/resolvers.js";
import { loadFile } from "graphql-import-files";

const schema = createSchema({
  typeDefs: loadFile("./src/graphql/schema.graphql"),
  resolvers,
});

const yoga = createYoga({
  schema,
  context: {
    db,
  },
});

const server = createServer(yoga);

server.listen(4000, () => console.log("GraphQL Server running on PORT: 4000"));
