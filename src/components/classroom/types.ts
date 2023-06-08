export type ClassroomFormikProps = {
  name: string;
  description?: string;
  languages: string;
  image: string;
};

export const ClassroomFormikInitial: ClassroomFormikProps = {
  name: "",
  description: "",
  languages: "",
  image: "https://i.ytimg.com/vi/g1J4181W8ss/maxresdefault.jpg",
};

export type ClassroomPostRequest = {
  name: string;
  description?: string;
  languages: string[];
  image: string;
  mentor?: string;
};
