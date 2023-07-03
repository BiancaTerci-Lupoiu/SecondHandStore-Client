import axios from "axios";
import { LoginResponse, SignUpInfo } from "../interfaces/Auth";
import { domain, withLogs } from "../utils/apiCallsHandler";

const url = `${domain}/api/auth`;

const login: (
  email: string,
  password: string
) => Promise<LoginResponse> = async (email: string, password: string) => {
  return withLogs(axios.post(`${url}/login`, { email, password }), "login");
};

const signUp: (signUpInfo: SignUpInfo) => Promise<string> = async (
  signUpInfo: SignUpInfo
) => {
  return withLogs(axios.post(`${url}/signup`, signUpInfo), "signup");
};

export { login, signUp };
