# Break Timings-

- Tea break : 12:30 (15 mins )
- Lunch break : 2:00 (45 mins)
- Tea break: 4:15 (15 mins)

# JavaScript

- Single Threaded
- Callback, Promises, Async...await
- Object oriented
- ES6+ Specifications - Spread, Rest, Arrow, Destructuring etc
- Non-blocking
- Client side as well as Server side

- Sync Code : executes before async code
- Async Code : Timers, Reading/Writing files, Sockets, Remote Server Call etc
  > Micro : Promises, queueMicrotask()
  > Macro : Rest all async code

# NodeJS - V8 Engine

- Node Runtime Environment (NRE - REPL)
- Node Package Manager (NPM)
- Node Native Modules (eg. http, os, fs, util etc)

# REST Endpoints

/books - bookId, title, numOfPages, isbn
/authors - bookId, authorId, authorName, age, address
/comments - commentId, bookId, authorId, text

/books/bookId -> data for one book

Client Request - bookId, title, isbn, authorName, age

- Under-fetching: fetching less data than required
- Over-fetching: fetching more data than expected
- Multiple REST Endpoints

# GraphQL

- query
- mutation
- subscription

http://localhost:4040/graphql

query {
books {
id,
title,
isbn,
authorName,
age
}
}

## /posts

# Steps to create Graphql server

- Generates Package JSON file
  > npm init
- Install graphql-yoga graphql
  > npm install graphql-yoga graphql
- Installing nodemon : restarts server automatically on file save
  > npm install nodemon -D
- Create Schema : typeDefs & resolvers
- Create Graphql Yoga Server
- Create Node Http Server
- Run Http Server on some port : 4000

> npm run start
> npm run devStart

# Modules

- ECMAScript Module (ESM)
- CommonJS Module System (default in NodeJS)
- AMD
- UMD

---

- MongoDB ( MongoDB Atlas - Cloud Version)
- Mongo Compass - GUI Client
- Prisma ORM - RDBMS as well as NoSQL
- Protected Resources (JWT Token)
- Client side

Username : synergy
Password: QvRvQUutVQSDDRL0

# Mongo Atlas Connection String -

mongodb+srv://synergy:QvRvQUutVQSDDRL0@mydemocluster.e9xsq.mongodb.net/?retryWrites=true&w=majority&appName=MyDemoCluster

mongodb+srv://synergy:QvRvQUutVQSDDRL0@mydemocluster.e9xsq.mongodb.net/blog-db

# Steps for connecting Graphql Server with Prisma and MongoDB

> npm init -y
> npm install prisma --save-dev
> npx prisma init
> Update DATABASE_URL and provider property
> npx prisma db pull (for introspection)
> npx prisma db push (for pushing the prisma schema collection)
> npm install @prisma/client
> npm install graphql-yoga graphql
> npm install nodemon -D

- User Registration : store user info into DB
- User Login : validate user credentials and generate the token
- Create Post : User validation through token
- Fetch Posts : All the posts without authentication
