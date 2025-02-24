import { Space, Row, Col, Card, Spin, Table, Alert, Button, Tag,Switch } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchWeekById,
    addVideo,
    removeVideo,
    updateWeeek,
    toggleShowCamera,
    toggleShowSessionResult
} from "../../store/slices/weekSlice";
import { fetchVideoDetailsList } from "../../store/slices/videoDetailsSlice";

import AddVideoForm from "../../components/week/AddVideoForm";
import { useParams } from "react-router";
import { convertToAntdTable } from "../../utils/antdTable";

function Week() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const week = useSelector((state) => state.week.week);
    const videoDetails = useSelector(
        (state) => state.videoDetails.videoDetailsList.items
    );

    const handleOnFinish = (data) => {
        const [id, title] = data.video.split("^");
        data.video = id;
        data.title = title;
        console.log(data);
        dispatch(addVideo(data));
    };

    const handleDeleteOnClick = (record) => {
        console.log(record);
        dispatch(removeVideo(record));
        //dispatch(fetchWeekById(id));
    };

    const handleSaveWeek = () => {
        const data = week.data;
        dispatch(updateWeeek(data));
        dispatch(fetchWeekById(id));
    };

    const showCameraOnChange = (key) => {
        dispatch(toggleShowCamera(key))
    }

    const showSessionResultOnChange = (key) => {
        dispatch(toggleShowSessionResult(key));
    }
   
    const customColumns = [
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <span>
                    <a
                        onClick={() => handleDeleteOnClick(record.key)}
                        style={{ marginLeft: 8 }}>
                        Delete
                    </a>
                </span>
            ),
        },
        {
            title: "showCamera",
            key: "showCamera",
            render: (text, record) => (
                
                <span><Switch checked={record.showCamera } onChange={()=>showCameraOnChange(record.rowId)} /></span>
            ),
        },
        {
            title: "showSessionResult",
            key: "showSessionResult",
            render: (text, record) => (
                <span><Switch checked={record.showSessionResult } onChange={()=>showSessionResultOnChange(record.rowId)} /></span>
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
        week.data.videos,
        [
            "video",
            "title",
            
            "order",
            "action",
        ],
        [],
        customColumns,
        columnOrder
    );

    useEffect(() => {
        dispatch(fetchWeekById(id));
        dispatch(fetchVideoDetailsList());
    }, [dispatch, id]);

    return (
        <>
            <Space direction="vertical" style={{ display: "flex" }}>
                <Row gutter={8}>
                    <Col span={24}>
                        <Card title="Week Info">
                            {week.isLoading ? (
                                <Spin />
                            ) : (
                                <>
                                    <div>
                                        <span>
                                            <b>Week: </b>
                                            {week.data.week}
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            <b>Name: </b>
                                            {week.data.name}
                                        </span>
                                    </div>
                                </>
                            )}
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Card title="Videos">
                            <AddVideoForm
                                onFinish={handleOnFinish}
                                videoDetails={videoDetails}
                            />
                            <br />
                            <h2>videos</h2>
                            <Table
                                pagination={false}
                                dataSource={dataSource}
                                columns={columns}
                                rowKey="rowId"
                            />
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Button onClick={handleSaveWeek}>
                            Save Video Details
                        </Button>
                    </Col>
                </Row>
            </Space>
        </>
    );
}

export default Week;
