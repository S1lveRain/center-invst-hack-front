import React from "react";
import { Card, Row } from "antd";
import { Widget } from "../../components/Widget/Widget";
import { Simulate } from "react-dom/test-utils";
import styles from "./SelectVacancy.module.css";
import click = Simulate.click;
import { vacancyList } from '../../app/dataExample';
import { Link, useParams } from 'react-router-dom';
import { useGetDirectionByIdQuery } from '../../app/services/DirectionApi';
import { dir } from 'console';


export type VacancyT = {
  id: number;
  title: string;
  description: string;
};

interface SelectVacancyI {
  /* vacancyList: VacancyT[], */
}
export const SelectVacancy: React.FC<SelectVacancyI> = () => {
    const { id } = useParams<{ id: string }>();
    const {data: direction, isLoading} = useGetDirectionByIdQuery(id as string)
    return (
        <div className={styles.select_vacancy_wrapper}>
            <div className={styles.select_vacancy_title}>
                <h1>В нашей компании требуются разработчики по направлениям:</h1>
            </div>
            <Row className={styles.vacancyList}>
                {
                    direction?.ways && direction.ways.map((vacancy, index) => (
                        <a className={styles.vacancy_container} key={vacancy.name + index}>
                            <Link to={`/quiz/${vacancy.id}`}>
                                <Widget
                                    title={vacancy.desc}
                                    value={vacancy.name}
                                />
                            </Link>
                        </a>
                    ))
                }
            </Row>
        </div>
        <Row className={styles.vacancyList}>
          {vacancyList.length &&
            vacancyList.map((vacancy, index) => (
              <a
                className={styles.vacancy_container}
                key={vacancy.title + index}
              >
                <Link to={`/quiz/${vacancy.id}`}>
                  <Widget title={vacancy.description} value={vacancy.title} />
                </Link>
              </a>
            ))}
        </Row>
      </div>
    </MainLayout>
  );
};

export default SelectVacancyI;
