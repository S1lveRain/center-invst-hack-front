import React from 'react';
import {Button, Row} from "antd";
import {Widget} from "../../components/Widget/Widget";
import {DollarCircleFilled, SmileFilled} from "@ant-design/icons";
import QuizQuestion from "../../components/QuizQuestion/QuizQuestion";
import OpenQuizQuestion from "../../components/OpenQuizQuestion/OpenQuizQuestion";
import {MultipleQuizQuestion} from "../../components/MultipleQuizQuestion/MultipleQuizQuestion";

export const TestPage = () => {

    const question = "Какая планета ближе к Солнцу?";
    const options = [
        {id: "1", text: "Марс"},
        {id: "2", text: "Венера"},
        {id: "3", text: "Земля"},
        {id: "4", text: "Меркурий"},
    ];
    const correctAnswers = ["1", "3"];
    const correctAnswer = "4";

    const handleSubmit = (isCorrect: boolean) => {
    };


    return (
        <div>
            <h1>Название направления</h1>
            <div style={{marginBottom: 24}}>
                Здесь будет описание выбранной позиции.
            </div>
            <Row gutter={16} style={{gap: 10}}>
                <Widget
                    title="тип занятости"
                    value="полная"
                    icon={<SmileFilled/>}
                />
                <Widget
                    title="зарплата"
                    value="80,000 - 120,000 "
                    icon={<DollarCircleFilled/>}
                    suffix={"₽"}
                />
            </Row>
            <Button type="primary" style={{marginTop: 24}}>
                Перейти к тестированию
            </Button>
            <QuizQuestion
                question={question}
                options={options}
                correctAnswer={correctAnswer}
                onSubmit={handleSubmit}
            />
            <OpenQuizQuestion
                question={question}
                correctAnswer={correctAnswer}
                onSubmit={handleSubmit}
            />
            <MultipleQuizQuestion
                question={question}
                options={options}
                correctAnswers={correctAnswers}
                onSubmit={handleSubmit}
            />
        </div>
    );
};