import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Col,
  Row,
  SelectProps,
  Anchor,
  Layout,
  theme,
  Badge,
  Descriptions,
  Statistic,
  Spin,
} from "antd";
import styles from "./VacancyQuiz.module.css";
import { Link, useParams } from "react-router-dom";
import OpenQuizQuestion from "../../components/OpenQuizQuestion/OpenQuizQuestion";
import { MultipleQuizQuestion } from "../../components/MultipleQuizQuestion/MultipleQuizQuestion";
import QuizQuestion from "../../components/QuizQuestion/QuizQuestion";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useGetTestByIdQuery } from "../../app/services/TestsApi";
import { MainLayout } from "../../layouts/MainLayout";
import { useGetUsersQuery } from "../../app/services/UserApi";
import { useSaveAnswersMutation } from "../../app/services/TestsApi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getMarkedAnswer } from "../../app/slices/quizSlice";

interface VacancyQuizI {
  /* vacancyList: VacancyT[], */
}

interface AnswersState {
  [questionIndex: number]: string | string[] | boolean;
}

export const VacancyQuiz: React.FC<VacancyQuizI> = () => {
  const { id } = useParams<{ id: string }>();
  const { data: users } = useGetUsersQuery("1");
  const { data: test } = useGetTestByIdQuery(id as string);
  const [answeredQuestionCount, setAnsweredQuestionCount] = useState<number>(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(
    new Array(test?.questions.length).fill(false)
  );
  const [activeTabKey1, setActiveTabKey1] = useState<string>("quizes");
  const [options, setOptions] = useState<SelectProps<object>["options"]>([]);
  const [saveAnswers, { isLoading }] = useSaveAnswersMutation();
  const [answers, setAnswers] = useState<AnswersState>({});

  const dispatch = useAppDispatch();
  const quizAnswers = useAppSelector((state) => state.quiz.answers);

  const answerCount = useMemo(
    () =>
      quizAnswers
        .map((quest) => quest.answerIds.length > 0)
        .filter((el) => el !== false).length,
    [quizAnswers]
  );

  const sendAnswers = useCallback(async () => {
    await saveAnswers({
      answers: quizAnswers,
      testId: id,
    }).unwrap();
  }, [id, quizAnswers, saveAnswers]);

  useEffect(() => {
    sendAnswers();
  }, [quizAnswers, sendAnswers]);

  useEffect(() => {
    if (test) dispatch(getMarkedAnswer(test?.questions));
  }, [test]);

  const usersList = (
    <Col className={styles.itemList}>
      {users &&
        users.map((user, index) => (
          <Badge.Ribbon
            text={
              <div>
                <MailOutlined /> {user.email}
              </div>
            }
          >
            <Card
              bodyStyle={{ backgroundColor: "lightgray" }}
              title={
                <Descriptions
                  title={`${user.firstName ? user.firstName : "Имя"} ${
                    user.lastName ? user.lastName : "Фамилия"
                  }`}
                >
                  <Descriptions.Item label="Пол">
                    {user.gender}
                  </Descriptions.Item>
                  <Descriptions.Item label="Возраст">
                    {user.age}
                  </Descriptions.Item>
                  <Descriptions.Item label="Роль">
                    {user.role}
                  </Descriptions.Item>
                </Descriptions>
              }
            >
              <Row gutter={5}>
                <Col span={4}>
                  <Card>
                    <Statistic
                      title="Правильных ответов"
                      value={11}
                      valueStyle={{ color: "#3f8600" }}
                      prefix={<ArrowUpOutlined />}
                    />
                  </Card>
                </Col>
                <Col span={4}>
                  <Card>
                    <Statistic
                      title="Неправильных ответов"
                      value={2}
                      valueStyle={{ color: "#cf1322" }}
                      prefix={<ArrowDownOutlined />}
                    />
                  </Card>
                </Col>
              </Row>
            </Card>
          </Badge.Ribbon>
        ))}
    </Col>
  );
  const quizes = (
    <Col className={styles.itemList}>
      <div style={{ padding: 0 }}>
        <h2 style={{ marginBottom: 0 }}>{test?.name}</h2>
        <h3 style={{ fontWeight: 400, marginBottom: 5, marginTop: 5 }}>
          {test?.desc}
        </h3>
      </div>
      {test?.questions.length &&
        test.questions.map((quiz, index) =>
          quiz.type === "fill" ? (
            <div id={`part-${index}`}>
              <OpenQuizQuestion
                index={index + 1}
                correctAnswer={
                  quiz.answers[0] ? quiz.answers[0].text : undefined
                }
                question={quiz.text}
                onSubmit={(selectedAnswer) => {
                  const updatedAnswers = {
                    ...answers,
                    [index]: selectedAnswer,
                  };
                  setAnswers(updatedAnswers);
                }}
                setAnsweredQuestionCount={setAnsweredQuestionCount}
                answeredQuestionCount={answeredQuestionCount}
                answeredQuestions={answeredQuestions}
                setAnsweredQuestions={setAnsweredQuestions}
              />
            </div>
          ) : quiz.type === "multiple" ? (
            <div id={`part-${index}`}>
              <MultipleQuizQuestion
                index={index + 1}
                correctAnswers={quiz.answers
                  .filter((answer) => answer.isAnswer === true)
                  .map((answer) => answer.text)}
                options={[...quiz.answers]}
                question={quiz.text}
                onSubmit={(selectedAnswer) => {
                  const updatedAnswers = {
                    ...answers,
                    [index]: selectedAnswer,
                  };
                  setAnswers(updatedAnswers);
                }}
                setAnsweredQuestionCount={setAnsweredQuestionCount}
                answeredQuestionCount={answeredQuestionCount}
                answeredQuestions={answeredQuestions}
                setAnsweredQuestions={setAnsweredQuestions}
              />
            </div>
          ) : (
            quiz.type === "single" && (
              <div id={`part-${index}`}>
                <QuizQuestion
                  index={index + 1}
                  correctAnswer={
                    quiz.answers.find((answer) => answer.isAnswer)?.id + "" ||
                    ""
                  }
                  options={[...quiz.answers]}
                  question={quiz.text}
                  onSubmit={() => {
                    sendAnswers();
                  }}
                  setAnsweredQuestionCount={setAnsweredQuestionCount}
                  answeredQuestionCount={answeredQuestionCount}
                  answeredQuestions={answeredQuestions}
                  setAnsweredQuestions={setAnsweredQuestions}
                />
              </div>
            )
          )
        )}
    </Col>
  );

  const contentList: Record<string, React.ReactNode> = {
    users: usersList,
    quizes: quizes,
  };
  const { Header, Content, Footer, Sider } = Layout;
  const { token } = theme.useToken();
  return (
    <MainLayout withBacking>
      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ position: "relative", marginRight: 10 }}>
          <Card
            style={{
              padding: 0,
              borderRadius: 15,
              position: "sticky",
              top: 20,
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                marginBottom: 20,
                minWidth: 250,
              }}
            >
              <h3 style={{ margin: "auto" }}>
                {`Вопросы - `}
                {test
                  ? `${answerCount}/${
                      test?.questions.length === undefined
                        ? "0"
                        : test?.questions.length
                    }`
                  : "загрузка"}
              </h3>
            </div>
            {test ? (
              <Sider style={{ background: token.colorBgContainer }} width={250}>
                <Anchor>
                  {test?.questions.map((ques, index) => {
                    const curQuest = quizAnswers.find(
                      (el) => el.questionId === ques?.id
                    );
                    const textColor =
                      curQuest && curQuest.answerIds.length > 0
                        ? "#bfbfbf"
                        : "black";
                    return (
                      <Anchor.Link
                        key={`part-${index}`}
                        href={`#part-${index}`}
                        title={
                          <span style={{ color: textColor }}>
                            {`${index + 1}. ${ques.text}`}
                          </span>
                        }
                      />
                    );
                  })}
                </Anchor>
              </Sider>
            ) : (
              <Spin size="large" style={{ width: "100%" }} />
            )}
          </Card>
        </div>
        {contentList[activeTabKey1]}
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
          marginTop: 10,
        }}
      >
        {test && (
          <Button
            size="large"
            type="primary"
            onClick={sendAnswers}
            disabled={isLoading || answerCount < test.questions.length}
            style={{}}
          >
            Отправить ответы
          </Button>
        )}
      </div>
    </MainLayout>
  );
};
