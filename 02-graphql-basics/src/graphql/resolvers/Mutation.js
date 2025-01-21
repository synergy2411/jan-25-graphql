import { GraphQLError } from "graphql";
import { v4 } from "uuid";

let Mutation = {
  createUser: (parent, args, { db }, info) => {
    const { name, age } = args;
    let newUser = {
      id: v4(),
      name,
      age,
    };
    db.users.push(newUser);
    return newUser;
  },
  deleteUser: (parent, args, { db }, info) => {
    const position = db.users.findIndex((user) => user.id === args.userId);
    if (position === -1) {
      throw new GraphQLError("Unable to delete user for id - " + args.userId);
    }

    // delete Post
    db.posts = db.posts.filter((post) => {
      const isMatch = post.author === args.userId;
      if (isMatch) {
        db.comments = db.comments.filter(
          (comment) => comment.postId !== post.id
        );
      }
      return !isMatch;
    });
    // delete Comment
    db.comments = db.comments.filter(
      (comment) => comment.creator !== args.userId
    );

    // delete User
    const [deletedUser] = db.users.splice(position, 1);

    return deletedUser;
  },
  updateUser: (parent, args, { db }, info) => {
    const { name, age } = args.data;
    const position = db.users.findIndex((user) => user.id === args.userId);
    if (position === -1) {
      throw new GraphQLError("Unable to update user for id - " + args.userId);
    }

    if (typeof name === "string") {
      db.users[position].name = name;
    }

    if (typeof age === "number") {
      db.users[position].age = age;
    }

    return db.users[position];
  },
  createPost: (parent, args, { db, pubsub }, info) => {
    const { authorId, title, body } = args;
    const position = db.users.findIndex((user) => user.id === authorId);
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
    pubsub.publish("post-channel", newPost);
    db.posts.push(newPost);
    return newPost;
  },
  deletePost: (parent, args, { db }, info) => {
    const position = db.posts.findIndex((post) => post.id === args.postId);
    if (position === -1) {
      throw new GraphQLError("Unable to delete post for id - " + args.postId);
    }

    db.comments = db.comments.filter(
      (comment) => comment.postId !== args.postId
    );

    const [deletedPost] = db.posts.splice(position, 1);
    return deletedPost;
  },
  createComment: (parent, args, { db }, info) => {
    const { text, creator, postId } = args.data;
    const userPosition = db.users.findIndex((user) => user.id === creator);
    if (userPosition === -1) {
      throw new GraphQLError("Unable to find creator for ID - " + creator);
    }

    const postPosition = db.posts.findIndex((post) => post.id === postId);
    if (postPosition === -1) {
      throw new GraphQLError("Unable to find post for ID - " + postId);
    }

    const newComment = {
      id: v4(),
      text,
      postId,
      creator,
    };

    db.comments.push(newComment);

    return newComment;
  },
  deleteComment: (parent, args, { db }, info) => {
    const position = db.comments.findIndex(
      (comment) => comment.id === args.commentId
    );
    if (position === -1) {
      throw new GraphQLError(
        "Unable to delete comment for id - " + args.commentId
      );
    }
    const [deletedComment] = db.comments.splice(position, 1);
    return deletedComment;
  },
};

export default Mutation;
