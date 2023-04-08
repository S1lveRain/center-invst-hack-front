
type AnswerT = {
    text: string,
    isCorrect: boolean,
}
type QuestionT = {
    text: string,
    type: string,
    answers: AnswerT[],
}
type TestT = {
    name: string,
    desc: string,
    questions: QuestionT[]
}
type WaysT = {
    name: string,
    desc: string,
    tests: TestT[]
}

type InfoT = {
    name: string,
    value: string,
}
type DirectionT = {
    title: string,
    desc: string,
    infos: InfoT[],
    ways: WaysT[],
}