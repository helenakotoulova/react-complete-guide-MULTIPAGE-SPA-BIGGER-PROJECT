import { useRef, useEffect, useState } from "react";
import useHttp from "../../hooks/hooks/use-http";
import classes from "./NewCommentForm.module.css";
import { addComment } from "../../lib/lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

const NewCommentForm = (props) => {
  const { sendRequest, status, error } = useHttp(addComment);
  const commentTextRef = useRef();
  const [quoteValue, setQuoteValue] = useState("");

  const readQuoteValue = (event) => {
    setQuoteValue(event.target.value);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    // optional: Could validate here
    const enteredText = commentTextRef.current.value;
    sendRequest({ commentData: { text: enteredText }, quoteId: props.quoteId });
    setQuoteValue("");
  };

  // budeme destructurovat props:
  const { onAddComment } = props;
  useEffect(() => {
    if (status === "completed" && !error) {
      onAddComment();
    }
  }, [status, error, onAddComment]);

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea
          id="comment"
          rows="5"
          ref={commentTextRef}
          value={quoteValue}
          onChange={readQuoteValue}
        ></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
