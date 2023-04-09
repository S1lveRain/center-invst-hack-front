import { Header } from "antd/es/layout/layout";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/1200x630wa.png";
import { Avatar, theme } from "antd";
import { useSelector } from "react-redux";
import { getUser } from "../app/slices/authSlice";
import { useGetUserQuery } from "../app/services/UserApi";
import { UserOutlined } from "@ant-design/icons";
export const Head = () => {
  const userId = useSelector(getUser());
  const { data: currentUser, error, isLoading } = useGetUserQuery(userId);
  const { token } = theme.useToken();
  return (
    <Header
      className="header"
      style={{
        backgroundColor: "white",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Link to={"/"} style={{ display: "flex", alignItems: "center" }}>
        <img
          src={logo}
          style={{
            width: 35,
            height: 35,
            backgroundPosition: "center",
            margin: 10,
          }}
          alt={"broken"}
        />
        <h1 style={{ color: "#13AA09", margin: 0 }}>Work</h1>
      </Link>

      {/* <Link to="/personalpage"> */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#13AA09",
          margin: 0,
        }}
      >
        {isLoading ? (
          <>Loading...</>
        ) : (
          <div>
            <h4 style={{ margin: "-15px 10px 0 0" }}>{currentUser.email}</h4>
            <p
              style={{
                margin: "-10px 0 0 0",
                position: "absolute",
                right: 105,
                top: 20,
              }}
            >
              {currentUser.role}
            </p>
          </div>
        )}
        {currentUser && (
          <Avatar
            size="default"
            icon={<UserOutlined />}
            style={{ margin: "0 10px 0 0" }}
          />
        )}
      </div>
      {/* </Link> */}
    </Header>
  );
};
