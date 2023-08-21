import React, { useState } from "react";
import { Card, Checkbox, Typography, theme } from "antd";
import styles from "./MultipleQuizQuestion.module.css";
import { AnswerT } from "../../app/Types/DirectionType";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { useDispatch } from "react-redux";
import { addAnswer } from "../../app/slices/quizSlice"; // Import the action from your slice

const { Title } = Typography;

interface Option {
    id: string;
    text: string;
}

interface MultipleChoiceQuizQuestionProps {
    question: string;
    options: AnswerT[];
    correctAnswers: string[];
    onSubmit: (isCorrect: boolean) => void;
    index?: number;
    setAnsweredQuestionCount: any;
    answeredQuestionCount: number;
    answeredQuestions: any;
    setAnsweredQuestions: any;
}

const { useToken } = theme;
export const MultipleQuizQuestion: React.FC<
    MultipleChoiceQuizQuestionProps
> = ({
         question,
         options,
         correctAnswers,
         onSubmit,
         index,
         setAnsweredQuestionCount,
         answeredQuestionCount,
         answeredQuestions,
         setAnsweredQuestions,
     }) => {
    const { token } = useToken();
    const [selectedOptions, setSelectedOptions] = useState<CheckboxValueType[]>(
        []
    );
    const [disabledButton, setDisabledButton] = useState(false);
    const [hasAnswered, setHasAnswered] = useState(false);

    const dispatch = useDispatch(); // Get the dispatch function

    // ... rest of the component ...

    const handleChange = (checkedValues: CheckboxValueType[]) => {
        setSelectedOptions(checkedValues);
        const isCorrect =
            selectedOptions.length === correctAnswers.length &&
            selectedOptions.every((option) => correctAnswers.includes(option as string));
        onSubmit(isCorrect);
        setDisabledButton(true);
        setAnsweredQuestionCount(
            hasAnswered ? answeredQuestionCount : answeredQuestionCount + 1
        );
        if (typeof index !== "undefined") {
            const updatedAnsweredQuestions = [...answeredQuestions];
            updatedAnsweredQuestions[index] = true;
            setAnsweredQuestions(updatedAnsweredQuestions);
        }

        // Dispatch the selected answers to Redux store
        const answer = {
            questionId: index !== undefined ? index : -1,
            answerIds: selectedOptions.map((option) => parseInt(option as string, 10)),
        };
        dispatch(addAnswer(answer)); // Dispatch the action to add the answer to the store
    };


    return (
        <Card
            title={
                <Title level={4} style={{ margin: 0 }}>
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
                            backgroundColor: selectedOptions.includes(option.id)
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
