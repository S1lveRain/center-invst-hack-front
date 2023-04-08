import React, {FC, useEffect, useState} from 'react';
import {Button, Result, Row, theme} from "antd";
import {Widget} from "../Widget/Widget";
import styles from './VacancyWindow.module.css'
import {useParams} from "react-router-dom";
import { ArrowRightOutlined } from '@ant-design/icons';

interface VacancyWindowI {
    data: {title: string, description: string, link: string, id: string, icon: any, widgets: {title: string, value: string, icon: any, suffix: string}[]}[],
}

export const VacancyWindow: FC<VacancyWindowI> = ({data}) => {
    const { token } = theme.useToken();
    const { id } = useParams<{ id: string }>();
    const [activeElement, setActiveElement] = useState(data[0]);

    useEffect(() => {
        const newActiveElement = data.find(el => el.id === id);
        if (newActiveElement) {
            setActiveElement(newActiveElement);
        }
    }, [id, data]);


    return (
        <div>
            {activeElement && (
                <Result
                    status="success"
                    icon={<activeElement.icon />}
                    title={activeElement.title}
                    subTitle={activeElement.description}
                    extra={[
                        <div>
                            <Row
                                gutter={16}
                                style={{ gap: 10, justifyContent: "center" }}
                            >
                                {activeElement.widgets && activeElement.widgets.map(widget => {
                                    return(
                                        <Widget title={widget.title} icon={<widget.icon />} value={widget.value} suffix={widget.suffix} />
                                    )
                                })}
                                <div>
                                    <Widget
                                        title="Пройдите тестирование"
                                        value=" "
                                        key="console"
                                        icon={
                                            <ArrowRightOutlined
                                                style={{ color: token.colorPrimary }}
                                            />
                                        }
                                        type="outlined"
                                        pressable
                                    />
                                </div>
                            </Row>
                        </div>,
                    ]}
                />
            )}
        </div>
    );

};