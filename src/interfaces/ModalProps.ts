import { Dispatch, SetStateAction } from "react";
import { Post } from "./Post";
import { UserWithoutSensitiveInfo } from "./User";

export interface BasicModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface EditUserModalProps extends BasicModalProps {
  user: UserWithoutSensitiveInfo;
}

export interface EditPostModalProps extends BasicModalProps {
  post: Post;
}

export interface DeletePostModalProps extends BasicModalProps {
  postId: string;
}
