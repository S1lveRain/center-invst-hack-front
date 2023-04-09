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
import { DownOutlined } from "@ant-design/icons";
import { useGetDirectionByIdQuery } from "../../app/services/DirectionApi";
import { useGetTestByIdQuery } from "../../app/services/TestsApi";
import { MainLayout } from "../../layouts/MainLayout";
import { DefaultOptionType } from "rc-cascader";
const { Title } = Typography;

interface VacancyQuizI {
    /* vacancyList: VacancyT[], */
}


export const VacancyQuiz: React.FC<VacancyQuizI> = () => {
    const { id } = useParams<{ id: string }>();
    const { data: test, isLoading } = useGetTestByIdQuery(id as string);
    const [activeTabKey1, setActiveTabKey1] = useState<string>("quizes");
    const [options, setOptions] = useState<SelectProps<object>["options"]>([]);

           
    const searchResult = ((query: string) => {
        const searchOption: SelectProps<object>["options"] = []
        test?.questions
            .map((question, idx) => {
                if (question.text.includes(query)) {
                    searchOption.push(
                        {
                            value: question.text,
                            label: (
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <span >
                                        Найдено <a>{query}</a> в {question.text}
                                    </span>
                                </div>
                            ),
                        }
                    )
                };
            })
        return searchOption
    })

    const handleSearch = (value: string) => {
        setOptions(value ? searchResult(value) : []);
    };

    const onSelect = (value: string) => {
        let indexOfSelectedItem =  test?.questions.findIndex((question) => question.text === value)
        const element = document.getElementById(`part-${indexOfSelectedItem}`); 
        element && element.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" }); 
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
                <Input.Search size="middle" placeholder="Поиск" enterButton />
            </AutoComplete>
        </Space>
    );

    const quizes = (
        <Col className={styles.quizList}>
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
                                onSubmit={() => { }}
                            />
                        </div>
                    ) : quiz.type === "multiple" ? (
                        <div id={`part-${index}`}>
                            <MultipleQuizQuestion
                                index = {index + 1}
                                correctAnswers={quiz.answers
                                    .filter((answer) => answer.isCorrect === true)
                                    .map((answer) => answer.text)}
                                options={[...quiz.answers]}
                                question={quiz.text}
                                onSubmit={() => { }}
                            />
                        </div>
                    ) : (
                        quiz.type === "single" && (
                            <div id={`part-${index}`}>
                                <QuizQuestion
                                   index={index + 1}
                                    correctAnswer={
                                        quiz.answers.filter(
                                            (answer) => answer.isCorrect === true
                                        )[0].text
                                    }
                                    options={[...quiz.answers]}
                                    question={quiz.text}
                                    onSubmit={() => { }}
                                />
                            </div>
                        )
                    )
                )}
        </Col>
    );

    const contentList: Record<string, React.ReactNode> = {
        users: <p>Список пользователей</p>,
        quizes: quizes,
    };
    const { Header, Content, Footer, Sider } = Layout;
    const { token } = theme.useToken();
    return (
        <MainLayout withBacking>
            <div style={{ display: "flex" }}>
                <Sider style={{ background: token.colorBgContainer }} width={250}>
                    <Anchor
                        items={
                            test?.questions.length
                                ? test.questions.map((quiz, index) => {
                                    return {
                                        key: `part-${index}`,
                                        href: `#part-${index}`,
                                        title: `${index + 1}. ${quiz.text}`,
                                    };
                                })
                                : []
                        }
                    />
                </Sider>
                <Card
                    className={styles.select_vacancy_wrapper}
                    style={{ width: "100%" }}
                    title={
                        <Title level={4} style={{ margin: 0 }}>
                            {test?.name}
                        </Title>
                    }
                    tabList={tabList}
                    activeTabKey={activeTabKey1}
                    onTabChange={onTab1Change}
                    extra={extra}
                >
                    {contentList[activeTabKey1]}
                </Card>
            </div>
        </MainLayout>
    );
};
