import { Layout, Menu, theme } from "antd";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useGetDirectionsQuery } from "../app/services/DirectionApi";

interface NavI {}
export const Nav: FC<NavI> = () => {
  const { Header, Content, Footer, Sider } = Layout;
  const { token } = theme.useToken();
  const { data: direction, isLoading } = useGetDirectionsQuery("1212");
  return (
    <Sider style={{ background: token.colorBgContainer }} width={200}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["0"]}
        style={{ height: "100vh" }}
      >
        {direction &&
          direction.map((el, index) => (
            <Menu.Item key={el.id + index} /* icon={<el.icon />} */>
              <Link to={`/vacancy/${el.id}`}>{el.title}</Link>
            </Menu.Item>
          ))}
      </Menu>
    </Sider>
  );
};
