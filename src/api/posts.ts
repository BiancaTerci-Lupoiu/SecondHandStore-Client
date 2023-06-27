import axios from "axios";
import { AddPostBody, Post, UpdatePostBody } from "../interfaces/Post";
import {
  authConfig,
  domain,
  uploadPictureConfig,
  withLogs,
} from "../utils/apiCallsHandler";
import { PostFilters } from "../interfaces/Filters";

const url = `${domain}/api/posts`;

const addPost: (
  addPostBody: AddPostBody,
  token: string
) => Promise<Post> = async (addPostBody, token) => {
  console.log("token on add ", token);
  console.log(addPostBody);
  return withLogs(axios.post(url, addPostBody, authConfig(token)), "addPost");
};

const uploadPostPicture: (
  picture: File,
  postId: string,
  token: string
) => Promise<Post> = async (picture, postId, token) => {
  let data = new FormData();
  data.append("picture", picture, picture.name);
  return withLogs(
    axios.post(`${url}/upload/${postId}`, data, uploadPictureConfig(token)),
    "uploadPostPicture"
  );
};

const filterByPicture: (picture: File) => Promise<Post[]> = async (picture) => {
  let data = new FormData();
  data.append("picture", picture, picture.name);
  console.log(data);
  return withLogs(
    axios.post(`${url}/imageFilter`, data, uploadPictureConfig()),
    "filterByPicture"
  );
};

const getPosts: (
  token: string,
  filters?: PostFilters
) => Promise<Post[]> = async (token, filters) => {
  return withLogs(
    axios.get(url, { params: filters, ...authConfig(token) }),
    "getPosts"
  );
};

const getPostsByKeywords: (
  token: string,
  words: string
) => Promise<Post[]> = async (token, words) => {
  return withLogs(
    axios.get(`${url}/keywordsFilter`, {
      params: { words },
      ...authConfig(token),
    }),
    "getPosts"
  );
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

const deletePost: (postId: string, token: string) => Promise<Post> = async (
  postId,
  token
) => {
  return withLogs(
    axios.delete(`${url}/${postId}`, authConfig(token)),
    "getPostById"
  );
};

const updatePost: (
  postId: string,
  updatePostBody: UpdatePostBody,
  token: string
) => Promise<Post> = async (postId, updatePostBody, token) => {
  return withLogs(
    axios.put(`${url}/${postId}`, updatePostBody, authConfig(token)),
    "updatePost"
  );
};

export {
  addPost,
  uploadPostPicture,
  getPosts,
  getPostById,
  getPostsForUser,
  updatePost,
  deletePost,
  filterByPicture,
  getPostsByKeywords,
};