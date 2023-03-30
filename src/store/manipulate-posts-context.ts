import React from "react";
import { AddPostBody, AddPostDetails, Post } from "../interfaces/Post";
import { Address } from "../interfaces/User";

export type PostState = {
  posts: Post[];
  fetching: boolean;
  fetchingError?: Error | null;
  getAllPosts?: () => void;
  postsForUser: Post[];
  getAllPostsForUser?: () => void;
};

export const initialPostState: PostState = {
  posts: [],
  postsForUser: [],
  fetching: false,
};

const PostContext = React.createContext<PostState>(initialPostState);

export default PostContext;
