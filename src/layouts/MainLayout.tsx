import { Breadcrumb, Layout, theme } from "antd";
import React, { FC } from "react";
import { Head } from "./Head";
import { Nav } from "./Nav";
import { data } from "../app/dataExample";

const { Header, Content, Footer, Sider } = Layout;

interface MainLayoutI {
  children: any;
  withNav?: boolean;
}
export const MainLayout: FC<MainLayoutI> = ({ children, withNav = false }) => {
  const { token } = theme.useToken();
  return (
    <Layout style={{ height: "100%" }}>
      <Head />
      <Content style={{ padding: "0 50px" }}>
        <div style={{ margin: "16px 0" }} />
        <Layout
          style={{
            padding: "24px 0",
            background: withNav ? token.colorBgContainer : undefined,
          }}
        >
          {withNav && <Nav data={data} />}
          <Content>{children}</Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>Created by Random()</Footer>
    </Layout>
  );
};
