import { useEffect } from "react";
import {
    Card,
    Col,
    Row,
    Space,
    Form,
    Select,
    Switch,
    Table,
    Button,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import {
    createGameLevel,
    getGameLevels,
    getGameLevelById,
    addVideo,
    removeVideo,
    toggleShowCamera,
    toggleShowSessionResult,
    updateGameLevel,
    deleteGameLevel,
} from "../../store/slices/gameLevelSlice";
import { fetchVideoDetailsList } from "../../store/slices/videoDetailsSlice";

import { convertToAntdTable } from "../../utils/antdTable";

import GameLevelForm from "./GameLevelForm";
import AddVideoForm from "../../components/week/AddVideoForm";
import { useState } from "react";

function SongDetails() {
    const { songId } = useParams();
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [levelId, setLevelId] = useState(null);

    const { gameLevelDropdown, gameLevelForm, level } = useSelector(
        (state) => state.gameLevels,
    );
    const videoDetails = useSelector(
        (state) => state.videoDetails.videoDetailsList.items,
    );

    //Level Form
    const handleOnFinish = (vals) => {
        dispatch(
            createGameLevel({
                songId: songId,
                ...vals,
            }),
        );
    };

    const handleOnFinishFailed = () => {};

    //LevelDropdown
    const handleOnChange = (val) => {
        setLevelId(val);
        dispatch(getGameLevelById({ songId: songId, levelId: val }));
    };

    const handleRemoveOnClick = () => {
        console.log(levelId);
        if (levelId) {
            dispatch(deleteGameLevel({ songId: songId, levelId: levelId }));
        }
    };

    //Table
    const handleAddVideo = (data) => {
        const [id, title] = data.video.split("^");
        data.video = id;
        data.title = title;
        console.log(data);
        dispatch(addVideo(data));
    };

    const showCameraOnChange = (key) => {
        dispatch(toggleShowCamera(key));
    };

    const showSessionResultOnChange = (key) => {
        dispatch(toggleShowSessionResult(key));
    };

    const handleDeleteOnClick = (record) => {
        console.log(record);
        dispatch(removeVideo(record));
        //dispatch(fetchWeekById(id));
    };

    const handleSaveLevel = () => {
        const data = {
            songId: songId,
            ...level.data,
        };
        dispatch(updateGameLevel(data));
        //dispatch(fetchWeekById(id));
    };

    const customColumns = [
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <span>
                    <a
                        onClick={() => handleDeleteOnClick(record.key)}
                        style={{ marginLeft: 8, color: "red" }}>
                        Delete
                    </a>
                </span>
            ),
        },
        {
            title: "showCamera",
            key: "showCamera",
            render: (text, record) => (
                <span>
                    <Switch
                        checked={record.showCamera}
                        onChange={() => showCameraOnChange(record.rowId)}
                    />
                </span>
            ),
        },
        {
            title: "showSessionResult",
            key: "showSessionResult",
            render: (text, record) => (
                <span>
                    <Switch
                        checked={record.showSessionResult}
                        onChange={() => showSessionResultOnChange(record.rowId)}
                    />
                </span>
            ),
        },
    ];

    const columnOrder = [
        "video",
        "title",
        "showCamera",
        "showSessionResult",
        "order",
        "action",
    ]; // Specify the desired order of columns

    const { dataSource, columns } = convertToAntdTable(
        level.data.videos,
        ["video", "title", "order", "action"],
        [],
        customColumns,
        columnOrder,
    );

    useEffect(() => {
        dispatch(getGameLevels({ songId }));
        dispatch(fetchVideoDetailsList());
    }, [dispatch, songId]);

    return (
        <Space direction="vertical" style={{ display: "flex" }}>
            <Row gutter={8}>
                <Col span={24}>
                    <Card title="Add Level">
                        <GameLevelForm
                            form={form}
                            onFinish={handleOnFinish}
                            onFinishFailed={handleOnFinishFailed}
                        />
                    </Card>
                </Col>
            </Row>

            <Col span={24}></Col>
            <Row gutter={8}>
                <Col span={24}>
                    <Card title="Select Level">
                        <Row>
                            <Col span={16}>
                                <Select
                                    onChange={handleOnChange}
                                    style={{ width: "100%" }}
                                    options={gameLevelDropdown.levels.map(
                                        (level) => ({
                                            label: level.name,
                                            value: level._id,
                                        }),
                                    )}
                                />
                            </Col>
                            <Col span={8} style={{ textAlign: 'right' }}>
                                <Button
                                    type="primary"
                                    onClick={handleRemoveOnClick}>
                                    Remove Level
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            {level.data?.name ? (
                <Row>
                    <Col span={24}>
                        <Card
                            title={
                                <Row>
                                    <Col span={8}>Videos</Col>
                                    <Col
                                        span={16}
                                        style={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                        }}>
                                        <Button onClick={handleSaveLevel}>
                                            Save Video Details
                                        </Button>
                                    </Col>
                                </Row>
                            }>
                            <AddVideoForm
                                onFinish={handleAddVideo}
                                videoDetails={videoDetails}
                            />
                            <br />

                            <Table
                                pagination={false}
                                dataSource={dataSource}
                                columns={columns}
                                rowKey="rowId"
                            />
                        </Card>
                    </Col>
                </Row>
            ) : (
                <></>
            )}
        </Space>
    );
}

export default SongDetails;
