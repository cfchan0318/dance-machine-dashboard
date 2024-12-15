import { Row, Col, Space, Card, Spin, Table } from "antd";
import WeekForm from "../../components/week/WeekForm";
import { createWeek, fetchWeekList,deleteWeek } from "../../store/slices/weekSlice";
import { useDispatch, useSelector } from "react-redux";
import { convertToAntdTable } from "../../utils/antdTable";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const WeekList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const weekForm = useSelector((state) => state.week.weekForm);
    const weekList = useSelector((state) => state.week.weekList);

    const handleOnFinish = (data) => {
        dispatch(createWeek(data));
        dispatch(fetchWeekList());
    };

    const handleEditOnClick = (id) => {
        navigate(`/weeks/${id}`)
    };

    const handleDeleteOnClick = (id) => {
        dispatch(deleteWeek(id))
        dispatch(fetchWeekList());
    };

    const customColumns = [
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <span>
                    <a
                        onClick={() => {
                            console.log("Edit", record._id);
                            handleEditOnClick(record._id);
                        }}>
                        Edit
                    </a>
                    <a
                        onClick={() => {
                            handleDeleteOnClick(record._id);
                        }}
                        style={{ marginLeft: 8 }}>
                        Delete
                    </a>
                </span>
            ),
        },
    ];

    const columnOrder = ["_id", "week", "name", "action"]; // Specify the desired order of columns

    const { dataSource, columns } = convertToAntdTable(
        weekList.items,
        ["_id", "week", "name"],
        [],
        customColumns,
        columnOrder
    );

    useEffect(() => {
        dispatch(fetchWeekList());
    }, [dispatch]);

    return (
        <>
            <h1>Weeks</h1>
            <Space direction="vertical" style={{ display: "flex" }}>
                <Row gutter={8}>
                    <Col span={24}>
                        <Card title="Add new pose">
                            {weekForm.isLoading ? (
                                <Spin />
                            ) : (
                                <WeekForm onFinish={handleOnFinish} />
                            )}
                        </Card>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={24}>
                        <Card title="Weeks">
                            <Table dataSource={dataSource} columns={columns} />
                        </Card>
                    </Col>
                </Row>
            </Space>
        </>
    );
};

export default WeekList;
