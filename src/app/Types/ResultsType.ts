export type ResultsT = {
  testInfo: {
    id: number;
    name: string;
    desc: string;
    wayId: number;
    createdAt: string;
    updatedAt: string;
  };
  result: {
    id: number;
    byCriteria: null;
    answersLog: null;
    userId: number;
    testId: number;
    createdAt: string;
    updatedAt: string;
  };
};
