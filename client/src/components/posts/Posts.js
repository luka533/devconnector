import { FaRegUser } from "react-icons/fa";

import { useGetAllPostsQuery } from "../../state/post/postApiSlice";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

function Posts() {
  const { data, isLoading } = useGetAllPostsQuery();

  if (isLoading) return <Spinner />;

  const posts = data?.data;
  console.log(posts);
  return (
    <>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <FaRegUser className="react-icon" /> Welcome to the community!
      </p>
      <PostForm />

      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </>
  );
}

export default Posts;
