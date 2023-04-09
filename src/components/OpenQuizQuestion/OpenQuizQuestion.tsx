import React, { useState } from "react";
import { Card, Input, Button, Typography } from "antd";
import styles from "./OpenQuizQuestion.module.css";

const { Title } = Typography;
const { TextArea } = Input;

interface OpenQuizQuestionProps {
  question: string;
  correctAnswer: string | undefined;
  onSubmit: (isCorrect: boolean) => void;
  index?: number,
}

const OpenQuizQuestion: React.FC<OpenQuizQuestionProps> = ({
  question,
  correctAnswer,
  onSubmit,
  index
}) => {
  const [answer, setAnswer] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = () => {
    if (correctAnswer)
      onSubmit(
        answer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()
      );
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
      <div className={styles.inputContainer}>
        <TextArea
          placeholder="Введите ваш ответ"
          value={answer}
          onChange={handleChange}
          autoSize={{ minRows: 1, maxRows: 6 }}
        />
      </div>
      <Button
        type="primary"
        onClick={handleSubmit}
        disabled={!answer}
        className={styles.submitButton}
      >
        Ответить
      </Button>
    </Card>
  );
};

export default OpenQuizQuestion;
