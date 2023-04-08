import React from 'react';
import { Card, Row } from "antd";
import { Widget } from "../Widget/Widget";
import { Simulate } from "react-dom/test-utils";
import styles from './SelectVacancy.module.css'
import click = Simulate.click;
import { vacancyList } from '../../app/dataExample';

export type VacancyT = {
    title: string;
    description: string
}

interface SelectVacancyI {
    /* vacancyList: VacancyT[], */
}
export const SelectVacancy: React.FC<SelectVacancyI> = () => {
    return (
        <div className={styles.select_vacancy_wrapper}>
            <div className={styles.select_vacancy_title}>
                <h1>В нашей компании требуются разработчики по направлениям:</h1>
            </div>
            <Row className={styles.vacancyList}>
                {
                    vacancyList.length && vacancyList.map((vacancy, index) => (
                        <a className={styles.vacancy_container} key={vacancy.title + index}>
                            <Widget
                             title={vacancy.description}
                             value={vacancy.title}
                            />
                        </a>
                    ))
                }
            </Row>
        </div>
    );
};

export default SelectVacancyI;