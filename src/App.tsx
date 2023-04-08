import React from "react";
import {
  GlobalOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import {Link, Route, Routes, useParams} from "react-router-dom";
import {TestPage} from "./pages/TestPage/TestPage";
import {data, vacancyList} from "./app/dataExample";
import { SelectVacancy } from "./pages/SelectVacancy/SelectVacancy";
import { VacancyWindow } from "./pages/VacancyWindow/VacancyWindow";
import { VacancyQuiz } from "./pages/VacancyQuiz/VacancyQuiz";
import {HelloMessage} from "./pages/HelloMessage/HelloMessage";
import logo from './assets/centre-invest-bank.svg'
import { useGetDirectionsQuery } from "./app/services/DirectionApi";

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const { token } = theme.useToken();
  const {data: direction, isLoading } = useGetDirectionsQuery('1212')


  return (
    <Layout style={{height: '100%'}}>
      <Header className="header" style={{backgroundColor: 'white'}}>
          <div className="logo" style={{display: 'flex', alignItems: 'center', textAlign: 'center'}}><Link to={'/vacancy'}><img src={logo} style={{width: 50, height: 50}} alt={'broken'}/></Link></div>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
        <Layout style={{ padding: "24px 0", background: token.colorBgContainer }}>
          <Sider style={{ background: token.colorBgContainer }} width={200}>
              <Menu
                  mode="inline"
                  defaultSelectedKeys={["0"]}
                  style={{ height: "100vh" }}
              >

                {
                direction && direction.map((el, index) => (
                      <Menu.Item key={el.id + index } /* icon={<el.icon />} */>
                          <Link to={`/vacancy/${el.id}`}>{el.title}</Link>
                      </Menu.Item>
                  ))
                  
                  } 
              </Menu>
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
              <Routes>
                  <Route path="/" element={<TestPage />}/>
                  <Route path="/vacancy/:id" element={<VacancyWindow data={direction} />}/>
                  <Route path='/vacancy/' element={<HelloMessage />} />
                  <Route path="/selectVacancy/:id" element = {<SelectVacancy />}/>
                  <Route path="/quiz/:id" element = {<VacancyQuiz/>}/>
              </Routes>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Created by Random()
      </Footer>
    </Layout>
  );
};

export default App;
