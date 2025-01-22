import { GraphQLError } from "graphql";
import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { sign, verify } = jwt;
const { hashSync, compareSync } = bcrypt;
const SECRET_KEY = "MY_SUPER_SECRET_KEY";
const prisma = new PrismaClient();

const typeDefs = /* GraphQL */ `
  type Query {
    hello: String!
    posts: [Post!]!
  }
  type Mutation {
    userRegistration(data: UserRegistrationInput!): UserRegistrationPayload!
    userLogin(data: UserLoginInput!): UserLoginPayload!
    createPost(data: CreatePostInput!): Post!
  }

  type UserRegistrationPayload {
    message: String!
  }

  input UserRegistrationInput {
    name: String!
    age: Int!
    email: String!
    password: String!
    role: Role
  }

  type UserLoginPayload {
    token: String!
  }

  input UserLoginInput {
    email: String!
    password: String!
  }

  type User {
    id: ID!
    name: String!
    age: Int!
    email: String!
    role: Role!
  }
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
  }

  input CreatePostInput {
    title: String!
    body: String!
  }
  enum Role {
    DEVELOPER
    MANAGER
    ADMIN
  }
`;

const resolvers = {
  Query: {
    hello: () => "World!",
    posts: async (parent, args, context, info) => {
      try {
        const allPosts = await prisma.post.findMany({
          include: {
            author: true,
          },
        });
        return allPosts;
      } catch (err) {
        console.log(err);
        throw new GraphQLError(err);
      }
    },
  },
  Mutation: {
    userRegistration: async (parent, args, context, info) => {
      try {
        let { name, age, email, password, role } = args.data;
        role = role ? role : "DEVELOPER";
        const hashedPassword = hashSync(password, 12);
        const createdUser = await prisma.user.create({
          data: {
            name,
            age,
            email,
            password: hashedPassword,
            role,
          },
        });
        if (!createdUser) {
          throw new GraphQLError("Unable to create new user!");
        }
        return { message: "User created successfully." };
      } catch (err) {
        console.log(err);
        throw new GraphQLError(err);
      }
    },
    userLogin: async (parent, args, context, info) => {
      try {
        const { email, password } = args.data;
        const foundUser = await prisma.user.findUnique({ where: { email } });
        if (!foundUser) {
          throw new GraphQLError("Unable to find email - " + email);
        }
        const isMatched = compareSync(password, foundUser.password);
        if (!isMatched) {
          throw new GraphQLError("Bad passwrod!");
        }
        let payload = {
          id: foundUser.id,
          email: foundUser.email,
          role: foundUser.role,
          name: foundUser.name,
        };
        const token = sign(payload, SECRET_KEY);
        return { token };
      } catch (err) {
        console.log(err);
        throw new GraphQLError(err);
      }
    },
    createPost: async (parent, args, { token }, info) => {
      if (!token) {
        throw new GraphQLError("Auth required.");
      }

      try {
        const { title, body } = args.data;

        const { id, name, role, age, iat } = verify(token, SECRET_KEY);

        // const foundUser = await prisma.user.findFirst({
        //   where: { id: args.authorId },
        // });
        // if (!foundUser) {
        //   throw new GraphQLError(
        //     "Unable to find user for id - " + args.authorId
        //   );
        // }

        const createdPost = await prisma.post.create({
          data: {
            title,
            body,
            published: false,
            // authorId: args.authorId,
            authorId: id,
          },
        });
        return createdPost;
      } catch (err) {
        console.log(err);
        throw new GraphQLError(err);
      }
    },
  },
};

const schema = createSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({
  schema,
  context: ({ request }) => {
    const authHeader = request.headers.get("authorization");
    let token = null;
    if (authHeader) {
      token = authHeader.split(" ")[1]; //"Bearer TOKEN_VALUE"
    }
    return { token };
  },
});

const server = createServer(yoga);

server.listen(4040, () => console.log("Yoga running on PORT : 4040"));
