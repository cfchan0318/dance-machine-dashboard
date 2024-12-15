import { Row, Col, Space, Card, Spin, Table, Form } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { convertToAntdTable } from "../../utils/antdTable";
import { useEffect, useState } from "react";

import { createUser,fetchUserList, deleteUser, updateUser } from "../../store/slices/usersSlice";
import UserForm from "../../components/users/UserForm";

const UserList = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const user = useSelector(state => state.user)
    const [userToUpdate, setUserToUpdate] = useState(null);

    const handleOnFinish = (data) => {
        if (userToUpdate) {
            userToUpdate.name = data.name
            console.log(userToUpdate)
            dispatch(updateUser(userToUpdate))
            dispatch(fetchUserList())
        } else {
            dispatch(createUser(data))
            dispatch(fetchUserList())
        }
       
    };

    const handleEditOnClick = (record) => {
        setUserToUpdate(record);
        form.setFieldValue('name', record.name);
    };

    const handleDeleteOnClick = (id) => {
        dispatch(deleteUser(id))
        dispatch(fetchUserList())
    };

    const handleClearOnClick = () => {
        form.resetFields()
        setUserToUpdate(null);
    }

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

    const columnOrder = ["_id", "name", "action"]; // Specify the desired order of columns

    const { dataSource, columns } = convertToAntdTable(
        user.UserList.items,
        ["_id", "name", "action"],
        [],
        customColumns,
        columnOrder
    );

    useEffect(() => {
        dispatch(fetchUserList())
    }, [dispatch]);

    return (
        <>
            <h1>Users</h1>
            <Space direction="vertical" style={{ display: "flex" }}>
                <Row gutter={8}>
                    <Col span={24}>
                        <Card title="Add/update user">
                            {UserForm.isLoading ? (
                                <Spin />
                            ) : (
                                <UserForm form={form} clearOnClick={handleClearOnClick} onFinish={handleOnFinish} />
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
