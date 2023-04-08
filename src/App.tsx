import React from "react";
import {
  ArrowUpOutlined,
  DatabaseOutlined,
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  DollarCircleFilled,
  SmileFilled,
  PhoneOutlined,
  AppleFilled,
  ArrowRightOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Descriptions,
  MenuProps,
  Result,
  Row,
  Statistic,
} from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Title from "antd/es/skeleton/Title";
import QuizQuestion from "./components/QuizQuestion/QuizQuestion";
import { Widget } from "./components/Widget/Widget";
import OpenQuizQuestion from "./components/OpenQuizQuestion/OpenQuizQuestion";
import { MultipleQuizQuestion } from "./components/MultipleQuizQuestion/MultipleQuizQuestion";
import {SelectPath} from "./pages/SelectPath";
import {ApplicationForm} from "./pages/ApplicationForm/ApplicationForm";

const { Header, Content, Footer, Sider } = Layout;

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const App: React.FC = () => {
  const { token } = theme.useToken();

  const question = "Какая планета ближе к Солнцу?";
  const options = [
    { id: "1", text: "Марс" },
    { id: "2", text: "Венера" },
    { id: "3", text: "Земля" },
    { id: "4", text: "Меркурий" },
  ];
  const correctAnswers = ["1", "3"];
  const correctAnswer = "4";

  const handleSubmit = (isCorrect: boolean) => {};

  return (
    <Layout>
      <Header className="header" style={{backgroundColor: 'white'}}>
        <div className="logo" />
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
        />
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
        <Layout
          style={{ padding: "24px 0", background: token.colorBgContainer }}
        >
          <Sider style={{ background: token.colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              style={{ height: "100%" }}
            >
              <Menu.Item key="1" icon={<DatabaseOutlined />}>
                iOS разработчик
              </Menu.Item>
              <Menu.Item key="2" icon={<DatabaseOutlined />}>
                Системный аналитик
              </Menu.Item>
              <Menu.Item key="3" icon={<DatabaseOutlined />}>
                Администратор баз данных
              </Menu.Item>
              <Menu.Item key="4" icon={<DatabaseOutlined />}>
                Разработчик баз данных
              </Menu.Item>
            </Menu>
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <ApplicationForm/>
            <Result
              status="success"
              icon={<AppleFilled />}
              title="iOS разработчик"
              subTitle="iOS-разработчик создаёт приложения для устройств Apple — онлайн-банки, навигаторы, фитнес-трекеры и другие полезные сервисы. Он программирует на языке Swift, проектирует интерфейсы, тестирует код и загружает проекты в App Store."
              extra={[
                <div>
                  <Row
                    gutter={16}
                    style={{ gap: 10, justifyContent: "center" }}
                  >
                    <Widget
                      title="тип занятости"
                      value="полная"
                      icon={<SmileFilled />}
                    />
                    <Widget
                      title="зарплата"
                      value="80,000 - 120,000"
                      icon={<DollarCircleFilled />}
                      suffix={"₽"}
                    />
                    <div style={{ marginLeft: 20 }}>
                      <Widget
                        title="пройдите тестирование"
                        value=" "
                        key="console"
                        icon={
                          <ArrowRightOutlined
                            style={{ color: token.colorPrimary }}
                          />
                        }
                        type="outlined"
                        pressable
                      />
                    </div>
                  </Row>
                </div>,
              ]}
            />

            <Button type="primary" style={{ marginTop: 24 }}>
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
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default App;
