import { GraphQLError } from "graphql";
import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const typeDefs = /* GraphQL */ `
  type Query {
    hello: String!
  }
  type Mutation {
    userRegistration(data: UserRegistrationInput!): UserRegistrationPayload!
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
        const createdUser = await prisma.user.create({
          data: {
            name,
            age,
            email,
            password,
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
