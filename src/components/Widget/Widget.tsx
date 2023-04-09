import { SmileFilled } from "@ant-design/icons";
import { Button, Card, Statistic, theme } from "antd";
import React, { FC } from "react";

import styles from "./Widget.module.css";
interface IWidget {
  value?: string;
  title?: string;
  suffix?: string;
  icon?: any;
  type?: "fill" | "outlined";
  pressable?: boolean;
  onClick?: () => any;
}
export const Widget: FC<IWidget> = ({
  value,
  title,
  icon,
  suffix,
  type = "fill",
  pressable = false,
  onClick,
}) => {
  const { token } = theme.useToken();
  return (
    <a>
      <Card
        className={pressable ? styles.card : ""}
        size="small"
        bordered={false}
        style={
          type === "fill"
            ? {
                background: "#3FC143",
                borderRadius: 12,
                color: "white",
                boxShadow: "2px 5px 8px 0px rgba(68, 129, 105, 0.3)",
              }
            : {
                border: `2px solid ${token.colorPrimary}`,
                borderRadius: 12,
                color: token.colorPrimary,
                boxShadow: "2px 5px 8px 0px rgba(68, 129, 105, 0.3)",
              }
        }
        onClick={onClick}
      >
        <Statistic
          title={
            <h4
              style={
                type === "fill"
                  ? { margin: 0 }
                  : { margin: 0, color: token.colorPrimary }
              }
            >
              {title}
            </h4>
          }
          value={value}
          valueStyle={{
            color: type === "fill" ? "#EBFF00" : token.colorPrimary,
            fontWeight: 600,
          }}
          prefix={icon}
          suffix={suffix}
        />
      </Card>
    </a>
  );
};
