import { Row, Col, Space, Card, Spin, Table, Form, Tag, Image } from "antd";
import SongForm from "../../components/song/SongForm";
import {
    createSong,
    fetchSongList,
    deleteSong,
    updateSong,
} from "../../store/slices/songSlice";
import { fetchUserGroupList } from "../../store/slices/userGroupSlice";
import { useDispatch, useSelector } from "react-redux";
import { convertToAntdTable } from "../../utils/antdTable";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PageTitle from "../../components/common/PageTitle";

const SongList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const songForm = useSelector((state) => state.song.songForm);
    const songList = useSelector((state) => state.song.songList);
    const userGroups = useSelector((state) => state.userGroup.UserGroupList.items);

    const [formSongId, setFormSongId] = useState(null);
    const [fileList, setFileList] = useState([]);

    const handleClearOnClick = () => {
        setFormSongId(null);
        setFileList([]);
        form.resetFields();
    };

    const handleOnFinish = (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("author", data.author);
        formData.append("order", data.order);
        formData.append("publish", data.publish ?? false);
        formData.append("isLocked", data.isLocked ?? false);

        // Add user groups
        if (data.userGroups && data.userGroups.length > 0) {
            data.userGroups.forEach((id) => formData.append("userGroups", id));
        }

        // Add photo if selected
        if (fileList.length > 0 && fileList[0].originFileObj) {
            formData.append("photo", fileList[0].originFileObj);
        }

        if (formSongId) {
            dispatch(updateSong({ id: formSongId, formData })).then(() => {
                dispatch(fetchSongList());
            });
            setFormSongId(null);
        } else {
            dispatch(createSong(formData)).then(() => {
                dispatch(fetchSongList());
            });
        }
        form.resetFields();
        setFileList([]);
    };

    const handleEditInfoOnClick = (record) => {
        setFormSongId(record._id);
        form.setFieldsValue({
            name: record.name,
            author: record.author,
            order: record.order ?? 0,
            publish: record.publish,
            isLocked: record.isLocked,
            userGroups: (record.userGroups || []).map((g) =>
                typeof g === "object" ? g._id : g
            ),
        });
        // Clear file list when editing (user can optionally upload new photo)
        setFileList([]);
    };

    const handleEditLevelsOnClick = (id) => {
        navigate(`/songs/${id}`);
    };

    const handleDeleteOnClick = (id) => {
        dispatch(deleteSong(id)).then(() => {
            dispatch(fetchSongList());
        });
    };

    const customColumns = [
        {
            title: "Photo",
            key: "photo",
            render: (text, record) => (
                <span>
                    {record.photo ? (
                        <Image
                            width={50}
                            src={`${import.meta.env.VITE_API_URL}${record.photo}`}
                            alt={record.name}
                        />
                    ) : (
                        <span>No Image</span>
                    )}
                </span>
            ),
        },
        {
            title: "Publish",
            key: "publish",
            render: (text, record) => (
                <span>
                    {record.publish ? (
                        <Tag color="green">Yes</Tag>
                    ) : (
                        <Tag color="red">No</Tag>
                    )}
                </span>
            ),
        },
        {
            title: "Is Locked?",
            key: "isLocked",
            render: (text, record) => (
                <span>
                    {record.isLocked ? (
                        <Tag color="red">Yes</Tag>
                    ) : (
                        <Tag color="green">No</Tag>
                    )}
                </span>
            ),
        },
        {
            title: "Is Deleted?",
            key: "isDeleted",
            render: (text, record) => (
                <span>
                    {record.isDeleted ? (
                        <Tag color="red">Yes</Tag>
                    ) : (
                        <Tag color="green">No</Tag>
                    )}
                </span>
            ),
        },
        {
            title: "User Groups",
            key: "userGroups",
            render: (text, record) => (
                <span>
                    {(record.userGroups || []).map((g) => (
                        <Tag color="blue" key={typeof g === "object" ? g._id : g}>
                            {typeof g === "object" ? g.name : g}
                        </Tag>
                    ))}
                </span>
            ),
        },
        {
            title: "Edit Song Info",
            key: "edit",
            render: (text, record) => (
                <span>
                    <a
                        onClick={() => {
                            handleEditInfoOnClick(record);
                        }}>
                        Edit
                    </a>
                </span>
            ),
        },
        {
            title: "Edit Levels",
            key: "edit_level",
            render: (text, record) => (
                <span>
                    <a
                        onClick={() => {
                            handleEditLevelsOnClick(record["_id"]);
                        }}>
                        Edit
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

    const columnOrder = [
        "_id",
        "photo",
        "name",
        "author",
        "order",
        "publish",
        "isLocked",
        "isDeleted",
        "userGroups",
        "edit",
        "edit_level",
        "delete",
    ];
    const columnConfigs = {
        order: {
            sorter: (a, b) => a.order - b.order,
        },
    };

    const { dataSource, columns } = convertToAntdTable(
        songList.items,
        ["_id", "name", "author", "order"],
        columnConfigs,
        customColumns,
        columnOrder,
    );

    useEffect(() => {
        dispatch(fetchSongList());
        dispatch(fetchUserGroupList());
    }, [dispatch]);

    return (
        <>
            <PageTitle>Songs</PageTitle>
            <Space direction="vertical" style={{ display: "flex" }}>
                <Row gutter={8}>
                    <Col span={24}>
                        <Card title="Add/Edit Song">
                            {songForm.isLoading ? (
                                <Spin />
                            ) : (
                                <>
                                    {formSongId ? (
                                        <h3>Editing {formSongId}</h3>
                                    ) : (
                                        <h3>Create new song</h3>
                                    )}
                                    <SongForm
                                        clearOnClick={handleClearOnClick}
                                        form={form}
                                        onFinish={handleOnFinish}
                                        fileList={fileList}
                                        setFileList={setFileList}
                                        userGroups={userGroups}
                                    />
                                </>
                            )}
                        </Card>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={24}>
                        <Card title="Songs">
                            {songList.isLoading ? (
                                <Spin />
                            ) : (
                                <Table
                                    pagination={false}
                                    dataSource={dataSource}
                                    columns={columns}
                                />
                            )}
                        </Card>
                    </Col>
                </Row>
            </Space>
        </>
    );
};

export default SongList;
