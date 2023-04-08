import React from 'react';
import { Card, Col, Row } from "antd";
import { Widget } from "../../components/Widget/Widget";
import { Simulate } from "react-dom/test-utils";
import styles from './VacancyQuiz.module.css'
import click = Simulate.click;
import { quizData, vacancyList } from '../../app/dataExample';
import { Link } from 'react-router-dom';
import OpenQuizQuestion from '../../components/OpenQuizQuestion/OpenQuizQuestion';
import { MultipleQuizQuestion } from '../../components/MultipleQuizQuestion/MultipleQuizQuestion';
import QuizQuestion from '../../components/QuizQuestion/QuizQuestion';


interface VacancyQuizI {
    /* vacancyList: VacancyT[], */
}
export const VacancyQuiz: React.FC<VacancyQuizI> = () => {
    return (
        <div className={styles.select_vacancy_wrapper}>
            <Col className={styles.quizList}>
                {
                   quizData.length && quizData.map((quiz, index) => (
                        quiz.type === 'open' 
                        ?
                        <OpenQuizQuestion correctAnswer={quiz.correctAnswer as string} question={quiz.question} onSubmit={()=>{}} />
                        :
                        quiz.type === 'multiple' 
                        ? 
                        <MultipleQuizQuestion correctAnswers={quiz.correctAnswer as string[] } options={quiz.options} question={quiz.question} onSubmit={()=>{}} />
                        :
                       quiz.type === 'standart' && <QuizQuestion correctAnswer={quiz.correctAnswer as string} options={quiz.options} question={quiz.question} onSubmit={()=>{}}/>

                    ))
                }
            </Col>
        </div>
    );
};

