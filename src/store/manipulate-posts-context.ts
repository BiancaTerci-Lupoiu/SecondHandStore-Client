import React from "react";
import { PostFilters } from "../interfaces/Filters";
import { Post, UpdatePostBody } from "../interfaces/Post";

export type PostState = {
  posts: Post[];
  fetching: boolean;
  fetchingError?: string | null;
  getAllPosts?: (filters?: PostFilters) => void;
  getAllPostsByKeywords?: (words: string) => void;
  getPostsByPicture?: (picture: File) => void;
  postsForUser: Post[];
  getAllPostsForUser?: () => void;
  modifyPost?: (postId: string, post: UpdatePostBody) => void;
  saving: boolean;
  savingError?: string | null;
  timestamp: number;
  removePost?: (postId: string) => void;
};

export const initialPostState: PostState = {
  posts: [],
  postsForUser: [],
  fetching: false,
  saving: false,
  timestamp: 0,
};

const PostContext = React.createContext<PostState>(initialPostState);

export default PostContext;
