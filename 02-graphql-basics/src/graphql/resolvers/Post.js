let Post = {
  comments: (parent, args, { db }, info) => {
    return db.comments.filter((comment) => comment.postId === parent.id);
  },
  author: (parent, args, { db }, info) => {
    return db.users.find((user) => user.id === parent.author);
  },
};

export default Post;
