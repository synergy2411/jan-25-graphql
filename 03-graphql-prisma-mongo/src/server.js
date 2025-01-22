import { GraphQLError } from "graphql";
import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const { hashSync, compareSync } = bcrypt;

const prisma = new PrismaClient();

const typeDefs = /* GraphQL */ `
  type Query {
    hello: String!
  }
  type Mutation {
    userRegistration(data: UserRegistrationInput!): UserRegistrationPayload!
    userLogin(data: UserLoginInput!): UserLoginPayload!
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
  enum Role {
    DEVELOPER
    MANAGER
    ADMIN
  }
`;

const resolvers = {
  Query: {
    hello: () => "World!",
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
        return { token: "user validated" };
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
});

const server = createServer(yoga);

server.listen(4040, () => console.log("Yoga running on PORT : 4040"));
