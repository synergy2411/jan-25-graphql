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

const comments = [
  { id: "c001", text: "like it" },
  { id: "c002", text: "luv it" },
  { id: "c003", text: "just like that" },
  { id: "c004", text: "not bad" },
];

// Scalar Types - String, Int, Boolean, Float and ID

// typeDefs - define capabilities of server
const typeDefs = /* GraphQL */ `
  type Query {
    hello: String!
    users(query: String, order: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
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
  type Comment {
    id: ID
    text: String!
  }
`;

// resolvers - implementation of typeDefs
const resolvers = {
  Query: {
    hello: () => "World!",
    users: (parent, args, context, info) => {
      if (args.order) {
        const isDecendeing = args.order === "desc";
        if (isDecendeing) {
          users.sort((userA, userB) => {
            if (userA.name > userB.name) {
              return -1;
            } else if (userA.name < userB.name) {
              return 1;
            } else {
              return 0;
            }
          });
        } else {
          users.sort((userA, userB) => {
            if (userA.name > userB.name) {
              return 1;
            } else if (userA.name < userB.name) {
              return -1;
            } else {
              return 0;
            }
          });
        }
      }
      if (args.query) {
        return users.filter((user) =>
          user.name.includes(args.query.toLowerCase())
        );
      }
      return users;
    },

    posts: (parent, args, context, info) => {
      if (args.query) {
        return posts.filter(
          (post) =>
            post.title.toLowerCase().includes(args.query.toLowerCase()) ||
            post.body.toLowerCase().includes(args.query.toLowerCase())
        );
      }
      return posts;
    },
    comments: (parent, args, context, info) => {
      return comments;
    },
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
