import React, { useState } from "react";
import { Card, Checkbox, Button, Typography, theme } from "antd";
import styles from "./MultipleQuizQuestion.module.css";
import { AnswerT } from "../../app/Types/DirectionType";

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
}
const { useToken } = theme;
export const MultipleQuizQuestion: React.FC<
  MultipleChoiceQuizQuestionProps
> = ({ question, options, correctAnswers, onSubmit }) => {
  const { token } = useToken();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleChange = (checkedValues: any[]) => {
    setSelectedOptions(checkedValues);
  };

  const handleSubmit = () => {
    const isCorrect =
      selectedOptions.length === correctAnswers.length &&
      selectedOptions.every((option) => correctAnswers.includes(option));
    onSubmit(isCorrect);
  };

  return (
    <Card
      title={
        <Title level={4} style={{ margin: 0 }}>
          {question}
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
      <Button
        type="primary"
        onClick={handleSubmit}
        disabled={!selectedOptions.length}
        className={styles.submitButton}
      >
        Ответить
      </Button>
    </Card>
  );
};
