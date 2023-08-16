import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Row,
  AutoComplete,
  Input,
  Space,
  SelectProps,
  Typography,
  Dropdown,
  Anchor,
  Layout,
  theme,
  Badge,
  Descriptions,
  Statistic,
} from "antd";
import { Widget } from "../../components/Widget/Widget";
import { Simulate } from "react-dom/test-utils";
import styles from "./VacancyQuiz.module.css";
import { quizData } from "../../app/dataExample";
import { Link, useParams } from "react-router-dom";
import OpenQuizQuestion from "../../components/OpenQuizQuestion/OpenQuizQuestion";
import { MultipleQuizQuestion } from "../../components/MultipleQuizQuestion/MultipleQuizQuestion";
import QuizQuestion from "../../components/QuizQuestion/QuizQuestion";
import { MenuProps } from "rc-menu";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DownOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useGetDirectionByIdQuery } from "../../app/services/DirectionApi";
import { useGetTestByIdQuery } from "../../app/services/TestsApi";
import { MainLayout } from "../../layouts/MainLayout";
import { DefaultOptionType } from "rc-cascader";
import { useGetUsersQuery } from "../../app/services/UserApi";
const { Title } = Typography;

interface VacancyQuizI {
  /* vacancyList: VacancyT[], */
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
  const [items, setItems] = useState(test);

  const searchResult = (query: string) => {
    const searchOption: SelectProps<object>["options"] = [];
    test?.questions.map((question, idx) => {
      if (question.text.includes(query)) {
        searchOption.push({
          value: question.text,
          label: (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>
                Найдено <a>{query}</a> в {question.text}
              </span>
            </div>
          ),
        });
      }
    });
    return searchOption;
  };

  const handleSearch = (value: string) => {
    setOptions(value ? searchResult(value) : []);
  };

  const onSelect = (value: string) => {
    let indexOfSelectedItem = test?.questions.findIndex(
      (question) => question.text === value
    );
    const element = document.getElementById(`part-${indexOfSelectedItem}`);
    element &&
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
  };

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };

  const tabList = [
    {
      key: "users",
      tab: "Пользователи",
    },
    {
      key: "quizes",
      tab: "Тесты",
    },
  ];

  const extra = (
    <Space wrap>
      {activeTabKey1 === "users" && (
        <>
          <Button type="primary" ghost>
            По направлению
          </Button>
          <Button type="primary" ghost>
            По баллам
          </Button>
        </>
      )}

      <AutoComplete
        dropdownMatchSelectWidth={252}
        style={{ width: 300 }}
        options={options}
        onSelect={onSelect}
        onSearch={handleSearch}
      >
        <Input.Search
          size="middle"
          placeholder="Поиск"
          enterButton
          style={{ width: 200 }}
        />
      </AutoComplete>
    </Space>
  );
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
        {<h2>{test?.name}</h2>}
        {<p>{test?.desc}</p>}
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
                onSubmit={() => {}}
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
                  .filter((answer) => answer.isCorrect === true)
                  .map((answer) => answer.text)}
                options={[...quiz.answers]}
                question={quiz.text}
                onSubmit={() => {}}
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
                  correctAnswer={quiz.answers[0].text}
                  options={[...quiz.answers]}
                  question={quiz.text}
                  onSubmit={() => {}}
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
        <div
          style={{ position: "relative", flex: "0 0 350px", marginRight: 10 }}
        >
          <Card
            style={{
              width: 350,
              padding: 0,
              borderRadius: 15,
              position: "sticky",
              top: 10,
            }}
          >
            <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              <h4 style={{ padding: 10 }}>{`Вопросы: ${answeredQuestionCount}/${
                test?.questions.length === undefined
                  ? "0"
                  : test?.questions.length
              }`}</h4>
              {extra}
            </div>
            <Sider style={{ background: token.colorBgContainer }} width={250}>
              <Anchor>
                {test?.questions.map((quiz, index) => {
                  const textColor = answeredQuestions[index]
                    ? "#bfbfbf"
                    : "black";
                  return (
                    <Anchor.Link
                      key={`part-${index}`}
                      href={`#part-${index}`}
                      title={
                        <span style={{ color: textColor }}>
                          {`${index + 1}. ${quiz.text}`}
                        </span>
                      }
                    />
                  );
                })}
              </Anchor>
            </Sider>
          </Card>
        </div>
        {contentList[activeTabKey1]}
      </div>
    </MainLayout>
  );
};
