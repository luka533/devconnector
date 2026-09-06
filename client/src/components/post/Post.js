import { Link, useParams } from "react-router-dom";
import { useGetPostQuery } from "../../state/post/postApiSlice";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

function Post() {
  const params = useParams();

  const { data, isLoading } = useGetPostQuery(params.postId);

  const post = data?.data?.post ?? data?.data ?? null;

  if (isLoading) return <div>Loading...</div>;

  if (!post) return <h3>No post found.</h3>;

  return (
    <>
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}{" "}
      </div>
    </>
  );
}

export default Post;
