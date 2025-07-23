import { useFetch } from "../hooks/useFetch";
import { BASE_API_URL } from "../config";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import useToast from "../context/ToastContext";

function CommentSection({ author }) {
  const params = useParams();
  const leadId = params.leadId;

  const { data, loading, error } = useFetch(
    `${BASE_API_URL}/leads/${leadId}/comments`
  );

  const { showToast } = useToast();

  const [comment, setComment] = useState("");

  const comments = data?.data;

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const commentData = {
        commentText: comment,
        author: author,
      };

      const response = await fetch(`${BASE_API_URL}/leads/${leadId}/comments`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        throw new Error("Failed to add comment!");
      }
      const data = await response.json();
      showToast(data.message, "success");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.log(error);
      showToast(error, "danger");
    }
  }

  return (
    <>
      <h2 className="text-body-secondary">Comment Section</h2>
      <ul className="list-group mb-3 w-50">
        {error && (
          <div className="alert alert-danger" role="alert">
            Error loading comments!
          </div>
        )}
        {loading && (
          <div className="alert alert-info" role="alert">
            Loading...
          </div>
        )}
        {comments?.length === 0 && (
          <div className="alert alert-info" role="alert">
            Enter First comment.
          </div>
        )}
        {comments &&
          comments.map((comment) => (
            <li key={comment._id} className="list-group-item">
              <div className="d-flex justify-content-between border-bottom mb-2 pb-2">
                <div>
                  <FontAwesomeIcon icon={faUser} /> {comment.author.name}{" "}
                </div>
                <div className="text-secondary">
                  {new Date(comment.createdAt).toLocaleDateString("en-GB")} -{" "}
                  {new Date(comment.createdAt).toLocaleTimeString("en-GB")}
                </div>
              </div>

              <p className="m-0">
                <span className="fw-medium text-secondary">Comment:</span>{" "}
                {comment.commentText}
              </p>
            </li>
          ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 w-50">
          <input
            type="text"
            id="addComment"
            className="form-control"
            placeholder="Enter comment here..."
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-outline-secondary">
            Submit Comment
          </button>
        </div>
      </form>
    </>
  );
}

export default CommentSection;
