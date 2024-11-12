/* eslint-disable no-unused-vars */
import {
  createUser,
  fetchUser,
  fetchUserById,
  updateUser,
  deleteUser,
  register,
  login,
  createChannelByUserId,
  fetchChannel,
  fetchChannelById,
  fetchUserByChannelId,
  fetchComments,
  commentAdd,
  commentEdit,
  commentDelete,
  Authentication,
  createNewChannel,
  checkUserChannel,
  fetchChannelId,
  uploadVideosByChannelId,
  getVideosByVideoId,
  updateAllDocuments,
  createChannelByUsersChannel,
} from "../Controller/User.controller.js";
import { upload } from "../middleware/multer.middleware.js";
export function Routes(server) {
  server.post("/User", createUser);
  server.post("/postVideos/:id", uploadVideosByChannelId);
  server.get("/Users", Authentication, fetchUser);
  server.get("/User/channels", fetchChannel);
  server.get("/User/:id", fetchUserById);
  server.get("/getVideos/:videoId", getVideosByVideoId);
  server.get("/channel/:channelId", fetchChannelById);
  server.put("/User/addVideos", updateAllDocuments);
  server.get("/viewChannel/:id", fetchChannelId);
  server.get("/channel/name/:channelName", checkUserChannel);
  server.get("/User/byChannel/:channelId", fetchUserByChannelId);
  server.get("/videos/:videoId/comments", fetchComments);
  server.put("/User/:id", updateUser);
  server.delete("/User/:id", deleteUser);
  server.post("/User/register", register);
  server.post(
    "/createChannel/addChannel/:channelId",
    createChannelByUsersChannel
  );
  server.post(
    "/createChannel",
    upload.single("channelBanner"),
    createNewChannel
  );
  server.post("/User/login", login);
  server.post(
    "/createChannel/:id/:loginId",
    upload.single("channelBanner"),
    createChannelByUserId
  );

  server.post("/videos/:videoId/comments", commentAdd);
  server.put("/videos/:videoId/comments/:commentId", commentEdit);
  server.delete("/videos/:videoId/comments/:commentId", commentDelete);
}
