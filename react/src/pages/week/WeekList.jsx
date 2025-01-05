import { Row, Col, Space, Card, Spin, Table, Form } from "antd";
import WeekForm from "../../components/week/WeekForm";
import {
    createWeek,
    fetchWeekList,
    deleteWeek,
    updateWeeek,
} from "../../store/slices/weekSlice";
import { useDispatch, useSelector } from "react-redux";
import { convertToAntdTable } from "../../utils/antdTable";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const WeekList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const weekForm = useSelector((state) => state.week.weekForm);
    const weekList = useSelector((state) => state.week.weekList);

    const [formWeekId, setFormWeekId] = useState(null);

    const handleClearOnClick = () => {
        setFormWeekId(null);
        form.resetFields();
    };

    const handleOnFinish = (data) => {
        if (formWeekId) {
            console.log(weekList);
            let week = weekList.items.find((item) => item._id === formWeekId);
            if (week) {
                week = { ...week, ...data };
                dispatch(updateWeeek(week));
                setFormWeekId(null);
            }
        } else {
            dispatch(createWeek(data));
            dispatch(fetchWeekList());
        }
        form.resetFields();
    };

    const handleEditInfoOnClick = (record) => {
        setFormWeekId(record._id);
        form.setFieldsValue({
            week: record.week,
            name: record.name,
            order: record.order ? record.order : null,
        });
    };

    const handleEditOnClick = (id) => {
        navigate(`/weeks/${id}`);
    };

    const handleDeleteOnClick = (id) => {
        dispatch(deleteWeek(id));
        dispatch(fetchWeekList());
    };

    const customColumns = [
        {
            title: "Edit Info",
            key: "edit-info",
            render: (text, record) => (
                <span>
                    <a
                        onClick={() => {
                            handleEditInfoOnClick(record);
                        }}>
                        Edit Info
                    </a>
                </span>
            ),
        },
        {
            title: "Edit Details",
            key: "edit-details",
            render: (text, record) => (
                <span>
                    <a
                        onClick={() => {
                            handleEditOnClick(record._id);
                        }}>
                        Edit Details
                    </a>
                </span>
            ),
        },
        {
            title: "Delete",
            key: "delete",
            render: (text, record) => (
                <span>
                    <a
                        onClick={() => {
                            handleDeleteOnClick(record._id);
                        }}
                        style={{ marginLeft: 8, color: "red" }}>
                        Delete
                    </a>
                </span>
            ),
        },
    ];

    const columnOrder = ["_id", "week", "name", "order", "action"]; // Specify the desired order of columns
    const columnConfigs = {
        order: {
            sorter: (a, b) => a.order - b.order,
        },
    };

    const { dataSource, columns } = convertToAntdTable(
        weekList.items,
        ["_id", "week", "name", "order"],
        columnConfigs,
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
                                <>
                                    {formWeekId ? (
                                        <h3>editing {formWeekId}</h3>
                                    ) : (
                                        <h3>create new week</h3>
                                    )}
                                    <WeekForm
                                        clearOnClick={handleClearOnClick}
                                        form={form}
                                        onFinish={handleOnFinish}
                                    />
                                </>
                            )}
                        </Card>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={24}>
                        <Card title="Weeks">
                            <Table
                                pagination={false}
                                dataSource={dataSource}
                                columns={columns}
                            />
                        </Card>
                    </Col>
                </Row>
            </Space>
        </>
    );
};

export default WeekList;
