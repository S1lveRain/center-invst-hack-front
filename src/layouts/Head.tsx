import { Header } from "antd/es/layout/layout";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/centre-invest-bank.svg";
export const Head = () => {
  return (
    <Header className="header" style={{ backgroundColor: "white" }}>
      <div
        className="logo"
        style={{ display: "flex", alignItems: "center", textAlign: "center" }}
      >
        <Link to={"/vacancy"}>
          <img src={logo} style={{ width: 50, height: 50 }} alt={"broken"} />
        </Link>
      </div>
    </Header>
  );
};
