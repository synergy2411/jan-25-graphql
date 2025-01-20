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
- Create Schema
- Create Graphql Yoga Server
- Create Node Http Server
- Run Http Server on some port

> npm run start
> npm run devStart