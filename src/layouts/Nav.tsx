import { Layout, Menu, theme } from "antd";
import React, { FC } from "react";
import { Link } from "react-router-dom";

interface NavI {
  data: any;
}
export const Nav: FC<NavI> = ({ data }) => {
  const { Header, Content, Footer, Sider } = Layout;
  const { token } = theme.useToken();
  return (
    <Sider style={{ background: token.colorBgContainer }} width={200}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["0"]}
        style={{ height: "100vh" }}
      >
        {data &&
          data.map((el: any) => (
            <Menu.Item key={el.id} icon={<el.icon />}>
              <Link to={`/vacancy/${el.id}`}>{el.title}</Link>
            </Menu.Item>
          ))}
      </Menu>
    </Sider>
  );
};
