import { useState } from "react";
import { useAddCommentMutation } from "../../state/post/postApiSlice";

function CommentForm({ postId }) {
  const [text, setText] = useState("");

  const [addCommentMutation, { isLoading }] = useAddCommentMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    addCommentMutation({ postId, text });
    setText("");
  };

  return (
    <div class="post-form">
      <div class="bg-primary p">
        <h3>Leave A Comment</h3>
      </div>
      <form onSubmit={handleSubmit} class="form my-1">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          name="text"
          cols="30"
          rows="5"
          placeholder="Comment on this post"
          required
        ></textarea>
        <input type="submit" class="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
}

export default CommentForm;
