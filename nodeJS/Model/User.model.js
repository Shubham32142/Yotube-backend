import mongoose, { Schema } from "mongoose";

// Comment Schema
const commentSchema = new mongoose.Schema(
  {
    commentId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    userId: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);
export const comment = mongoose.model("comment", commentSchema);

// User Schema
const userSchema = new mongoose.Schema({
  videoId: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  description: { type: String, required: true },
  channelId: {
    type: Schema.Types.ObjectId,
    ref: "channelData",
    required: true,
  },
  uploader: { type: String, required: true },
  views: { type: Number, default: 0 }, // Default views to 0
  categories: { type: [String], required: true },
  likes: { type: Number, default: 0 }, // Default likes to 0
  dislikes: { type: Number, default: 0 }, // Default dislikes to 0
  uploadDate: { type: String, required: true },
  comments: [commentSchema], // Comments array
  videos: { type: String, required: true },
});

export const User = mongoose.model("User", userSchema);

// Login Schema
const LoginSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  channels: { type: [String] },
});
export const Login = mongoose.model("Login", LoginSchema);

// Channel Schema
const channelSchema = new mongoose.Schema({
  channelName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  handle: {
    type: String,
    required: true,
  },
  channelBanner: {
    type: String,
  },
  subscribers: {
    type: Number,
    default: 0,
  },
  channelId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const channelData = mongoose.model("channelData", channelSchema);

// Video Schema
const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "channelData",
    required: true,
  },
  videos: { type: String, required: true },
  description: { type: String, required: true },
  views: { type: Number, default: 0 }, // Default views to 0
});

export const videos = mongoose.model("videos", videoSchema);
