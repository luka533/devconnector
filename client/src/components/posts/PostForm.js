import { useState } from "react";
import { useAddPostMutation } from "../../state/post/postApiSlice";
import Spinner from "../layout/Spinner";

function PostForm() {
  const [text, setText] = useState("");

  const [addPostMutation, { isLoading }] = useAddPostMutation();

  const onSubmit = (e) => {
    e.preventDefault();
    addPostMutation({ text });
    setText("");
  };

  if (isLoading) return <Spinner />;

  return (
    <div class="post-form">
      <div class="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form onSubmit={onSubmit} class="form my-1">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          required
        ></textarea>
        <input type="submit" class="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
}

export default PostForm;
