import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, AutoComplete, Input, Space, SelectProps, Typography, Dropdown } from "antd";
import { Widget } from "../../components/Widget/Widget";
import { Simulate } from "react-dom/test-utils";
import styles from './VacancyQuiz.module.css'
import { quizData } from '../../app/dataExample';
import { Link, useParams } from 'react-router-dom';
import OpenQuizQuestion from '../../components/OpenQuizQuestion/OpenQuizQuestion';
import { MultipleQuizQuestion } from '../../components/MultipleQuizQuestion/MultipleQuizQuestion';
import QuizQuestion from '../../components/QuizQuestion/QuizQuestion';
import { MenuProps } from 'rc-menu';
import { DownOutlined } from '@ant-design/icons';
import { useGetDirectionByIdQuery } from '../../app/services/DirectionApi';
import { useGetTestByIdQuery } from '../../app/services/TestsApi';
import { DefaultOptionType } from 'rc-cascader';
const { Title } = Typography;


interface VacancyQuizI {
    /* vacancyList: VacancyT[], */
}


export const VacancyQuiz: React.FC<VacancyQuizI> = () => {
    const { id } = useParams<{ id: string }>();
    const { data: test, isLoading } = useGetTestByIdQuery(id as string)
    const [activeTabKey1, setActiveTabKey1] = useState<string>('quizes');
    const [options, setOptions] = useState<DefaultOptionType[]>([]);

    useEffect(() => {
        if (test) {
            let options: DefaultOptionType[] = test.questions.map((question) => (
                {
                    label: question.text,
                    value: question.text,
                }))
            setOptions(options)

        }
    }, [test])





    const onSelect = (value: string) => {
        const item = test?.questions.filter((question) => question.text === value)[0]
        const element = document.getElementById(String(item?.id)); 
        element && element.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    };

    const onTab1Change = (key: string) => {
        setActiveTabKey1(key);
    };
    const items: MenuProps['items'] = test?.questions.map((_, index) => {
        const item = {
            label: index + 1,
            key: index

        }

        return item

    })



    const quizes = test?.questions.length && test.questions.map((quiz, index) => (
        quiz.type === 'open'
            ?
            <div id={String(quiz.id)}>
                <OpenQuizQuestion correctAnswer={quiz.answers[0].text} question={quiz.text} onSubmit={() => { }} />
            </div>
            :
            quiz.type === 'multiple'
                ?
                <div id={String(quiz.id)}>

                    <MultipleQuizQuestion
                        correctAnswers={quiz.answers.filter(answer => answer.isCorrect === true).map(answer => answer.text)}
                        options={[...quiz.answers]}
                        question={quiz.text} onSubmit={() => { }} />
                </div>
                :
                quiz.type === 'single'
                &&
                <div id={String(quiz.id)}>
                    <QuizQuestion
                        correctAnswer={quiz.answers.filter(answer => answer.isCorrect === true)[0].text}
                        options={[...quiz.answers]} question={quiz.text}
                        onSubmit={() => { }} />
                </div>

    ))




    const tabList = [
        {
            key: 'users',
            tab: 'Пользователи',
        },
        {
            key: 'quizes',
            tab: 'Тесты'
        },
    ];

    const extra = (

        <Space wrap>
            {
                activeTabKey1 === 'users'
                    ?
                    <>
                        <Button type='primary' ghost>По направлению</Button>
                        <Button type='primary' ghost>По баллам</Button>
                    </>
                    :

                    <Dropdown menu={{ items }} >

                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                По номеру
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>


            }


            <AutoComplete
                dropdownMatchSelectWidth={252}
                style={{ width: 300 }}
                options={options}
                onSelect={onSelect}
                filterOption
            >
                <Input.Search size="middle" placeholder="Поиск" enterButton />
            </AutoComplete>
        </Space>
    )



    const contentList: Record<string, React.ReactNode> = {
        users: <p>Список пользователей</p>,
        quizes: <Col className={styles.quizList}>
            {quizes}
        </Col>,
    };

    return (
        <Card className={styles.select_vacancy_wrapper}
            style={{ width: '100%' }}
            title={<Title level={4} style={{ margin: 0 }}>{`Название теста`}</Title>}
            tabList={tabList}
            activeTabKey={activeTabKey1}
            onTabChange={onTab1Change}
            extra={extra}

        >
            {contentList[activeTabKey1]}
        </Card>
    );
};

