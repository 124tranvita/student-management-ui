import dateFormat from "dateformat";

export const formatFullDate = (value: string): string => {
  return dateFormat(value, "dddd, mmmm d, yyyy");
};
