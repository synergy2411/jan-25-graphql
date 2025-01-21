let Query = {
  hello: () => "World!",
  users: (parent, args, { db }, info) => {
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
      return db.users.filter((user) =>
        // user.name === args.query
        user.name.includes(args.query.toLowerCase())
      );
    }
    return db.users;
  },
  posts: (parent, args, { db }, info) => {
    if (args.query) {
      return db.posts.filter(
        (post) =>
          post.title.toLowerCase().includes(args.query.toLowerCase()) ||
          post.body.toLowerCase().includes(args.query.toLowerCase())
      );
    }
    return db.posts;
  },
  comments: (parent, args, { db }, info) => {
    return db.comments;
  },
};

export default Query;
