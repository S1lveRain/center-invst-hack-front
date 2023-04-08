import React from "react";
import {
  ArrowUpOutlined,
  DatabaseOutlined,
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  DollarCircleFilled,
  SmileFilled,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Descriptions,
  MenuProps,
  Row,
  Statistic,
} from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Title from "antd/es/skeleton/Title";
import QuizQuestion from "./components/QuizQuestion/QuizQuestion";
import { Widget } from "./components/Widget/Widget";
import OpenQuizQuestion from "./components/OpenQuizQuestion/OpenQuizQuestion";
import { MultipleQuizQuestion } from "./components/MultipleQuizQuestion/MultipleQuizQuestion";
import {Link, Route, Routes} from "react-router-dom";
import {SystemAnalystPage} from "./components/SystemAnalystPage/SystemAnalystPage";
import {IOSDevoloper} from "./components/IOSDeveloper/IOSDevoloper";
import {OfferYour} from "./components/OfferYour/OfferYour";
import {TestPage} from "./components/TestPage/testPage";
import {DatabaseAdministrator} from "./components/DatabaseAdministrator/DatabaseAdministrator";

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
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  return (
    <Layout>
      <Header className="header" style={{backgroundColor: 'white'}}>
          <div className="logo"><DatabaseOutlined /></div>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
        <Layout style={{ padding: "24px 0", background: colorBgContainer }}>
          <Sider style={{ background: colorBgContainer }} width={200}>
              <Menu
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  style={{ height: "100%" }}
              >
                  <Menu.Item key="1" icon={<DatabaseOutlined />}>
                      <Link to={'/iosdevoloper'}>iOS разработчик</Link>
                  </Menu.Item>
                  <Menu.Item key="2" icon={<DatabaseOutlined />}>
                      <Link to={'/systemanalytist'}>Системный аналитик</Link>
                  </Menu.Item>
                  <Menu.Item key="3" icon={<DatabaseOutlined />}>
                      <Link to={'/databaseAdmin'}>Администратор баз данных</Link>
                  </Menu.Item>
                  <Menu.Item key="4" icon={<DatabaseOutlined />}>
                      <Link to={'/offer'}>Предложить свою...</Link>
                  </Menu.Item>
              </Menu>
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
              <Routes>
                  <Route path="/" element={<TestPage />}/>
                  <Route path="/iosdevoloper" element={<IOSDevoloper />} />
                  <Route path="/databaseAdmin" element={<DatabaseAdministrator />}  />
                  <Route path="/systemanalytist" element={<SystemAnalystPage />} />
                  <Route path="/offer" element={<OfferYour />} />
              </Routes>
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
