import React from 'react';
import {Result, Row} from "antd";
import {Widget} from "../../components/Widget/Widget";
import {Link} from "react-router-dom";
import {ArrowRightOutlined, InfoOutlined} from "@ant-design/icons";

export const HelloMessage = () => {
    return (
        <div>
            <Result
                status="success"
                icon={<InfoOutlined />}
                title={'Добро пожаловать'}
                subTitle={'Приветствуем вас на портале тестирования Центр-Инвеста. Выберите интересующую вас вакансию в меню слева.'}
            />
        </div>
    );
};