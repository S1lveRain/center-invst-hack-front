import React, {useState} from "react";
import {Card, Checkbox, Button, Typography, theme} from "antd";
import styles from "./MultipleQuizQuestion.module.css";
import {AnswerT} from "../../app/Types/DirectionType";

const {Title} = Typography;

interface Option {
    id: string;
    text: string;
}

interface MultipleChoiceQuizQuestionProps {
    question: string;
    options: AnswerT[];
    correctAnswers: string[];
    onSubmit: (isCorrect: boolean) => void;
    index?: number,
    setAnsweredQuestionCount: any,
    answeredQuestionCount: number,
    answeredQuestions: any,
    setAnsweredQuestions: any
}

const {useToken} = theme;
export const MultipleQuizQuestion: React.FC<
    MultipleChoiceQuizQuestionProps
> = ({
         question, options, correctAnswers, onSubmit, index, setAnsweredQuestionCount,
         answeredQuestionCount,
         answeredQuestions,
         setAnsweredQuestions
     }) => {
    const {token} = useToken();
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [disabledButton, setDisabledButton] = useState(false)
    const handleChange = (checkedValues: any[]) => {
        setSelectedOptions(checkedValues);
        const isCorrect =
            selectedOptions.length === correctAnswers.length &&
            selectedOptions.every((option) => correctAnswers.includes(option));
        onSubmit(isCorrect);
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
            <Checkbox.Group className={styles.checkboxGroup} onChange={handleChange}>
                {options.map((option) => (
                    <Checkbox
                        key={option.id}
                        value={option.id}
                        className={styles.checkbox}
                        style={{
                            margin: 0,
                            backgroundColor: selectedOptions.includes(String(option.id))
                                ? token.colorFill
                                : "transparent",
                        }}
                    >
                        {option.text}
                    </Checkbox>
                ))}
            </Checkbox.Group>
        </Card>
    );
};
