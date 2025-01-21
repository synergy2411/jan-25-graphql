import { createSchema, createYoga } from "graphql-yoga";
import { GraphQLError } from "graphql";
import { createServer } from "node:http";
import { v4 } from "uuid";

let users = [
  { id: "u001", name: "monica geller", age: 21 },
  { id: "u002", name: "rachel green", age: 22 },
  { id: "u003", name: "chandler bing", age: 24 },
];

// u002 -> p003, c001, c003, c004

// Post should contain id, title, body and published fields
let posts = [
  {
    id: "p001",
    title: "GraphQL 101",
    body: "Awesome Blog",
    published: true,
    author: "u003",
  },
  {
    id: "p002",
    title: "Spring in Java",
    body: "Like it❤️❤️",
    published: false,
    author: "u001",
  },
  {
    id: "p003",
    title: "Refresh React",
    body: "Very fast",
    published: true,
    author: "u002",
  },
  {
    id: "p004",
    title: "Beginning with Node",
    body: "NodeJS Fundamentals",
    published: false,
    author: "u001",
  },
];

let comments = [
  { id: "c001", text: "like it", postId: "p004", creator: "u002" },
  { id: "c002", text: "luv it", postId: "p002", creator: "u003" },
  { id: "c003", text: "just like that", postId: "p004", creator: "u002" },
  { id: "c004", text: "not bad", postId: "p003", creator: "u001" },
];

// Scalar Types - String, Int, Boolean, Float and ID

// typeDefs - define capabilities of server
const typeDefs = /* GraphQL */ `
  type Mutation {
    createUser(name: String!, age: Int!): User!
    deleteUser(userId: ID!): User!
    updateUser(userId: ID!, data: UpdateUserInput): User!
    createPost(authorId: ID!, title: String!, body: String!): Post!
    deletePost(postId: ID!): Post!
    createComment(data: CreateCommentInput): Comment!
    deleteComment(commentId: ID!): Comment!
  }

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
    posts: [Post!]!
    comments: [Comment!]!
  }
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    comments: [Comment!]!
    author: User!
  }
  type Comment {
    id: ID
    text: String!
    post: Post!
    creator: User!
  }

  input CreateCommentInput {
    text: String!
    postId: ID!
    creator: ID!
  }

  input UpdateUserInput {
    name: String
    age: Int
  }
`;

// resolvers - implementation of typeDefs
const resolvers = {
  Mutation: {
    createUser: (parent, args, context, info) => {
      const { name, age } = args;
      let newUser = {
        id: v4(),
        name,
        age,
      };
      users.push(newUser);
      return newUser;
    },
    deleteUser: (parent, args, context, info) => {
      const position = users.findIndex((user) => user.id === args.userId);
      if (position === -1) {
        throw new GraphQLError("Unable to delete user for id - " + args.userId);
      }

      // delete Post
      posts = posts.filter((post) => {
        const isMatch = post.author === args.userId;
        if (isMatch) {
          comments = comments.filter((comment) => comment.postId !== post.id);
        }
        return !isMatch;
      });
      // delete Comment
      comments = comments.filter((comment) => comment.creator !== args.userId);

      // delete User
      const [deletedUser] = users.splice(position, 1);

      return deletedUser;
    },
    updateUser: (parent, args, context, info) => {
      const { name, age } = args.data;
      const position = users.findIndex((user) => user.id === args.userId);
      if (position === -1) {
        throw new GraphQLError("Unable to update user for id - " + args.userId);
      }

      if (typeof name === "string") {
        users[position].name = name;
      }

      if (typeof age === "number") {
        users[position].age = age;
      }

      return users[position];
    },
    createPost: (parent, args, context, info) => {
      const { authorId, title, body } = args;
      const position = users.findIndex((user) => user.id === authorId);
      if (position === -1) {
        throw new GraphQLError("Unable to find author for id - " + authorId);
      }
      const newPost = {
        id: v4(),
        title,
        body,
        published: false,
        author: authorId,
      };

      posts.push(newPost);
      return newPost;
    },
    deletePost: (parent, args, context, info) => {
      const position = posts.findIndex((post) => post.id === args.postId);
      if (position === -1) {
        throw new GraphQLError("Unable to delete post for id - " + args.postId);
      }

      comments = comments.filter((comment) => comment.postId !== args.postId);

      const [deletedPost] = posts.splice(position, 1);
      return deletedPost;
    },
    createComment: (parent, args, context, info) => {
      const { text, creator, postId } = args.data;
      const userPosition = users.findIndex((user) => user.id === creator);
      if (userPosition === -1) {
        throw new GraphQLError("Unable to find creator for ID - " + creator);
      }

      const postPosition = posts.findIndex((post) => post.id === postId);
      if (postPosition === -1) {
        throw new GraphQLError("Unable to find post for ID - " + postId);
      }

      const newComment = {
        id: v4(),
        text,
        postId,
        creator,
      };

      comments.push(newComment);

      return newComment;
    },
    deleteComment: (parent, args, context, info) => {
      const position = comments.findIndex(
        (comment) => comment.id === args.commentId
      );
      if (position === -1) {
        throw new GraphQLError(
          "Unable to delete comment for id - " + args.commentId
        );
      }
      const [deletedComment] = comments.splice(position, 1);
      return deletedComment;
    },
  },
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
          // user.name === args.query
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
  User: {
    posts: (parent, args, context, info) => {
      return posts.filter((post) => post.author === parent.id);
    },
    comments: (parent, args, context, info) => {
      return comments.filter((comment) => comment.creator === parent.id);
    },
  },
  Post: {
    comments: (parent, args, context, info) => {
      return comments.filter((comment) => comment.postId === parent.id);
    },
    author: (parent, args, context, info) => {
      return users.find((user) => user.id === parent.author);
    },
  },
  Comment: {
    post: (parent, args, context, info) => {
      return posts.find((post) => post.id === parent.postId);
    },
    creator: (parent, args, content, info) => {
      return users.find((user) => user.id === parent.creator);
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
