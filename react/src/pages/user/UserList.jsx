import {
    Row,
    Col,
    Space,
    Card,
    Spin,
    Table,
    Form,
    QRCode,
    Typography,
    InputNumber,
    Tag,
    Input,
    Select,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { convertToAntdTable } from "../../utils/antdTable";
import { useEffect, useState, useMemo } from "react";
import {
    createUser,
    fetchUserList,
    deleteUser,
    updateUser,
} from "../../store/slices/usersSlice";
import { fetchUserGroupList } from "../../store/slices/userGroupSlice";
import UserForm from "../../components/users/UserForm";
const { Title } = Typography;

import { message } from "antd";

const UserList = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const user = useSelector((state) => state.user);
    const userGroup = useSelector((state) => state.userGroup);
    const { error } = useSelector((state) => state.user.UserForm);
    const [userToUpdate, setUserToUpdate] = useState(null);
    const [searchName, setSearchName] = useState("");
    const [filterGroupId, setFilterGroupId] = useState(null);

    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (error) {
            messageApi.error(error);
        }
    }, [error, messageApi]);

    const handleOnFinish = (data) => {
        if (userToUpdate) {
            userToUpdate.name = data.name;
            userToUpdate.code = data.code;
            userToUpdate.userGroups = data.userGroups || [];
            dispatch(updateUser(userToUpdate));
            dispatch(fetchUserList());
            setUserToUpdate(null);
            form.resetFields();
        } else {
            dispatch(createUser(data));
            dispatch(fetchUserList());
            setUserToUpdate(null);
            form.resetFields();
        }
    };

    const handleEditOnClick = (record) => {
        setUserToUpdate(record);
        form.setFieldValue("name", record.name);
        form.setFieldValue("code", record.code);
        form.setFieldValue(
            "userGroups",
            record.userGroups?.map((g) => g._id) || [],
        );
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
            title: "User Groups",
            key: "userGroups",
            render: (text, record) => (
                <span>
                    {record.userGroups?.map((group) => (
                        <Tag color="blue" key={group._id}>
                            {group.name}
                        </Tag>
                    ))}
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
                        value={`https://zdmv2.yabee.tech/dance-machine/landing?userId=${record._id}`}
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

    const columnOrder = [
        "_id",
        "name",
        "userGroups",
        "qrcode",
        "qrcode-v2",
        "code",
        "action",
    ];

    const filteredItems = useMemo(() => {
        let items = user.UserList.items || [];
        if (searchName) {
            items = items.filter((u) =>
                u.name?.toLowerCase().includes(searchName.toLowerCase()),
            );
        }
        if (filterGroupId) {
            items = items.filter((u) =>
                u.userGroups?.some((g) => {
                    const id = typeof g === "object" ? g._id : g;
                    return id === filterGroupId;
                }),
            );
        }
        return items;
    }, [user.UserList.items, searchName, filterGroupId]);

    const { dataSource, columns } = convertToAntdTable(
        filteredItems,
        ["_id", "name", "qrcode", "qrcode-v2", "code", "action"],
        ["userGroups"],
        customColumns,
        columnOrder,
    );

    useEffect(() => {
        dispatch(fetchUserList());
        dispatch(fetchUserGroupList());
    }, [dispatch]);

    return (
        <>
            {contextHolder}
            <Title level={1}>Users</Title>
            <Space direction="vertical" style={{ display: "flex" }}>
                <Row gutter={8}>
                    <Col span={24}>
                        <Card
                            title={
                                userToUpdate
                                    ? `updating user: ${userToUpdate?.name}`
                                    : `Create User`
                            }>
                            {UserForm.isLoading ? (
                                <Spin />
                            ) : (
                                <UserForm
                                    form={form}
                                    clearOnClick={handleClearOnClick}
                                    onFinish={handleOnFinish}
                                    userGroups={userGroup.UserGroupList.items}
                                />
                            )}
                        </Card>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={24}>
                        <Card title="Filter Users">
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Input
                                        placeholder="Search by name"
                                        allowClear
                                        value={searchName}
                                        onChange={(e) =>
                                            setSearchName(e.target.value)
                                        }
                                    />
                                </Col>
                                <Col span={8}>
                                    <Select
                                        placeholder="Filter by user group"
                                        allowClear
                                        style={{ width: "100%" }}
                                        value={filterGroupId}
                                        onChange={(val) =>
                                            setFilterGroupId(val ?? null)
                                        }
                                        options={userGroup.UserGroupList.items.map(
                                            (g) => ({
                                                label: g.name,
                                                value: g._id,
                                            }),
                                        )}
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={24}>
                        <Card>
                            <Table dataSource={dataSource} columns={columns} />
                        </Card>
                    </Col>
                </Row>
            </Space>
        </>
    );
};

export default UserList;
