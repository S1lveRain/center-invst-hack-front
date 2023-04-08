import { DatabaseOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { SystemAnalystPage } from '../components/SystemAnalystPage/SystemAnalystPage';
import { IOSDevoloper } from '../components/IOSDeveloper/IOSDevoloper';
import { OfferYour } from '../components/OfferYour/OfferYour';

export const route = () => {
  return (
    <div>
         <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              style={{ height: "100%" }}
            >
              
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
      
      <Routes>
        <Route path="/" element={<SystemAnalystPage/>}  />
        <Route path="/iosdevoloper" element={<IOSDevoloper/>} />
        <Route path="/databaseoutlined" element={<DatabaseOutlined/>}  />
        <Route path="/offeryour" element={<OfferYour/>}  />
      </Routes>
    </div>
  )
}

