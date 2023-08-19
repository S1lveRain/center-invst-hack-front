import React, { useState } from "react";
import { Card, Button, Typography, Radio, RadioChangeEvent, theme } from "antd";
import styles from "./QuizQuestion.module.css";
import { AnswerT } from "../../app/Types/DirectionType";
import { useSaveAnswersMutation } from "../../app/services/TestsApi";
import { Answer, addAnswer } from "../../app/slices/quizSlice";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

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
  setAnsweredQuestionCount: any;
  answeredQuestionCount: number,
  answeredQuestions: any,
  setAnsweredQuestions: any
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
    setAnsweredQuestionCount,
    answeredQuestionCount,
    setAnsweredQuestions,
    answeredQuestions
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [saveAnswers, { isLoading: isSaving }] = useSaveAnswersMutation();
  const [disabledButton, setDisabledButton] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const { testId } = useParams(); // Изменилась часть получения testId
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>(
      {}
  );
  const [answeredLog, setAnsweredLog] = useState<number[]>([]);
  const dispatch = useDispatch();

  const handleChange = (e: RadioChangeEvent) => {
    const selectedValue = e.target.value;

    setSelectedOption(selectedValue);
    setHasAnswered(true);

    const updatedLog = hasAnswered ? answeredLog : [...answeredLog, index];
    setAnsweredLog(updatedLog);

    const updatedAnswers: Record<string, string> = {};
    updatedLog.forEach((answeredIndex) => {
      updatedAnswers[answeredIndex] = selectedAnswers[answeredIndex] || "";
    });
    updatedAnswers[index] = selectedValue;
    setSelectedAnswers(updatedAnswers);

    const answer = {
      questionId: index,
      answerIds: [parseInt(selectedValue, 10)], // Преобразование в число
    };

    dispatch(addAnswer(answer)); // Отправка экшена в Redux

    onSubmit(selectedValue === correctAnswer);
    setDisabledButton(true);
  };


  return (
    <Card
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
    </Card>
  );
};

export default QuizQuestion;
function dispatch(arg0: any) {
    throw new Error("Function not implemented.");
}

