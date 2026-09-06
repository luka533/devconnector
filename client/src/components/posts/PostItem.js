import { Link } from "react-router-dom";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { FaThumbsDown, FaThumbsUp, FaTimes } from "react-icons/fa";
import Spinner from "../layout/Spinner";
import {
  useAddLikeMutation,
  useDeletePostMutation,
  useRemoveLikeMutation,
} from "../../state/post/postApiSlice";

function PostItem({
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions = true,
}) {
  const { user: currentUser, isLoading } = useSelector((state) => state.auth);

  const [addLikeMutation, { isLoading: isAddingLike }] = useAddLikeMutation();
  const [removeLikeMutation, { isLoading: isRemovingLike }] =
    useRemoveLikeMutation();

  const [deletePostMutation, { isLoading: isDeletingPost }] =
    useDeletePostMutation();

  if (isLoading) return <Spinner />;

  return (
    <div class="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img class="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p class="my-1">{text}</p>
        <p class="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>

        {showActions && (
          <>
            {" "}
            <button
              onClick={() => addLikeMutation(_id)}
              type="button"
              class="btn btn-light"
              disabled={isAddingLike}
            >
              <FaThumbsUp className="react-icon" />
              {likes.length > 0 && <span>{likes.length}</span>}
            </button>
            <button
              onClick={() => removeLikeMutation(_id)}
              type="button"
              class="btn btn-light"
              disabled={isRemovingLike}
            >
              <FaThumbsDown className="react-icon" />
            </button>
            <Link to={`/posts/${_id}`} class="btn btn-primary">
              Discussion{" "}
              {comments.length > 0 && (
                <span class="comment-count">{comments.length}</span>
              )}
            </Link>
            {user === currentUser._id && (
              <button
                onClick={() => deletePostMutation(_id)}
                type="button"
                class="btn btn-danger"
                disabled={isDeletingPost}
              >
                <FaTimes className="react-icon" />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default PostItem;
