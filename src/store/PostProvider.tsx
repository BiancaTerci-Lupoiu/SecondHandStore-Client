import { useContext, useReducer } from "react";
import {
  AddPostBody,
  AddPostDetails,
  UpdatePostBody,
} from "../interfaces/Post";
import { Address } from "../interfaces/User";
import {
  addPost,
  deletePost,
  filterByPicture,
  getPosts,
  getPostsByKeywords,
  getPostsForUser,
  updatePost,
  uploadPostPicture,
} from "../api/posts";
import { getAuthToken } from "../utils/auth";

import AuthContext from "./auth-context";
import PostContext, {
  initialPostState,
  PostState,
} from "./manipulate-posts-context";
import { PostFilters } from "../interfaces/Filters";
import { enqueueSnackbar } from "notistack";
import { Typography } from "@mui/material";

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
    case UPDATE_POST_STARTED:
      return { ...state, saving: true, savingError: null };
    case UPDATE_POST_SUCCEEDED:
      const newPosts = [...state.posts];
      const updatePostBody = payload.post;
      const postId = payload.postId;
      const index = newPosts.findIndex((post) => post._id === postId);
      newPosts[index] = { ...newPosts[index], ...updatePostBody };

      // update the post for users list
      const newUserPosts = [...state.postsForUser];
      const index2 = newUserPosts.findIndex((post) => post._id === postId);
      newUserPosts[index2] = { ...newUserPosts[index], ...updatePostBody };

      return {
        ...state,
        saving: false,
        posts: newPosts,
        postsForUser: newUserPosts,
      };
    case UPDATE_POST_FAILED:
      return { ...state, saving: false, savingError: payload.error };
    case UPDATE_TIMESTAMP:
      return { ...state, timestamp: Date.now() };
    case DELETE_POST_STARTED:
      return { ...state, saving: true, savingError: null };
    case DELETE_POST_FAILED:
      return { ...state, saving: false, savingError: payload.error };
    case DELETE_POST_SUCCEEDED:
      let newPostsValue = [...state.posts];
      const postIdToBeDeleted = payload.postId;
      newPostsValue = newPostsValue.filter(
        (post) => post._id !== postIdToBeDeleted
      );

      // update the post for users list
      let newUserPostsValue = [...state.postsForUser];
      newUserPostsValue = newUserPostsValue.filter(
        (post) => post._id !== postIdToBeDeleted
      );

      return {
        ...state,
        saving: false,
        posts: newPostsValue,
        postsForUser: newUserPostsValue,
      };
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
const UPDATE_POST_STARTED = "UPDATE_POST_STARTED";
const UPDATE_POST_SUCCEEDED = "UPDATE_POST_SUCCEEDED";
const UPDATE_POST_FAILED = "UPDATE_POST_FAILED";
const UPDATE_TIMESTAMP = "UPDATE_TIMESTAMP";
const DELETE_POST_STARTED = "DELETE_POST_STARTED";
const DELETE_POST_SUCCEEDED = "DELETE_POST_SUCCEEDED";
const DELETE_POST_FAILED = "DELETE_POST_FAILED";

const PostProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [postState, dispatchPostAction] = useReducer(
    postReducer,
    initialPostState
  );

  const getAllPosts = async (filters?: PostFilters) => {
    dispatchPostAction({ type: FETCH_POSTS_STARTED });
    try {
      const token = getAuthToken();
      const posts = await getPosts(token, filters);

      dispatchPostAction({ type: FETCH_POSTS_SUCCEEDED, payload: { posts } });
      console.log("FETCHED POSTS " + posts.length);
    } catch (error: any) {
      console.log("Error");
      console.log(error);
      dispatchPostAction({
        type: FETCH_POSTS_FAILED,
        payload: { error: error.response.data.message },
      });
      const messages: string[] = error.response.data.message.split(";");
      enqueueSnackbar(
        <div>
          {messages.map((message) => (
            <Typography key={message}>{message}</Typography>
          ))}
        </div>,
        { persist: true }
      );
    }
  };

  const getAllPostsByKeywords = async (words: string) => {
    dispatchPostAction({ type: FETCH_POSTS_STARTED });
    try {
      const token = getAuthToken();
      const posts = await getPostsByKeywords(token, words);

      dispatchPostAction({ type: FETCH_POSTS_SUCCEEDED, payload: { posts } });
      console.log("FETCHED POSTS " + posts.length);
    } catch (error: any) {
      console.log("Error");
      console.log(error);
      dispatchPostAction({
        type: FETCH_POSTS_FAILED,
        payload: { error: error.response.data.message },
      });
      const messages: string[] = error.response.data.message.split(";");
      enqueueSnackbar(
        <div>
          {messages.map((message) => (
            <Typography key={message}>{message}</Typography>
          ))}
        </div>,
        { persist: true }
      );
    }
  };

  const getPostsByPicture = async (picture: File) => {
    dispatchPostAction({ type: FETCH_POSTS_STARTED });
    try {
      const posts = await filterByPicture(picture);

      dispatchPostAction({ type: FETCH_POSTS_SUCCEEDED, payload: { posts } });
      console.log("FETCHED POSTS " + posts.length);
    } catch (error: any) {
      console.log("Error");
      console.log(error);
      dispatchPostAction({
        type: FETCH_POSTS_FAILED,
        payload: { error: error.response.data.message },
      });
      const messages: string[] = error.response.data.message.split(";");
      enqueueSnackbar(
        <div>
          {messages.map((message) => (
            <Typography key={message}>{message}</Typography>
          ))}
        </div>,
        { persist: true }
      );
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

  const modifyPost = async (postId: string, updatePostBody: UpdatePostBody) => {
    dispatchPostAction({ type: UPDATE_POST_STARTED });
    try {
      const tokenLS = getAuthToken();
      const picture = updatePostBody.picture;
      delete updatePostBody.picture;
      let updatedPost = await updatePost(postId, updatePostBody, tokenLS);

      // verify if the picture was modified
      if (picture) {
        updatedPost = await uploadPostPicture(picture, postId, tokenLS);
      }
      dispatchPostAction({
        type: UPDATE_POST_SUCCEEDED,
        payload: { postId, post: updatedPost },
      });
      dispatchPostAction({ type: UPDATE_TIMESTAMP });
      console.log("UPDATED POST WITH ID " + updatedPost._id);

      enqueueSnackbar("Post successfully updated!");
    } catch (error: any) {
      console.log("Error");
      console.log(error);
      dispatchPostAction({
        type: UPDATE_POST_FAILED,
        payload: { error: error.response.data.message },
      });
      const messages: string[] = error.response.data.message.split(";");
      enqueueSnackbar(
        <div>
          {messages.map((message) => (
            <Typography key={message}>{message}</Typography>
          ))}
        </div>,
        { persist: true }
      );
    }
  };

  const removePost = async (postId: string) => {
    dispatchPostAction({ type: DELETE_POST_STARTED });
    try {
      const tokenLS = getAuthToken();
      let deletedPost = await deletePost(postId, tokenLS);

      console.log(deletePost);
      dispatchPostAction({ type: DELETE_POST_SUCCEEDED, payload: { postId } });

      enqueueSnackbar("Post successfully deleted!");
    } catch (error: any) {
      console.log("Error");
      console.log(error);
      dispatchPostAction({
        type: DELETE_POST_FAILED,
        payload: { error: error.response.data.message },
      });
      const messages: string[] = error.response.data.message.split(";");
      enqueueSnackbar(
        <div>
          {messages.map((message) => (
            <Typography key={message}>{message}</Typography>
          ))}
        </div>,
        { persist: true }
      );
    }
  };

  const postContext = {
    ...postState,
    getAllPosts,
    getPostsByPicture,
    getAllPostsForUser,
    modifyPost,
    removePost,
    getAllPostsByKeywords,
  };

  return (
    <PostContext.Provider value={postContext}>{children}</PostContext.Provider>
  );
};

export default PostProvider;
