import { Header } from "antd/es/layout/layout";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, theme } from "antd";
import { useSelector } from "react-redux";
import { getUser } from "../app/slices/authSlice";
import { useGetUserQuery } from "../app/services/UserApi";
import { UserOutlined } from "@ant-design/icons";

export const Head = () => {
  const userId = useSelector(getUser());
  const {
    data: currentUser,
    error,
    isLoading,
  } = useGetUserQuery(userId as string);
  const { token } = theme.useToken();

  return (
    <Header
      className="header"
      style={{
        backgroundColor: "white",
        display: "flex",
        justifyContent: "space-between",
        zIndex: 1,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Link to={"/"} style={{ display: "flex", alignItems: "center" }}>
        <h1 style={{ color: "#167AFF", margin: 0 }}>ТЕСТ ДГТУ</h1>
      </Link>

      <Link style={{ display: "flex", alignItems: "center" }} to={"/testsResult"}>
        <h4 style={{ color: "#167AFF", margin: 0 }}>Результаты</h4>
      </Link>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#167AFF",
          margin: 0,
        }}
      >
        {isLoading ? (
          <>Loading...</>
        ) : (
          <div>
            {currentUser && (
              <h4 style={{ margin: "-15px 10px 0 0" }}>{currentUser.email}</h4>
            )}
            {currentUser && (
              <p
                style={{
                  margin: "-10px 0 0 0",
                  position: "absolute",
                  right: 95,
                  top: 20,
                }}
              >
                {currentUser.role}
              </p>
            )}
          </div>
        )}
        {currentUser && <Avatar size="default" icon={<UserOutlined />} />}
      </div>
    </Header>
  );
};
