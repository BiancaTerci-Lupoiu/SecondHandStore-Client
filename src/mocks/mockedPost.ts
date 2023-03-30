import { Condition, Genders, Post } from "../interfaces/Post";
import { user } from "./mockedUser";

export const post: Post = {
  user: user,
  _id: "1",
  title: "Bluza Bershka",
  description: "Descriere bluza",
  gender: Genders.FEMALE,
  size: "XS",
  condition: Condition.EXCELLENT,
  style: "stil",
  materials: ["lana", "poliester"],
  price: 20,
  brand: "Bershka",
  color: "negru",
  category: {
    type: "imbracaminte",
    secondType: "bluza",
    thirdType: "scurta",
  },
};
