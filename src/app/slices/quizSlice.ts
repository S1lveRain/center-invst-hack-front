import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    name: 'quiz',
    initialState,
    reducers: {
        addAnswer: (state, action: PayloadAction<Answer>) => {
            state.answers.push(action.payload);
        },
    },
});

export const { addAnswer } = quizSlice.actions;
export default quizSlice.reducer;
