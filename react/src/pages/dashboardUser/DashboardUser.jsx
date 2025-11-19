import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Space, Form, Input, Button, Table, Select } from "antd";
import PageTitle from "../../components/common/PageTitle";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";

import {
    createOrUpdateDashboardUser,
    getDashboardUsers,
} from "../../store/slices/dashboardUserSlice";

function DashboardUser() {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    //table related
    const { data, loading, error } = useSelector(
        (state) => state.dashboardUser
    );

    //Form
    const [selectedUser, setSelectedUser] = useState({});
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        if (selectedUser != {}) {
            setSelectedUserId(selectedUser["_id"]);
            form.setFieldsValue({
                username: selectedUser["username"],
            });
        }
    }, [selectedUser, form]);

    const handleClearOnClick = () => {
        setSelectedUserId(null);
        setSelectedUser({});
        form.resetFields();
    };

    const handleOnFinish = (vals) => {
        dispatch(
            createOrUpdateDashboardUser({ userId: selectedUserId, ...vals })
        );
        handleClearOnClick();
    };

    useEffect(() => {
        dispatch(getDashboardUsers());
    }, [dispatch]);

    return (
        <div>
            <PageTitle>Dashboard Users</PageTitle>
            <Space
                direction="vertical"
                size={"middle"}
                style={{ display: "flex" }}>
                <Row gutter={8}>
                    <Col span={24}>
                        <Form
                            form={form}
                            initialValues={{
                                username: null,
                                password: null,
                                role:'admin'
                            }}
                            onFinish={handleOnFinish}
                            layout="inline"
                            autoComplete="off">
                            <Form.Item
                                key="username"
                                name="username"
                                label="Username">
                                <Input />
                            </Form.Item>

                            <Form.Item
                                key="password"
                                name="password"
                                label="Password">
                                <Input.Password
                                    placeholder="input password"
                                    iconRender={(visible) =>
                                        visible ? (
                                            <EyeTwoTone />
                                        ) : (
                                            <EyeInvisibleOutlined />
                                        )
                                    }
                                />
                            </Form.Item>

                            <Form.Item key="role" name="role" label="Role">
                                <Select
                                    className="min-w-sm"
                                    options={[
                                        {
                                            label: "superadmin",
                                            value: "superadmin",
                                        },
                                        { label: "admin", value: "admin" },
                                    ]}
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button htmlType="submit" type="primary">
                                    Submit
                                </Button>
                            </Form.Item>

                            <Form.Item>
                                <Button onClick={() => handleClearOnClick()}>
                                    Clear
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>

                <Row gutter={8}>
                    <Col span={24}>
                        <Table
                            dataSource={data || []}
                            rowKey={(record) => record._id || record.id}
                            loading={loading}
                            columns={[
                                {
                                    title: "userId",
                                    dataIndex: "_id",
                                    key: "_id",
                                },
                                {
                                    title: "username",
                                    dataIndex: "username",
                                    key: "username",
                                },
                                {
                                    title: "Action",
                                    render: (text, record) => (
                                        <Button
                                            onClick={() =>
                                                setSelectedUser(record)
                                            }>
                                            Edit
                                        </Button>
                                    ),
                                },
                            ]}
                        />
                    </Col>
                </Row>
            </Space>
        </div>
    );
}

export default DashboardUser;
