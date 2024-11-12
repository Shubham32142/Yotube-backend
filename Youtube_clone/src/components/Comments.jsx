/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllComments,
  addComment,
  deleteComment,
  editComment,
  selectComments,
} from "./commentSlice";

export function Comments({ videoId, commentId }) {
  const dispatch = useDispatch();
  const comments = useSelector(selectComments);
  const [newComment, setNewComment] = useState("");
  const [editMode, setEditMode] = useState({ id: null, text: "" });
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (videoId) {
      dispatch(fetchAllComments(videoId));
    }
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [videoId, dispatch]);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (!newComment) return;

    await dispatch(
      addComment({
        videoId,
        text: newComment,
        userId: username,
        commentId,
      })
    );
    setNewComment("");
  };

  const handleEditComment = (comment) => {
    setEditMode({ id: comment.commentId, text: comment.text });
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    await dispatch(
      editComment({ videoId, commentId: editMode.id, text: editMode.text })
    );
    setEditMode({ id: null, text: "" });
  };

  const handleDeleteComment = async (commentId) => {
    await dispatch(deleteComment({ videoId, commentId }));
  };

  return (
    <div className="w-full p-6 bg-gray-100">
      <form onSubmit={handleCommentSubmit} className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={handleCommentChange}
          className="w-full p-2 border-b border-gray-300 outline-none focus:border-blue-500 transition-colors"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          Post
        </button>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            className="flex flex-col p-4 bg-white rounded-lg shadow-md"
            key={comment.commentId}
          >
            <div className="flex items-center mb-2">
              <img
                className="w-10 h-10 rounded-full mr-3"
                src="https://imgs.search.brave.com/mYuKqM8YeN3Xo0rk0ioz3wRsMz8tw2c9O8pUk5uohlI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dzNzY2hvb2xzLmNv/bS9ob3d0by9pbWdf/YXZhdGFyLnBuZw"
                alt="Avatar"
              />
              <div>
                <span className="font-semibold">@{comment.userId}</span>
                <span className="text-sm text-gray-500 ml-2">
                  {/* Timestamp */}
                </span>
              </div>
            </div>

            <div className="mb-2">
              {editMode.id === comment.commentId ? (
                <form onSubmit={handleEditSubmit} className="flex items-center">
                  <input
                    className="flex-grow p-1 border-b border-gray-400 focus:border-blue-500 outline-none transition-colors"
                    value={editMode.text}
                    onChange={(e) =>
                      setEditMode({ ...editMode, text: e.target.value })
                    }
                  />
                  <button
                    type="submit"
                    className="ml-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Update
                  </button>
                </form>
              ) : (
                <p>{comment.text}</p>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm text-blue-600">
              <div className="flex items-center cursor-pointer">
                <span>👍</span>
                <span className="ml-1">{comment.likes || 0}</span>
              </div>
              <button className="hover:underline">Reply</button>
              <button onClick={() => handleEditComment(comment)}>Edit</button>
              <button onClick={() => handleDeleteComment(comment.commentId)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
