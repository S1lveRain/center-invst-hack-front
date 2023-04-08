import React from 'react';
import {Card, Row} from "antd";
import {Widget} from "../components/Widget/Widget";
import {Simulate} from "react-dom/test-utils";
import click = Simulate.click;

export const SelectPath = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <h1>В нашей компании требуются разработчики по направлениям:</h1>
            </div>
        <Row style={{display: 'flex', justifyContent: "center", columnGap: '5%'}}>
            <div onClick={() => {
                console.log("click")}}
                style={{cursor: "pointer"}}
            >
        <Widget
        title=" 7 вопросов"
        value="FLUTTER разработчик"
        />
            </div>
            <div onClick={() => {
                console.log("click")}}
                 style={{cursor: "pointer"}}
            >
            <Widget
                title=" 10 вопросов"
                value="SWIFT разработчик"
            />
            </div>
  </Row>
        </div>
    );
};

export default SelectPath;