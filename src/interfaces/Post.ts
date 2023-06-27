import User, { Address, UserWithoutSensitiveInfo } from "./User";

export interface Category {
  type: string;
  secondType: string;
  thirdType: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
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
  coordinates: Coordinates;
  percentage?: number;
}

export type AddPostDetails = Omit<
  Post,
  "_id" | "user" | "picture" | "coordinates"
> & {
  picture: File;
  coordinates?: Coordinates;
};

export interface AddPostBody {
  postDetails: AddPostDetails | null;
  address: Address | null;
  iban: string;
}

export enum Genders {
  FEMALE = "FEMININ",
  MALE = "MASCULIN",
  UNSPECIFIED = "NESPECIFICAT",
}

export enum Condition {
  GOOD = "STARE BUNĂ",
  EXCELLENT = "STARE EXCELENTĂ",
  SATISFYING = "STARE SATISFACATOARE",
  UNWORN = "NEPURTAT",
  NEW = "NOUĂ",
  DEFAULT = "",
}

export interface UpdatePostBody {
  title?: string;
  description?: string;
  gender?: Genders;
  size?: string;
  condition?: Condition;
  style?: string;
  materials?: string[];
  price?: number;
  brand?: string;
  color?: string;
  category?: Category;
  picture?: File;
}
