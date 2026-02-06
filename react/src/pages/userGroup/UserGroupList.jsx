import {
    Row,
    Col,
    Space,
    Card,
    Spin,
    Table,
    Form,
    Typography,
    Tag,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { convertToAntdTable } from "../../utils/antdTable";
import { useEffect, useState } from "react";
import {
    createUserGroup,
    fetchUserGroupList,
    deleteUserGroup,
    updateUserGroup,
} from "../../store/slices/userGroupSlice";
import UserGroupForm from "../../components/userGroup/UserGroupForm";
const { Title } = Typography;

import { message } from "antd";

const UserGroupList = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const userGroup = useSelector((state) => state.userGroup);
    const { error } = useSelector((state) => state.userGroup.UserGroupForm);
    const [userGroupToUpdate, setUserGroupToUpdate] = useState(null);

    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (error) {
            messageApi.error(error);
        }
    }, [error, messageApi]);

    const handleOnFinish = (data) => {
        if (userGroupToUpdate) {
            userGroupToUpdate.name = data.name;
            userGroupToUpdate.description = data.description;
            userGroupToUpdate.isDisabled = data.isDisabled ?? false;
            dispatch(updateUserGroup(userGroupToUpdate)).then(() => {
                dispatch(fetchUserGroupList());
            });
            setUserGroupToUpdate(null);
            form.resetFields();
        } else {
            dispatch(createUserGroup(data)).then(() => {
                dispatch(fetchUserGroupList());
            });
            setUserGroupToUpdate(null);
            form.resetFields();
        }
    };

    const handleEditOnClick = (record) => {
        setUserGroupToUpdate(record);
        form.setFieldValue("name", record.name);
        form.setFieldValue("description", record.description);
        form.setFieldValue("isDisabled", record.isDisabled ?? false);
    };

    const handleDeleteOnClick = (id) => {
        dispatch(deleteUserGroup(id)).then(() => {
            dispatch(fetchUserGroupList());
        });
    };

    const handleClearOnClick = () => {
        form.resetFields();
        setUserGroupToUpdate(null);
    };

    const customColumns = [
        {
            title: "Disabled",
            key: "isDisabled",
            render: (text, record) => (
                <span>
                    {record.isDisabled ? (
                        <Tag color="red">Yes</Tag>
                    ) : (
                        <Tag color="green">No</Tag>
                    )}
                </span>
            ),
        },
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
        "description",
        "isDisabled",
        "action",
        "delete"
    ]; // Specify the desired order of columns

    const { dataSource, columns } = convertToAntdTable(
        userGroup.UserGroupList.items,
        ["_id", "name", "description"],
        [],
        customColumns,
        columnOrder
    );

    useEffect(() => {
        dispatch(fetchUserGroupList());
    }, [dispatch]);

    return (
        <>
            {contextHolder}
            <Title level={1}>User Groups</Title>
            <Space direction="vertical" style={{ display: "flex" }}>
                <Row gutter={8}>
                    <Col span={24}>
                        <Card
                            title={
                                userGroupToUpdate
                                    ? `Updating group: ${userGroupToUpdate?.name}`
                                    : `Create User Group`
                            }>
                            {userGroup.UserGroupForm.isLoading ? (
                                <Spin />
                            ) : (
                                <UserGroupForm
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
                        <Card title="User Groups">
                            <Table dataSource={dataSource} columns={columns} />
                        </Card>
                    </Col>
                </Row>
            </Space>
        </>
    );
};

export default UserGroupList;
