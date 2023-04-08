import React, {FC, useEffect, useState} from 'react';
import {Button} from "antd";
import {Widget} from "../Widget/Widget";
import styles from './VacancyWindow.module.css'
import {useParams} from "react-router-dom";

interface VacancyWindowI {
    data: {title: string, description: string, link: string, id: string, icon: any, widgets: {title: string, value: string, icon: any, suffix: string}[]}[],
}

export const VacancyWindow: FC<VacancyWindowI> = ({data}) => {
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
                <div className={styles.main_window_wrapper}>
                    <div className={styles.window_title}>
                        <h1>{activeElement.title}</h1>
                    </div>
                    <div className={styles.window_description_wrapper}>
                        <div className={styles.window_description}>
                            <p>{activeElement.description}</p>
                        </div>
                        <div className={styles.window_widgets}>
                            {activeElement.widgets && activeElement.widgets.map(widget => {
                                return(
                                    <Widget title={widget.title} suffix={widget.suffix} icon={<widget.icon />} value={widget.value} />
                                )
                            })}
                        </div>
                    </div>
                    <div className={styles.window_begin_test_button_wrapper}>
                        <Button type="primary" style={{ marginTop: activeElement.widgets?.length ? 24 : 0, width: '100%' }}>
                            Перейти к тестированию
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );

};