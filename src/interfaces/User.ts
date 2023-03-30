export default interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address?: Address;
  iban?: string;
  picture?: string;
  confirmationToken?: string;
}

export type UserWithoutSensitiveInfo = Omit<
  User,
  "password" | "confirmationToken" | "role"
>;

export interface Address {
  locality: string;
  city: string;
  street: string;
  number: number;
  zipCode: number;
  coordinates?: { latitude: number; longitude: number };
}
