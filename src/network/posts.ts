import axios from "axios";
import { AddPostBody, Post } from "../interfaces/Post";
import {
  authConfig,
  domain,
  uploadPictureConfig,
  withLogs,
} from "../utils/apiCallsHandler";

const url = `${domain}/api/posts`;

const addPost: (
  addPostBody: AddPostBody,
  token: string
) => Promise<Post> = async (addPostBody, token) => {
  console.log("token on add ", token);
  return withLogs(axios.post(url, addPostBody, authConfig(token)), "addPost");
};

const uploadPostPicture: (
  picture: File,
  postId: string,
  token: string
) => Promise<string> = async (picture, postId, token) => {
  let data = new FormData();
  data.append("picture", picture, picture.name);
  return withLogs(
    axios.post(`${url}/upload/${postId}`, data, uploadPictureConfig(token)),
    "uploadPostPicture"
  );
};

const getPosts: () => Promise<Post[]> = async () => {
  return withLogs(axios.get(url), "getPosts");
};

const getPostsForUser: (token: string) => Promise<Post[]> = async (token) => {
  return withLogs(
    axios.get(`${url}/user`, authConfig(token)),
    "getPostsForUser"
  );
};

const getPostById: (postId: string) => Promise<Post> = async (postId) => {
  return withLogs(axios.get(`${url}/${postId}`), "getPostById");
};

export { addPost, uploadPostPicture, getPosts, getPostById, getPostsForUser };
