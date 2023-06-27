import { Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useContext, useReducer } from "react";
import { addPost, uploadPostPicture } from "../api/posts";
import { AddPostDetails } from "../interfaces/Post";
import { Address } from "../interfaces/User";
import { getAuthToken } from "../utils/auth";
import AddPostContext, {
  AddPostState,
  initialAddPostState,
} from "./add-post-context";
import AuthContext from "./auth-context";

interface ActionProps {
  type: string;
  payload?: any;
}

const addPostReducer: (
  state: AddPostState,
  action: ActionProps
) => AddPostState = (state, { type, payload }) => {
  switch (type) {
    case UPDATE_POST_DETAILS:
      console.log("updating post details");
      return { ...state, postDetails: payload.postDetails };
    case UPDATE_ADDRESS:
      return { ...state, address: payload.address };
    case UPDATE_IBAN:
      return { ...state, iban: payload.iban };
    case SAVE_POST_STARTED:
      return { ...state, saving: true };
    case SAVE_POST_SUCCEEDED:
      return { ...state, saving: false, savingError: null };
    case SAVE_POST_FAILED:
      return { ...state, saving: false, savingError: payload.error };
    default:
      return initialAddPostState;
  }
};

const UPDATE_POST_DETAILS = "UPDATE_POST_DETAILS";
const UPDATE_ADDRESS = "UPDATE_ADDRESS";
const UPDATE_IBAN = "UPDATE_IBAN";
const SAVE_POST_STARTED = "SAVE_POST_STARTED";
const SAVE_POST_SUCCEEDED = "SAVE_POST_SUCCEEDED";
const SAVE_POST_FAILED = "SAVE_POST_FAILED";

const AddPostProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [addPostState, dispatchAddPostAction] = useReducer(
    addPostReducer,
    initialAddPostState
  );

  const { token } = useContext(AuthContext);

  const updatePostDetails = (postDetails: AddPostDetails) => {
    dispatchAddPostAction({
      type: UPDATE_POST_DETAILS,
      payload: { postDetails },
    });
  };

  const updateAddress = (address: Address) => {
    dispatchAddPostAction({ type: UPDATE_ADDRESS, payload: { address } });
  };

  const updateIban = (iban: string) => {
    dispatchAddPostAction({ type: UPDATE_IBAN, payload: { iban } });
  };

  const savePost = async (
    postDetails: AddPostDetails,
    address: Address,
    iban: string
  ) => {
    dispatchAddPostAction({ type: SAVE_POST_STARTED });
    try {
      // console.log(addPostState.postDetails);
      const tokenLS = getAuthToken();
      const savedPost = await addPost(
        {
          postDetails: postDetails,
          address: address,
          iban,
        },
        tokenLS
      );
      dispatchAddPostAction({ type: SAVE_POST_SUCCEEDED });
      console.log("SAVED POST WITH ID " + savedPost._id);

      const response = await uploadPostPicture(
        addPostState.postDetails?.picture!,
        savedPost._id,
        tokenLS
      );
    } catch (error: any) {
      console.log("Error");
      console.log(error);
      dispatchAddPostAction({
        type: SAVE_POST_FAILED,
        payload: { error: error.response.data.message },
      });
      const messages: string[] = error.response.data.message.split(";");
      enqueueSnackbar(
        <div>
          {messages.map((message) => (
            <Typography key={message}>{message}</Typography>
          ))}
        </div>,
        { autoHideDuration: 10000 }
      );
    }
  };

  const addPostContext = {
    ...addPostState,
    updateAddress,
    updateIban,
    updatePostDetails,
    savePost,
  };

  return (
    <AddPostContext.Provider value={addPostContext}>
      {children}
    </AddPostContext.Provider>
  );
};

export default AddPostProvider;
