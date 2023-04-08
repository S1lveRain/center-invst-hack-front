import { SmileFilled } from "@ant-design/icons";
import { Card, Statistic } from "antd";
import React, { FC } from "react";
interface IWidget {
  value?: string;
  title?: string;
  suffix?: string;
  icon?: any;
}
export const Widget: FC<IWidget> = ({ value, title, icon, suffix }) => {
  return (
    <Card
      size="small"
      bordered={false}
      style={{
        background: "#3FC143",
        borderRadius: 12,
        padding: 16,
        color: "white",
        boxShadow: "2px 5px 8px 0px rgba(68, 129, 105, 0.3)",
      }}
    >
      <Statistic
        title={<h4 style={{ margin: 0 }}>{title}</h4>}
        value={value}
        precision={2}
        valueStyle={{ color: "#EBFF00", fontWeight: 600 }}
        prefix={icon}
        suffix={suffix}
      />
    </Card>
  );
};
