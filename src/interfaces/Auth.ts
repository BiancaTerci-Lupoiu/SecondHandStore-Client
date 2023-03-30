import User, { Address } from "./User";

export interface LoginResponse {
  user: User;
  token: string;
}

export interface SignUpInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address?: Address;
}
