import React from "react";
import {
  GlobalOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import {Link, Route, Routes} from "react-router-dom";
import {TestPage} from "./pages/TestPage/TestPage";
import {data, vacancyList} from "./app/dataExample";
import {VacancyWindow} from "./components/VacancyWindow/VacancyWindow";
import { SelectVacancy } from "./components/SelectVacancy/SelectVacancy";

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const { token } = theme.useToken();

  return (
    <Layout style={{height: '100%'}}>
      <Header className="header" style={{backgroundColor: 'white'}}>
          <div className="logo"><GlobalOutlined /></div>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
        <Layout style={{ padding: "24px 0", background: token.colorBgContainer }}>
          <Sider style={{ background: token.colorBgContainer }} width={200}>
              <Menu
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  style={{ height: "100vh" }}
              >
                  {data && data.map((el) => (
                      <Menu.Item key={el.id} icon={<el.icon />}>
                          <Link to={`/vacancy/${el.id}`}>{el.title}</Link>
                      </Menu.Item>
                  ))}
              </Menu>
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
              <Routes>
                  <Route path="/" element={<TestPage />}/>
                  <Route path="/vacancy/:id" element={<VacancyWindow data={data} />}/>
                  <Route path="/selectVacancy" element = {<SelectVacancy />}/>
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
