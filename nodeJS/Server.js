import express from "express";
import mongoose from "mongoose";
import { Routes } from "./Routes/User.routes.js";
import cors from "cors";
const server = new express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running at port---- ${port}`);
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Error connecting database", err);
  });
Routes(server);
