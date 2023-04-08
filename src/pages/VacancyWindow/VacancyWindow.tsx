import React, { FC, useEffect, useState } from "react";
import { Button, Result, Row, theme } from "antd";
import styles from './VacancyWindow.module.css'
import {Link, useParams} from "react-router-dom";
import { ArrowRightOutlined } from '@ant-design/icons';
import { Widget } from '../../components/Widget/Widget';
import { DirectionT } from '../../app/Types/DirectionType';

interface VacancyWindowI {
    data: DirectionT[] | undefined
}

export const VacancyWindow: FC<VacancyWindowI> = ({data}) => {
    const { token } = theme.useToken();
    const { id } = useParams<{ id: string }>();
    const [activeElement, setActiveElement] = useState(data?.length && data[0]);

    useEffect(() => {
        const newActiveElement = data?.length && data.find(el => String(el.id) === id);
        if (newActiveElement) {
            setActiveElement(newActiveElement);
        }
    }, [id, data]);


    return (
        <div>
            {activeElement && (
                <Result
                    status="success"
                    /* icon={<activeElement.icon />} */
                    title={activeElement.title}
                    subTitle={activeElement.desc}
                    extra={[
                        <div>
                            <Row
                                gutter={16}
                                style={{ gap: 10, justifyContent: "center" }}
                            >
                                {activeElement.infos && activeElement.infos.map(widget => {
                                    return(
                                        <Widget 
                                        title={widget.name} 
                                       /*  icon={<widget.icon />}  */
                                        value={widget.value} 
                                        /* suffix={widget.suffix} */ />
                                    )
                                })}
                                <div>
                                    <Link to={`/selectVacancy/${activeElement.id}`}>
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
                                    </Link>
                                </div>
                            </Row>
                        </div>
                    ]}
                />
            )}
        </div>
    );

};
