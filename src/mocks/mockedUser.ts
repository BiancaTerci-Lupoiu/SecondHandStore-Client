import User, { UserWithoutSensitiveInfo } from "../interfaces/User";

export const user: UserWithoutSensitiveInfo = {
  _id: "1",
  firstName: "Stefan",
  lastName: "Ionescu",
  email: "stefan@gmail.com",
  phoneNumber: "0789678987",
  address: {
    locality: "Bran",
    city: "Brasov",
    street: "Portii",
    number: 10,
    zipCode: 107678,
  },
};
