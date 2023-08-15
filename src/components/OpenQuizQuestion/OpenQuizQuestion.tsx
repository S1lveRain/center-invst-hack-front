import React, {useState} from "react";
import {Card, Input, Button, Typography} from "antd";
import styles from "./OpenQuizQuestion.module.css";

const {Title} = Typography;
const {TextArea} = Input;

interface OpenQuizQuestionProps {
    question: string;
    correctAnswer: string | undefined;
    onSubmit: (isCorrect: boolean) => void;
    index?: number,
    setAnsweredQuestionCount: any,
    answeredQuestionCount: number,
    answeredQuestions: any,
    setAnsweredQuestions: any
}

const OpenQuizQuestion: React.FC<OpenQuizQuestionProps> = ({
                                                               question,
                                                               correctAnswer,
                                                               onSubmit,
                                                               index,
                                                               setAnsweredQuestionCount,
                                                               answeredQuestionCount,
                                                               answeredQuestions,
                                                               setAnsweredQuestions
                                                           }) => {
    const [answer, setAnswer] = useState<string>("");
    const [disabledButton, setDisabledButton] = useState(false)
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAnswer(e.target.value);
        if (correctAnswer)
            onSubmit(
                answer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()
            );
        setDisabledButton(true)
        setAnsweredQuestionCount(answeredQuestionCount + 1)
        if (typeof index !== 'undefined') {
            const updatedAnsweredQuestions = [...answeredQuestions];
            updatedAnsweredQuestions[index] = true;
            setAnsweredQuestions(updatedAnsweredQuestions);
        }
    };

    return (
        <Card
            title={
                <Title level={4} style={{margin: 0}}>
                    {index}: {question}
                </Title>
            }
            className={styles.card}
        >
            <div className={styles.inputContainer}>
                <TextArea
                    placeholder="Введите ваш ответ"
                    value={answer}
                    onChange={handleChange}
                    autoSize={{minRows: 1, maxRows: 6}}
                />
            </div>
        </Card>
    );
};

export default OpenQuizQuestion;
