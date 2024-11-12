import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllComments = createAsyncThunk(
  "comments/fetchAllComments",
  async (videoId) => {
    const response = await axios.get(
      `http://localhost:3000/videos/${videoId}/comments`
    );
    return response.data;
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ videoId, text, userId }) => {
    const response = await axios.post(
      `http://localhost:3000/videos/${videoId}/comments`,
      { text, userId }
    );
    return response.data;
  }
);
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async ({ commentId, videoId }) => {
    await axios.delete(
      `http://localhost:3000/videos/${videoId}/comments/${commentId}`
    );
    return commentId;
  }
);
export const editComment = createAsyncThunk(
  "comments/editComment",
  async ({ commentId, text, videoId }) => {
    const response = await axios.put(
      `http://localhost:3000/videos/${videoId}/comments/${commentId}`,
      {
        text,
      }
    );
    return { ...response.data, videoId };
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (comment) => comment.commentId !== action.payload
        );
      })
      .addCase(editComment.fulfilled, (state, action) => {
        const index = state.comments.findIndex(
          (comment) => comment.commentId === action.payload.commentId
        );
        if (index !== -1) {
          state.comments[index] = action.payload;
        }
      });
  },
});

export const selectComments = (state) => state.comments.comments;

export default commentsSlice.reducer;
