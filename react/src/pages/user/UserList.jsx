import { Row, Col, Space, Card, Spin, Table, Form, QRCode, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { convertToAntdTable } from "../../utils/antdTable";
import { useEffect, useState } from "react";
import {
    createUser,
    fetchUserList,
    deleteUser,
    updateUser,
} from "../../store/slices/usersSlice";
import UserForm from "../../components/users/UserForm";
const { Title } = Typography;

const UserList = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const user = useSelector((state) => state.user);
    const [userToUpdate, setUserToUpdate] = useState(null);

    const handleOnFinish = (data) => {
        if (userToUpdate) {
            userToUpdate.name = data.name;
            userToUpdate.code = data.code;
            dispatch(updateUser(userToUpdate));
            dispatch(fetchUserList());
        } else {
            dispatch(createUser(data));
            dispatch(fetchUserList());
        }
    };

    const handleEditOnClick = (record) => {
        setUserToUpdate(record);
        form.setFieldValue("name", record.name);
        form.setFieldValue("code", record.code);
    };

    const handleDeleteOnClick = (id) => {
        dispatch(deleteUser(id));
        dispatch(fetchUserList());
    };

    const handleClearOnClick = () => {
        form.resetFields();
        setUserToUpdate(null);
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
                            handleEditOnClick(record);
                        }}>
                        Edit
                    </a>
                </span>
            ),
        },
        {
            title: "QR Code",
            key: "qrcode",
            render: (text, record) => (
                <span>
                    <QRCode
                        value={`${import.meta.env.VITE_GAME_URL}?userId=${
                            record._id
                        }`}
                    />
                </span>
            ),
        },
        {
            title: "V2 QR Code",
            key: "qrcode-v2",
            render: (text, record) => (
                <span>
                    <QRCode
                        value={`https://zdmv2.yabee.tech/dance-machine/landing?userId=${ record._id }`}
                    />
                </span>
            ),
        },
        {
            title: "Login Code",
            key: "code",
        },
        {
            title: "DELETE?",
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

    const columnOrder = ["_id", "name", "qrcode",'qrcode-v2', "code", "action"]; // Specify the desired order of columns

    const { dataSource, columns } = convertToAntdTable(
        user.UserList.items,
        ["_id", "name", "qrcode","qrcode-v2", "code", "action"],
        [],
        customColumns,
        columnOrder
    );

    useEffect(() => {
        dispatch(fetchUserList());
    }, [dispatch]);

    return (
        <>
            <Title level={1}>Users</Title>
            <Space direction="vertical" style={{ display: "flex" }}>
                <Row gutter={8}>
                    <Col span={24}>
                        <Card title="Add/update user">
                            {UserForm.isLoading ? (
                                <Spin />
                            ) : (
                                <UserForm
                                    form={form}
                                    clearOnClick={handleClearOnClick}
                                    onFinish={handleOnFinish}
                                />
                            )}
                        </Card>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={24}>
                        <Card title="Users">
                            <Table dataSource={dataSource} columns={columns} />
                        </Card>
                    </Col>
                </Row>
            </Space>
        </>
    );
};

export default UserList;
