import React, { FC, useEffect, useState } from "react";
import { Button, Card, Menu, Result, Row, theme } from "antd";
import styles from "./VacancyWindow.module.css";
import { Link, useParams } from "react-router-dom";
import { MainLayout } from "../../layouts/MainLayout";
import { DirectionT } from "../../app/Types/DirectionType";
import { Widget } from "../../components/Widget/Widget";
import { MenuProps } from "rc-menu";
import { UserResultStats } from "../../components/UserResultStats/UserResultStats";
import { InfoOutlined } from "@ant-design/icons";


interface VacancyWindowI {
    data: DirectionT[] | undefined;
    withNav?: boolean;
    isLoading?: boolean;
}
type MenuItem = Required<MenuProps>['items'][number];

export const TestsResult: FC<VacancyWindowI> = ({ data, withNav, isLoading }) => {
    const { id } = useParams<{ id: string }>();
    const [activeElement, setActiveElement] = useState({
        id: '',
        name: '',
    });


    function getItem(
        label: React.ReactNode,
        key: React.Key,
        children?: MenuItem[],
        type?: 'group',
    ): MenuItem {
        return {
            key,
            children,
            label,
            type,
        } as MenuItem;
    }
    const items: MenuProps['items'] = data?.map((item) => {
        let ways = item.ways.map((way) => {
            return getItem(way.name, way.id)
        })
        return getItem(item.title, `main${item.id}`, ways)
    })
    const onClick: MenuProps['onClick'] = (e) => {

        setActiveElement({
            id: e.key,
            name: e.domEvent.currentTarget.innerText,
        })
        console.log(activeElement)
    };




    return (
        <MainLayout>
            <div style={{ display: 'flex' }}>
                {
                    isLoading &&
                    <Card loading={isLoading} style={{width:'300px', height: '500px'}}/>
                }
                {

                    data?.length && !isLoading &&
                    <Menu
                        onClick={onClick}
                        style={{ maxWidth: '300px' }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={[`main${data[0].id.toString()}`]}
                        mode="inline"
                        items={items}
                    />
                }
                {
                    activeElement.id ?
                        <Card title={activeElement.name} style={{ marginLeft: '50px', width: '100%' }}>
                            <UserResultStats testId={activeElement.id} />
                        </Card>
                        :
                        <Result
                            status="info"
                            icon={<InfoOutlined />}
                            title={"Результаты тестов"}
                            style={{ width: '100%' }}
                            subTitle={
                                "Выберите интересующий вас тест в меню слева, что бы посмотреть результаты."
                            }
                        />
                }

            </div>
        </MainLayout>
    );
};
