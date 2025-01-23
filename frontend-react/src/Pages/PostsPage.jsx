import { useQuery } from "@apollo/client";
import FETCH_POSTS from "../apollo/fetch-posts";
import PostItem from "../Components/PostItem";

function PostsPage() {
  const { data, error, loading, refetch } = useQuery(FETCH_POSTS, {
    // pollInterval: 1000,
  });

  if (loading) return <h1>Loading...</h1>;

  refetch();

  return (
    <>
      <h1 className="text-center">List of All Posts</h1>
      {error && <p>{error}</p>}
      <div className="row">
        {data && data.posts.map((post) => <PostItem {...post} key={post.id} />)}
      </div>
    </>
  );
}

export default PostsPage;
