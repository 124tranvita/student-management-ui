import { Response } from "../commons/models";

export const genderMapper = (value: string) => {
  if (value !== "0" && value !== "1") return "Unknown";
  return value === "0" ? "Male" : "Female";
};

export const capitalize = (value: string) => {
  const firstChar = value.slice(0, 1);

  return firstChar.toUpperCase() + value.slice(1);
};

export const isResponseSuccessfully = <T>(response: Response<T>) => {
  return response.message === "success";
};
