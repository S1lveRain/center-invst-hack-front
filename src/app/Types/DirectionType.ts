
 export type AnswerT = {
    id: number,
    text: string,
    isCorrect: boolean,
}
export type QuestionT = {
    id: number,
    text: string,
    type: string,
    answers: AnswerT[],
}
export type TestT = {
    id: number,
    name: string,
    desc: string,
    questions: QuestionT[]
}
export type WaysT = {
    id: number,
    name: string,
    desc: string,
    tests: TestT[]
}

export type InfoT = {
    id: number,
    name: string,
    value: string,
}
export type DirectionT = {
    id: number,
    title: string,
    desc: string,
    infos: InfoT[],
    ways: WaysT[],
}
