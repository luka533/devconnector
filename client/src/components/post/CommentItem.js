import Moment from "react-moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useRemoveCommentMutation } from "../../state/post/postApiSlice";
import { FaTimes } from "react-icons/fa";

function CommentItem({
  postId,
  comment: { _id, text, name, avatar, user, date },
}) {
  const currentUser = useSelector((state) => state.auth.user);
  const [deleteCommentMutation, { isLoading }] = useRemoveCommentMutation();

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
        {currentUser._id === user && (
          <button
            onClick={() => deleteCommentMutation({ postId, commentId: _id })}
            type="button"
            className="btn btn-danger"
            disabled={isLoading}
          >
            <FaTimes />
          </button>
        )}
      </div>
    </div>
  );
}

export default CommentItem;
