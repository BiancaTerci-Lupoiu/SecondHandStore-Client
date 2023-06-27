import { Condition, Genders } from "../interfaces/Post";

export const convertStringToCondition = (value: string): Condition => {
  for (const key in Condition) {
    if (Condition[key as keyof typeof Condition] === value) {
      return Condition[key as keyof typeof Condition];
    }
  }
  return Condition.DEFAULT;
};

export const convertStringToGender = (value: string): Genders => {
  for (const key in Genders) {
    if (Genders[key as keyof typeof Genders] === value) {
      return Genders[key as keyof typeof Genders];
    }
  }
  return Genders.UNSPECIFIED;
};
