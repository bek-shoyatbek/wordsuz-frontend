import React, { useState } from "react";
import "./Comments.css";

interface Comment {
  id: number;
  text: string;
}

export const Comments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { id: Date.now(), text: newComment }]);
      setNewComment("");
    }
  };

  return (
    <div className="comments-section">
      <h3 className="comments-title">Comments</h3>
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          className="comment-input"
          rows={3}
        />
        <button type="submit" className="comment-button">
          Add Comment
        </button>
      </form>
      <ul className="comments-list">
        {comments.map((comment) => (
          <li key={comment.id} className="comment-item">
            {comment.text}
          </li>
        ))}
      </ul>
    </div>
  );
};
