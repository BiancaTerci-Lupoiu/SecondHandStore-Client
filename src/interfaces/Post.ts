import User, { Address, UserWithoutSensitiveInfo } from "./User";

export interface Category {
  type: string;
  secondType: string;
  thirdType: string;
}

export interface Post {
  _id: string;
  user: UserWithoutSensitiveInfo;
  title: string;
  description: string;
  gender: Genders;
  size: string;
  condition: Condition;
  style: string;
  materials: string[];
  price: number;
  brand: string;
  color: string;
  picture?: string;
  category: Category;
}

export type AddPostDetails = Omit<Post, "_id" | "user" | "picture"> & {
  picture: File;
};

export interface AddPostBody {
  postDetails: AddPostDetails | null;
  address: Address | null;
}

export enum Genders {
  FEMALE = "FEMININ",
  MALE = "MASCULIN",
  UNSPECIFIED = "NESPECIFICAT",
}

export enum Condition {
  GOOD = "STARE BUNA",
  EXCELLENT = "STARE EXCELENTA",
  SATISFYING = "STARE SATISFACATOARE",
  UNWORN = "NEPURTAT",
  NEW = "NOUA",
  DEFAULT = "",
}
