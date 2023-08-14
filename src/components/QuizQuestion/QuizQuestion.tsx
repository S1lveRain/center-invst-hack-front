import React, { useState } from "react";
import { Card, Button, Typography, Radio, RadioChangeEvent, theme } from "antd";
import styles from "./QuizQuestion.module.css";
import { AnswerT } from "../../app/Types/DirectionType";

const { Title } = Typography;
const { useToken } = theme;
export interface Option {
  id: string;
  text: string;
}

interface QuizQuestionProps {
  question: string;
  options: AnswerT[];
  correctAnswer: string;
  onSubmit: (isCorrect: boolean) => void;
  index: number;
}

interface ColoredRadioProps {
  value: string;
  selectedValue: string;
  onChange: (e: RadioChangeEvent) => void;
  children: React.ReactNode;
}

const ColoredRadio: React.FC<ColoredRadioProps> = ({
  value,
  selectedValue,
  onChange,
  children,
}) => {
  const { token } = useToken();
  const isSelected = value === selectedValue;
  const backgroundColor = isSelected ? token.colorFill : "transparent";

  return (
    <Radio
      checked={isSelected}
      value={value}
      onClick={() => onChange({ target: { value } } as RadioChangeEvent)}
      style={{
        backgroundColor,
        padding: "8px 16px",
        borderRadius: "4px",
        cursor: "pointer",
        color: "CaptionText",
      }}
    >
      {children}
    </Radio>
  );
};

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  options,
  correctAnswer,
  onSubmit,
  index,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleChange = (e: RadioChangeEvent) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(selectedOption === correctAnswer);
  };

  return (
    <Card
      title={
        <Title
          level={4}
          style={{ margin: "10px 0", whiteSpace: "break-spaces" }}
        >
          {index}: {question}
        </Title>
      }
      className={styles.card}
    >
      <Radio.Group className={styles.radioGroup}>
        {options.map((option) => (
          <ColoredRadio
            key={option.id}
            value={String(option.id)}
            selectedValue={selectedOption}
            onChange={handleChange}
          >
            {option.text}
          </ColoredRadio>
        ))}
      </Radio.Group>
      <Button
        type="primary"
        onClick={handleSubmit}
        disabled={!selectedOption}
        className={styles.submitButton}
      >
        Ответить
      </Button>
    </Card>
  );
};

export default QuizQuestion;
