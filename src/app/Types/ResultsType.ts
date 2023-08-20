
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

export type CriteriaT = {
  id: number,
  name: string
}
export type CriteriasT = {
  criteria: CriteriaT,
  result: number,
}

export type QuestionLogT = {
  text: string,
  type: string,
  answers: AnswerLogT[],
}

export type AnswerLogT = {
  id: number,
  text: string,
  criteria: CriteriaT,
}

export type ResultByIdT = {
  criterias: CriteriasT[],
 /*  "criterias": [
    {
      "criteria": [
        {
          "id": 2,
          "name": "человек-техника"
        }
      ],
      "result": 12
    }
  ], */
  logs: AnswerLogT
  /* "logs": [
    {
      "question": {
        "text": "Ты чел?...",
        "type": "string",
        "answers": [
          {
            "id": 2,
            "text": "Да, я чел",
            "criteria": {
              "id": 2,
              "name": "человек-техника"
            }
          }
        ]
      },
      "answers": [
        {
          "id": 2,
          "text": "Да, я чел",
          "criteria": {
            "id": 2,
            "name": "человек-техника"
          }
        }
      ]
    }
  ] */
}