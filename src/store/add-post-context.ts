import React from "react";
import { AddPostBody, AddPostDetails } from "../interfaces/Post";
import { Address } from "../interfaces/User";

export type AddPostState = {
  postDetails: AddPostDetails | null;
  address: Address | null;
  iban: string;
  saving: boolean;
  savingError: Error | null;
  savePost?: () => void;
  updatePostDetails?: (postDetails: AddPostDetails) => void;
  updateAddress?: (address: Address) => void;
  updateIban?: (iban: string) => void;
};

export const initialAddPostState: AddPostState = {
  postDetails: null,
  address: null,
  iban: "",
  saving: false,
  savingError: null,
};

const AddPostContext = React.createContext<AddPostState>(initialAddPostState);

export default AddPostContext;
