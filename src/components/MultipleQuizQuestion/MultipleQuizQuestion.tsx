import React, { useState } from "react";
import { Card, Checkbox, Typography, theme } from "antd";
import styles from "./MultipleQuizQuestion.module.css";
import { AnswerT } from "../../app/Types/DirectionType";
import { CheckboxValueType } from "antd/lib/checkbox/Group";

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
