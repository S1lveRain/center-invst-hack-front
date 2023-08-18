export type UserT = {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  age: number;
  email: string;
  phoneNumber: string;
  locality: string;
  schoolName: string;
  schoolClass: string;
  maritalStatus: string | null;
  gender: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
  directions: [];
  results: {
    id: number;
    byCriteria: null;
    answersLog: null;
    userId: number;
    testId: number;
    createdAt: string;
    updatedAt: string;
  }[];
};
