import axios from "axios";
import { LoginResponse, SignUpInfo } from "../interfaces/Auth";
import { UserWithoutSensitiveInfo } from "../interfaces/User";
import {
  authConfig,
  domain,
  uploadPictureConfig,
  withLogs,
} from "../utils/apiCallsHandler";

const url = `${domain}/api/users`;

const getUserDetails: (
  token: string
) => Promise<UserWithoutSensitiveInfo> = async (token) => {
  return withLogs(
    axios.get(`${url}/details`, authConfig(token)),
    "userDetails"
  );
};

const uploadUserPicture: (
  picture: File,
  userId: string,
  token: string
) => Promise<string> = async (picture, userId, token) => {
  let data = new FormData();
  data.append("picture", picture, picture.name);
  return withLogs(
    axios.post(`${url}/upload/${userId}`, data, uploadPictureConfig(token)),
    "uploadUserPicture"
  );
};

export { getUserDetails, uploadUserPicture };
