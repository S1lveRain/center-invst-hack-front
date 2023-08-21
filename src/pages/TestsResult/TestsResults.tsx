import React, { FC, useEffect, useState } from "react";
import {
    Button,
    Card,
    Empty,
    Input,
    Menu,
    message,
    Modal,
    Progress,
    Result,
    Row,
    Space,
    Tag,
    theme,
    Typography,
} from "antd";
import { Link } from "react-router-dom";
import { MainLayout } from "../../layouts/MainLayout";
import { DirectionT } from "../../app/Types/DirectionType";
import { MenuProps } from "rc-menu";
import { InfoOutlined, PlusOutlined } from "@ant-design/icons";
import { useGetUserTestResultsByIdQuery } from "../../app/services/UserApi";
import { useAddCriteriaMutation, useGetTestByIdQuery, useGetTestCriteriasQuery } from "../../app/services/TestsApi";
import { ResultsT } from "../../app/Types/ResultsType";
const { Text } = Typography;

interface VacancyWindowI {
    data?: DirectionT[] | ResultsT[];
    withNav?: boolean;
    isLoading?: boolean;
    isError?: boolean;
    isPlainUser?: boolean;
}
type MenuItem = Required<MenuProps>["items"][number];

export const TestsResult: FC<VacancyWindowI> = ({ data, isLoading, isError, isPlainUser = false }) => {
    const [activeElement, setActiveElement] = useState('');
    const [skip, setSkip] = useState(true)
    const [skipCriteriaReq, setSkipCriteriaReq] = useState(true)
    const { data: testData, isLoading: isTestsLoading } = useGetUserTestResultsByIdQuery(activeElement, {
        skip
    })
    const { data: test } = useGetTestByIdQuery(activeElement, {
        skip
    })
    const { data: testCriterias } = useGetTestCriteriasQuery(activeElement, {
        skip: skipCriteriaReq,
    })

    const resultChartData = testData?.criterias.map((item) => {
        return {
            result: item.result * 10,
            name: item.criteria.name,
            id: item.criteria.id
        }
    })
    const [addCriteria] = useAddCriteriaMutation()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [criteriaName, setCriteriaName] = useState("");


    function getItem(
        label: React.ReactNode,
        key: React.Key,
        children?: MenuItem[],
        desc?: string,
        type?: 'group',
    ): MenuItem {
        return {
            key,
            children,
            label,
            type,
            desc,
        } as MenuItem;
    }
    const items: MenuProps['items'] = getMenuItmes()
    const onClick: MenuProps['onClick'] = (e) => {
        setSkip(false)
        setActiveElement(e.key)
        !isPlainUser && setSkipCriteriaReq(false)
    };
    function getMenuItmes() {


        if (!isPlainUser) {
            let adminData: DirectionT[] = data as DirectionT[]
            return adminData?.map((item) => {
                let ways = item.ways.map((way) => {
                    let tests = way.tests.map((test) => {
                        return getItem(test.name, test.id)
                    })
                    return getItem(way.name, `way${way.id}`, tests)
                })
                return getItem(item.title, `dir${item.id}`, ways)
            })
        } else {
            let userData: ResultsT[] = data as ResultsT[]
            return userData?.map((item) => {
                return getItem(item.testInfo.name, item.testInfo.id)
            })
        }
    }


    const handleAddCriteria = () => {
        if (!activeElement || !criteriaName) return;
        addCriteria({
            id: activeElement,
            name: criteriaName,
        })
            .then((data) => {
                if (data) {
                    message.success("Критерий успешно добавлен!");
                    setIsModalOpen(false);
                    setCriteriaName("");
                }
            })
            .catch((e) => {
                if (e) {
                    message.error("Ошибка добавления критерия!");
                }
            });
    };

    return (
        <MainLayout>
            <div style={{ display: "flex" }}>
                {isError && !isLoading && (
                    <Card
                        style={{
                            width: "300px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Empty
                            style={{ margin: "0 auto" }}
                            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                            imageStyle={{ height: 60 }}
                            description={<span>Ошибка загрузки!</span>}
                        ></Empty>
                    </Card>
                )}
                {isLoading && !isError && (
                    <Card
                        loading={isLoading}
                        style={{ width: "300px", height: "500px" }}
                    />
                )}
                {items?.length && (
                    <Menu
                        onClick={onClick}
                        style={{
                            maxWidth: "300px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            borderRadius: 10,
                        }}
                        mode="inline"
                        items={items}
                    />
                )}
                {activeElement ? (
                    <Card
                        title={test?.name}
                        extra={test ? `${test.questions.length} вопросов` : ""}
                        loading={isTestsLoading}
                        style={{
                            marginLeft: "20px",
                            width: "100%",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                        bodyStyle={{
                            padding: 30,
                        }}
                    >
                        <Text strong>Описание: {test?.desc}</Text>
                        {resultChartData?.length && isPlainUser && (
                            <Space size={100} wrap style={{ marginTop: "50px" }}>
                                {resultChartData.map((item) => {
                                    return (
                                        <div
                                            key={item.id}
                                            style={{ display: "flex", flexDirection: "column" }}
                                        >
                                            <Progress
                                                type="circle"
                                                percent={item.result}
                                                strokeWidth={10}
                                            />
                                            <Text>{item.name}</Text>
                                        </div>
                                    );
                                })}
                            </Space>
                        )}
                        {!isPlainUser && (
                            <div style={{ marginTop: "25px" }}>
                                <Text strong>Критерии теста:</Text>
                                <Space style={{ display: "flex", marginTop: "20px" }}>
                                    {testCriterias?.length && testCriterias.map((item) => {
                                        return (
                                            <Tag
                                                color="blue"
                                                style={{
                                                    width: "fit-content",
                                                    height: 35,
                                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                                }}
                                            >
                                                <h3 style={{ margin: "5px 0px 5px 0px" }}>
                                                    {" "}
                                                    {item.name}
                                                </h3>
                                            </Tag>
                                        );
                                    })}
                                    <Button
                                        type="primary"
                                        onClick={() => setIsModalOpen(true)}
                                        icon={<PlusOutlined />}
                                    />
                                </Space>
                                <Space style={{ marginTop: "50px" }}>
                                    <Link to={`/quiz/${activeElement}`}>
                                        <Button type="primary">Открыть тест</Button>
                                    </Link>
                                    <Button style={{ margin: "0 0 auto" }}>Список ответов</Button>
                                    <Button type="dashed" danger>
                                        Удалить тест
                                    </Button>
                                </Space>
                                <Modal
                                    title="Добавление критерия"
                                    open={isModalOpen}
                                    onOk={() => handleAddCriteria()}
                                    onCancel={() => {
                                        setIsModalOpen(false);
                                    }}
                                >
                                    <Input
                                        style={{ margin: "10px" }}
                                        size="large"
                                        value={criteriaName}
                                        onChange={(e) => setCriteriaName(e.target.value)}
                                        placeholder="Введите название критерия"
                                    />
                                </Modal>
                            </div>
                        )}
                    </Card>
                ) : (
                    <Result
                        status="info"
                        icon={<InfoOutlined />}
                        title={"Добро пожаловать"}
                        subTitle={
                            "Приветствуем вас на портале тестирования ДГТУ. Выберите интересующий вас тест в меню слева."
                        }
                        style={{ margin: "0 auto" }}
                    />
                )}
            </div>
        </MainLayout>
    );
};
