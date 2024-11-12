import {
  User,
  Login,
  channelData,
  comment,
  videos,
} from "../Model/User.model.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { config } from "dotenv";
config();
// Generates a unique ObjectId for channelId
const channelIdUser = new mongoose.Types.ObjectId();

// Function to create a new user and associated video data
export async function createUser(req, res) {
  const {
    videoId,
    title,
    thumbnailUrl,
    description,
    channelId,
    uploader,
    views,
    likes,
    dislikes,
    uploadDate,
    comments,
  } = req.body;

  // Process comments and generate unique ObjectId for each
  const processedComments = comments.map((comment) => ({
    ...comment,
    commentId: new mongoose.Types.ObjectId(),
  }));

  // Format the current date to "YYYY-MM-DD"
  const uploadDateOnly = new Date().toISOString().split("T")[0];

  // Create a new User document
  const user = new User({
    videoId: new mongoose.Types.ObjectId(),
    title,
    thumbnailUrl,
    description,
    channelId: channelIdUser,
    uploader,
    views,
    likes,
    categories: req.body.categories,
    dislikes,
    uploadDate: uploadDateOnly,
    comments: processedComments,
  });

  try {
    const newUser = await user.save();
    res.status(201).send(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Function to fetch all users
export async function fetchUser(req, res) {
  try {
    const users = await User.find();
    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).send(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Function to fetch a user by their ID
export async function fetchUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Function to update user details
export async function updateUser(req, res) {
  const { id } = req.params;
  const { title, thumbnailUrl, description, uploader } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { title, thumbnailUrl, description, uploader },
      { new: true } // Return the updated document
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Function to delete a user by ID
export async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not deleted" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Function to register a new user
export async function register(req, res) {
  const { username, email, password } = req.body;

  try {
    // Check if email already exists
    const existingUser = await Login.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already exists");
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new Login document
    const newUser = new Login({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user
    await newUser.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error("Error during registration:", error.message);
    res
      .status(500)
      .send(`An error occurred during registration: ${error.message}`);
  }
}

// Function to log in a user
export async function login(req, res) {
  const { email, password } = req.body;
  const user = await Login.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ token, username: user.username, id: user._id });
  } else {
    res.status(401).send("Invalid credentials");
  }
}

// Middleware for user authentication using JWT
export function Authentication(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).send("Invalid token.");
    }
    req.user = user; // Attach user info to the request
    next();
  });
}
console.log("Secret key", process.env.SECRET_KEY);

// Function to create a new channel
export async function createNewChannel(req, res) {
  try {
    // Check if the file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "File upload failed" });
    }

    // Upload the profile picture to Cloudinary
    const profilePicture = await uploadOnCloudinary(req.file.path);
    if (!profilePicture) {
      return res
        .status(500)
        .json({ message: "Failed to upload image to Cloudinary" });
    }

    // Destructure request body
    const { channelName, description, subscribers, videos, handle } = req.body;

    // Create a new channel document
    const channel = new channelData({
      channelName,
      handle,
      description,
      channelBanner: profilePicture,
      subscribers,
      videos,
      channelId: new mongoose.Types.ObjectId(),
    });

    // Save the new channel
    const newChannel = await channel.save();
    res.status(201).json({
      message: "Channel created successfully",
      channel: newChannel,
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", err });
  }
}

// Function to create a channel by user ID
export async function createChannelByUserId(req, res) {
  const { id, loginId } = req.params;

  try {
    // Fetch user and login details
    const user = await User.findById(id);
    const login = await Login.findById(loginId);
    if (!login) {
      return res.status(404).json({ message: "Login not found" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "File upload failed" });
    }

    // Upload the profile picture to Cloudinary
    const profilePicture = await uploadOnCloudinary(req.file.path);
    if (!profilePicture) {
      return res
        .status(500)
        .json({ message: "Failed to upload image to Cloudinary" });
    }

    // Check if the user already has a channel
    const existingChannel = await channelData.findOne({
      channelId: user.channelId,
    });
    if (existingChannel) {
      return res
        .status(400)
        .json({ message: "Channel already exists for this user" });
    }

    // Destructure request body
    const { channelName, description, subscribers, videos, handle } = req.body;

    // Create a new channel document
    const channel = new channelData({
      channelName,
      owner: user.uploader,
      handle,
      description,
      channelBanner: profilePicture,
      subscribers,
      videos,
      channelId: user.channelId,
    });

    // Save the new channel
    const newChannel = await channel.save();

    // Link the channel ID to the user
    user.channelId = newChannel._id; // Update user's channel ID
    await user.save();

    res.status(201).json({
      message: "Channel created successfully",
      channel: newChannel,
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", err });
  }
}

// Function to create a channel by user's channel
export async function createChannelByUsersChannel(req, res) {
  const { channelId } = req.params;

  try {
    // Fetch user by channel ID
    const user = await User.findOne({ channelId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user already has a channel
    const existingChannel = await channelData.findOne({
      channelId: user.channelId,
    });
    if (existingChannel) {
      return res
        .status(400)
        .json({ message: "Channel already exists for this user" });
    }

    // Check if the file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "File upload failed" });
    }

    // Upload the profile picture to Cloudinary
    const profilePicture = await uploadOnCloudinary(req.file.path);
    if (!profilePicture) {
      return res
        .status(500)
        .json({ message: "Failed to upload image to Cloudinary" });
    }

    // Destructure request body
    const { channelName, description, subscribers, videos, handle } = req.body;

    // Create a new channel document
    const channel = new channelData({
      channelName,
      handle,
      description,
      channelBanner: profilePicture,
      subscribers,
      videos,
      channelId: user.channelId,
    });

    // Save the new channel
    const newChannel = await channel.save();
    res.status(201).json({
      message: "Channel created successfully",
      channel: newChannel,
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", err });
  }
}

export async function fetchChannel(req, res) {
  try {
    const channels = await channelData.find();
    if (!channels) {
      return res.status(404).json({ message: "No data found" });
    }

    res.status(200).send(channels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function fetchChannelById(req, res) {
  const { channelId } = req.params;
  try {
    const objectId = new mongoose.Types.ObjectId(channelId);
    const user = await channelData.findOne({ channelId: objectId });
    if (!user) {
      return res.status(404).json({ message: "channel not found" });
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
export async function fetchChannelId(req, res) {
  const { id } = req.params;
  try {
    const channel = await channelData.findById(id);
    if (!channel) {
      return res.status(404).json({ message: "channel not found" });
    }
    res.status(200).send(channel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
export async function fetchUserByChannelId(req, res) {
  const { channelId } = req.params;
  try {
    const objectId = new mongoose.Types.ObjectId(channelId);
    const user = await User.findOne({ channelId: objectId });
    if (!user) {
      return res.status(404).json({ message: "channel id not found" });
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
// Assuming you have a User model for videos

export async function fetchComments(req, res) {
  const { videoId } = req.params;

  try {
    // Find the video with its videoId
    const video = await User.findOne({
      videoId: new mongoose.Types.ObjectId(videoId),
    });

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Find the comment within the video's comments array by commentId

    // Send the comment if found
    res.status(200).json(video.comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function commentAdd(req, res) {
  const { videoId } = req.params;

  try {
    // Find the video with its videoId
    const video = await User.findOne({
      videoId: new mongoose.Types.ObjectId(videoId),
    });

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    const addComment = new comment({
      userId: req.body.userId,
      text: req.body.text,
    });
    video.comments.push(addComment);
    await video.save();
    // Find the comment within the video's comments array by commentId
    res.status(201).send(addComment);
    // Send the comment if found
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function commentEdit(req, res) {
  const { videoId, commentId } = req.params; // commentId should be passed as a parameter

  try {
    // Find the video with its videoId
    const video = await User.findOne({
      videoId: new mongoose.Types.ObjectId(videoId),
    });

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Convert commentId to ObjectId for comparison
    const comment = video.comments.find(
      (c) => c.commentId.toString() === commentId
    );

    // Send the comment if found
    if (!comment) {
      return res.status(404).json({ message: "Comment not found", comment });
    }

    // Update the comment's text
    comment.text = req.body.text; // Assuming the new text is sent in the request body

    // Save the updated video document
    await video.save();

    // Respond with the updated comment
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
export async function commentDelete(req, res) {
  const { videoId, commentId } = req.params; // commentId should be passed as a parameter

  try {
    // Find the video with its videoId
    const video = await User.findOne({
      videoId: new mongoose.Types.ObjectId(videoId),
    });

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Convert commentId to ObjectId for comparison
    const comment = video.comments.find(
      (c) => c.commentId.toString() === commentId
    );

    if (comment === -1) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Remove the comment from the comments array
    video.comments.splice(comment, 1);

    // Save the updated video document
    await video.save();

    // Respond with a success message or the updated comments list
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function checkUserChannel(req, res) {
  const { channelName } = req.params; // Get channel name from request parameters
  console.log("Received channelName:", channelName); // Log the received channelName

  try {
    // Check if the channelName is formatted correctly
    if (!channelName) {
      console.error("Channel name is missing");
      return res.status(400).json({ message: "Channel name is required" });
    }

    const channels = await channelData.findOne({
      channelName: { $regex: new RegExp(`^${channelName}$`, "i") }, // Case-insensitive search
    });

    // Log the result of the query

    if (channels) {
      return res
        .status(200)
        .json({ hasChannel: true, channelId: channels.channelId }); // User has a channel
    } else {
      return res.status(200).json({ hasChannel: false }); // User does not have a channel
    }
  } catch (error) {
    console.error("Error checking channel:", error);
    return res.status(500).json({ message: "Internal server error" }); // Handle errors
  }
}

export async function uploadVideosByChannelId(req, res) {
  const { id } = req.params;
  try {
    const channelUser = await channelData.findOne({ channelId: id });
    if (!channelUser) {
      return res.status(404).json({ message: "channel does not exist" });
    }
    const newVideo = new videos({
      title: req.body.title,
      videoId: channelUser.channelId,
      videos: req.body.videos,
      description: req.body.description,
      views: req.body.views,
    });
    await newVideo.save();
    res.status(200).json({ message: "video uploaded", videoData: newVideo });
  } catch (err) {
    res.status(500).json({ message: "Someting went wrong", err: err.message });
  }
}
export async function getVideosByVideoId(req, res) {
  const { videoId } = req.params;
  try {
    const videoUser = await videos.find({ videoId: videoId });
    if (!videoUser) {
      return res.status(404).json({ message: "No videos found" });
    }
    res.status(201).send(videoUser);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", err: err.message });
  }
}

export async function updateAllDocuments(req, res) {
  const { videos } = req.body; // Fields to add or update in all documents

  try {
    const result = await User.updateMany(
      {}, // Empty filter to match all documents
      { $set: { videos: videos } } // Fields to update or add
    );

    res
      .status(200)
      .json({ message: `${result.modifiedCount} document(s) updated.` });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
}
