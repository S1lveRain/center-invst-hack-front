import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuestionT } from "../Types/DirectionType";

export interface Answer {
  questionId: number;
  answerIds: number[];
}

interface QuizState {
  answers: Answer[];
}

const initialState: QuizState = {
  answers: [],
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    getMarkedAnswer: (state, { payload }: PayloadAction<QuestionT[]>) => {
      state.answers = payload.map((question) => ({
        questionId: question.id,
        answerIds: question.answers
          .map((anw) => {
            if (anw.isAnswer) return anw.id;
            else return undefined;
          })
          .filter((el) => el !== undefined) as number[],
      }));
    },
    addAnswer: (state, { payload }: PayloadAction<Answer>) => {
      const curQuestion = state.answers.findIndex(
        (anw) => anw.questionId === payload.questionId
      );
      if (curQuestion === -1) state.answers.push(payload);
      else state.answers[curQuestion] = payload;
      console.log(payload);
    },
  },
});

export const { addAnswer, getMarkedAnswer } = quizSlice.actions;
export default quizSlice.reducer;
