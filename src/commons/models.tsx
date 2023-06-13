export type Mentor = {
  email: string;
  name: string;
  languages: string[];
  createdAt: string;
  status: string;
  avatar: string;
  refreshToken: string;
  classes: Class[];
};

export const mentorInititial: Mentor = {
  email: "",
  name: "",
  languages: [],
  createdAt: "",
  status: "",
  avatar: "",
  refreshToken: "",
  classes: [],
};

export type Class = {
  _id: string;
  name: string;
  description: string;
  languages: string[];
  createdAt: string;
  image: string;
  mentor: string;
  students: Student[];
  members?: Student[];
  assigned?: Assign[];
};

export const classInitial: Class = {
  _id: "",
  name: "",
  description: "",
  languages: [],
  createdAt: "",
  image: "",
  mentor: "",
  students: [],
  members: [],
  assigned: [],
};

export type Student = {
  _id: string;
  studentId: string;
  name: string;
  doB: string;
  address: string;
  gender: string;
  languages: string[];
  status: string;
  avatar: string;
  classes: Class[];
  mentor: string;
};

export const studentInitial: Student = {
  _id: "",
  studentId: "",
  name: "",
  doB: "",
  address: "",
  gender: "",
  languages: [],
  status: "",
  avatar: "",
  classes: [],
  mentor: "",
};

export type Assign = {
  _id: string;
  classroom: Class;
  student: Student | string;
  assignedAt: string;
};

export const assignInitial = {
  _id: "",
  classroom: classInitial,
  student: "",
  assignedAt: "",
};

export type Response<T> = {
  message: string;
  data: T;
  result?: string;
  grossCnt?: number;
};
