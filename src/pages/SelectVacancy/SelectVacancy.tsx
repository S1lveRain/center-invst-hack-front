import React from "react";
import { Card, Row } from "antd";
import { Widget } from "../../components/Widget/Widget";
import { Simulate } from "react-dom/test-utils";
import styles from "./SelectVacancy.module.css";
import click = Simulate.click;
import { vacancyList } from "../../app/dataExample";
import { Link, useParams } from "react-router-dom";
import { useGetDirectionByIdQuery } from "../../app/services/DirectionApi";
import { dir } from "console";
import { MainLayout } from "../../layouts/MainLayout";

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
  const { data: direction, isLoading } = useGetDirectionByIdQuery(id as string);
  return (
    <MainLayout>
      <div className={styles.select_vacancy_wrapper}>
        <div className={styles.select_vacancy_title}>
          <h1>В нашей компании требуются разработчики по направлениям:</h1>
        </div>
        <Row className={styles.vacancyList}>
          {direction?.ways &&
            direction.ways.map((vacancy, index) => (
              <a
                className={styles.vacancy_container}
                key={vacancy.name + index}
              >
                <Link
                  to={`/quiz/${vacancy.tests[0] ? vacancy.tests[0].id : 0}`}
                >
                  <Widget title={vacancy.desc} value={vacancy.name} />
                </Link>
              </a>
            ))}
        </Row>
      </div>
    </MainLayout>
  );
};
