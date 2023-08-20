import React, { FC } from "react";
import { Card, Result, Row, Spin } from "antd";
import { Widget } from "../../components/Widget/Widget";
import { Link } from "react-router-dom";
import { ArrowRightOutlined, InfoOutlined } from "@ant-design/icons";
import { MainLayout } from "../../layouts/MainLayout";
import { UserT } from "../../app/Types/UserType";
import { useAllTestsQuery } from "../../app/services/UserApi";

interface HelloMessageI {
  isPlainUser?: boolean;
  user?: UserT | undefined;
}
export const HelloMessage: FC<HelloMessageI> = ({
  isPlainUser = false,
  user,
}) => {
  const { data: tests, isLoading } = useAllTestsQuery('');

  return (
    <MainLayout withBacking>
      {isPlainUser && tests && !isLoading ? (
        <>
          <h1 style={{ fontSize: 18, marginBottom: 15, marginTop: 5 }}>
            Доступные тесты:
          </h1>
          <Row gutter={5}>
            {tests.map((test) => (
              <Link to={`/quiz/${test.testInfo.id}`}>
                <Card
                  title={test.testInfo.name}
                  key={test.testInfo.id}
                  style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
                >
                  {!test.result.byCriteria
                    ? "Тест ещё не пройден!"
                    : "Тест пройден!"}
                </Card>
              </Link>
            ))}
          </Row>
        </>
      ) : !isPlainUser ? (
        <Result
          status="info"
          icon={<InfoOutlined />}
          title={"Добро пожаловать"}
          subTitle={
            "Приветствуем вас на портале тестирования ДГТУ. Выберите интересующий вас тест в меню слева."
          }
        />
      ) : (
        <Spin size="large" style={{ width: "100%", height: "100%" }} />
      )}
    </MainLayout>
  );
};
