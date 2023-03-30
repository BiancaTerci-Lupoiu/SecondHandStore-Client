import { useContext, useReducer } from "react";
import { AddPostBody, AddPostDetails } from "../interfaces/Post";
import { Address } from "../interfaces/User";
import {
  addPost,
  getPosts,
  getPostsForUser,
  uploadPostPicture,
} from "../network/posts";
import { getAuthToken } from "../utils/auth";

import AuthContext from "./auth-context";
import PostContext, {
  initialPostState,
  PostState,
} from "./manipulate-posts-context";

interface ActionProps {
  type: string;
  payload?: any;
}

const postReducer: (state: PostState, action: ActionProps) => PostState = (
  state,
  { type, payload }
) => {
  switch (type) {
    case FETCH_POSTS_STARTED:
      return { ...state, fetching: true, fetchingError: null };
    case FETCH_POSTS_SUCCEEDED:
      return { ...state, fetching: false, posts: payload.posts };
    case FETCH_POSTS_FAILED:
      return { ...state, fetching: false, fetchingError: payload.error };
    case FETCH_USER_POSTS_STARTED:
      return { ...state, fetching: true, fetchingError: null };
    case FETCH_USER_POSTS_SUCCEEDED:
      return { ...state, fetching: false, postsForUser: payload.posts };
    case FETCH_USER_POSTS_FAILED:
      return { ...state, fetching: false, fetchingError: payload.error };

    default:
      return initialPostState;
  }
};

const FETCH_POSTS_STARTED = "FETCH_POSTS_STARTED";
const FETCH_POSTS_SUCCEEDED = "FETCH_POSTS_SUCCEEDED";
const FETCH_POSTS_FAILED = "FETCH_POSTS_FAILED";
const FETCH_USER_POSTS_STARTED = "FETCH_USER_POSTS_STARTED";
const FETCH_USER_POSTS_SUCCEEDED = "FETCH_USER_POSTS_SUCCEEDED";
const FETCH_USER_POSTS_FAILED = "FETCH_USER_POSTS_FAILED";

const PostProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [postState, dispatchPostAction] = useReducer(
    postReducer,
    initialPostState
  );

  const getAllPosts = async () => {
    dispatchPostAction({ type: FETCH_POSTS_STARTED });
    try {
      const posts = await getPosts();

      dispatchPostAction({ type: FETCH_POSTS_SUCCEEDED, payload: { posts } });
      console.log("FETCHED POSTS " + posts.length);
    } catch (error: any) {
      console.log("Error");
      console.log(error);
      dispatchPostAction({
        type: FETCH_POSTS_FAILED,
        payload: { error: error.response.data.message },
      });
    }
  };

  const getAllPostsForUser = async () => {
    dispatchPostAction({ type: FETCH_USER_POSTS_STARTED });
    try {
      const token = getAuthToken();
      const posts = await getPostsForUser(token || "");

      dispatchPostAction({
        type: FETCH_USER_POSTS_SUCCEEDED,
        payload: { posts },
      });
      console.log("FETCHED POSTS FOR USER " + posts.length);
    } catch (error: any) {
      console.log("Error");
      console.log(error);
      dispatchPostAction({
        type: FETCH_USER_POSTS_FAILED,
        payload: { error: error.response.data.message },
      });
    }
  };

  const postContext = {
    ...postState,
    getAllPosts,
    getAllPostsForUser,
  };

  return (
    <PostContext.Provider value={postContext}>{children}</PostContext.Provider>
  );
};

export default PostProvider;
