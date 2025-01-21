let users = [
  { id: "u001", name: "monica geller", age: 21 },
  { id: "u002", name: "rachel green", age: 22 },
  { id: "u003", name: "chandler bing", age: 24 },
];

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

const db = { users, posts, comments };
export default db;
