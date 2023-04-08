import React, { useState } from 'react';
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
const { Title } = Typography;


interface VacancyQuizI {
    /* vacancyList: VacancyT[], */
}
const getRandomInt = (max: number, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;


const searchResult = (query: string) =>
    new Array(getRandomInt(5))
        .join('.')
        .split('.')
        .map((_, idx) => {
            const category = `${query}${idx}`;
            return {
                value: category,
                label: (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <span>
                            Найдено {query} on{' '}
                            <a
                                href={`https://s.taobao.com/search?q=${query}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {category}
                            </a>
                        </span>
                        <span>{getRandomInt(200, 100)} results</span>
                    </div>
                ),
            };
        });

export const VacancyQuiz: React.FC<VacancyQuizI> = () => {
    const { id } = useParams<{ id: string }>();
    const { data: test, isLoading } = useGetTestByIdQuery(id as string)
    const [activeTabKey1, setActiveTabKey1] = useState<string>('quizes');
    const [options, setOptions] = useState<SelectProps<object>['options']>([]);
    console.log(test)

    const handleSearch = (value: string) => {
        setOptions(value ? searchResult(value) : []);
    };

    const onSelect = (value: string) => {
        console.log('onSelect', value);
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

    const i2: MenuProps['items'] = [
        {
            label: <a href="https://www.antgroup.com">1st menu item</a>,
            key: '0',
        },
        {
            label: <a href="https://www.aliyun.com">2nd menu item</a>,
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: '3rd menu item',
            key: '3',
        },
    ];



    /* [
        {
          label: <a href="https://www.antgroup.com">1st menu item</a>,
          key: '0',
        },
        {
          label: <a href="https://www.aliyun.com">2nd menu item</a>,
          key: '1',
        },
        {
          type: 'divider',
        },
        {
          label: '3rd menu item',
          key: '3',
        },
      ]; */

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

                    <Dropdown menu={{ items }}>

                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                Click me
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
                onSearch={handleSearch}
            >
                <Input.Search size="middle" placeholder="Поиск" enterButton />
            </AutoComplete>
        </Space>
    )


    const quizes = <Col className={styles.quizList}>
        {
            test?.questions.length && test.questions.map((quiz, index) => (
                quiz.type === 'open'
                    ?
                    <OpenQuizQuestion correctAnswer={quiz.answers[0].text} question={quiz.text} onSubmit={() => { }} />
                    :
                    quiz.type === 'multiple'
                        ?
                        <MultipleQuizQuestion
                            correctAnswers={quiz.answers.filter(answer => answer.isCorrect === true).map(answer => answer.text)}
                            options={[...quiz.answers]}
                            question={quiz.text} onSubmit={() => { }} />
                        :
                        quiz.type === 'single'
                        &&
                        <QuizQuestion
                            correctAnswer={quiz.answers.filter(answer => answer.isCorrect === true)[0].text}
                            options={[...quiz.answers]} question={quiz.text}
                            onSubmit={() => { }} />

            ))
        }
    </Col>

    const contentList: Record<string, React.ReactNode> = {
        users: <p>Список пользователей</p>,
        quizes: quizes,
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

